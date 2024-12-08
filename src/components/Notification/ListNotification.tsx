import React, { useEffect, useState } from 'react';
import { getAllNotification } from '../../services/notificationServices';
import { Modal } from 'antd';

const ListNotification = () => {
  const [data, setData] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const fetchData = async () => {
    const res = await getAllNotification();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: 300, maxHeight: 300, overflow: 'auto' }}>
      {data.map((item: any) => (
        <div
          key={item.id}
          onClick={() => setSelectedNotification(item)}
          style={{
            cursor: 'pointer',
            padding: 5,
            background: '#f0f0f0',
            marginBottom: 5,
            borderRadius: 5,
            maxHeight: 60,
            overflow: 'hidden',
          }}
        >
          <strong style={{ margin: 0, fontSize: 15 }}>{item.title}</strong>
          <p style={{ margin: 0, fontSize: 13 }}>{item.description}</p>
        </div>
      ))}
      {selectedNotification && (
        <Modal
          footer={null}
          open={true}
          centered
          onCancel={() => setSelectedNotification(null)}
          title="Thông báo"
        >
          <strong style={{ margin: 0, fontSize: 15 }}>
            {selectedNotification.title}
          </strong>
          <div>{selectedNotification.description}</div>
        </Modal>
      )}
    </div>
  );
};

export default ListNotification;
