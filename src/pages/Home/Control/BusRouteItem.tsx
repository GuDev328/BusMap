import React from 'react';
import { COLOR } from '../../../App';
import { DollarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { formatCurrency } from '../../../utils';

const BusRouteItem = ({ data }: { data: any }) => {
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
          {data.index_route}
        </div>
        <div>{data.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <FieldTimeOutlined /> {data.start_time} - {data.end_time}
          </div>
          <div>
            {' '}
            <DollarOutlined /> {formatCurrency(data.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRouteItem;
