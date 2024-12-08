import { omit } from 'lodash';
import axiosIns from '../utils/axios';

export const getAllNotification = async () => {
  const res = await axiosIns.get('/api/Notification');
  return res.data;
};

export interface INotification {
  title: string;
  description: string;
  expire_at: string;
}

export interface IUpdateNotification {
  id: string;
  title: string;
  description: string;
  expire_at: string;
}

export const createNotification = async (data: INotification) => {
  const res = await axiosIns.post('/api/Notification', data);
  return res;
};

export const updateNotification = async (data: IUpdateNotification) => {
  const res = await axiosIns.put(`/api/Notification/${data.id}`, data);
  return res;
};

export const getDetailNotification = async (id: string) => {
  const res = await axiosIns.get(`/api/Notification/${id}`);
  return res.data;
};

export const deleteNotification = async (id: string) => {
  const res = await axiosIns.delete(`/api/Notification/${id}`);
  return res;
};
