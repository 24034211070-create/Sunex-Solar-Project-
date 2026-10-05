import React, { useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Users as UsersIcon,
} from "lucide-react";

const initialUsers = [
    {
        id: 1,
        name: "Rahul Patel",
        email: "rahul@example.com",
        role: "Admin",
        status: "Active",
        joined: "Sep 18, 2026",
    },
    {
        id: 2,
        name: "Amit Shah",
        email: "amit@example.com",
        role: "Manager",
        status: "Active",
        joined: "Sep 15, 2026",
    },
    {
        id: 3,
        name: "Priya Mehta",
        email: "priya@example.com",
        role: "Editor",
        status: "Active",
        joined: "Sep 12, 2026",
    },
    {
        id: 4,
        name: "Karan Joshi",
        email: "karan@example.com",
        role: "Viewer",
        status: "Inactive",
        joined: "Sep 08, 2026",
    },
];

const Users = () => {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "Active",
    });

    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText) ||
            user.role.toLowerCase().includes(searchText)
        );
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const openAddForm = () => {
        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
            role: "",
            status: "Active",
        });

        setShowForm(true);
    };

    const openEditForm = (user) => {
        setEditingUser(user);

        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        });

        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.role
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (editingUser) {
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === editingUser.id
                        ? {
                            ...user,
                            name: formData.name,
                            email: formData.email,
                            role: formData.role,
                            status: formData.status,
                        }
                        : user
                )
            );
        } else {
            const newUser = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status,
                joined: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            setUsers((prev) => [newUser, ...prev]);
        }

        setShowForm(false);
        setEditingUser(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const getRoleClass = (role) => {
        if (role === "Admin") {
            return "bg-purple-100 text-purple-700";
        }

        if (role === "Manager") {
            return "bg-blue-100 text-blue-700";
        }

        if (role === "Editor") {
            return "bg-amber-100 text-amber-700";
        }

        return "bg-slate-100 text-slate-600";
    };

    return (
        <div className="space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Users
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage admin panel users from here.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddForm}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            {/* SEARCH */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="relative max-w-md">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>
            </div>

            {/* USERS TABLE */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    User
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Joined
                                </th>

                                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                    >
                                        {/* USER */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 font-bold text-green-600">
                                                    {user.name
                                                        .split(" ")
                                                        .map((word) =>
                                                            word[0]
                                                        )
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* ROLE */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleClass(
                                                    user.role
                                                )}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* JOINED */}
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {user.joined}
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditForm(user)
                                                    }
                                                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-600"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-5 py-12 text-center"
                                    >
                                        <UsersIcon
                                            size={35}
                                            className="mx-auto text-slate-300"
                                        />

                                        <p className="mt-3 font-semibold text-slate-700">
                                            No users found
                                        </p>

                                        <p className="mt-1 text-sm text-slate-400">
                                            Try searching with another name.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ADD / EDIT FORM */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

                        {/* FORM HEADER */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {editingUser
                                        ? "Edit User"
                                        : "Add User"}
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Enter user information below.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-5"
                        >
                            {/* NAME */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* ROLE */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Role
                                </label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                >
                                    <option value="">
                                        Select role
                                    </option>

                                    <option value="Admin">
                                        Admin
                                    </option>

                                    <option value="Manager">
                                        Manager
                                    </option>

                                    <option value="Editor">
                                        Editor
                                    </option>

                                    <option value="Viewer">
                                        Viewer
                                    </option>
                                </select>
                            </div>

                            {/* STATUS */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>
                                </select>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                                >
                                    {editingUser
                                        ? "Update User"
                                        : "Add User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;