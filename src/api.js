import axios from 'axios';

const baseURL = 'http://13.40.5.17:8080/api/';
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllEvents = async () => {
  try {
    const response = await instance.get('getAllEvents');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await instance.post('createEvent', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
    try {
      const response = await instance.put(`updateEvent/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };