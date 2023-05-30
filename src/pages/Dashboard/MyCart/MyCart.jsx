import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart,refetch] = useCart();
  // google search how does reduce work
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  const handleDelete = item => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`,{
          method: "DELETE"
        })
        .then(response => {
          return response.json()
        })
        .then(async(data) => {
          if(data.deletedCount>0){
          await Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        refetch();
          }
          
        })
        
      }
    }) 
  }
  return (
    <div className="w-full pl-5">
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div className="uppercase h-[60px] items-center font-semibold flex justify-evenly">
        <h3 className="text-3xl">Total Items: {cart.length || 0}</h3>
        <h3 className="text-3xl">Total Price: ${total}</h3>
        <button className="btn btn-outline btn-warning btn-sm">Pay</button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#D1A054]">#</th>
              <th className="bg-[#D1A054]">Food</th>
              <th className="bg-[#D1A054]">Item Name</th>
              <th className="bg-[#D1A054]">Price</th>
              <th className="bg-[#D1A054]">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>
                  {item.name}
                </td>
                <td className="text-end">${item.price}</td>
                <td>
                  <button onClick={() => handleDelete(item)} className="btn bg-red-600 text-white btn-ghost"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
