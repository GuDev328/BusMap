import { Button, Col, Drawer, Form, Input, message, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import MapPicBusStop from '../../../components/Map/MapPicBusStop';
import { DeleteOutlined } from '@ant-design/icons';
import {
  createBusStop,
  getDetailBusStop,
  updateBusStop,
} from '../../../services/busStopServices';

interface DrawerCRUProps {
  id?: string;
  isViewMode?: boolean;
  open: boolean;
  onClose: () => void;
  setUpdateTableData: any;
}

const DrawerCRU = ({
  open,
  onClose,
  id,
  isViewMode,
  setUpdateTableData,
}: DrawerCRUProps) => {
  const [form] = Form.useForm();
  const [listPicked, setListPicked] = useState<any>([]);
  const [renderMap, setRenderMap] = useState(false);

  useEffect(() => {
    if (id) {
      getDetailBusStop(id).then((res) => {
        setListPicked([{ lat: res.lat, lng: res.lon }]);
        form.setFieldValue(['busStop', 0, 'name'], res.name);
      });
    }
  }, [id, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setRenderMap(true);
      }, 500);
    } else {
      setRenderMap(false);
    }
  }, [open, id, isViewMode]);

  const handleClose = () => {
    form.resetFields();
    setListPicked([]);
    onClose();
  };
  const handleChangeLocation = (location: { lat: number; lng: number }) => {
    !id && setListPicked([...listPicked, location]);
    if (id) {
      setListPicked([location]);
      form.setFieldValue(
        ['busStop', 0, 'location'],
        `Toạ độ: (${location.lat}, ${location.lng})`
      );
    }
  };

  const handleSave = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const saveData = values.busStop.map((item: any) => ({
          name: item.name,
          lat: parseFloat(item.location.split(',')[0].slice(9)),
          lon: parseFloat(item.location.split(',')[1].slice(0, -1)),
        }));
        console.log(saveData);
        if (id) {
          const res = await updateBusStop({
            ...saveData[0],
            id,
          });
          console.log(res);
          if (res.status === 200) {
            message.success('Cập nhật điểm bus thành công');
            handleClose();
            setUpdateTableData((prev: boolean) => !prev);
          }
        } else {
          const res = await createBusStop(saveData);
          if (res.status === 200) {
            message.success('Thêm điểm bus thành công');
            handleClose();
            setUpdateTableData((prev: boolean) => !prev);
          }
        }
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
      <Form disabled={isViewMode} form={form}>
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
              {!id && (
                <Button
                  style={{ border: 'none' }}
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                  onClick={() => handleRemoveLocation(index)}
                ></Button>
              )}
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
        {listPicked?.length > 0 && !isViewMode && (
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
