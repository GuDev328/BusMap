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

const Map = ({
  width,
  height,
  onChangeLocation,
  listPicked,
  pickable = true,
  onClickMapFail = () => {},
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading

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
        if (!pickable) {
          onClickMapFail();
          return;
        }
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

  return (
    <div>
      <MapContainer
        //dragging={false}
        center={[21.0701, 105.772]} // Vị trí trung tâm Nhổn
        zoom={13}
        style={{ width: width, height: height }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {listPicked?.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={highlightIcon}
          >
            <Popup>
              Marker {index + 1}: {`(${location.lat}, ${location.lng})`}
            </Popup>
          </Marker>
        ))}
        <DefaultMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
