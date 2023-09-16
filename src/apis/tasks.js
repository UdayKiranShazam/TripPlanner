import apiInstance from '../context/Configurations';

export const fetchTasks = async (tripid) => {
  return await apiInstance
    .get(`/api/trips/tasks/${tripid}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchCreateTrips = async (data) => {
  return await apiInstance
    .post(`/api/trips/addTask`, data)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchDeleteTrip = async (data) => {
  return await apiInstance
    .post(`/api/trips/deleteTask`, data)
    .then((response) => response.data)
    .catch((err) => err);
};
