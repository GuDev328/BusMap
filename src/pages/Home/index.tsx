import { Button, Col, Flex, Image, Row, theme, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Map from '../../components/Map/Map';
import ControlMap from './Control';
export const HomePage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isTablet = useMediaQuery({ maxWidth: 992 });

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
          <ControlMap />
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
          <Map
            width="100%"
            height="calc(100vh - 60px)"
            onChangeLocation={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
