import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";
import {
    LayoutDashboard, Package, ShoppingBag, Users, LogOut, Home
} from "lucide-react";

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await api.post("/auth/logout");
        logout();
        navigate("/login");
    };

    const navLinks = [
        { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/products", label: "Products", icon: Package },
        { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
        { to: "/admin/users", label: "Users", icon: Users },
    ];

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen sticky top-0 h-screen">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold tracking-tight">UNLUME Admin</h1>
                    <p className="text-gray-400 text-xs mt-1">Management Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-white text-gray-900"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700 space-y-1">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <Home size={18} /> Back to Store
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 transition-colors"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
