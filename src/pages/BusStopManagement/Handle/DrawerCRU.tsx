import { Button, Col, Drawer, Form, Input, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import MapPicBusStop from '../../../components/Map/MapPicBusStop';
import { DeleteOutlined } from '@ant-design/icons';

interface DrawerCRUProps {
  id?: string;
  isViewMode?: boolean;
  open: boolean;
  onClose: () => void;
}

const DrawerCRU = ({ open, onClose, id, isViewMode }: DrawerCRUProps) => {
  const [form] = Form.useForm();
  const [listPicked, setListPicked] = useState<any>([]);
  const [renderMap, setRenderMap] = useState(false);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setRenderMap(true);
      }, 500);
    }
  }, [open]);

  const handleClose = () => {
    form.resetFields();
    setListPicked([]);
    onClose();
  };

  const handleChangeLocation = (location: { lat: number; lng: number }) => {
    form.setFieldValue('lat', location.lat);
    form.setFieldValue('lng', location.lng);
    setListPicked([...listPicked, location]);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveLocation = (index: number) => {
    const newListPicked = listPicked.filter((_: any, i: number) => i !== index);
    setListPicked(newListPicked);
  };

  return (
    <Drawer
      width={'70%'}
      title={
        isViewMode
          ? 'Xem chi tiết điểm bus'
          : id
            ? 'Chỉnh sửa điểm bus'
            : 'Thêm điểm bus'
      }
      open={open}
      onClose={handleClose}
    >
      <Form form={form}>
        {listPicked?.map((location: any, index: number) => (
          <Row key={index} gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                rules={[
                  { required: true, message: 'Vui lòng nhập tên điểm bus' },
                ]}
                name={['busStop', index, 'name']}
                label="Tên điểm"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name={['busStop', index, 'location']}
                initialValue={`Toạ độ: (${location.lat}, ${location.lng})`}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button
                style={{ border: 'none' }}
                icon={<DeleteOutlined style={{ color: 'red' }} />}
                onClick={() => handleRemoveLocation(index)}
              ></Button>
            </Col>
          </Row>
        ))}
      </Form>
      <div
        style={{
          display: 'flex',
          margin: '0px 10px 10px 10px',
          justifyContent: 'flex-end',
        }}
      >
        {listPicked?.length > 0 && (
          <Button onClick={handleSave} type="primary">
            Lưu
          </Button>
        )}
      </div>
      {listPicked?.length === 0 && <h3>Vui lòng chọn điểm bus</h3>}
      {renderMap && (
        <MapPicBusStop
          listPicked={listPicked}
          onChangeLocation={handleChangeLocation}
          width="100%"
          height="calc(100vh - 200px)"
        />
      )}
    </Drawer>
  );
};

export default DrawerCRU;
