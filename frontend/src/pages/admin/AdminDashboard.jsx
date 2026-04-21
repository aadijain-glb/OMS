import { useState, useEffect } from "react";
import api from "../../api";
import { Package, ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react";

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            <Icon size={22} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsRes, ordersRes, usersRes] = await Promise.all([
                    api.get("/products"),
                    api.get("/orders/admin/all?limit=5"),
                    api.get("/users/all"),
                ]);

                const orders = ordersRes.data.orders || [];
                const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

                setStats({
                    products: productsRes.data.length || 0,
                    orders: ordersRes.data.total || 0,
                    users: usersRes.data.totalUsers || 0,
                    revenue,
                });
                setRecentOrders(orders.slice(0, 5));
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statusColors = {
        processing: "bg-yellow-100 text-yellow-800",
        shipped: "bg-blue-100 text-blue-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                        <StatCard label="Total Products" value={stats.products} icon={Package} color="bg-purple-500" />
                        <StatCard label="Total Orders" value={stats.orders} icon={ShoppingBag} color="bg-blue-500" />
                        <StatCard label="Total Users" value={stats.users} icon={Users} color="bg-green-500" />
                        <StatCard label="Total Revenue" value={`$${stats.revenue.toFixed(2)}`} icon={DollarSign} color="bg-orange-500" />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                            <TrendingUp size={18} className="text-gray-500" />
                            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                        </div>
                        {recentOrders.length === 0 ? (
                            <p className="p-6 text-gray-400">No orders yet.</p>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Order ID</th>
                                        <th className="px-6 py-3 text-left">Customer</th>
                                        <th className="px-6 py-3 text-left">Total</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-400">...{order._id.slice(-8)}</td>
                                            <td className="px-6 py-4">{order.user?.email || "—"}</td>
                                            <td className="px-6 py-4 font-medium">${order.totalPrice?.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
