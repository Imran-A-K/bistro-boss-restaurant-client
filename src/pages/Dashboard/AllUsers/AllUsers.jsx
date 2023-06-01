import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const response = await fetch(`http://localhost:5000/users`);
    return response.json();
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${user._id}`, {
          method: "DELETE",
        })
          .then((response) => {
            return response.json();
          })
          .then(async (data) => {
            if (data.deletedCount > 0) {
              await Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              refetch();
            }
          });
      }
    });
  };

  const handleMakeAdmin = (id) => {

  }

  return (
    <div className="w-full">
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <h3 className="text-3xl font-semibold my-4">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.name}</td>
                <td>{
                  
                  user.role === 'admin' ? 'admin' : 
                  <button
                  onClick={() => handleMakeAdmin(user._id)}
                  className="btn bg-orange-600 text-white btn-ghost"
                >
                  <FaUserShield />
                </button>
                  
                  
                  }</td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn bg-red-600 text-white btn-ghost"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
