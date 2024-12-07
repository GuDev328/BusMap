import {
  Button,
  Col,
  Drawer,
  Flex,
  InputNumber,
  Row,
  Select,
  Tabs,
  TimePicker,
} from 'antd';
import React, { useEffect, useState } from 'react';
import MapRoute from '../../../components/Map/MapRoute';
import { Form, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllBusStop } from '../../../services/busStopServices';
import dayjs from 'dayjs';
import { createRouter, IRouter } from '../../../services/routersServices';
import { updateRouter } from '../../../services/routersServices';
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
      id: 0,
      name: '',
    },
  ]);
  const [numberBusStopReturn, setNumberBusStopReturn] = useState([
    {
      id: 0,
      name: '',
    },
  ]);
  const [form] = Form.useForm();
  const [busStopDataOptions, setBusStopDataOptions] = useState<any>([]);
  const [busStopData, setBusStopData] = useState<any>([]);
  const [busStopSelected, setBusStopSelected] = useState<any>([]);
  const [routerGo, setRouterGo] = useState<any>([]);
  const [routerReturn, setRouterReturn] = useState<any>([]);

  const fetchBusStopData = async () => {
    const res = await getAllBusStop();
    setBusStopData(res);
    setBusStopDataOptions(
      res.map((item: any) => ({ value: item.id, label: item.name }))
    );
  };

  useEffect(() => {
    fetchBusStopData();
    if (open) {
      setTimeout(() => {
        setRenderMap(true);
      }, 500);
    }
  }, [open]);

  const handleSubmit = async () => {
    const value = await form.validateFields();
    const data = {
      name: value.name,
      start_time: value.time[0].format('HH:mm'),
      end_time: value.time[1].format('HH:mm'),
      interval: value.interval,
      price: value.price,
      outbound_stops: value.busStop,
      inbound_stops: value.busStopReturn,
      route_length: value.route_length,
    };
    if (id) {
      //await updateRouter(data);
    } else {
      const res = await createRouter(data as IRouter);
      console.log(res);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setRenderMap(false);
    setRouterGo([]);
    setRouterReturn([]);
    setBusStopSelected([]);
    setNumberBusStop([
      {
        id: 0,
        name: '',
      },
    ]);
    setNumberBusStopReturn([
      {
        id: 0,
        name: '',
      },
    ]);
    onClose();
  };

  const handleChangeBusStop = (value: any) => {
    setMapData();
  };

  const setMapData = () => {
    const busStop = form.getFieldValue('busStop') || [];
    const busStopReturn = form.getFieldValue('busStopReturn') || [];
    const busStops = [...busStop, ...busStopReturn];

    const dataRouteGoSelected: any[] = [];
    busStop.forEach((id: any) => {
      const bus = busStopData.find((item: any) => item.id === id);
      dataRouteGoSelected.push([bus.lon, bus.lat]);
    });
    setRouterGo(dataRouteGoSelected);

    const dataRouteReturnSelected: any[] = [];
    busStopReturn.forEach((id: any) => {
      const bus = busStopData.find((item: any) => item.id === id);
      dataRouteReturnSelected.push([bus.lon, bus.lat]);
    });
    setRouterReturn(dataRouteReturnSelected);

    const dataBusStopSelected: any[] = [];
    busStops.forEach((id) => {
      const bus = busStopData.find((item: any) => item.id === id);
      dataBusStopSelected.push(bus);
    });
    setBusStopSelected(dataBusStopSelected);
  };

  const handleDeleteBusStop = (index: number) => {
    const newNumberBusStop = numberBusStop.filter((_, i) => i !== index);
    setNumberBusStop(newNumberBusStop);

    const currentBusStops = form.getFieldValue('busStop') || [];
    const newBusStops = currentBusStops.filter(
      (_: any, i: number) => i !== index
    );
    form.setFieldValue('busStop', newBusStops);
    setMapData();
  };

  const handleDeleteBusStopReturn = (index: number) => {
    const newNumberBusStopReturn = numberBusStopReturn.filter(
      (_, i) => i !== index
    );
    setNumberBusStopReturn(newNumberBusStopReturn);

    const currentBusStops = form.getFieldValue('busStopReturn') || [];
    const newBusStops = currentBusStops.filter(
      (_: any, i: number) => i !== index
    );
    form.setFieldValue('busStopReturn', newBusStops);
    setMapData();
  };

  return (
    <Drawer
      width={'100%'}
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
                name="route_length"
                rules={[
                  { required: true, message: 'Vui lòng nhập độ dài tuyến' },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Flex>
            <Form.Item
              label="Vòng chạy"
              name="interval"
              rules={[{ required: true, message: 'Vui lòng nhập vòng chạy' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Thời gian chạy "
              name="time"
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian chạy ' },
              ]}
            >
              <TimePicker.RangePicker placeholder={['Từ', 'Đến']} />
            </Form.Item>
            <Tabs>
              <Tabs.TabPane tab="Tuyến đi" key="1">
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
                      <Select
                        onChange={(value) => handleChangeBusStop(value)}
                        options={busStopDataOptions}
                      />
                    </Form.Item>
                    <Button
                      onClick={() => handleDeleteBusStop(index)}
                      style={{ border: 'none' }}
                      icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                    ></Button>
                  </Flex>
                ))}
                <Button
                  onClick={() =>
                    setNumberBusStop([
                      ...numberBusStop,
                      { id: numberBusStop.length, name: '' },
                    ])
                  }
                  icon={<PlusOutlined />}
                ></Button>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tuyến về" key="2">
                {numberBusStopReturn.map((item, index) => (
                  <Flex key={index}>
                    <Form.Item
                      style={{ flex: 1 }}
                      name={['busStopReturn', index]}
                      rules={[
                        { required: true, message: 'Vui lòng chọn điểm dừng' },
                      ]}
                      label={`Điểm dừng`}
                    >
                      <Select
                        onChange={handleChangeBusStop}
                        options={busStopDataOptions}
                      />
                    </Form.Item>
                    <Button
                      onClick={() => handleDeleteBusStopReturn(index)}
                      style={{ border: 'none' }}
                      icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                    ></Button>
                  </Flex>
                ))}
                <Button
                  onClick={() =>
                    setNumberBusStopReturn([
                      ...numberBusStopReturn,
                      { id: numberBusStopReturn.length + 1, name: '' },
                    ])
                  }
                  icon={<PlusOutlined />}
                ></Button>
              </Tabs.TabPane>
            </Tabs>
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
              form={form}
              routerGo={routerGo}
              width={'100%'}
              height={'calc(100vh - 90px)'}
              routerReturn={routerReturn}
              busStopData={busStopSelected}
            />
          )}
        </Col>
      </Row>
    </Drawer>
  );
};

export default DrawerCRU;
