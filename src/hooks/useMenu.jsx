import { useEffect,useState } from "react";

const useMenu = () => {
    const [ menu, setMenu] = useState([])
    const [ loading, setLoading ] = useState(true) 
    useEffect( () => {
        fetch('http://localhost:5000/menu')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setMenu(data)
            setLoading(false)
        })
    }, [])
    return [menu]
}

export default useMenu;