import { Button, Col, Flex, Image, Row, theme, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Map from '../../components/Map/Map';
import ControlMap from './Control';
import MapHome from '../../components/Map/MapHome';
import { getAllBusStop } from '../../services/busStopServices';
import { useEffect, useState } from 'react';
export const HomePage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isTablet = useMediaQuery({ maxWidth: 992 });
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [allBusStop, setAllBusStop] = useState([]);
  const [busStopShow, setBusStopShow] = useState<any>(null);
  const [routeShow, setRouteShow] = useState<any>(null);
  const [typeRoute, setTypeRoute] = useState<any>(null);
  const [locationToFlyTo, setLocationToFlyTo] = useState<any>(null);
  const fetchAllBusStop = async () => {
    const res = await getAllBusStop();
    setAllBusStop(res);
  };

  useEffect(() => {
    if (typeRoute === 3) {
      setRouteShow(
        selectedRoute?.inbound_stops.map((stop: any) => [stop.lon, stop.lat])
      );
      if (!selectedRoute) {
        setBusStopShow(allBusStop);
      } else {
        setBusStopShow(selectedRoute?.inbound_stops);
      }
    } else {
      setRouteShow(
        selectedRoute?.outbound_stops.map((stop: any) => [stop.lon, stop.lat])
      );
      if (!selectedRoute) {
        setBusStopShow(allBusStop);
      } else {
        setBusStopShow(selectedRoute?.outbound_stops);
      }
    }
  }, [selectedRoute, typeRoute]);

  useEffect(() => {
    fetchAllBusStop();
  }, []);

  return (
    <div>
      <div style={{ marginTop: '10px' }}>
        <div
          style={{
            backgroundColor: '#fff',
            width: '350px',
            height: 'calc(100vh - 60px)',
            position: 'absolute',
            padding: '15px',
            top: '60px',
            left: '00px',
            zIndex: '1000',
          }}
        >
          <ControlMap
            setLocationToFlyTo={setLocationToFlyTo}
            setTypeRoute={setTypeRoute}
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
          />
        </div>
        <div
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: 'calc(100vh - 60px)',
            position: 'absolute',
            top: '60px',
            left: '0',
            zIndex: '999',
          }}
        >
          <MapHome
            locationToFlyTo={locationToFlyTo}
            typeRoute={typeRoute}
            busStopData={busStopShow}
            router={routeShow}
            width="100%"
            height="calc(100vh - 60px)"
          />
        </div>
      </div>
    </div>
  );
};
