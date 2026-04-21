import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productsData from "../data/product";

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = () => {
            try {
                // Extract unique categories from productsData
                const allCategories = productsData.reduce((acc, product) => {
                    if (product.categories) {
                        product.categories.forEach(cat => {
                            if (!acc.includes(cat)) {
                                acc.push(cat);
                            }
                        });
                    }
                    return acc;
                }, []);
                // Map to format suitable for UI
                const categoryObjects = allCategories.map((name, index) => ({
                    _id: index.toString(),
                    name: name,
                    image: `/images/${name === "bags" ? "bag1.jpg" : name === "home" ? "cofffeeset.jpg" : "tee1.jpg"}` // placeholder images based on name
                }));
                setCategories(categoryObjects);
            } catch (err) {
                setError("Failed to load categories");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="mr-20 ml-20">
            <div className="mt-20">
                <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium cursor-pointer">Explore our Categories</h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : categories.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No categories found.</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-15 mb-10">
                    {categories.map((cat) => (
                        <Link key={cat._id} to={`/categories/${cat.name.toLowerCase()}`}>
                            <ProductCard
                                image={cat.image || "/images/placeholder.jpg"}
                                title={cat.name.toUpperCase()}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;