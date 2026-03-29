import { loginUser } from "../services/userServices.tsx"
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
            toast.success("Logged In Successfully")
        }
        catch (error) {
            console.log("Error=>", error)
            if (error?.response?.status === 401)
                toast.error("Username or password wrong")
            else
                toast.error("Unknown error")
        }
    }
    return { login }
}
