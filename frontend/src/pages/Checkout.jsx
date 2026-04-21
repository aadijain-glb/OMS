import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../api";

// Assuming test key for local environment
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads if there are items
    if (cart.length > 0) {
      api.post("/orders/create-payment-intent", { amount: cartTotal })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => {
          console.error(err);
          setError("Failed to initialize payment system");
        });
    }
  }, [cart, cartTotal]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      setError("Please fill out all required shipping fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Save order to database
        const orderData = {
          products: cart.map(item => ({
            product: item.id || item._id, // Handle potential inconsistent id property holding mongo record id
            name: item.name || item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image || (item.images && item.images[0]) || ""
          })),
          totalPrice: cartTotal,
          shippingAddress,
          paymentIntentId: paymentIntent.id
        };

        await api.post("/orders", orderData);
        clearCart();
        // Could navigate to a real success page
        navigate("/account", { state: { message: "Order placed successfully!" } });
      }
    } catch (err) {
      setError("Payment confirmed but failed to save order to system.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <button onClick={() => navigate("/collections")} className="btn">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="container section">
      <button type="button" onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-20">
        <div>
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <h2 className="text-lg md:text-xl mb-6 font-medium">Shipping Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="text" name="firstName" value={shippingAddress.firstName} onChange={handleChange} placeholder="First name*" required className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
            <input type="text" name="lastName" value={shippingAddress.lastName} onChange={handleChange} placeholder="Last name*" required className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
          </div>
          <div className="mb-4">
            <input type="text" name="address" value={shippingAddress.address} onChange={handleChange} placeholder="Address*" required className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
          </div>
          <div className="mb-4">
            <input type="text" name="apartment" value={shippingAddress.apartment} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <input type="text" name="city" value={shippingAddress.city} onChange={handleChange} placeholder="City*" required className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
            <input type="text" name="state" value={shippingAddress.state} onChange={handleChange} placeholder="State*" required className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
            <input type="text" name="zipCode" value={shippingAddress.zipCode} onChange={handleChange} placeholder="ZIP code*" required className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent" />
          </div>

          <h2 className="text-lg md:text-xl mb-6 mt-10 font-medium">Payment</h2>
          <div className="border border-border rounded-sm overflow-hidden mb-10">
            <div className="bg-[#f9f9f9] p-4 border-b border-border text-sm font-medium">Credit Card</div>
            <div className="p-6">
              <CardElement options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                },
              }} />
            </div>
          </div>

          <button type="submit" disabled={!stripe || !clientSecret || loading} className={`btn w-full h-[52px] text-base ${(loading || !stripe) ? "opacity-70 cursor-not-allowed" : ""}`}>
            {loading ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
          </button>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="pl-0 lg:pl-10 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0">
          <h3 className="font-medium mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id || item._id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-text-secondary">{item.quantity}x</span>
                  <span>{item.name || item.title}</span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 mt-6 flex justify-between font-medium">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </aside>
      </form>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
