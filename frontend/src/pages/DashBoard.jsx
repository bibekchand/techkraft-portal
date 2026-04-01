import useUser from "../hooks/useUser.jsx"
import useProperty from "../hooks/useProperty.jsx"
import ViewProperty from "../components/ViewProperty.jsx"
import { Toaster } from "react-hot-toast";
import { useEffect } from "react"
import { useNavigate } from "react-router"
export default function DashBoard() {
    const navigate = useNavigate()
    const { userEmail, userRole, signOut, fetchUserInfo } = useUser()
    const { allPropertyList, favoriteList } = useProperty()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
        else {
            fetchUserInfo()
        }
    }, [])
    return (
        <>
            <div className="h-fit w-fit border-black border-2 rounded-2xl ml-auto mr-auto p-2">
                <div> Email: {userEmail}</div>
                <div> Role: {userRole}</div>
                <div className="underline cursor-pointer ml-auto text-red-500" onClick={signOut}>Sign Out</div>
            </div>
            <h1>Favorites</h1>
            <div className="flex flex-wrap w-full h-fit border-2">

                {
                    favoriteList.map(item => <ViewProperty key={item.property_id} id={item.property_id} userFavorite={true} />)
                }
            </div>
            <h1>All Properties</h1>
            <div className="flex flex-wrap w-full h-fit border-2">
                {
                    allPropertyList.map(item => <ViewProperty key={item.id} id={item.id} userFavorite={false} />)
                }
                <Toaster position="top-center" />
            </div>
        </>
    )
}
