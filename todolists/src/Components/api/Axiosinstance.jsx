import axios from "axios";

const axiosInstance = axios.create({
  
      // baseURL: "http://localhost:5000/",
      baseURL: "https://vercel-checks-backend.vercel.app/"


     
    });

    export default axiosInstance;