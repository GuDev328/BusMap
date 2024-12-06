import { omit } from 'lodash';
import axiosIns from '../utils/axios';
import { IAccount, IUpdateAccount } from './accountServices';

export const getAllBusStop = async () => {
  const res = await axiosIns.get('/api/Stops/allstop');
  return res.data;
};

export interface IBusStop {
  name: string;
  lat: number;
  lon: number;
}

export interface IUpdateBusStop {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export const createBusStop = async (data: IBusStop[]) => {
  const res = await axiosIns.post('/api/Stops/addstops', data);
  return res;
};

export const updateBusStop = async (data: IUpdateBusStop) => {
  const res = await axiosIns.put(`/api/Stops/${data.id}`, data);
  return res;
};

export const getDetailBusStop = async (id: string) => {
  const res = await axiosIns.get(`/api/Stops/${id}`);
  return res.data;
};

export const deleteBusStop = async (id: string) => {
  const res = await axiosIns.delete(`/api/Stops/${id}`);
  return res;
};
