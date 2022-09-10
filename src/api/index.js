import axios from 'axios'
import { config } from 'dotenv';
require("dotenv").config();


export const dbURL = "http://localhost:4000/api";
const API_URL = process.env.API_KEY
export const API = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_URL}`

export async function getUserById(userid){
    const response = axios.get("/api/users")
}