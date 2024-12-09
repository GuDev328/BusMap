import {
  Button,
  Col,
  Flex,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';

import { Card, PageHeader } from '../../components';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { COLOR } from '../../App';
import DrawerCRU from './Handle/DrawerCRU';
import { useEffect, useState } from 'react';
import { deleteBusStop, getAllBusStop } from '../../services/busStopServices';

export const BusStopManagement = () => {
  const [data, setData] = useState([]);
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
    const res = await getAllBusStop();
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
      width: 50,
      render: (text: any, record: any, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Tên điểm dừng',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Vĩ độ',
      dataIndex: 'lat',
      key: 'lat',
      width: 100,
    },
    {
      title: 'Kinh độ',
      dataIndex: 'lon',
      key: 'lon',
      width: 100,
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
          <EyeOutlined
            style={{ color: '#165dff' }}
            onClick={() => {
              setOpen(true);
              setId(record.id);
              setIsViewMode(true);
            }}
          />
          <EditOutlined
            style={{ color: '#165dff' }}
            onClick={() => {
              setOpen(true);
              setId(record.id);
              setIsViewMode(false);
            }}
          />
          <DeleteOutlined
            style={{ color: '#ff4d4f' }}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa điểm bus này không?',
      onOk: async () => {
        const res = await deleteBusStop(id);
        if (res.status === 200) {
          message.success('Xóa điểm bus thành công');
          setUpdateTableData(!updateTableData);
        }
      },
    });
  };
  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader title="Quản lý điểm bus" breadcrumbs={[]} />
        <Button
          style={{ width: '150px' }}
          onClick={() => {
            setId(undefined);
            setOpen(true);
            setIsViewMode(false);
          }}
          icon={<PlusOutlined />}
          type="primary"
        >
          Thêm điểm bus
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
        setUpdateTableData={setUpdateTableData}
        open={open}
        onClose={() => {
          setId(undefined);
          setOpen(false);
        }}
        id={id}
        isViewMode={isViewMode}
      />
    </div>
  );
};
