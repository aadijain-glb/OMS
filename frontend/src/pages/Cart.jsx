import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const Cart = () => {
  const { cart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="container section">
      <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
      <h1 className="text-2xl md:text-3xl lg:text-[32px] font-medium mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-[60px]">

        {/* LEFT: Cart items */}
        <div className="flex flex-col gap-6">
          <div className="hidden lg:grid grid-cols-[80px_3fr_1fr_1fr] pb-4 border-b text-sm">
            <span>Image</span>
            <span>Item</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>

          {cart.map(item => (
            <div
              key={item.id}
              className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_2fr_1fr] lg:grid-cols-[80px_3fr_1fr_1fr] gap-3 items-center py-4 border-b"
            >
              <div className="w-16 h-16 bg-[#f0f0f0] rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{item.name}</span>

              <div className="flex gap-2">
                <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
              </div>

              <span className="hidden sm:block">${item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-bg-secondary p-8 rounded-md">
          <h3 className="text-lg md:text-xl mb-6">Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="grid grid-cols-[0.3fr_3fr_1fr] gap-3">
              <p className="text-sm">{item.quantity}x</p>
              <p className="text-sm">{item.name}</p>
              <p className="text-sm">${item.price * item.quantity}</p>
            </div>
          ))}

          <div className="grid grid-cols-[3fr_1fr] gap-3 mt-2 border-t pt-2">
            <p>Subtotal</p>
            <p>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
          </div>
          <button className="btn w-full mt-6">Proceed to Checkout</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
