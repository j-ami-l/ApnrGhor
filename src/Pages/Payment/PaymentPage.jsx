import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const {id }= useParams()
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Call backend to create payment intent
    const res = await fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      console.error(result.error.message);
      alert("Payment failed!");
    } else if (result.paymentIntent.status === "succeeded") {
      console.log(result);
      navigate('/dashboard/makepayment')
      alert("Payment successful 🎉");
    }

    setLoading(false);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <CardElement className="p-2 w-11/12 mx-auto border rounded" />
      <button disabled={!stripe || loading} className="mt-4 ml-13 bg-emerald-600 text-white px-4 py-2 rounded">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
