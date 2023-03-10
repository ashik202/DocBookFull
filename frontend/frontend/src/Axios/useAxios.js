/* eslint-disable no-debugger */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import {userdata} from '../redux/reducer/UserSlice';

const baseURL = 'http://127.0.0.1:8000/api/';

const useAxios = () => {
  const authTokens = useSelector((state) => state.user.token.access);
  const authRefresh = useSelector((state) => state.user.token.refresh);
  console.log('access token', authTokens);
  console.log('refresh token', authRefresh);
  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired);
    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: authRefresh,
    });
    console.log('access and refresh token in axios', response.data);
    const token = { token: response.data };
    dispatch(userdata(token));
    console.log(req.headers);
    console.log(response.data, 'hai');
    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;