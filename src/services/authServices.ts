import axiosIns from '../utils/axios';

export interface ILogin {
  email: string;
  password: string;
}

export const login = async (data: ILogin) => {
  const res = await axiosIns.post('/login', data);
  return res;
};
