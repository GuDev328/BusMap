import { Button, Flex, Modal, Space, Table, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import DrawerCRU from './Handle/DrawerCRU';
const allData = Array.from({ length: 35 }, (_, index) => ({
  key: `${index + 1}`,
  title: `Tiêu đề thông báo ${index + 1}`,
  description: `Nội dung thông báo chi tiết ${index + 1}`,
  expiredAt: `2024-12-${(index % 35) + 1}`.padStart(2, '0'),
}));
export const NotificationManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedData = allData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
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
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
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
      title: 'Bạn có chắc chắn muốn xóa thông báo này không?',
      onOk: () => {
        console.log('ok');
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
            total: allData.length,
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

      <DrawerCRU open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
