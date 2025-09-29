// weather.js
import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables


export async function getWeather(city) {
  try {
    const apiKey = process.env.API_KEY; // Get it from https://openweathermap.org/api

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    console.log(chalk.blue.bold(`\nWeather for ${data.name}, ${data.sys.country}:`));
    console.log(chalk.green(`🌡 Temperature: ${data.main.temp}°C`));
    console.log(chalk.yellow(`🌤 Description: ${data.weather[0].description}`));
    console.log(chalk.cyan(`💨 Wind Speed: ${data.wind.speed} m/s`));
  } catch (error) {
    console.error(chalk.red('❌ Error fetching weather data:', error.response?.data?.message || error.message));
  }
}
