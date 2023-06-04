import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    // const [ menu, setMenu] = useState([])
    // const [ loading, setLoading ] = useState(true) 
    // useEffect( () => {
    //     fetch('http://localhost:5000/menu')
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         setMenu(data)
    //         setLoading(false)
    //     })
    // }, [])
    const {data : menu = [], isLoading : loading, refetch} = useQuery({
        queryKey: [ 'menu' ],
        queryFn: async() =>{
            const response = await fetch('http://localhost:5000/menu')
            return response.json()
        }
    });
    return [menu, loading, refetch]
}

export default useMenu;