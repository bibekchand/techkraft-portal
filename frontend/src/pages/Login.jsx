
import { Toaster } from "react-hot-toast";
import { Link } from "react-router";
export default function Login() {
    function login() {
    }
    return (
        <>
            <div className="w-fit m-auto text-5xl">Login</div>
            <div className="flex justify-center p-2">
                <form action={login} className="flex flex-col gap-2 justify-center">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="border-2 p-0.5"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        className="border-2 p-0.5"
                    />
                    <button
                        type="submit"
                        className="border-2 shadow shadow-amber-800 active:shadow-amber-50"
                    >
                        Login
                    </button>
                    <Link
                        to="/register"
                        className="underline text-blue-700 cursor-pointer"
                    >
                        Don't have an account?
                    </Link>
                </form>
                <Toaster position="bottom-center" />
            </div>
        </>
    );
}
