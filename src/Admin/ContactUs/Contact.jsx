import React, { useEffect, useState } from "react";
import {
    Save,
    RefreshCw,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import { getPages, updatePage } from "../../Api/api";


// =====================================================
// INPUT FIELD
// IMPORTANT:
// Keep this component OUTSIDE Contact component.
// Otherwise every keystroke can remount the input
// and the cursor/focus will disappear.
// =====================================================

const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    type = "text",
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
        </div>
    );
};


// =====================================================
// TEXTAREA FIELD
// IMPORTANT:
// Keep this component OUTSIDE Contact component.
// =====================================================

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    rows = 5,
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
                {label}
            </label>

            <textarea
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
        </div>
    );
};


// =====================================================
// CONTACT ADMIN PAGE
// =====================================================

const Contact = () => {

    // =====================================================
    // PAGE
    // =====================================================

    const [page, setPage] = useState(null);


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({
        heroTitle: "",
        heroImage: "",

        contactImage: "",
        contactInfoTitle: "",

        phoneLabel: "",
        phone: "",

        emailLabel: "",
        email: "",

        locationLabel: "",
        location: "",

        getInTouchTitle: "",
        getInTouchDescription: "",

        firstNameLabel: "",
        firstNamePlaceholder: "",

        lastNameLabel: "",
        lastNamePlaceholder: "",

        phoneFieldLabel: "",
        phonePlaceholder: "",

        emailFieldLabel: "",
        emailPlaceholder: "",

        messageLabel: "",
        messagePlaceholder: "",

        submitButtonText: "",

        locationTag: "",
        locationTitle: "",
        locationDescription: "",

        mapUrl: "",
        mapButtonText: "",
        mapButtonUrl: "",
    });


    // =====================================================
    // STATES
    // =====================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =====================================================
    // LOAD CONTACT US
    // =====================================================

    useEffect(() => {
        loadContactUs();
    }, []);


    const loadContactUs = async () => {
        try {
            setLoading(true);
            setError("");
            setMessage("");

            const response = await getPages();

            console.log("Contact Us getPages response:", response);


            // =================================================
            // NORMALIZE RESPONSE
            // =================================================

            const pages = Array.isArray(response)
                ? response
                : Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response?.pages)
                        ? response.pages
                        : [];


            console.log("Contact Us pages:", pages);


            // =================================================
            // FIND CONTACT US PAGE
            // =================================================

            const contactPage = pages.find((item) => {

                const pageName = String(
                    item?.page_name ??
                    item?.pageName ??
                    ""
                )
                    .trim()
                    .toLowerCase();


                const sectionName = String(
                    item?.section_name ??
                    item?.sectionName ??
                    ""
                )
                    .trim()
                    .toLowerCase();


                return (
                    pageName === "contactus" ||
                    pageName === "contact us" ||
                    pageName === "contact" ||

                    sectionName === "contactus" ||
                    sectionName === "contact us" ||
                    sectionName === "contact"
                );
            });


            // =================================================
            // PAGE NOT FOUND
            // =================================================

            if (!contactPage) {
                console.error(
                    "Contact Us record not found.",
                    pages
                );

                setPage(null);

                setError(
                    "Contact Us page record database mein nahi mila."
                );

                return;
            }


            console.log(
                "Contact Us page found:",
                contactPage
            );


            setPage(contactPage);


            // =================================================
            // PARSE CONTENT
            // =================================================

            let content = {};

            try {

                if (typeof contactPage.content === "string") {

                    content = contactPage.content
                        ? JSON.parse(contactPage.content)
                        : {};

                } else if (
                    contactPage.content &&
                    typeof contactPage.content === "object"
                ) {

                    content = contactPage.content;

                }

            } catch (parseError) {

                console.error(
                    "Contact Us content JSON parse error:",
                    parseError
                );

                content = {};
            }


            // =================================================
            // SET FORM DATA
            // =================================================

            setFormData({

                heroTitle:
                    contactPage.title ||
                    content.heroTitle ||
                    "Contact us",

                heroImage:
                    contactPage.image ||
                    content.heroImage ||
                    "",


                // =============================================
                // CONTACT INFORMATION
                // =============================================

                contactImage:
                    content.contactImage ||
                    "",

                contactInfoTitle:
                    content.contactInfoTitle ||
                    "Contact Information",


                phoneLabel:
                    content.phoneLabel ||
                    "Phone Number",

                phone:
                    content.phone ||
                    "+1 (123) 456-789",


                emailLabel:
                    content.emailLabel ||
                    "Email Address",

                email:
                    content.email ||
                    "info@domainname.com",


                locationLabel:
                    content.locationLabel ||
                    "Our Location",

                location:
                    content.location ||
                    "2118 Thornridge Cir. Syracuse, 356",


                // =============================================
                // GET IN TOUCH
                // =============================================

                getInTouchTitle:
                    content.getInTouchTitle ||
                    "Get In Touch",

                getInTouchDescription:
                    content.getInTouchDescription ||
                    "Whether you have questions about our services, want a free consultation, or need support for your existing system, our team is ready to assist.",


                // =============================================
                // FIRST NAME
                // =============================================

                firstNameLabel:
                    content.firstNameLabel ||
                    "First Name",

                firstNamePlaceholder:
                    content.firstNamePlaceholder ||
                    "Enter First Name",


                // =============================================
                // LAST NAME
                // =============================================

                lastNameLabel:
                    content.lastNameLabel ||
                    "Last Name",

                lastNamePlaceholder:
                    content.lastNamePlaceholder ||
                    "Enter Last Name",


                // =============================================
                // PHONE FIELD
                // =============================================

                phoneFieldLabel:
                    content.phoneFieldLabel ||
                    "Phone Number",

                phonePlaceholder:
                    content.phonePlaceholder ||
                    "Enter Phone Number",


                // =============================================
                // EMAIL FIELD
                // =============================================

                emailFieldLabel:
                    content.emailFieldLabel ||
                    "Email Address",

                emailPlaceholder:
                    content.emailPlaceholder ||
                    "Enter Email Address",


                // =============================================
                // MESSAGE
                // =============================================

                messageLabel:
                    content.messageLabel ||
                    "Message",

                messagePlaceholder:
                    content.messagePlaceholder ||
                    "Any Message...",


                // =============================================
                // SUBMIT BUTTON
                // =============================================

                submitButtonText:
                    content.submitButtonText ||
                    "Submit Message",


                // =============================================
                // LOCATION
                // =============================================

                locationTag:
                    content.locationTag ||
                    "Our Location",

                locationTitle:
                    content.locationTitle ||
                    "Connecting you to clean energy",

                locationDescription:
                    content.locationDescription ||
                    "No matter where you are, our expert team is ready to provide reliable solar solutions, on-site support, and consultations to help you transition to sustainable energy with ease.",


                // =============================================
                // MAP
                // =============================================

                mapUrl:
                    content.mapUrl ||
                    "https://www.google.com/maps?q=Lisbon,Portugal&z=11&output=embed",

                mapButtonText:
                    content.mapButtonText ||
                    "Open in Maps",

                mapButtonUrl:
                    content.mapButtonUrl ||
                    "https://www.google.com/maps",
            });

        } catch (err) {

            console.error(
                "Contact Us load error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Contact Us data load nahi ho saka."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setMessage("");
        setError("");
    };


    // =====================================================
    // SAVE CONTACT US
    // =====================================================

    const handleSave = async () => {

        if (!page?.id) {

            setError(
                "Contact Us page ID nahi mila."
            );

            return;
        }


        try {

            setSaving(true);
            setMessage("");
            setError("");


            // =================================================
            // CONTENT JSON
            // =================================================

            const content = {

                contactImage:
                    formData.contactImage,

                contactInfoTitle:
                    formData.contactInfoTitle,


                phoneLabel:
                    formData.phoneLabel,

                phone:
                    formData.phone,


                emailLabel:
                    formData.emailLabel,

                email:
                    formData.email,


                locationLabel:
                    formData.locationLabel,

                location:
                    formData.location,


                getInTouchTitle:
                    formData.getInTouchTitle,

                getInTouchDescription:
                    formData.getInTouchDescription,


                firstNameLabel:
                    formData.firstNameLabel,

                firstNamePlaceholder:
                    formData.firstNamePlaceholder,


                lastNameLabel:
                    formData.lastNameLabel,

                lastNamePlaceholder:
                    formData.lastNamePlaceholder,


                phoneFieldLabel:
                    formData.phoneFieldLabel,

                phonePlaceholder:
                    formData.phonePlaceholder,


                emailFieldLabel:
                    formData.emailFieldLabel,

                emailPlaceholder:
                    formData.emailPlaceholder,


                messageLabel:
                    formData.messageLabel,

                messagePlaceholder:
                    formData.messagePlaceholder,


                submitButtonText:
                    formData.submitButtonText,


                locationTag:
                    formData.locationTag,

                locationTitle:
                    formData.locationTitle,

                locationDescription:
                    formData.locationDescription,


                mapUrl:
                    formData.mapUrl,

                mapButtonText:
                    formData.mapButtonText,

                mapButtonUrl:
                    formData.mapButtonUrl,
            };


            console.log(
                "Updating Contact Us:",
                {
                    id: page.id,
                    title: formData.heroTitle,
                    image: formData.heroImage,
                    content,
                }
            );


            // =================================================
            // UPDATE DATABASE
            // =================================================

            await updatePage(page.id, {

                title:
                    formData.heroTitle,

                image:
                    formData.heroImage,

                content,
            });


            // =================================================
            // SUCCESS
            // =================================================

            setMessage(
                "Contact Us updated successfully."
            );


            // =================================================
            // RELOAD DATA
            // =================================================

            await loadContactUs();

        } catch (err) {

            console.error(
                "Contact Us save error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Contact Us update nahi ho saka."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">

                <div className="flex items-center gap-3 text-slate-500">

                    <RefreshCw
                        size={20}
                        className="animate-spin"
                    />

                    <span>
                        Loading Contact Us...
                    </span>

                </div>

            </div>
        );
    }


    // =====================================================
    // PAGE NOT FOUND
    // =====================================================

    if (!page) {

        return (
            <div className="rounded-xl border border-red-200 bg-white p-8">

                <div className="rounded-lg bg-red-50 p-5">

                    <h2 className="text-lg font-semibold text-red-700">
                        Contact Us data not found
                    </h2>

                    <p className="mt-2 text-sm text-red-600">
                        {error ||
                            "Database mein Contact Us page record available nahi hai."}
                    </p>

                </div>


                <button
                    type="button"
                    onClick={loadContactUs}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >

                    <RefreshCw size={17} />

                    Retry

                </button>

            </div>
        );
    }


    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100">

                        <Mail
                            size={22}
                            className="text-green-600"
                        />

                    </div>


                    <div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Contact Us
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage Contact Us page content.
                        </p>

                    </div>

                </div>


                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={loadContactUs}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <RefreshCw size={17} />

                        Refresh

                    </button>


                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <Save size={17} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </div>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {message && (

                <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">

                    {message}

                </div>

            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">

                    {error}

                </div>

            )}


            {/* =================================================
                HERO SECTION
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-6">

                <div className="mb-6 border-b border-slate-100 pb-5">

                    <h2 className="text-xl font-bold text-slate-900">
                        Hero Section
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the Contact Us hero section.
                    </p>

                </div>


                <div className="grid gap-6 md:grid-cols-2">

                    <InputField
                        label="Hero Title"
                        name="heroTitle"
                        value={formData.heroTitle}
                        onChange={handleChange}
                        placeholder="Contact us"
                    />


                    <InputField
                        label="Hero Background Image URL"
                        name="heroImage"
                        value={formData.heroImage}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />

                </div>


                {formData.heroImage && (

                    <div className="mt-6">

                        <p className="mb-2 text-sm font-medium text-slate-700">
                            Hero Image Preview
                        </p>

                        <img
                            src={formData.heroImage}
                            alt="Hero preview"
                            className="h-48 w-full rounded-lg object-cover"
                        />

                    </div>

                )}

            </div>


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-6">

                <div className="mb-6 border-b border-slate-100 pb-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

                            <Phone
                                size={19}
                                className="text-green-600"
                            />

                        </div>


                        <div>

                            <h2 className="text-xl font-bold text-slate-900">
                                Contact Information
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage phone, email and location information.
                            </p>

                        </div>

                    </div>

                </div>


                <div className="space-y-6">

                    <InputField
                        label="Contact Information Title"
                        name="contactInfoTitle"
                        value={formData.contactInfoTitle}
                        onChange={handleChange}
                        placeholder="Contact Information"
                    />


                    <InputField
                        label="Contact Image URL"
                        name="contactImage"
                        value={formData.contactImage}
                        onChange={handleChange}
                        placeholder="Enter contact image URL"
                    />


                    {formData.contactImage && (

                        <div>

                            <p className="mb-2 text-sm font-medium text-slate-700">
                                Contact Image Preview
                            </p>

                            <img
                                src={formData.contactImage}
                                alt="Contact preview"
                                className="h-48 w-full rounded-lg object-cover md:w-96"
                            />

                        </div>

                    )}


                    <div className="grid gap-6 md:grid-cols-2">

                        <InputField
                            label="Phone Label"
                            name="phoneLabel"
                            value={formData.phoneLabel}
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />


                        <InputField
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (123) 456-789"
                        />


                        <InputField
                            label="Email Label"
                            name="emailLabel"
                            value={formData.emailLabel}
                            onChange={handleChange}
                            placeholder="Email Address"
                        />


                        <InputField
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="info@domainname.com"
                            type="email"
                        />


                        <InputField
                            label="Location Label"
                            name="locationLabel"
                            value={formData.locationLabel}
                            onChange={handleChange}
                            placeholder="Our Location"
                        />


                        <InputField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                        />

                    </div>

                </div>

            </div>


            {/* =================================================
                GET IN TOUCH
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-6">

                <div className="mb-6 border-b border-slate-100 pb-5">

                    <h2 className="text-xl font-bold text-slate-900">
                        Get In Touch
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the contact form heading and description.
                    </p>

                </div>


                <div className="space-y-6">

                    <InputField
                        label="Heading"
                        name="getInTouchTitle"
                        value={formData.getInTouchTitle}
                        onChange={handleChange}
                        placeholder="Get In Touch"
                    />


                    <TextAreaField
                        label="Description"
                        name="getInTouchDescription"
                        value={formData.getInTouchDescription}
                        onChange={handleChange}
                        placeholder="Enter description"
                        rows={5}
                    />

                </div>

            </div>


            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-6">

                <div className="mb-6 border-b border-slate-100 pb-5">

                    <h2 className="text-xl font-bold text-slate-900">
                        Contact Form
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage contact form labels and placeholders.
                    </p>

                </div>


                <div className="space-y-6">

                    {/* FIRST NAME */}

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">

                        <h3 className="mb-4 font-semibold text-slate-800">
                            First Name
                        </h3>


                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Label"
                                name="firstNameLabel"
                                value={formData.firstNameLabel}
                                onChange={handleChange}
                                placeholder="First Name"
                            />


                            <InputField
                                label="Placeholder"
                                name="firstNamePlaceholder"
                                value={formData.firstNamePlaceholder}
                                onChange={handleChange}
                                placeholder="Enter First Name"
                            />

                        </div>

                    </div>


                    {/* LAST NAME */}

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">

                        <h3 className="mb-4 font-semibold text-slate-800">
                            Last Name
                        </h3>


                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Label"
                                name="lastNameLabel"
                                value={formData.lastNameLabel}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />


                            <InputField
                                label="Placeholder"
                                name="lastNamePlaceholder"
                                value={formData.lastNamePlaceholder}
                                onChange={handleChange}
                                placeholder="Enter Last Name"
                            />

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">

                        <h3 className="mb-4 font-semibold text-slate-800">
                            Phone Number
                        </h3>


                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Label"
                                name="phoneFieldLabel"
                                value={formData.phoneFieldLabel}
                                onChange={handleChange}
                                placeholder="Phone Number"
                            />


                            <InputField
                                label="Placeholder"
                                name="phonePlaceholder"
                                value={formData.phonePlaceholder}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                            />

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">

                        <h3 className="mb-4 font-semibold text-slate-800">
                            Email Address
                        </h3>


                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Label"
                                name="emailFieldLabel"
                                value={formData.emailFieldLabel}
                                onChange={handleChange}
                                placeholder="Email Address"
                            />


                            <InputField
                                label="Placeholder"
                                name="emailPlaceholder"
                                value={formData.emailPlaceholder}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                            />

                        </div>

                    </div>


                    {/* MESSAGE */}

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">

                        <h3 className="mb-4 font-semibold text-slate-800">
                            Message
                        </h3>


                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Label"
                                name="messageLabel"
                                value={formData.messageLabel}
                                onChange={handleChange}
                                placeholder="Message"
                            />


                            <InputField
                                label="Placeholder"
                                name="messagePlaceholder"
                                value={formData.messagePlaceholder}
                                onChange={handleChange}
                                placeholder="Any Message..."
                            />

                        </div>

                    </div>


                    {/* SUBMIT BUTTON */}

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">

                        <h3 className="mb-4 font-semibold text-slate-800">
                            Submit Button
                        </h3>


                        <InputField
                            label="Button Text"
                            name="submitButtonText"
                            value={formData.submitButtonText}
                            onChange={handleChange}
                            placeholder="Submit Message"
                        />

                    </div>

                </div>

            </div>


            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-6">

                <div className="mb-6 border-b border-slate-100 pb-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

                            <MapPin
                                size={19}
                                className="text-green-600"
                            />

                        </div>


                        <div>

                            <h2 className="text-xl font-bold text-slate-900">
                                Location Section
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage location content and Google Maps.
                            </p>

                        </div>

                    </div>

                </div>


                <div className="space-y-6">

                    <InputField
                        label="Location Tag"
                        name="locationTag"
                        value={formData.locationTag}
                        onChange={handleChange}
                        placeholder="Our Location"
                    />


                    <InputField
                        label="Location Heading"
                        name="locationTitle"
                        value={formData.locationTitle}
                        onChange={handleChange}
                        placeholder="Connecting you to clean energy"
                    />


                    <TextAreaField
                        label="Location Description"
                        name="locationDescription"
                        value={formData.locationDescription}
                        onChange={handleChange}
                        placeholder="Enter location description"
                        rows={5}
                    />


                    <InputField
                        label="Google Maps Embed URL"
                        name="mapUrl"
                        value={formData.mapUrl}
                        onChange={handleChange}
                        placeholder="https://www.google.com/maps?q=..."
                    />


                    <div className="grid gap-6 md:grid-cols-2">

                        <InputField
                            label="Map Button Text"
                            name="mapButtonText"
                            value={formData.mapButtonText}
                            onChange={handleChange}
                            placeholder="Open in Maps"
                        />


                        <InputField
                            label="Map Button URL"
                            name="mapButtonUrl"
                            value={formData.mapButtonUrl}
                            onChange={handleChange}
                            placeholder="https://www.google.com/maps"
                        />

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM SAVE
            ================================================= */}

            <div className="flex justify-end rounded-xl border border-slate-200 bg-white p-5">

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>

        </div>
    );
};


export default Contact;