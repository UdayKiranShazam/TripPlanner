import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from '../../environment';

const { endpoint } = env;

const apiInstance = axios.create({
  baseURL: endpoint
});
apiInstance.interceptors.request.use(async (config) => {
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + (await AsyncStorage.getItem('token'))
  };
  return config;
});

export default apiInstance;
