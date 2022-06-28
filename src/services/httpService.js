import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

const httpService = {
    get: instance.get,
    post: instance.post,
};

export default httpService;
