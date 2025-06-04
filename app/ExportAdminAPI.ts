import axios from 'axios';

const AdminapiServices = axios.create({
    baseURL: 'http://172.16.239.173:8081/api', // Adjust this to your ASP.NET API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AdminapiServices;