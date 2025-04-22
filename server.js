const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves HTML, CSS, JS

// Weather Route
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing. Set it in the .env file.' });
  }

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    res.json({
      name: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    });
  } catch (err) {
    console.error('❌ Error fetching weather:', err.message);

    if (err.response) {
      console.error('🌐 API response:', err.response.data);

      if (err.response.status === 404) {
        return res.status(404).json({ error: 'City not found. Please enter a valid city name.' });
      }

      return res.status(err.response.status).json({
        error: err.response.data.message || 'Error fetching weather data.'
      });
    }

    res.status(500).json({ error: 'Unable to fetch weather data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
