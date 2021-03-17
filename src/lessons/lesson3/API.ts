import axios from 'axios';


const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = '/?apikey=225a4029';
const instance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return instance.get(`${key}&t=${title}`)
    },
    searchFilmsByType: (title: string, type: string) => {
        return instance.get(`${key}&t=${title}&type=${type}`)
    }
};


export default API;
