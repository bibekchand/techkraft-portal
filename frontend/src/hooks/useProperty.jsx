import { useState, useEffect } from "react"
import { fetchPropertyList, fetchFavoriteList } from "../services/propertyServices.jsx"
export default function useProperty() {
    const [allPropertyList, setPropertyList] = useState([])
    const [favoriteList, setFavoriteList] = useState([])
    async function fetchAllPropertyList() {
        try {
            const response = await fetchPropertyList()
            console.log(response)
            setPropertyList(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    async function fetchFavoritePropertyList() {
        try {
            const response = await fetchFavoriteList()
            console.log(response.data)
            setFavoriteList(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllPropertyList()
        fetchFavoritePropertyList()
    }, [])
    return { allPropertyList, favoriteList }
}
