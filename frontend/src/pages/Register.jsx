import { Toaster } from "react-hot-toast";
import useUser from "../hooks/useUser.jsx"
export default function Register() {
    const { signUp } = useUser()
    return (
        <>
            <div className="text-2xl text-center">Give me all your data</div>
            <div className="flex p-2 justify-center">
                <form action={signUp} className="flex flex-col justify-center gap-2">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border-2 p-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength={8}
                        className="border-2 p-2"
                    />
                    <label htmlFor="role">Select Role:</label>
                    <select name="role" id="role">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>
                    <button
                        type="submit"
                        className="border-2 shadow shadow-amber-600 active:shadow-amber-50"
                    >
                        Sign Up
                    </button>
                </form>
                <Toaster position="top-center" />
            </div>
        </>
    );
}
