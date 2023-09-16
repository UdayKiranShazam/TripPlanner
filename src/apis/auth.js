import { env } from '../../environment';
import axios from 'axios';

export const googleApi = async (data) => {
  return await axios
    .post(env.endpoint + '/api/users/google-verify', { token: data.token, user: data.info })
    .then((response) => response.data)
    .catch((err) => err);
};
