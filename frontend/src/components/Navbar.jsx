import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import OpenSearch from "./OpenSearch";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="h-20 border-b border-border flex items-center sticky top-0 bg-bg-primary z-50">
      <div className="container flex justify-between items-center w-full">
        <Link className="text-3xl font-extrabold tracking-[-1px] cursor-pointer" to="/">UNLUME</Link>

        <div className="hidden md:flex justify-center gap-8">
          <Link to="/" className="text-sm font-medium text-text-secondary animated-underline hover:text-text-primary transition-colors">Home</Link>
          <Link to="/categories" className="text-sm font-medium text-text-secondary animated-underline hover:text-text-primary transition-colors">Categories</Link>
          <Link to="/collections" className="text-sm font-medium text-text-secondary animated-underline hover:text-text-primary transition-colors">Shop</Link>
          <Link to="/stories" className="text-sm font-medium text-text-secondary animated-underline hover:text-text-primary transition-colors">Stories</Link>
          <Link to="/about" className="text-sm font-medium text-text-secondary animated-underline hover:text-text-primary transition-colors">About</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-medium text-purple-600 animated-underline hover:text-purple-800 transition-colors flex items-center gap-1">
              <LayoutDashboard size={14} /> Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <OpenSearch open={openSearch} onClose={() => setOpenSearch(false)} />

          {/* Auth-aware user icon */}
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center justify-center hover:text-text-secondary relative"
            title={user ? `Signed in as ${user.email}` : "Login"}
          >
            <User size={20} />
            {user && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
            )}
          </Link>

          <Link to="/cart" className="relative flex items-center justify-center hover:text-text-secondary">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
