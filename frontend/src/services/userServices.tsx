import axios from "axios"
import { baseURL } from "../config.js"

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

export const signUpUser = async (email: string, password: string) => {
    return axios
        .post(`${baseURL}/sign_up`, {
            email: email,
            password: password,
        })
}
