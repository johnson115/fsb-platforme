const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-url.com/api'
  : `http://${window.location.hostname}:5000/api`;

export default API_URL;