import api from "./axios";

// ======================================================
// NORMALIZE PAGE
// Prisma camelCase -> Existing frontend snake_case
// ======================================================

const normalizePage = (page) => {
  if (!page) return null;

  return {
    ...page,

    // Main fields
    page_name: page.pageName ?? page.page_name ?? "",

    section_name: page.sectionName ?? page.section_name ?? "",

    // Buttons
    primary_button_text:
      page.primaryButtonText ?? page.primary_button_text ?? "",

    primary_button_link:
      page.primaryButtonLink ?? page.primary_button_link ?? "",

    secondary_button_text:
      page.secondaryButtonText ?? page.secondary_button_text ?? "",

    secondary_button_link:
      page.secondaryButtonLink ?? page.secondary_button_link ?? "",

    // Avatars
    avatar_1: page.avatar1 ?? page.avatar_1 ?? "",

    avatar_2: page.avatar2 ?? page.avatar_2 ?? "",

    avatar_3: page.avatar3 ?? page.avatar_3 ?? "",

    avatar_4: page.avatar4 ?? page.avatar_4 ?? "",

    // Features
    feature_1_title: page.feature1Title ?? page.feature_1_title ?? "",

    feature_1_description:
      page.feature1Description ?? page.feature_1_description ?? "",

    feature_2_title: page.feature2Title ?? page.feature_2_title ?? "",

    feature_2_description:
      page.feature2Description ?? page.feature_2_description ?? "",

    // Experience
    experience_number: page.experienceNumber ?? page.experience_number ?? "",

    experience_text: page.experienceText ?? page.experience_text ?? "",

    // Generic button
    button_text: page.buttonText ?? page.button_text ?? "",

    button_link: page.buttonLink ?? page.button_link ?? "",

    // Dates
    created_at: page.createdAt ?? page.created_at,

    updated_at: page.updatedAt ?? page.updated_at,
  };
};

// ======================================================
// NORMALIZE PAGES ARRAY
// ======================================================

const normalizePages = (pages) => {
  if (!Array.isArray(pages)) {
    return [];
  }

  return pages.map(normalizePage).filter(Boolean);
};

// ======================================================
// LOGIN ADMIN
// ======================================================

export const loginAdmin = async (email, password) => {
  const response = await api.post("/login", {
    email,
    password,
  });

  return response.data;
};

// ======================================================
// GET ALL PAGES
// ======================================================
//
// IMPORTANT:
//
// Kuch old Admin files:
//     data.success
//     data.pages
//
// Kuch new files:
//     const pages = await getPages()
//     pages.find(...)
//
// Isliye hum ARRAY return karenge,
// lekin array ke andar:
//     pages.success
//     pages.message
//     pages.pages
//
// bhi available honge.
// ======================================================

export const getPages = async () => {
  const response = await api.get("/pages");

  let rawPages = [];

  // ----------------------------------------------
  // Backend direct array response
  // ----------------------------------------------

  if (Array.isArray(response.data)) {
    rawPages = response.data;
  }

  // ----------------------------------------------
  // Backend { pages: [...] } response
  // ----------------------------------------------
  else if (Array.isArray(response.data?.pages)) {
    rawPages = response.data.pages;
  }

  const pages = normalizePages(rawPages);

  // ----------------------------------------------
  // Backward compatibility
  // ----------------------------------------------

  pages.success = response.data?.success ?? true;

  pages.message = response.data?.message ?? "";

  // Old components:
  // data.pages

  pages.pages = pages;

  return pages;
};

// ======================================================
// GET PAGE BY ID
// ======================================================

export const getPageById = async (id) => {
  const response = await api.get(`/pages/${id}`);

  return {
    ...response.data,

    page: normalizePage(response.data?.page),
  };
};

// ======================================================
// CREATE PAGE
// ======================================================

export const createPage = async (pageData, token) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await api.post("/pages", pageData, {
    headers,
  });

  return {
    ...response.data,

    page: normalizePage(response.data?.page),
  };
};

// ======================================================
// UPDATE PAGE
// ======================================================

export const updatePage = async (id, pageData, token) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await api.put(`/pages/${id}`, pageData, {
    headers,
  });

  return {
    ...response.data,

    page: normalizePage(response.data?.page),
  };
};

// ======================================================
// UPSERT PAGE
// ======================================================
//
// Agar page already database me hai:
//     UPDATE
//
// Agar page database me nahi hai:
//     CREATE
//
// Matching:
//     page_name
//     section_name
//
// ======================================================

export const upsertPage = async (pageData, token) => {
  try {
    const pages = await getPages();

    const targetPageName = String(
      pageData?.page_name ?? pageData?.pageName ?? "",
    )
      .trim()
      .toLowerCase();

    const targetSectionName = String(
      pageData?.section_name ?? pageData?.sectionName ?? "",
    )
      .trim()
      .toLowerCase();

    const existingPage = pages.find((page) => {
      const currentPageName = String(page?.page_name ?? page?.pageName ?? "")
        .trim()
        .toLowerCase();

      const currentSectionName = String(
        page?.section_name ?? page?.sectionName ?? "",
      )
        .trim()
        .toLowerCase();

      return (
        currentPageName === targetPageName &&
        currentSectionName === targetSectionName
      );
    });

    // ------------------------------------------
    // Existing page -> UPDATE
    // ------------------------------------------

    if (existingPage?.id) {
      return await updatePage(existingPage.id, pageData, token);
    }

    // ------------------------------------------
    // Page not found -> CREATE
    // ------------------------------------------

    return await createPage(pageData, token);
  } catch (error) {
    console.error("UPSERT PAGE ERROR:", error);

    throw error;
  }
};

// ======================================================
// DELETE PAGE
// ======================================================

export const deletePage = async (id, token) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await api.delete(`/pages/${id}`, {
    headers,
  });

  return {
    ...response.data,

    page: normalizePage(response.data?.page),
  };
};

// ======================================================
// DEFAULT EXPORT
// ======================================================
//
// Optional:
// Agar future me kisi file me
//
// import apiFunctions from "../../Api/api";
//
// use karna ho to bhi available rahega.
// ======================================================

export default {
  loginAdmin,
  getPages,
  getPageById,
  createPage,
  updatePage,
  upsertPage,
  deletePage,
};
