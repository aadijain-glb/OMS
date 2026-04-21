import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import productsData from "../data/product";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const foundProduct = productsData.find(p => p.id.toString() === id.toString());
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image || "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container section text-center py-20">
        <p className="text-red-500 mb-4">{error || "Product not found."}</p>
        <button onClick={() => navigate("/collections")} className="btn">Back to Collections</button>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-[60px]">
        {/* Images */}
        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer text-left w-fit"
          >
            ← Back
          </button>

          {product.image ? (
            <>
              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-[3/4] object-cover rounded-md bg-[#f0f0f0]"
              />
              <div className="grid grid-cols-4 gap-3">
                <img
                  src={product.image}
                  alt={`${product.title}`}
                  onClick={() => setSelectedImage(0)}
                  className={`aspect-square object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity ${selectedImage === 0 ? "ring-2 ring-black" : ""}`}
                />
              </div>
            </>
          ) : (
            <div className="w-full aspect-[3/4] bg-[#f0f0f0] rounded-md flex items-center justify-center text-[#999] text-lg">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-5">
          <div className="mb-8 border-b border-border pb-6">
            <span className="text-sm text-text-secondary uppercase tracking-[0.5px] block mb-2">
              {product.categories && product.categories[0] ? product.categories[0] : "General"}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-3">{product.title}</h1>
            <p className="text-lg md:text-xl text-text-primary">${Number(product.price).toFixed(2)}</p>
          </div>

          <div className="mb-8">
            <p className="mb-4 text-sm md:text-base leading-relaxed text-text-secondary">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock !== 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
              {product.stock !== 0 ? `In Stock` : "Out of Stock"}
            </span>
          </div>

          <div className="flex gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`btn flex-1 h-[52px] text-base transition-all ${added ? "bg-green-600 border-green-600" : ""
                } ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="btn-outline h-[52px] px-6 text-sm"
            >
              View Cart
            </button>
          </div>

          <div className="text-[13px] text-text-secondary leading-relaxed border-t border-border pt-6">
            <p className="mb-1">Free standard shipping on orders over $100.</p>
            <p className="mb-0">Returns accepted within 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
