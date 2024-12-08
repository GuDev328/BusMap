import { LeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Timeline } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React from 'react';
import { formatCurrency } from '../../../utils';

const DetailBusRoute = ({
  data,
  setSelectedRoute,
  setTypeRoute,
  setLocationToFlyTo,
}: any) => {
  const handleTabChange = (key: string) => {
    setTypeRoute(Number(key)); // Cập nhật key của tab hiện tại
    console.log(`Tab hiện tại: ${key}`);
  };
  return (
    <>
      <Button icon={<LeftOutlined />} onClick={() => setSelectedRoute(null)} />
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Thông tin tuyến" key="1">
          <div>
            <ul style={{ margin: 0, padding: '0px 10px' }}>
              <li>
                <strong>Tuyến số: </strong>
                {data.index_route}
              </li>
              <li>
                <strong>Tên tuyến: </strong>
                {data.name}
              </li>
              <li>
                <strong>Giá vé: </strong>
                {formatCurrency(data.price)}
              </li>
              <li>
                <strong>Độ dài tuyến: </strong>
                {data.length} km
              </li>
              <li>
                <strong>Thời gian chạy tuyến: </strong>
                {data.start_time} - {data.end_time}
              </li>
              <li>
                <strong>Giãn cách tuyến: </strong>
                {data.interval} phút
              </li>
              <li>
                <strong>Lượt đi: </strong>
                {data.outbound_stops
                  .map((stop: any) => stop.name)
                  .join(' --> ')}
              </li>
              <li>
                <strong>Lượt về: </strong>
                {data.inbound_stops.map((stop: any) => stop.name).join(' --> ')}
              </li>
            </ul>
          </div>
        </TabPane>
        <TabPane tab="Tuyến đi" key="2">
          <Timeline
            items={data.outbound_stops.map((stop: any) => ({
              children: (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setLocationToFlyTo([stop.lat, stop.lon])}
                >
                  {stop.name}
                </div>
              ),
            }))}
          />
        </TabPane>
        <TabPane tab="Tuyến về" key="3">
          <Timeline
            items={data.inbound_stops.map((stop: any) => ({
              children: (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setLocationToFlyTo([stop.lat, stop.lon])}
                >
                  {stop.name}
                </div>
              ),
            }))}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default DetailBusRoute;
