import { loginUser, signUpUser, getUserInfo, deleteFavorite, addFavorite } from "../services/userServices.tsx"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router";
export default function useUser() {
    const [userEmail, setUserEmail] = useState("NA")
    const [userRole, setUserRole] = useState("NA")
    const navigate = useNavigate();
    async function login(formData) {
        const email = formData.get("email")
        const password = formData.get("password")
        try {
            const result = await loginUser(email, password)
            const token = result.data.access_token
            localStorage.setItem("token", token)
            toast.success("Logged in successfully")
            navigate("/")
        }
        catch (error) {
            console.log("Error=>", error)
            if (error?.response?.status === 401)
                toast.error("Username or password wrong")
            else
                toast.error("Unknown error")
        }
    }
    async function signUp(formData) {
        const email = formData.get("email")
        const password = formData.get("password")
        const role = formData.get("role")
        try {
            await signUpUser(email, password, role)
            navigate("/login")
        }
        catch (error) {
            if (error?.response?.status === 409)
                toast.error("This account has been been already registered")
            else
                toast.error("Unkown error")
        }
    }
    async function fetchUserInfo() {
        try {
            const result = await getUserInfo()
            setUserEmail(result.data.email)
            setUserRole(result.data.role)
        }
        catch (error) {
            console.log("Error=>", error)
            if (error?.response?.status === 401) {
                toast.error("Token expired login again")
            }
            else {
                toast.error("Unkown error")
            }
        }
    }
    async function removeUserFavorite(id) {
        console.log(id)
        try {
            await deleteFavorite(id)
            navigate(0)
        }
        catch (error) {
            console.log(error)
        }
    }
    async function addUserFavorite(id) {
        try {
            await addFavorite(id)
            navigate(0)
        }
        catch (error) {
            if (error?.response?.status === 409) {
                toast.error("Already Favorite")
            }
        }
    }
    async function signOut() {
        localStorage.clear()
        navigate("/login")
    }
    return { login, signUp, userEmail, userRole, removeUserFavorite, addUserFavorite, signOut, fetchUserInfo }
}
