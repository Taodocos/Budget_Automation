import axios from "axios";

const apiServices = axios.create({
    baseURL: "http://localhost:53316/Bplan_api/app/",
   withCredentials:true,
   headers: {
    "Content-Type": "application/json", 
    
}

});

export default apiServices;