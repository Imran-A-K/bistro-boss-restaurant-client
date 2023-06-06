import { useContext } from "react"
import { AuthContext } from "../../../providers/AuthProviders"
import { FaGoogle } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/" ;
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result =>{
            const loggedInUser = result.user;
            const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email };

            fetch(`https://bistro-boss-server-drab.vercel.app/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((response) => {
              return response.json();
            })
            .then(() => {
              // console.log(data)
              navigate(from, { replace : true});

            });

        })
        .catch(error => console.log(error.message))
    }
  return (
    <div>
          <div className="divider">OR</div>
          <div className='w-full text-center my-4'>
     <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
    <FaGoogle />
</button>
     </div>
    </div>
  )
}

export default SocialLogin
