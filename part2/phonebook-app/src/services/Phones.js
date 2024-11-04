import axios from "axios";
const baseUrl = "https://backend-9mo3.onrender.com/api/persons";


const getAll = ()=> {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}


const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const updateNumber = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}
export default {getAll, create, deleteNumber, updateNumber};