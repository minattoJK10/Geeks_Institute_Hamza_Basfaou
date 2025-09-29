// commands/fetch.js
import axios from 'axios';

export async function fetchData() {
  try {
    console.log('🌐 Fetching data...');
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('\nFetched Data:');
    console.log(response.data);
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
  }
}
