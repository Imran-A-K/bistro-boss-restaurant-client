import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, useCartQueryEnabler } = useAuth();
    const [ axiosSecure ] = useAxiosSecure();
    // console.log(user, useCartQueryEnabler)
    const {data : isAdmin, isLoading: isAdminLoading, refetch} = useQuery({
        queryKey : ['isAdmin', user?.email],
        enabled: useCartQueryEnabler,
        queryFn : async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log('is admin response', res)
            return res.data.admin;
        }
    })
  return [isAdmin, isAdminLoading]
}

export default useAdmin