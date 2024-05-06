from flask import Flask, request, jsonify
import joblib
import requests
import os
from marshmallow import Schema, fields

class CropRecommendationRequest(Schema):
    N = fields.Integer(required=True, validate=lambda n: 0 <= n <= 300)
    P = fields.Integer(required=True, validate=lambda p: 0 <= p <= 300)
    K = fields.Integer(required=True, validate=lambda k: 0 <= k <= 300)
    rainfall = fields.Integer(required=True)
    ph = fields.Float(required=True, validate=lambda ph: 0.0 <= ph <= 14.0)
    city = fields.Str(required=True)

app = Flask(__name__)

model = joblib.load('model/crop_recommendation_model.joblib')

def kelvinToCelsius(kelvin):
    celsius = kelvin - 273.15
    return celsius

def get_weather_data(city):
    BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
    API_KEY = os.getenv("API_KEY")
    url = BASE_URL + "appid=" + API_KEY + "&q=" + city
    
    respone = requests.get(url).json()
    
    try:
        temp_kelvin = respone['main']['temp']
        humidity = respone['main']['humidity']
        temp_celsius = round(kelvinToCelsius(temp_kelvin), 1) 
        return {'temperature': temp_celsius, 'humidity': humidity}
    
    except KeyError:
        return {'temperature': None, 'humidity': None}
    
    except requests.exceptions.RequestException as e:
        return {'temperature': None, 'humidity': None}

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

        schema = CropRecommendationRequest()
        errors = schema.validate(data)
        
        if errors:
            error_messages = []
            for field, error_msgs in errors.items():
                error_messages.append(f"Invalid value for {field}: {', '.join(error_msgs)}")
            return jsonify({'error': error_messages}), 400

        weather_data = get_weather_data(data['city'])

        if weather_data['temperature'] is None or weather_data['humidity'] is None:
            return jsonify({'error': "تأكد من ان اسم المدينة"}), 400

        features = [data['N'], data['P'], data['K'], weather_data['temperature'], weather_data['humidity'], data['ph'], data['rainfall']]
        
        top3_crops = predict_crops(features)

        response = format_response(top3_crops)
        return jsonify({'recommended_crops': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)