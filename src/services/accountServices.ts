import axiosIns from '../utils/axios';

export const getAllAccount = async () => {
  const res = await axiosIns.get('/api/Account');
  return res.data;
};

export interface IAccount {
  email: string;
  username: string;
  password: string;
  role: number;
  active: boolean;
}

export interface IUpdateAccount {
  id: string;
  email: string;
  username: string;
  password: string;
  role: number;
  active: boolean;
}

export const createAccount = async (data: IAccount) => {
  const res = await axiosIns.post('/api/Account', data);
  return res;
};

export const updateAccount = async (data: IUpdateAccount) => {
  const res = await axiosIns.put(`/api/Account`, data);
  return res;
};

export const getDetailAccount = async (id: string) => {
  const res = await axiosIns.get(`/api/Account/${id}`);
  return res.data;
};

export const deleteAccount = async (id: string) => {
  const res = await axiosIns.delete(`/api/Account/${id}`);
  return res;
};
