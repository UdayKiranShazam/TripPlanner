import apiInstance from '../context/Configurations';

export const fetchTrips = async (categoryid) => {
  return await apiInstance
    .get(`/api/trips/${categoryid}`)
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
