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
import { useEffect, useState } from 'react';
import { getAllRouters } from '../../services/routersServices';

export const BusRouteManagement = () => {
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);
  const [updateTableData, setUpdateTableData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const fetchData = async () => {
    const res = await getAllRouters();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, [updateTableData]);
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
      title: 'Giá vé',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Độ dài tuyến',
      key: 'route_length',
      dataIndex: 'route_length',
    },
    {
      title: 'Thời gian chạy',
      key: 'time',
      dataIndex: 'time',
      render: (text: any, record: any) => (
        <a>
          {record.start_time} - {record.end_time}
        </a>
      ),
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
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data.length,
            showTotal: (total) => `Tổng: ${total} điểm dừng`,
            showSizeChanger: true,
            locale: { items_per_page: '/trang' },
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          dataSource={paginatedData}
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
