import axiosIns from '../utils/axios';

export const getAllBusStop = async () => {
  const res = await axiosIns.get('/api/busStop/get-all');
  return res.data;
};

interface IBusStop {
  name: string;
  latitude: number;
  longitude: number;
}

export const createBusStop = async (data: IBusStop[]) => {
  const res = await axiosIns.post('/api/busStop/create', data);
  return res.data;
};
