import api from "./axios";

export const getPages = async () => {
  const response = await api.get("/pages");
  return response.data;
};

export const updatePage = async (id, data) => {
  const response = await api.put(`/pages/${id}`, data);
  return response.data;
};
