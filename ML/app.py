from flask import Flask, request, jsonify
import joblib
import requests
import os
from marshmallow import Schema, fields
import json
from flask import Response

class CropRecommendationRequest(Schema):
    N = fields.Integer(required=True, validate=lambda n: 0 <= n <= 300)
    P = fields.Integer(required=True, validate=lambda p: 0 <= p <= 300)
    K = fields.Integer(required=True, validate=lambda k: 0 <= k <= 300)
    ph = fields.Float(required=True, validate=lambda ph: 0.0 <= ph <= 14.0)
    city = fields.Str(required=True)
    month = fields.Str(required=True)

app = Flask(__name__)

model = joblib.load('model/crop_recommendation_model.joblib')

weather_api_url = "https://archive-api.open-meteo.com/v1/archive"

city_coordinates = {
    "القاهرة": (30.0444, 31.2357, 24),
    "الإسكندرية": (31.2001, 29.9187, 200),
    "الجيزة": (30.0131, 31.2089, 17),
    "بورسعيد": (31.2611, 32.3019, 75),
    "المنوفية": (30.4648, 31.1844, 50),
    "الفيوم": (29.3084, 30.8428, 5),
    "الإسماعيلية": (30.5903, 32.2658, 30),
    "المنيا": (28.1155, 30.7549, 5),
    "أسوان": (24.0889, 32.8998, 1),
    "الغردقة": (27.2579, 33.8116),
    "سوهاج": (26.5569, 31.6948, 2),
    "دمياط": (31.4165, 31.8133, 93),
    "الأقصر": (25.6872, 32.6396, 1),
    "قنا": (26.1642, 32.7263, 1),
    "السويس": (29.9668, 32.5498, 16),
    "بني سويف": (29.0754, 31.0978, 5),
    "الوادي الجديد": (25.5175, 28.6731, 5),
    "البحر الأحمر": (26.5765, 33.9012, 5),
    "مطروح": (31.3574, 27.2373, 140),
    "كفر الشيخ": (31.1052, 30.9403, 58),
    "الدقهلية": (31.3498, 31.7195, 80),
    "البحيرة": (30.9407, 30.362, 75),
    "أسيوط": (27.1809, 31.1837, 3),
    "الغربية": (30.7985, 30.9908, 54),
    "الشرقية": (30.5595, 31.2297, 48),
}

month_dates = {
    "يناير": ("01-01", "01-31"),
    "فبراير": ("02-01", "02-28"),
    "مارس": ("03-01", "03-31"),
    "أبريل": ("04-01", "04-30"),
    "مايو": ("05-01", "05-31"),
    "يونيو": ("06-01", "06-30"),
    "يوليو": ("07-01", "07-31"),
    "أغسطس": ("08-01", "08-31"),
    "سبتمبر": ("09-01", "09-30"),
    "أكتوبر": ("10-01", "10-31"),
    "نوفمبر": ("11-01", "11-30"),
    "ديسمبر": ("12-01", "12-31")
}

def get_coordinates(city_name):
    return city_coordinates.get(city_name, (None, None))

def get_month_dates(month_name):
    if month_name in month_dates:
        start_date, end_date = month_dates[month_name]
        return f"2023-{start_date}", f"2023-{end_date}"

    else:
        return None, None

def kelvinToCelsius(kelvin):
    celsius = kelvin - 273.15
    return celsius

def get_weather_data(city, month):
    latitude, longitude, rainfall = get_coordinates(city)
    start_date, end_date = get_month_dates(month)

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": "temperature_2m,relative_humidity_2m",
        "timezone": "Africa/Cairo",
    }
    
    response = requests.get(weather_api_url, params=params)

    if response.status_code == 200:
        data = response.json()

    temperature_data = data["hourly"]["temperature_2m"]
    humidity_data = data["hourly"]["relative_humidity_2m"]
    
    average_temperature = round(sum(temperature_data) / len(temperature_data), 2)
    average_humidity = round(sum(humidity_data) / len(humidity_data), 2)
    
    return {'temperature': average_temperature, 'humidity': average_humidity, 'rainfall': rainfall}

def predict_crops(features):
    prediction_proba = model.predict_proba([features])[0]
    sorted_crops = sorted(enumerate(prediction_proba), key=lambda x: x[1], reverse=True)
    return sorted_crops[:3]

def format_response(top3_crops_data):
    crop_labels = {"rice": "أرز", "maize": "ذرة", "chickpea": "حمص", "kidneybeans": "فاصوليا", "pigeonpeas": "بازلاء", "mothbeans": "فول",
        "mungbean":"لوبيا", "blackgram": "فاصوليا", "lentil": "عدس", "pomegranate": "رمان", "banana": "موز", "mango": "مانغو", "grapes": "عنب",
        "watermelon": "بطيخ", "muskmelon": "شمام", "apple": "تفاح", "orange": "برتقان", "papaya": "بَابَايَا", "coconut": "جوز الهند", 
        "cotton": "قطن", "jute": "جوت", "coffee": "قهوة" }
    
    response_data = []
    for crop_index, probability in top3_crops_data:
        crop_name = crop_labels[model.classes_[crop_index]]
        response_data.append({'crop': crop_name, 'probability': round(probability, 2)})
    
    return response_data

@app.route('/recommend', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        schema = CropRecommendationRequest()
        errors = schema.validate(data)
        
        if errors:
            error_messages = []
            for field, error_msgs in errors.items():
                error_messages.append(f"Invalid value for {field}: {', '.join(error_msgs)}")
            return jsonify({'error': error_messages}), 400

        weather_data = get_weather_data(data['city'], data['month'])

        if weather_data['temperature'] is None or weather_data['humidity'] is None:
            return jsonify({'error': "تأكد من ان اسم المدينة"}), 400

        features = [data['N'], data['P'], data['K'], weather_data['temperature'], weather_data['humidity'], data['ph'], weather_data['rainfall']]
        print(weather_data['temperature'])
        print(weather_data['humidity'])
        print(weather_data['rainfall'])
        top3_crops = predict_crops(features)

        response = format_response(top3_crops)
        response_json = json.dumps({'recommended_crops': response}, ensure_ascii=False)
        return Response(response=response_json, status=200, content_type="application/json; charset=utf-8")

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/getAllCities', methods=['GET'])
def get_all_cities():
    city_names = list(city_coordinates.keys())
    response = Response(
        response=json.dumps(city_names, ensure_ascii=False),
        status=200,
        content_type="application/json; charset=utf-8"
    )
    return response


@app.route('/getAllMonths', methods=['GET'])
def get_all_months():
    month_names = list(month_dates.keys())
    response = Response(
        response=json.dumps(month_names, ensure_ascii=False),
        status=200,
        content_type="application/json; charset=utf-8"
    )
    return response


if __name__ == '__main__':
    app.run(host='192.168.1.10', port=5000)
    # app.run(port=5000)