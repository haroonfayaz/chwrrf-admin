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

export const getAllFuturePlans = async () => {
    try {
      const response = await instance.get("getAllPrograms");
      return response.data;
    } catch (error) {
      console.error("Error fetching future plans:", error);
      throw error;
    }
  };
  export const getFuturePlanById = async (id) => {
    try {
      const response = await instance.get(`getProgram/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching future plans:", error);
      throw error;
    }
  };
  
  export const createFuturePlan = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('photo', formData.photo);
  
      const response = await instance.post("createProgram", formData);
      return response.data;
    } catch (error) {
      console.error("Error creating future plan:", error);
      throw error;
    }
  };
  export const updateFuturePlan = async (id,formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('photo', formData.photo);
  
      const response = await instance.put(`updateProgram/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error("Error creating future plan:", error);
      throw error;
    }
  };
  
  export const deletePlan = async (id) => {
    try {
      const response = await instance.delete(`deleteByProgramId/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      throw error;
    }
  };
