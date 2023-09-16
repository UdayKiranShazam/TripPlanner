import apiInstance from '../context/Configurations';

export const fetchProfile = async () => {
  return await apiInstance
    .get('/api/users/profile')
    .then((response) => response.data)
    .catch((err) => err);
};
