import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import AllcategorySidebar from "../components/AllcategorySidebar";
import productsData from "../data/product";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = () => {
      try {
        setLoading(true);
        const filtered = productsData.filter(p =>
          p.categories && p.categories.some(c => c.toLowerCase() === category.toLowerCase())
        );
        setProducts(filtered);
      } catch (err) {
        setError(`Failed to load products for ${category}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]); // Re-run if category URL changes

  return (
    <div className="mx-4 sm:mx-8 md:mx-12 lg:m-20 flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block w-1/4">
        <AllcategorySidebar />
      </div>
      <div className="w-full lg:w-3/4">
        <div className="mb-8 lg:mb-12">
          <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium capitalize">
            {category}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No products found in the "{category}" category.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                image={product.image || '/images/placeholder.jpg'}
                title={product.title}
                price={product.price}
                category={product.categories && product.categories[0] ? product.categories[0] : "General"}
                showAddToCart={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
