import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({item}) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const [ cart, refetch ] = useCart();
    const handleAddToCart = item => {
        // console.log(item)
        if(user && user.email){
          const cartItem = { menuItemId: _id,  name, image, price, email: user.email}
          fetch(`https://bistro-boss-server-drab.vercel.app/carts`,{
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(cartItem)
          })
          .then(response => response.json())
          .then(data => {
            if(data.insertedId){
              refetch(); // refetch cart to update number of cart items
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Food added to the cart',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }
        else{
          Swal.fire({
            title: 'Please Login to order the food',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
            navigate('/login', { state: {from: location}})
            }
          })
        }
    }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
        <p className="bg-slate-900 absolute top-0 right-0 mr-4 mt-4 px-4 text-white">${price}</p>
      </figure>
      <div className="card-body text-center flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
         <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-orange-400 border-0 border-b-4 mt-4">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
