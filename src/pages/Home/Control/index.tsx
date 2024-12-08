import { Input, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useCallback, useEffect, useState } from 'react';
import BusRouteItem from './BusRouteItem';
import DetailBusRoute from './DetailBusRoute';
import { searchRouter } from '../../../services/routersServices';
import { debounce } from 'lodash';

const ControlMap = ({
  selectedRoute,
  setSelectedRoute,
  setTypeRoute,
  setLocationToFlyTo,
}: any) => {
  const [listRoute, setListRoute] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const res = await searchRouter(value);
      setListRoute(res);
    }, 1000),
    []
  );
  useEffect(() => {
    debouncedSearch(searchValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  return (
    <div>
      {!selectedRoute ? (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tra cứu tuyến xe" key="1">
            <div>
              <Input
                placeholder="Tìm tuyến xe"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {listRoute?.map((item) => (
                <div onClick={() => setSelectedRoute(item)}>
                  <BusRouteItem data={item} />
                </div>
              ))}
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <DetailBusRoute
          setTypeRoute={setTypeRoute}
          data={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          setLocationToFlyTo={setLocationToFlyTo}
        />
      )}
    </div>
  );
};

export default ControlMap;
