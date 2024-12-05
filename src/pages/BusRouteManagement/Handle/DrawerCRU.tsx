import { Drawer } from 'antd';
import React from 'react';

interface DrawerCRUProps {
  id?: string;
  isViewMode?: boolean;
  open: boolean;
  onClose: () => void;
}

const DrawerCRU = ({ open, onClose, id, isViewMode }: DrawerCRUProps) => {
  return (
    <Drawer
      width={'70%'}
      title={
        isViewMode
          ? 'Xem chi tiết tuyến đường'
          : id
            ? 'Chỉnh sửa tuyến đường'
            : 'Thêm tuyến đường'
      }
      open={open}
      onClose={onClose}
    ></Drawer>
  );
};

export default DrawerCRU;
