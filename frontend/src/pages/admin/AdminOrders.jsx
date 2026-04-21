import { useState, useEffect } from "react";
import api from "../../api";
import { RefreshCw } from "lucide-react";

const ORDER_STATUSES = ["processing", "shipped", "delivered", "cancelled"];

const statusColors = {
    processing: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const paymentColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    const fetchOrders = async (p = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/orders/admin/all?page=${p}&limit=15`);
            setOrders(res.data.orders);
            setTotal(res.data.total);
            setTotalPages(res.data.totalPages);
            setPage(p);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleStatusChange = async (orderId, orderStatus) => {
        setUpdating(orderId);
        try {
            await api.put(`/orders/${orderId}/status`, { orderStatus });
            setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus } : o));
        } catch (err) {
            alert("Failed to update status");
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-500 mt-1">{total} total orders</p>
                </div>
                <button onClick={() => fetchOrders(page)} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <RefreshCw size={15} /> Refresh
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-3 text-left">Order ID</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Items</th>
                                <th className="px-6 py-3 text-left">Total</th>
                                <th className="px-6 py-3 text-left">Payment</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400">No orders found.</td></tr>
                            ) : orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-400">...{order._id.slice(-8)}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{order.user?.name || "—"}</p>
                                            <p className="text-gray-400 text-xs">{order.user?.email || ""}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{order.products?.length || 0} items</td>
                                    <td className="px-6 py-4 font-medium">${order.totalPrice?.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-600"}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.orderStatus}
                                            disabled={updating === order._id}
                                            onChange={e => handleStatusChange(order._id, e.target.value)}
                                            className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer disabled:opacity-60"
                                        >
                                            {ORDER_STATUSES.map(s => (
                                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 text-sm">
                            <span className="text-gray-500">Page {page} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button onClick={() => fetchOrders(page - 1)} disabled={page === 1} className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Prev</button>
                                <button onClick={() => fetchOrders(page + 1)} disabled={page === totalPages} className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
