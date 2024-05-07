async function recommendCrops(data) {
    // Replace 'http://localhost:5000' with the actual URL of your API endpoint
    const url = 'http://192.168.1.11:5000/recommend';
  
    // Set up the request data
    const jsonData = {
      N: data.nitrogen,
      P: data.phosphorus,
      K: data.potassium,
      rainfall: data.rainfall,
      ph: data.ph,
      city: data.city,
    };
  
    // Send the POST request with JSON data
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });
  
    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }
  
    // Parse the response data
    const responseData = await response.json();
  
    // Handle potential errors
    if (responseData.error) {
      throw new Error(responseData.error);
    }
  
    return responseData.recommended_crops;
  }
  
  // Example usage
  const cropData = {
    city: 'cairo', // Replace with your desired city
    nitrogen: 120,
    phosphorus: 50,
    potassium: 60,
    rainfall: 200,
    ph: 7.5,
  };
  
  recommendCrops(cropData)
    .then(crops => {
      console.log('Top 3 recommended crops:');
      for (const crop of crops) {
        console.log(`${crop.crop} (probability: ${crop.probability})`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });