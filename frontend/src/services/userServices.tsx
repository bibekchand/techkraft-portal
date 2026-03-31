import axios from "axios"
import { baseURL } from "../config.js"
const getTokenHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});
export const loginUser = async (username: string, password: string) => {
    return axios.post(`${baseURL}/login`,
        {
            username: username,
            password: password,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    )
}

export const signUpUser = async (email: string, password: string, role: string) => {
    return axios
        .post(`${baseURL}/sign_up`, {
            email: email,
            password: password,
            role: role,
        })
}

export const getUserInfo = async () => {
    return axios.get(`${baseURL}/get_current_user`, {
        headers: getTokenHeader()
    })
}

export const deleteFavorite = async (id: number) => {
    return axios.delete(`${baseURL}/delete_favorite?id=${id}`, {
        headers: getTokenHeader()
    })
}

export const addFavorite = async (id: number) => {
    return axios.post(`${baseURL}/add_favorite?id=${id}`, {}, {
        headers: getTokenHeader()
    })
}
