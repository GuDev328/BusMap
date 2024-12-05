import React from 'react';
import { COLOR } from '../../../App';
import { DollarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Image } from 'antd';

const BusRouteItem = () => {
  return (
    <div
      style={{
        display: 'flex',
        padding: '10px',
        margin: '5px 0px',
        alignItems: 'center',
        cursor: 'pointer',
        gap: 10,
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
      }}
    >
      <div>
        <Image src="/bus.svg" alt="logo" width={30} height={30} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', color: COLOR[500] }}>
          Tuyến số Metro 2A
        </div>
        <div>Cát Linh - Hà Đông</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <FieldTimeOutlined /> 05:00 - 23:00
          </div>
          <div>
            {' '}
            <DollarOutlined /> 24,000 VNĐ
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRouteItem;
