import useUser from "../hooks/useUser.jsx"
export default function ViewProperty({ id, userFavorite }) {
    const { removeUserFavorite, addUserFavorite } = useUser()
    return (
        <>
            <div className="border-2 h-fit m-5 w-fit p-2">Property id: {id}
                {userFavorite ?
                    <div className="border-2 cursor-pointer" onClick={() => removeUserFavorite(id)}> Remove Favorite </div> : <div className="border-2 cursor-pointer" onClick={() => addUserFavorite(id)}> Add Favorite </div>}
            </div>
        </>
    )
}
