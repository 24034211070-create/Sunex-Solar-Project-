import api from "./axios";

// ======================================================
// PAGE RESPONSE NORMALIZER
// ======================================================

const normalizePage = (page) => {
  if (!page) return null;

  return {
    ...page,

    // ==================================================
    // Prisma camelCase → Existing frontend snake_case
    // ==================================================

    page_name: page.pageName ?? page.page_name,
    section_name: page.sectionName ?? page.section_name,

    primary_button_text: page.primaryButtonText ?? page.primary_button_text,

    primary_button_link: page.primaryButtonLink ?? page.primary_button_link,

    secondary_button_text:
      page.secondaryButtonText ?? page.secondary_button_text,

    secondary_button_link:
      page.secondaryButtonLink ?? page.secondary_button_link,

    avatar_1: page.avatar1 ?? page.avatar_1,
    avatar_2: page.avatar2 ?? page.avatar_2,
    avatar_3: page.avatar3 ?? page.avatar_3,
    avatar_4: page.avatar4 ?? page.avatar_4,

    feature_1_title: page.feature1Title ?? page.feature_1_title,

    feature_1_description:
      page.feature1Description ?? page.feature_1_description,

    feature_2_title: page.feature2Title ?? page.feature_2_title,

    feature_2_description:
      page.feature2Description ?? page.feature_2_description,

    experience_number: page.experienceNumber ?? page.experience_number,

    experience_text: page.experienceText ?? page.experience_text,

    button_text: page.buttonText ?? page.button_text,

    button_link: page.buttonLink ?? page.button_link,

    created_at: page.createdAt ?? page.created_at,

    updated_at: page.updatedAt ?? page.updated_at,
  };
};

// ======================================================
// AUTH HEADER HELPER
// ======================================================

const getAuthHeaders = (token) => {
  const headers = {};

  const savedToken = token || localStorage.getItem("token");

  if (savedToken) {
    headers.Authorization = `Bearer ${savedToken}`;
  }

  return headers;
};

// ======================================================
// ADMIN LOGIN
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

export const getPages = async () => {
  const response = await api.get("/pages");

  const pages = Array.isArray(response.data?.pages)
    ? response.data.pages.map(normalizePage)
    : [];

  return pages;
};

// ======================================================
// GET SINGLE PAGE
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
  const response = await api.post("/pages", pageData, {
    headers: getAuthHeaders(token),
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
  if (!id) {
    throw new Error("Page ID is required to update a page.");
  }

  const response = await api.put(`/pages/${id}`, pageData, {
    headers: getAuthHeaders(token),
  });

  return {
    ...response.data,
    page: normalizePage(response.data?.page),
  };
};

// ======================================================
// UPSERT PAGE
// ======================================================
// Existing page → UPDATE
// Missing page  → CREATE
// ======================================================

export const upsertPage = async (id, pageData, token) => {
  const headers = getAuthHeaders(token);

  let response;

  if (id) {
    // ==================================================
    // EXISTING PAGE
    // ==================================================

    response = await api.put(`/pages/${id}`, pageData, {
      headers,
    });
  } else {
    // ==================================================
    // NEW PAGE
    // ==================================================

    response = await api.post("/pages", pageData, {
      headers,
    });
  }

  return {
    ...response.data,
    page: normalizePage(response.data?.page),
  };
};

// ======================================================
// DELETE PAGE
// ======================================================

export const deletePage = async (id, token) => {
  if (!id) {
    throw new Error("Page ID is required to delete a page.");
  }

  const response = await api.delete(`/pages/${id}`, {
    headers: getAuthHeaders(token),
  });

  return {
    ...response.data,
    page: normalizePage(response.data?.page),
  };
};
