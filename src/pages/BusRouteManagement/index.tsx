import {
  Button,
  Col,
  Flex,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';

import { Card, PageHeader } from '../../components';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { COLOR } from '../../App';
import DrawerCRU from './Handle/DrawerCRU';
import { useState } from 'react';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const BusRouteManagement = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: any, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Tuyến số',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Tên tuyến',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn vị',
      key: 'unit',
      dataIndex: 'unit',
    },
    {
      title: 'Giá vé',
      key: 'ticketPrice',
      dataIndex: 'ticketPrice',
    },
    {
      title: 'Độ dài tuyến',
      key: 'length',
      dataIndex: 'length',
    },
    {
      title: 'Thời gian chạy',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 110,
      render: (_: any, record: any) => (
        <Space
          size="middle"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <EditOutlined
            style={{ color: '#165dff' }}
            onClick={() => {
              setOpen(true);
              setId(record.key);
              setIsViewMode(false);
            }}
          />
          <DeleteOutlined
            style={{ color: '#ff4d4f' }}
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa tuyến đường này không?',
      onOk: () => {
        console.log('ok');
      },
    });
  };
  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader title="Quản lý tuyến đường" breadcrumbs={[]} />
        <Button
          style={{ width: '150px' }}
          onClick={() => {
            setOpen(true);
            setId(undefined);
            setIsViewMode(false);
          }}
          icon={<PlusOutlined />}
          type="primary"
        >
          Thêm tuyến đường
        </Button>
        <Table
          bordered
          style={{ borderRadius: '15px' }}
          columns={columns}
          dataSource={data}
        />
      </Flex>

      <DrawerCRU
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        isViewMode={isViewMode}
      />
    </div>
  );
};
