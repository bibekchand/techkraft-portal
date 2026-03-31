import axios from "axios"
import { baseURL } from "../config.js"
const getTokenHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchPropertyList = async () => {
    return axios.get(`${baseURL}/get_all_properties`, {
        headers: getTokenHeader()
    })
}

export const fetchFavoriteList = async ()=> {
    return axios.get(`${baseURL}/get_user_favorites`,{
        headers: getTokenHeader()
    })
}
