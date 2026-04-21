import { useState, useEffect } from "react";
import api from "../../api";
import { Shield, ShieldOff, RefreshCw, Crown } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchUsers = async (p = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/users/all?page=${p}&limit=15`);
            setUsers(res.data.users);
            setTotal(res.data.totalUsers);
            setTotalPages(res.data.totalPages);
            setPage(p);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleBlock = async (userId, isBlocked) => {
        setActionLoading(userId);
        try {
            const url = isBlocked ? `/users/${userId}/unblock` : `/users/${userId}/block`;
            await api.put(url);
            setUsers(users.map(u => u._id === userId ? { ...u, isBlocked: !isBlocked } : u));
        } catch (err) {
            alert("Action failed");
        } finally {
            setActionLoading(null);
        }
    };

    const handleRoleToggle = async (userId, currentRole) => {
        const newRole = currentRole === "admin" ? "user" : "admin";
        if (!window.confirm(`Change this user's role to ${newRole}?`)) return;
        setActionLoading(userId);
        try {
            await api.put(`/users/${userId}/role`, { role: newRole });
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            alert(err.response?.data?.msg || "Role change failed");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-500 mt-1">{total} registered users</p>
                </div>
                <button onClick={() => fetchUsers(page)} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
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
                                <th className="px-6 py-3 text-left">User</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Joined</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No users found.</td></tr>
                            ) : users.map((u) => (
                                <tr key={u._id} className={`hover:bg-gray-50 ${u.isBlocked ? "opacity-60" : ""}`}>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{u.name || "—"}</p>
                                            <p className="text-gray-400 text-xs">{u.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-600"}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                            {u.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleBlock(u._id, u.isBlocked)}
                                                disabled={actionLoading === u._id}
                                                title={u.isBlocked ? "Unblock user" : "Block user"}
                                                className={`p-1.5 rounded transition-colors disabled:opacity-50 ${u.isBlocked
                                                        ? "text-green-600 hover:bg-green-50"
                                                        : "text-red-500 hover:bg-red-50"
                                                    }`}
                                            >
                                                {u.isBlocked ? <ShieldOff size={16} /> : <Shield size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleRoleToggle(u._id, u.role)}
                                                disabled={actionLoading === u._id}
                                                title={u.role === "admin" ? "Remove admin" : "Make admin"}
                                                className="p-1.5 rounded text-purple-500 hover:bg-purple-50 transition-colors disabled:opacity-50"
                                            >
                                                <Crown size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 text-sm">
                            <span className="text-gray-500">Page {page} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button onClick={() => fetchUsers(page - 1)} disabled={page === 1} className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Prev</button>
                                <button onClick={() => fetchUsers(page + 1)} disabled={page === totalPages} className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
