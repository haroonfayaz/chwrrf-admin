import axios from "axios";

// const baseURL = "http://13.40.5.17:8080/api/";
const baseURL = "http://admin.chwrrf.org:8080/api/";

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",

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

export const createEvent = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('photo', formData.photo);
  
      const response = await instance.post('createEvent', formDataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

export const getEvent = async (eventId) => {
  try {
    const response = await instance.get(`getEvent/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
export const updateEvent = async (id,formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('link', formData.link);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('photo', formData.photo);

    const response = await instance.put(`updateEvent/${id}`, formDataToSend);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
export const deleteEvent = async (eventId) => {
  try {
    const response = await instance.delete(`deleteByEventId/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    throw error;
  }
};
