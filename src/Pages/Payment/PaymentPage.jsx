import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useParams, useLocation } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const api = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(""); 
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountInfo, setDiscountInfo] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const month = queryParams.get("month");

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    try {
      const res = await api.post("/validate-coupon", { coupon, id, month }); 

      if (res.data.success) {
        setCouponApplied(true);
        setDiscountInfo(res.data.discount);
        toast.success(res.data.message || "Coupon applied successfully!");
      } else {
        toast.error(res.data.message || "Invalid coupon.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error validating coupon.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/create-payment-intent", {
        id,
        month,
        coupon: couponApplied ? coupon : null,
      });

      const { clientSecret, message } = res.data;

      if (message) toast.success(message);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        console.error(result.error.message);
        toast.error(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success(`Payment for ${month} successful 🎉`);
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

      <div className="flex gap-2 items-center justify-center">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon (optional)"
          className="border px-3 py-2 rounded w-2/3"
          disabled={couponApplied}
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={couponApplied}
        >
          {couponApplied ? "Applied" : "Apply"}
        </button>
      </div>

      {discountInfo && (
        <p className="text-green-600 text-center">
          🎉 Discount applied: {discountInfo}% off
        </p>
      )}

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
