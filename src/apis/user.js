import apiInstance from '../context/Configurations';

export const fetchProfile = async () => {
  return await apiInstance
    .get('/api/users/profile')
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchUpdateProfile = async (data) => {
  return await apiInstance
    .post('/api/users/update-profile', data)
    .then((response) => response.data)
    .catch((err) => err);
};
