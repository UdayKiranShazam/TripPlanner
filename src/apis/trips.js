import apiInstance from '../context/Configurations';

export const fetchTrips = async (categoryid) => {
  return await apiInstance
    .get(`/api/trips/${categoryid}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchCreateTrips = async (data) => {
  return apiInstance
    .post(`/api/trips/addTrip`, data)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchUpdateTrips = async (data) => {
  return await apiInstance
    .post(`/api/trips/updateTrip`, data)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchDeleteTrip = async (data) => {
  return await apiInstance
    .post(`/api/trips/deleteTrip`, data)
    .then((response) => response.data)
    .catch((err) => err);
};
