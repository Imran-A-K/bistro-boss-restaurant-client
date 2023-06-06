import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './CheckOutForm.css'
const CheckOutForm = ({price, cart}) => {
  

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [ cardError, setCardError ] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    useEffect(()=>{
      // console.log(price)
     if(price > 0){
      axiosSecure.post('/create-payment-intent', {price})
      .then(response =>{
        // console.log(response.data.clientSecret)
        setClientSecret(response.data.clientSecret)
    })
     }
    },[price,axiosSecure])
    const handleSubmit = async(event) =>{
        event.preventDefault();
        setProcessing(true)
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }
        // console.log('card', card)

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            // console.log('error -', error)
            setCardError(error.message)
            setProcessing(false)

        }
        else{
            setCardError('')
            // console.log('payment method',paymentMethod)
            
        }
       
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || 'unknown',
                name: user?.displayName || 'anonymous',
              },
            },
          },
        );
        if(confirmError){
          console.log(confirmError)
        }
        // console.log('payment intent',paymentIntent)
        setProcessing(false)
        if(paymentIntent.status === 'succeeded'){
          setTransactionId(paymentIntent.id)
          // TODO next steps
          // save payment information to the server
          const payment = {email: user?.email,
                           transactionId: paymentIntent.id,
                           date: new Date(),
                           price,
                           quantity: cart.length,
                           cartItems: cart.map(item => item._id),
                           menuItems: cart.map(item => item.menuItemId),
                           itemNames: cart.map(item => item.name),
                           status : "service pending"
                           }
        axiosSecure.post('/payments', payment)
        .then(response => {
          console.log(response.data)
          if(response.data.insertResult.insertedId){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your payment has been processed',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        }
    } 
  return (
    <>
    <form className="w-2/3 m-8" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn mt-4 btn-primary btn-sm" type="submit"
       disabled={!stripe ||!clientSecret ||processing}>
        Pay
      </button>
    </form>
    { cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    {transactionId && <p className="text-green-500 ml-8">Payment Successful! Transaction Id: {transactionId}</p>}
    </>
  )
}

export default CheckOutForm