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
          ? 'Xem chi tiết tài khoản'
          : id
            ? 'Chỉnh sửa tài khoản'
            : 'Thêm tài khoản'
      }
      open={open}
      onClose={onClose}
    ></Drawer>
  );
};

export default DrawerCRU;
