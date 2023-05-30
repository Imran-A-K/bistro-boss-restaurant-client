import { NavLink, Outlet } from "react-router-dom"
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome } from 'react-icons/fa'
const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu bg-[#D1A054] p-4 w-80 ">
      <li><NavLink to="/dashboard/home"><FaHome></FaHome> User Home</NavLink></li>
      <li><NavLink to="/dashboard/reservations"><FaWallet /> Payment History</NavLink></li>
      <li><NavLink to="/dashboard/history"><FaCalendarAlt /> Reservations</NavLink></li>
      <li><NavLink to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li>
      <div className="divider">OR</div>
        <li><NavLink to='/'><FaHome /> Home</NavLink></li>
        <li className="text-gray-900 lg:text-white">
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li className="text-gray-900 lg:text-white">
        <NavLink to="/order/salad">Order</NavLink>
      </li>
    </ul>
  
  </div>
</div>
  )
}

export default Dashboard