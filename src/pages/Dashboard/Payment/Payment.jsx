import { loadStripe } from "@stripe/stripe-js"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import { Elements } from "@stripe/react-stripe-js"
import CheckOutForm from "./CheckOutForm"
import useCart from "../../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
// TODO : provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {

  const [ cart, refetch ] = useCart()
  const total = cart.reduce((sum, item)=> sum + item.price ,0)
  const price = parseFloat(total.toFixed(2))
  return (
    <div>
        <SectionTitle subHeading={"please process"} heading={"Payment"} />
        <h2 className="text-3xl">Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckOutForm price={price} refetch={refetch} cart={cart}></CheckOutForm>
        </Elements>
    </div>
  )
}

export default Payment