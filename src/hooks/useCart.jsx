import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProviders'
// here the authcontext is imported because this whole component will run the page where ever you called it so
// despite it is not in the children of the context provider component because this will be used inside a children of the context provider
// it will get access to all data of the context. you could pass these as parameters to the custom useCart hook but still this makes your
// code more hassle free. it will auto import the data whenever it is called inside the children
const useCart = () => {
  const { user } = useContext(AuthContext)
  // here i have changed the name of the data field by destructuring and set it as cart for useQuery
  const { isLoading, refetch, isError, data: cart = [], error } = useQuery({
    queryKey: ['carts', user?.mail],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
      return response.json();
    },
  })
  // refetch means will auto reload the data
  // setting/renaming the data field to cart remember
  return [ cart, refetch]
}

export default useCart