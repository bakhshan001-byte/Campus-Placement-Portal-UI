// .env
VITE_API_URL=https://campus-placement-portal-api-3.onrender.com

// code mein
axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, loginData);
