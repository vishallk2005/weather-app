async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');
  
    resultDiv.innerHTML = 'Loading...';
  
    try {
      const response = await fetch(`/weather?city=${city}`);
      const data = await response.json();
  
      if (data.error) {
        resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      } else {
        resultDiv.innerHTML = `
          <h2>${data.name}</h2>
          <p>${data.temperature}°C</p>
          <p>Humidity: ${data.humidity}%</p>
          <p>${data.description}</p>
          <img src="${data.icon}" alt="Weather icon"/>
        `;
      }
    } catch (error) {
      resultDiv.innerHTML = `<p>Failed to fetch weather data.</p>`;
    }
  }
  