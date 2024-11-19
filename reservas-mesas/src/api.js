import axios from 'axios';

const api = axios.create({
    baseURL: 'https://x9giuzuyq5.execute-api.us-east-1.amazonaws.com/prod', // Substitua pela URL do seu API Gateway
});

export default api;