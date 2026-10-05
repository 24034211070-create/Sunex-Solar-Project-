import React, { useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    FolderKanban,
    Upload,
} from "lucide-react";

const initialProjects = [
    {
        id: 1,
        name: "Solar Farm Gujarat",
        client: "Green Energy Ltd.",
        category: "Commercial",
        location: "Gujarat",
        status: "Completed",
        image: "",
    },
    {
        id: 2,
        name: "Residential Solar",
        client: "Patel Residence",
        category: "Residential",
        location: "Ahmedabad",
        status: "Active",
        image: "",
    },
    {
        id: 3,
        name: "Rooftop Solar System",
        client: "Sunshine Homes",
        category: "Rooftop",
        location: "Vadodara",
        status: "Pending",
        image: "",
    },
    {
        id: 4,
        name: "Commercial Solar Plant",
        client: "Eco Power Ltd.",
        category: "Commercial",
        location: "Surat",
        status: "Completed",
        image: "",
    },
];

const Projects = () => {
    const [projects, setProjects] = useState(initialProjects);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        client: "",
        category: "",
        location: "",
        status: "Active",
        image: "",
    });

    const filteredProjects = projects.filter((project) => {
        const searchText = search.toLowerCase();

        return (
            project.name.toLowerCase().includes(searchText) ||
            project.client.toLowerCase().includes(searchText) ||
            project.category.toLowerCase().includes(searchText) ||
            project.location.toLowerCase().includes(searchText)
        );
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setFormData((prev) => ({
            ...prev,
            image: imageUrl,
        }));
    };

    const openAddForm = () => {
        setEditingProject(null);

        setFormData({
            name: "",
            client: "",
            category: "",
            location: "",
            status: "Active",
            image: "",
        });

        setShowForm(true);
    };

    const openEditForm = (project) => {
        setEditingProject(project);

        setFormData({
            name: project.name,
            client: project.client,
            category: project.category,
            location: project.location,
            status: project.status,
            image: project.image,
        });

        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.client ||
            !formData.category ||
            !formData.location
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (editingProject) {
            setProjects((prev) =>
                prev.map((project) =>
                    project.id === editingProject.id
                        ? {
                            ...project,
                            name: formData.name,
                            client: formData.client,
                            category: formData.category,
                            location: formData.location,
                            status: formData.status,
                            image: formData.image,
                        }
                        : project
                )
            );
        } else {
            const newProject = {
                id: Date.now(),
                name: formData.name,
                client: formData.client,
                category: formData.category,
                location: formData.location,
                status: formData.status,
                image: formData.image,
            };

            setProjects((prev) => [newProject, ...prev]);
        }

        setShowForm(false);
        setEditingProject(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        setProjects((prev) =>
            prev.filter((project) => project.id !== id)
        );
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingProject(null);
    };

    const getStatusClass = (status) => {
        if (status === "Completed") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Active") {
            return "bg-blue-100 text-blue-700";
        }

        return "bg-amber-100 text-amber-700";
    };

    return (
        <div className="space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Projects
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your solar projects from here.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddForm}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    <Plus size={18} />
                    Add Project
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
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>
            </div>

            {/* PROJECTS TABLE */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Project
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Client
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Location
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                    >
                                        {/* PROJECT */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-green-50 text-green-600">
                                                    {project.image ? (
                                                        <img
                                                            src={project.image}
                                                            alt={project.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <FolderKanban size={21} />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {project.name}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        ID: #{project.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* CLIENT */}
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {project.client}
                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {project.category}
                                        </td>

                                        {/* LOCATION */}
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {project.location}
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                    project.status
                                                )}`}
                                            >
                                                {project.status}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditForm(project)
                                                    }
                                                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-600"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(project.id)
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
                                        colSpan="6"
                                        className="px-5 py-12 text-center"
                                    >
                                        <FolderKanban
                                            size={35}
                                            className="mx-auto text-slate-300"
                                        />

                                        <p className="mt-3 font-semibold text-slate-700">
                                            No projects found
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
                                    {editingProject
                                        ? "Edit Project"
                                        : "Add Project"}
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Enter project information below.
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
                            {/* PROJECT NAME */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Project Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter project name"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* CLIENT */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Client Name
                                </label>

                                <input
                                    type="text"
                                    name="client"
                                    value={formData.client}
                                    onChange={handleChange}
                                    placeholder="Enter client name"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* CATEGORY */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Residential">
                                        Residential
                                    </option>

                                    <option value="Commercial">
                                        Commercial
                                    </option>

                                    <option value="Industrial">
                                        Industrial
                                    </option>

                                    <option value="Rooftop">
                                        Rooftop
                                    </option>

                                    <option value="Hybrid">
                                        Hybrid
                                    </option>

                                    <option value="Educational">
                                        Educational
                                    </option>
                                </select>
                            </div>

                            {/* LOCATION */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter project location"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
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

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>
                                </select>
                            </div>

                            {/* IMAGE */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Project Image
                                </label>

                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-6 transition hover:border-green-400 hover:bg-green-50/30">
                                    <Upload
                                        size={24}
                                        className="text-slate-400"
                                    />

                                    <span className="mt-2 text-sm font-medium text-slate-600">
                                        Click to upload image
                                    </span>

                                    <span className="mt-1 text-xs text-slate-400">
                                        PNG, JPG or WEBP
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>

                                {formData.image && (
                                    <div className="mt-3">
                                        <img
                                            src={formData.image}
                                            alt="Project Preview"
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                    </div>
                                )}
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
                                    {editingProject
                                        ? "Update Project"
                                        : "Add Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;