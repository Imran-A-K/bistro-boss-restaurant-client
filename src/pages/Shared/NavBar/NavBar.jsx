import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
    .then()
    .catch(error => console.log(error.message))

  }
  const [cart] = useCart()
  const [ isAdmin ] = useAdmin();
  const navOptions = (
    <>
      <li className="text-gray-900 lg:text-white">
        <Link to="/">Home</Link>
      </li>
      <li className="text-gray-900 lg:text-white">
        <Link to="/menu">Our Menu</Link>
      </li>
      <li className="text-gray-900 lg:text-white">
        <Link to="/order/salad">Order</Link>
      </li>
      {/* <li><Link to={ isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'} >Dashboard</Link></li> */}
      <li className="text-gray-900 lg:text-white">
        {
          isAdmin ? <Link to={'/dashboard/adminhome'} >Dashboard</Link> : 
          <Link to={'/dashboard/userhome'} >Dashboard</Link>
        }
      </li>
      <li>
        <Link to="/dashboard/mycart">
        <button className="btn gap-2">
<FaShoppingCart></FaShoppingCart>
  <div className="badge badge-secondary">+{cart?.length || 0}</div>
</button>
        </Link>
      </li>
      {
        user ? <>
        {/* <span>{user?.displayName}</span> */}
        <button onClick={handleLogOut} className="btn btn-ghost text-gray-900 lg:text-white">LogOut</button>
        </> : <>
        <li className="text-gray-900 lg:text-white">
        <Link className="text-center" to="/login">Login</Link>
      </li>
        </>
      }
    </>
  );
  return (
    <>
      <div className="max-w-screen-xl fixed z-10 bg-opacity-30 bg-black navbar text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
