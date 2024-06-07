import requests

city_coordinates = {
    "القاهرة": (30.0444, 31.2357),
    "الإسكندرية": (31.2001, 29.9187),
    "الجيزة": (30.0131, 31.2089),
    "المنصورة": (31.0379, 31.3805),
    "طنطا": (30.7865, 30.9997),
    "بورسعيد": (31.2611, 32.3019),
    "المنوفية": (30.4648, 31.1844),
    "الفيوم": (29.3084, 30.8428),
    "الإسماعيلية": (30.5903, 32.2658),
    "المنيا": (28.1155, 30.7549),
    "أسوان": (24.0889, 32.8998),
    "الغردقة": (27.2579, 33.8116),
    "سوهاج": (26.5569, 31.6948),
    "دمياط": (31.4165, 31.8133),
    "الأقصر": (25.6872, 32.6396),
    "قنا": (26.1642, 32.7263),
    "شرم الشيخ": (27.9158, 34.3297),
    "السويس": (29.9668, 32.5498),
    "بني سويف": (29.0754, 31.0978),
    "العريش": (31.1272, 33.8009),
    "الوادي الجديد": (25.5175, 28.6731),
    "البحر الأحمر": (26.5765, 33.9012),
    "مطروح": (31.3574, 27.2373),
    "كفر الشيخ": (31.1052, 30.9403),
    "الدقهلية": (31.3498, 31.7195),
    "البحيرة": (30.9407, 30.362),
    "أسيوط": (27.1809, 31.1837),
    "الغربية": (30.7985, 30.9908),
    "الشرقية": (30.5595, 31.2297),
}

url = "https://archive-api.open-meteo.com/v1/archive"

month_dates = {
    "يناير": ("01-01", "01-31"),
    "فبراير": ("02-01", "02-28"),
    "مارس": ("03-01", "03-31"),
    "ابريل": ("04-01", "04-30"),
    "مايو": ("05-01", "05-31"),
    "يونيو": ("06-01", "06-30"),
    "يوليو": ("07-01", "07-31"),
    "اغسطس": ("08-01", "08-31"),
    "سبتمبر": ("09-01", "09-30"),
    "اكتوبر": ("10-01", "10-31"),
    "نوفمبر": ("11-01", "11-30"),
    "ديسمبر": ("12-01", "12-31")
}

def get_coordinates(city_name):
    return city_coordinates.get(city_name, (None, None))

def get_month_dates(month_name):
    if month_name in month_dates:
        start_date, end_date = month_dates[month_name]
        start_date = f"2023-{start_date}"
        end_date = f"2023-{end_date}"
        return start_date, end_date
    else:
        return None, None

latitude, longitude = get_coordinates("Cairo")
start_date, end_date = get_month_dates("يناير")

params = {
    "latitude": latitude,
    "longitude": longitude,
    "start_date": start_date,
    "end_date": end_date,
    "hourly": "temperature_2m,relative_humidity_2m",
    "timezone": "Africa/Cairo"
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()

    temperature_data = data["hourly"]["temperature_2m"]
    humidity_data = data["hourly"]["relative_humidity_2m"]
    
    average_temperature = round(sum(temperature_data) / len(temperature_data), 2)
    average_humidity = round(sum(humidity_data) / len(humidity_data), 2)
    
    result = {
        "average_temperature": average_temperature,
        "average_humidity": average_humidity
    }
    print(result)

else:
    print(f"Failed to retrieve data: {response.status_code}")
