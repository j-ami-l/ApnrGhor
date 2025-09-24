import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useParams, useLocation } from "react-router";
import toast from "react-hot-toast";    // ✅ import toast

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // ✅ get month from query param
  const queryParams = new URLSearchParams(location.search);
  const month = queryParams.get("month");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, month }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        console.error(result.error.message);
        toast.error(`Payment failed: ${result.error.message}`); // ❌ toast error
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Paid for month:", month);
        toast.success(`Payment for ${month} successful 🎉`);     // ✅ toast success
        navigate("/dashboard/makepayment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-center text-gray-700">
        Paying rent for: <strong>{month || "N/A"}</strong>
      </p>
      <CardElement className="p-2 w-11/12 mx-auto border rounded" />
      <button
        disabled={!stripe || loading}
        className="mt-4 ml-4 md:ml-13 bg-emerald-600 text-white px-4 py-2 rounded"
      >
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
