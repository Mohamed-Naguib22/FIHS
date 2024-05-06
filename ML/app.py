from flask import Flask, request, jsonify
import joblib
import requests
import os
from jsonschema import validate, exceptions

schema = {
    "type": "object",
    "properties": {
        "N": {
            "type": "integer",
            "minimum": 0,
            "maximum": 300,
        },
        "P": {
            "type": "integer",
            "minimum": 0,
            "maximum": 300,
        },
        "K": {
            "type": "integer",
            "minimum": 0,
            "maximum": 300,
        },
        "rainfall": {
            "type": "integer",
            "minimum": 0,
        },
        "ph": {
            "type": "number",
            "minimum": 0.0,
            "maximum": 14.0,
        },
        "city": {
            "type": "string",
        }
    },
    "required": ["N", "P", "K", "rainfall", "ph", "city"]
}

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

@app.route('/recommend', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        validate(data, schema)

        weather_data = get_weather_data(data['city'])

        if weather_data['temperature'] is None or weather_data['humidity'] is None:
            return jsonify({'error': "تأكد من ان اسم المدينة"}), 400

        features = [data['N'], data['P'], data['K'], weather_data['temperature'], weather_data['humidity'], data['ph'], data['rainfall']]
        
        print(weather_data['temperature'])
        print(weather_data['humidity'])
        
        prediction_proba = model.predict_proba([features])[0]
        sorted_crops = sorted(enumerate(prediction_proba), key=lambda x: x[1], reverse=True)
       
        top3_crops = sorted_crops[:3]

        crop_labels = {"rice": "أرز", "maize": "ذرة", "chickpea": "حمص", "kidneybeans": "فاصوليا", "pigeonpeas": "بازلاء", "mothbeans": "فول",
            "mungbean":"لوبيا", "blackgram": "فاصوليا", "lentil": "عدس", "pomegranate": "رمان", "banana": "موز", "mango": "مانغو", "grapes": "عنب",
            "watermelon": "بطيخ", "muskmelon": "شمام", "apple": "تفاح", "orange": "برتقان", "papaya": "بَابَايَا", "coconut": "جوز الهند", 
            "cotton": "قطن", "jute": "جوت", "coffee": "قهوة" }
        
        top3_crops_data = []
        for crop_index, probability in top3_crops:
            crop_name = crop_labels[model.classes_[crop_index]]
            top3_crops_data.append({'crop': crop_name, 'probability': round(probability, 2)})
        return jsonify({'recommended_crops': top3_crops_data})

    except exceptions.ValidationError as e:
        error_message = str(e.args[0])
        return jsonify({'error': error_message}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)