import { omit } from 'lodash';
import axiosIns from '../utils/axios';

export const getAllRouters = async () => {
  const res = await axiosIns.get('/api/Routes');
  return res.data;
};

export interface IRouter {
  name: string;
  start_time: string;
  end_time: string;
  interval: number;
  price: number;
  outbound_stops: string[];
  inbound_stops: string[];
  route_length: number;
}

export interface IUpdateRouter {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  interval: number;
  price: number;
  outbound_stops: string[];
  inbound_stops: string[];
  route_length: number;
}

export const createRouter = async (data: IRouter) => {
  const res = await axiosIns.post('/api/Routes', data);
  return res;
};

export const updateRouter = async (data: IUpdateRouter) => {
  const res = await axiosIns.put(`/api/Routes/${data.id}`, data);
  return res;
};

export const getDetailRouter = async (id: string) => {
  const res = await axiosIns.get(`/api/Routes/${id}`);
  return res.data;
};

export const deleteRouter = async (id: string) => {
  const res = await axiosIns.delete(`/api/Routes/${id}`);
  return res;
};
