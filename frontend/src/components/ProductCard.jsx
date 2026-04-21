import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";


const ProductCard = ({ id, image, title, price, category, showAddToCart = false, onClick }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  return (
    <div className="flex flex-col gap-3 cursor-pointer group" onClick={onClick}>
      <div className="w-full aspect-[3/4] bg-[#f0f0f0] rounded-sm overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span onClick={(e) => {
          e.stopPropagation();
          navigate(`/categories/${category.toLowerCase()}`);
        }} className="text-xs text-text-secondary uppercase tracking-[0.5px] animated-underline">
          {category}
        </span>
        <h3 className="text-base font-medium text-text-primary m-0 animated-underline">
          {title}
        </h3>
        <p className="text-sm text-text-secondary m-0 animated-underline">
          {price && <span>${price}</span>}
        </p>
      </div>
      {showAddToCart && (

        <button className="mt-3 bg-black text-white py-3 text-sm cursor-pointer"
          onClick={() => addToCart({ id: id, name: title, price: price, image: image })}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;