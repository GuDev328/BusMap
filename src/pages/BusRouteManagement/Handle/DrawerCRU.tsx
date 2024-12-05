import {
  Button,
  Col,
  Drawer,
  Flex,
  InputNumber,
  Row,
  Select,
  TimePicker,
} from 'antd';
import React, { useEffect, useState } from 'react';
import MapRoute from '../../../components/Map/MapRoute';
import { Form, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
interface DrawerCRUProps {
  id?: string;
  isViewMode?: boolean;
  open: boolean;
  onClose: () => void;
}

const DrawerCRU = ({ open, onClose, id, isViewMode }: DrawerCRUProps) => {
  const [renderMap, setRenderMap] = useState(false);
  const [numberBusStop, setNumberBusStop] = useState([
    {
      id: 1,
      name: '',
    },
  ]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setRenderMap(true);
      }, 500);
    }
  }, [open]);

  const mockBusStop = [
    {
      value: 1,
      label: 'Điểm dừng 1',
    },
    {
      value: 2,
      label: 'Điểm dừng 2',
    },
    {
      value: 3,
      label: 'Điểm dừng 3',
    },
  ];

  const handleSubmit = async () => {
    const value = await form.validateFields();
    console.log(value);
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };
  return (
    <Drawer
      width={'90%'}
      title={
        isViewMode
          ? 'Xem chi tiết tuyến đường'
          : id
            ? 'Chỉnh sửa tuyến đường'
            : 'Thêm tuyến đường'
      }
      open={open}
      onClose={handleCancel}
    >
      <Row gutter={[16, 8]}>
        <Col span={7}>
          <Form form={form}>
            <Form.Item
              label="Tuyến số"
              name="number"
              rules={[{ required: true, message: 'Vui lòng nhập tuyến số' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên tuyến"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên tuyến' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Đơn vị vận hành"
              name="unit"
              rules={[
                { required: true, message: 'Vui lòng nhập đơn vị vận hành' },
              ]}
            >
              <Input />
            </Form.Item>
            <Flex justify="space-between">
              <Form.Item
                label="Giá vé"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá vé' }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Độ dài tuyến"
                name="kilometer"
                rules={[
                  { required: true, message: 'Vui lòng nhập độ dài tuyến' },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Flex>
            <Form.Item
              label="Thời gian chạy "
              name="time"
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian chạy ' },
              ]}
            >
              <TimePicker.RangePicker placeholder={['Từ', 'Đến']} />
            </Form.Item>
            {numberBusStop.map((item, index) => (
              <Flex key={index}>
                <Form.Item
                  style={{ flex: 1 }}
                  name={['busStop', index]}
                  rules={[
                    { required: true, message: 'Vui lòng chọn điểm dừng' },
                  ]}
                  label={`Điểm dừng`}
                >
                  <Select options={mockBusStop} />
                </Form.Item>
                <Button
                  onClick={() =>
                    setNumberBusStop(
                      numberBusStop.filter((item) => item.id !== index + 1)
                    )
                  }
                  style={{ border: 'none' }}
                  icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                ></Button>
              </Flex>
            ))}
            <Button
              onClick={() =>
                setNumberBusStop([
                  ...numberBusStop,
                  { id: numberBusStop.length + 1, name: '' },
                ])
              }
              icon={<PlusOutlined />}
            ></Button>
          </Form>
          <Button
            disabled={!numberBusStop.length}
            style={{ width: '100%', marginTop: 10 }}
            type="primary"
            onClick={handleSubmit}
          >
            Xác nhận
          </Button>
        </Col>
        <Col span={17}>
          {renderMap && (
            <MapRoute
              width={'100%'}
              height={'calc(100vh - 90px)'}
              onChangeLocation={() => {}}
            />
          )}
        </Col>
      </Row>
    </Drawer>
  );
};

export default DrawerCRU;
