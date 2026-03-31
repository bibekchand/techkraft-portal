import useUser from "../hooks/useUser.jsx"
import useProperty from "../hooks/useProperty.jsx"
import ViewProperty from "../components/ViewProperty.jsx"
export default function DashBoard() {
    const { userEmail, userRole } = useUser()
    const { allPropertyList, favoriteList } = useProperty()
    return (
        <>
            <div className="h-fit w-fit border-black border-2 rounded-2xl ml-auto mr-auto p-2">
                <div> Email: {userEmail}</div>
                <div> Role: {userRole}</div>
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
            </div>
        </>
    )
}
