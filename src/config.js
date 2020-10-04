import axios from 'axios';

export const API_KEY = '4e968018364246dea6b8455cb5c47871';

export const apiServerRequet = axios.create({
    baseURL:'https://api.spoonacular.com/recipes/'
})

