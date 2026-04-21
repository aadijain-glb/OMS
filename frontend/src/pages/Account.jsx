import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from "../api";

const Account = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const message = location.state?.message;

    useEffect(() => {
        if (user) {
            api.get("/orders/user")
                .then(res => setOrders(res.data))
                .catch(err => console.error("Failed to load user orders", err));
        }
    }, [user]);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await api.post('/auth/logout');
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8 p-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Account Dashboard</h1>

                {message && (
                    <div className="p-4 mb-6 text-green-700 bg-green-50 border border-green-200 rounded-md">
                        {message}
                    </div>
                )}

                {user ? (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg list-none border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Information</h2>
                            <div className="flex flex-col space-y-3 text-gray-600">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-medium">UserId:</span>
                                    <span>{user.id}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-medium">Email:</span>
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="font-medium">Role:</span>
                                    <span className="capitalize">{user.role}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg list-none border border-gray-100 mt-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Order History</h2>
                            {orders.length === 0 ? (
                                <p className="text-gray-500 py-4">No recent orders found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order._id} className="border border-gray-200 rounded p-4 bg-white">
                                            <div className="flex justify-between border-b pb-2 mb-2 text-sm">
                                                <span className="text-gray-500">Order #{order._id.substring(order._id.length - 8)}</span>
                                                <span className="font-medium">${order.totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className={`inline-block px-2 py-1 rounded text-xs ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    Payment: {order.paymentStatus}
                                                </span>
                                                <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                    Status: {order.orderStatus}
                                                </span>
                                            </div>
                                            <div className="mt-3 text-sm text-gray-600">
                                                {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-4 mt-6 border-t pt-4 border-gray-100">
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="btn bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                                {loading ? 'Logging out...' : 'Sign Out'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-text-secondary">No user information found.</p>
                )}
            </div>
        </div>
    );
};

export default Account;
