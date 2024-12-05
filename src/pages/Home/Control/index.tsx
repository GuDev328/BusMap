import { Input, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useState } from 'react';
import BusRouteItem from './BusRouteItem';
import DetailBusRoute from './DetailBusRoute';

const ControlMap = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  return (
    <div>
      {!selectedRoute ? (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tra cứu tuyến xe" key="1">
            <div>
              <Input placeholder="Tìm tuyến xe" />
              <div onClick={() => setSelectedRoute('1')}>
                <BusRouteItem />
              </div>
              <div onClick={() => setSelectedRoute('1')}>
                <BusRouteItem />
              </div>
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <DetailBusRoute
          data={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      )}
    </div>
  );
};

export default ControlMap;
