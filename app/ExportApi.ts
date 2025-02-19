import axios from "axios";


   const apiServices= axios.create({
    baseURL:"http://172.16.239.178:5289/Bplan_api/app"
   
 })
 export default apiServices