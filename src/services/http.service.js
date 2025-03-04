import axios from 'axios';

class HttpService {
    
    constructor() {
        this.client = axios.create({
          baseURL: process.env.VUE_APP_API_URL, // Example API URL
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

     
      
    get(url,options = {}) {
        try {
          return this.client.get(url,options);
        } catch (error) {
          console.error('Error with GET request:', error);
          throw error;
        }
    } 
    post(url, data,options = {}) {
        try {
          return this.client.post(url, data,options);
        } catch (error) {
          console.error('Error with POST request:', error);
          throw error;
        }
      }
}

export default HttpService;