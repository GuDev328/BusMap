// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash'; // Import debounce từ lodash

const MapRoute = ({
  width,
  height,
  busStopData,
  routerGo,
  routerReturn,
  form,
}) => {
  const [routeData, setRouteData] = useState(null);
  const [routeDataReturn, setRouteDataReturn] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const highlightIcon = new L.Icon({
    iconUrl: '/iconMaker.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/iconMaker.png',
    shadowSize: [41, 41],
  });

  const getRoute = async () => {
    if (!routerGo || routerGo.length < 2) {
      setRouteData(null);
      return;
    }
    const apiKey = '5b3ce3597851110001cf624863b79283a8824f1db53c7683e99e4ea3'; // API key của bạn
    const url =
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    const coordinates = routerGo;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates }),
      });

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const routeGeometry = data.features[0].geometry;
        console.log(data.features[0].properties.summary.distance);
        form.setFieldValue(
          'route_length',
          data.features[0].properties.summary.distance / 1000
        );
        setRouteData(routeGeometry); // Lưu geometry vào state để vẽ trên bản đồ
        setError(null); // Reset lỗi nếu có đường đi
      } else {
        setError('Không thể tìm thấy đường đi');
        console.error('Không có dữ liệu đường đi');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra khi gọi API');
      console.error('Lỗi khi gọi API:', err);
    }
  };

  const getRouteReturn = async () => {
    if (!routerReturn || routerReturn.length < 2) {
      setRouteDataReturn(null);
      return;
    } // Chỉ khi có đủ tọa độ mới gọi API
    const apiKey = '5b3ce3597851110001cf624863b79283a8824f1db53c7683e99e4ea3'; // API key của bạn
    const url =
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    const coordinates = routerReturn; // Tọa độ từ hai ô nhập

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates }),
      });

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const routeGeometry = data.features[0].geometry;
        setRouteDataReturn(routeGeometry); // Lưu geometry vào state để vẽ trên bản đồ
        setError(null); // Reset lỗi nếu có đường đi
      } else {
        setError('Không thể tìm thấy đường đi');
        console.error('Không có dữ liệu đường đi');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra khi gọi API');
      console.error('Lỗi khi gọi API:', err);
    }
  };

  useEffect(() => {
    setRouteData(null);
    getRoute();
  }, [routerGo]);

  useEffect(() => {
    setRouteDataReturn(null);
    getRouteReturn();
  }, [routerReturn]);

  return (
    <div>
      <MapContainer
        //dragging={false}
        center={[21.03319717846489, 105.82700729370119]} // Vị trí trung tâm Nhổn
        zoom={13}
        style={{ width: width, height: height }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {routeData && <GeoJSON data={routeData} style={{ color: 'red' }} />}
        {routeDataReturn && (
          <GeoJSON data={routeDataReturn} style={{ color: 'blue' }} />
        )}
        {busStopData?.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lon]}
            icon={highlightIcon}
          >
            <Popup>Điểm :{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapRoute;
