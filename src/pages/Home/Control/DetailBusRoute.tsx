import { LeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Timeline } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React from 'react';

const DetailBusRoute = ({ data, setSelectedRoute }: any) => {
  return (
    <>
      <Button icon={<LeftOutlined />} onClick={() => setSelectedRoute('')} />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin tuyến" key="1">
          <div>
            <ul style={{ margin: 0, padding: '0px 10px' }}>
              <li>
                <strong>Tuyến số:</strong>
              </li>
              <li>
                <strong>Tên tuyến:</strong>
              </li>
              <li>
                <strong>Giá vé:</strong>
              </li>
              <li>
                <strong>Độ dài tuyến:</strong>
              </li>
              <li>
                <strong>Thời gian chạy tuyến:</strong>
              </li>
              <li>
                <strong>Lượt đi:</strong>
              </li>
              <li>
                <strong>Lượt về:</strong>
              </li>
            </ul>
          </div>
        </TabPane>
        <TabPane tab="Trạm dừng" key="2">
          <Timeline
            items={[
              {
                children: 'Create a services site 2015-09-01',
              },
              {
                children: 'Solve initial network problems 2015-09-01',
              },
              {
                children: 'Technical testing 2015-09-01',
              },
              {
                children: 'Network problems being solved 2015-09-01',
              },
            ]}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default DetailBusRoute;
