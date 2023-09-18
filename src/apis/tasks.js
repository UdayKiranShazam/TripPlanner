import apiInstance from '../context/Configurations';

export const fetchTasks = async (tripid) => {
  return await apiInstance
    .get(`/api/tasks/${tripid}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchCompletedTasks = async () => {
  return await apiInstance
    .get(`/api/tasks/completed/${1}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchCreateTask = async (data) => {
  return await apiInstance
    .post(`/api/tasks/addTask`, data)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchUpdateTask = async (data) => {
  return await apiInstance
    .post(`/api/tasks/updateTask`, data)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchDeleteTask = async (data) => {
  return await apiInstance
    .post(`/api/tasks/deleteTask`, data)
    .then((response) => response.data)
    .catch((err) => err);
};
