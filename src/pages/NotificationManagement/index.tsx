import { Button, Flex, message, Modal, Space, Table, Typography } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import DrawerCRU from './Handle/DrawerCRU';
import {
  deleteNotification,
  getAllNotification,
} from '../../services/notificationServices';
import dayjs from 'dayjs';

export const NotificationManagementPage = () => {
  const [data, setData] = useState<any[]>([]);
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
    const res = await getAllNotification();
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
      width: 70,
      render: (text: any, record: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1, // Đánh số thứ tự theo trang
    },
    {
      title: 'Tiều đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expire_at',
      key: 'expire_at',
      width: 150,
      render: (text: string) => {
        return dayjs(text).format('DD/MM/YYYY');
      },
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

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa thông báo này không?',
      onOk: () => {
        deleteNotification(id).then((res) => {
          if (res.status === 200) {
            message.success('Xóa thông báo thành công');
            setUpdateTableData((prev: boolean) => !prev);
          }
        });
      },
    });
  };

  return (
    <div>
      <Flex vertical gap="middle">
        <Typography.Title level={3}>Quản lý thông báo</Typography.Title>
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
          Thêm thông báo
        </Button>
        <Table
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data.length,
            showTotal: (total) => `Tổng: ${total} thông báo`,
            showSizeChanger: true,
            locale: { items_per_page: '/trang' },
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          bordered
          style={{ borderRadius: '15px' }}
          columns={columns}
          dataSource={paginatedData} // Dữ liệu trang hiện tại
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
