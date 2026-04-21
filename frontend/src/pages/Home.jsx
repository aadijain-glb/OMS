import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import useReveal from "../hooks/useReveal";
import { Link } from "react-router-dom";
import api from "../api";
import productsData from "../data/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useReveal([products]);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setProducts(productsData.slice(0, 4));
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[400px] lg:h-[600px] bg-[#f4f4f4] flex items-center mb-10 py-10 lg:py-0">
        <div className="container h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
          <div className="max-w-full lg:max-w-[600px] text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] md:leading-[1.2] mb-4 md:mb-6 tracking-[-1px]">Unform<br className="hidden lg:block" /> raw, honest, no noise<br className="hidden lg:block" /> For Modern Living</h1>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-text-secondary">Discover our curated collection of premium goods designed to elevate your everyday.</p>
            <Link to="/collections" className="btn">Shop Now</Link>
          </div>

          <img
            src="/images/making.jpg"
            alt="Hero"
            className="h-[280px] md:h-[380px] lg:h-[480px] w-full lg:w-auto object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-xl md:text-2xl font-medium">New Arrivals</h2>
          <Link to="/collections" className="text-sm underline">View All</Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 reveal">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                image={product.image || '/images/placeholder.jpg'}
                title={product.title}
                price={product.price}
                category={product.categories && product.categories[0] ? product.categories[0] : "General"}
              />
            ))}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="bg-bg-secondary py-[100px] mt-20 text-center">
        <div className="container max-w-[600px] flex flex-col items-center">
          <h2 className="text-2xl md:text-[32px] mb-4">Sustainable by Design</h2>
          <p className="mb-8">We believe in quality over quantity. Our products are crafted with care and built to last.</p>
          <Link to="/stories" className="btn-outline">Read Our Story</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
