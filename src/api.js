import axios from "axios";

const baseURL = "http://13.40.5.17:8080/api/";
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllEvents = async () => {
  try {
    const response = await instance.get("getAllEvents");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await instance.post("createEvent", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await instance.put(`updateEvent/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await instance.get("getAllNotify");
    return response.data;
  } catch (error) {
    console.error("Error fetching notification:", error);
    throw error;
  }
};
export const createNotify = async (formData) => {
  try {
    const response = await instance.post("createNotify", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};
export const updateNotify = async (notifyId, formData) => {
  try {
    const response = await instance.put(`updateNotify/${notifyId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
};
