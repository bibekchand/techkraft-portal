import { loginUser, signUpUser } from "../services/userServices.tsx"
import toast from "react-hot-toast"
import { useNavigate } from "react-router";
export default function useUser() {
    const navigate = useNavigate();
    async function login(formData) {
        const email = formData.get("email")
        const password = formData.get("password")
        try {
            const result = await loginUser(email, password)
            const token = result.data.access_token
            localStorage.setItem("token", token)
            navigate("/")
            toast.success("Logged in successfully")
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
        try {
            await signUpUser(email, password)
        }
        catch (error) {
            if (error?.response?.status === 409)
                toast.error("Username already taken")
            else
                toast.error("Unkown error")
        }
    }
    return { login, signUp }
}
