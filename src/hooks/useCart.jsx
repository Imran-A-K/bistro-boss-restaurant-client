import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProviders'
import useAxiosSecure from './useAxiosSecure'
// here the authcontext is imported because this whole component will run the page where ever you called it so
// despite it is not in the children of the context provider component because this will be used inside a children of the context provider
// it will get access to all data of the context. you could pass these as parameters to the custom useCart hook but still this makes your
// code more hassle free. it will auto import the data whenever it is called inside the children
const useCart = () => {
  const { user, useCartQueryEnabler } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure(); // calling the custom hook with axios interceptor
  const token = localStorage.getItem('access-token')
  // here i have changed the name of the data field by destructuring and set it as cart for useQuery
  // const { isLoading, refetch, isError, data: cart = [], error } = useQuery({
  const { refetch,data: cart = []} = useQuery({
    // queryKey: ['carts', user?.mail],
    // queryFn: async () => {
    //   const response = await fetch(`https://bistro-boss-server-drab.vercel.app/carts?email=${user?.email}`,{
    //     headers : {
    //       authorization : `bearer ${token}`
    //     }
    //   })
    //   return response.json();
    queryKey: ['carts', user?.mail],
    enabled: useCartQueryEnabler, // here the logic is that when ever the user is completed loaded fully with the jwt token
                      // then the  useCartQueryEnabler will be set to true and enable the query
                      // there are  more ways for doing this                      
    queryFn: async () => {
      const response = await axiosSecure(`/carts?email=${user?.email}`)
      console.log(response)
      return response.data;
    },
  })
  // refetch means will auto reload the data
  // setting/renaming the data field to cart remember
  return [ cart, refetch]
}

export default useCart