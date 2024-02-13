import axios from "axios";

// const baseURL = "http://13.40.5.17:8080/api/";
const baseURL = "http://admin.chwrrf.org:8080/api/";







const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    'Accept': '*/*',

  },
});


export const getAllNotifications = async () => {
  try {
    const response = await instance.get("getAllNotify");
    return response.data;
  } catch (error) {
    console.error("Error fetching notification:", error);
    throw error;
  }
};
export const getById = async (id) => {
  try {
    const response = await instance.get(`get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification:", error);
    throw error;
  }
};
export const createNotify = async (formData) => {
  try {
    const response = await instance.post("create", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};
export const updateNotify = async (formData) => {
  try {
    const response = await instance.put("update", formData);
    return response.data;
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
};
export const deleteNotify = async (id) => {
  try {
    const response = await instance.delete(`deleteById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw error;
  }
};

