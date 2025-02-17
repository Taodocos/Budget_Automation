import axios from 'axios';

const AdminapiServices = axios.create({
    baseURL: 'http://localhost:53316//api', // Adjust this to your ASP.NET API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AdminapiServices;