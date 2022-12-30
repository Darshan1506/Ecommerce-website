import axios from "axios";

const instance = axios.create({
    baseURL: "https://shopwithme-darshan.onrender.com/",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;
