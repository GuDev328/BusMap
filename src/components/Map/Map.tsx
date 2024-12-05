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

const Map = ({ width, height, onChangeLocation }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [locationsTo, setLocationsTo] = useState(null); // Lưu trữ các địa điểm tìm được
  const [locationsFrom, setLocationsFrom] = useState(null); // Lưu trữ các địa điểm tìm được
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [midLocation, setMidLocation] = useState(null); // Lưu trữ các địa điểm tìm được
  const [locationsMid, setLocationsMid] = useState(null); // Lưu trữ các địa điểm tìm được
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Không thể lấy vị trí hiện tại của bạn.');
        }
      );
    } else {
      alert('Trình duyệt của bạn không hỗ trợ Geolocation.');
    }
  }, []);
  const myLocationIcon = new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const highlightIcon = new L.Icon({
    iconUrl: '/iconMaker.png',
    iconSize: [25, 0],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/iconMaker.png',
    shadowSize: [41, 41],
  });

  const DefaultMarker = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    // Lắng nghe sự kiện click trên bản đồ
    useMapEvents({
      click: (event) => {
        setSelectedPosition(event.latlng); // Lưu vị trí được bấm
        onChangeLocation(event.latlng);
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition} icon={highlightIcon}>
        <Popup>
          Bạn đã chọn vị trí này:{' '}
          {`(${selectedPosition.lat}, ${selectedPosition.lng})`}
        </Popup>
      </Marker>
    ) : null;
  };

  // Hàm để lấy danh sách địa điểm từ API OpenStreetMap (Nominatim)
  const getLocationSuggestionsTo = async (inputValue) => {
    if (inputValue.length < 3) return; // Chỉ tìm kiếm khi có ít nhất 3 ký tự

    setLoading(true); // Hiển thị loading khi đang tìm kiếm

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      const locationOptions = data.map((item) => ({
        label: item.display_name, // Hiển thị tên địa điểm
        value: [parseFloat(item.lon), parseFloat(item.lat)], // Lấy tọa độ (lon, lat)
      }));

      setLocationsTo(locationOptions); // Cập nhật lại danh sách địa điểm
    } catch (err) {
      console.error('Lỗi khi gọi API tìm kiếm địa điểm:', err);
    } finally {
      setLoading(false); // Ẩn loading khi tìm kiếm xong
    }
  };

  const getLocationSuggestionsFrom = async (inputValue) => {
    if (inputValue.length < 3) return; // Chỉ tìm kiếm khi có ít nhất 3 ký tự

    setLoading(true); // Hiển thị loading khi đang tìm kiếm

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      const locationOptions = data.map((item) => ({
        label: item.display_name, // Hiển thị tên địa điểm
        value: [parseFloat(item.lon), parseFloat(item.lat)], // Lấy tọa độ (lon, lat)
      }));

      setLocationsFrom(locationOptions); // Cập nhật lại danh sách địa điểm
    } catch (err) {
      console.error('Lỗi khi gọi API tìm kiếm địa điểm:', err);
    } finally {
      setLoading(false); // Ẩn loading khi tìm kiếm xong
    }
  };

  const getLocationSuggestionsMid = async (inputValue) => {
    if (inputValue.length < 3) return; // Chỉ tìm kiếm khi có ít nhất 3 ký tự

    setLoading(true); // Hiển thị loading khi đang tìm kiếm

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      const locationOptions = data.map((item) => ({
        label: item.display_name, // Hiển thị tên địa điểm
        value: [parseFloat(item.lon), parseFloat(item.lat)], // Lấy tọa độ (lon, lat)
      }));

      setLocationsMid(locationOptions); // Cập nhật lại danh sách địa điểm
    } catch (err) {
      console.error('Lỗi khi gọi API tìm kiếm địa điểm:', err);
    } finally {
      setLoading(false); // Ẩn loading khi tìm kiếm xong
    }
  };

  // Sử dụng debounce cho hàm getLocationSuggestions để trì hoãn gọi API
  const debouncedGetLocationSuggestionsTo = debounce(
    getLocationSuggestionsTo,
    1000
  ); // Thời gian debounce là 1000ms (1 giây)

  const debouncedGetLocationSuggestionsMid = debounce(
    getLocationSuggestionsMid,
    1000
  ); // Thời gian debounce là 1000ms (1 giây)

  const debouncedGetLocationSuggestionsFrom = debounce(
    getLocationSuggestionsFrom,
    1000
  ); // Thời gian debounce là 1000ms (1 giây)

  // Hàm để lấy đường đi từ OpenRouteService
  const getRoute = async () => {
    if (!startLocation || !endLocation) return; // Chỉ khi có đủ tọa độ mới gọi API
    setRouteData(null);
    const apiKey = '5b3ce3597851110001cf624863b79283a8824f1db53c7683e99e4ea3'; // API key của bạn
    const url =
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    const coordinates = [startLocation, midLocation, endLocation]; // Tọa độ từ hai ô nhập

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

  useEffect(() => {
    getRoute(); // Gọi hàm để lấy đường đi khi có đủ tọa độ
  }, [startLocation, endLocation]); // Mỗi khi tọa độ thay đổi, gọi lại hàm getRoute

  const getLocationLabelTo = (value) => {
    return locationsTo.find((location) => location.value === value)?.label;
  };

  const getLocationLabelMid = (value) => {
    return locationsMid.find((location) => location.value === value)?.label;
  };

  const getLocationLabelFrom = (value) => {
    return locationsFrom.find((location) => location.value === value)?.label;
  };

  return (
    <div>
      <MapContainer
        //dragging={false}
        center={currentPosition ? currentPosition : [21.0701, 105.772]} // Vị trí trung tâm Nhổn
        zoom={13}
        style={{ width: width, height: height }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routeData && <GeoJSON data={routeData} />}
        {currentPosition && (
          <Marker position={currentPosition} icon={myLocationIcon}>
            <Popup>Vị trí hiện tại của bạn</Popup>
          </Marker>
        )}
        <DefaultMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
