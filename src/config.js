const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://your-production-url.com/api';
  }
  
  // For development, use the local IP address of the machine running the server
  const localIp = window.location.hostname;
  return `http://${localIp}:5000/api`;
};

const API_URL = getApiUrl();

export default API_URL;