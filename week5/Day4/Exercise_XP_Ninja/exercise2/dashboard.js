// dashboard.js
import readline from 'readline';
import { getWeather } from './weather.js';

export function startDashboard() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('🌍 Enter a city name: ', async (city) => {
    await getWeather(city);
    rl.close();
  });
}
