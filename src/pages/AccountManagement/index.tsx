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
import { deleteAccount, getAllAccount } from '../../services/accountServices';

export const AccountManagementPage = () => {
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
    const res = await getAllAccount();
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
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: 'Họ tên',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
      render: (text: any) => {
        return text === 0 ? 'Master Admin' : 'Admin';
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
      title: 'Bạn có chắc chắn muốn xóa tài khoản này không?',
      onOk: () => {
        deleteAccount(id).then((res: any) => {
          // if (res.status === 200) {
          //   message.success('Xóa tài khoản thành công');
          //   setUpdateTableData(!updateTableData);
          // }
        });
      },
    });
  };
  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader title="Quản lý tài khoản" breadcrumbs={[]} />
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
          Thêm tài khoản
        </Button>
        <Table
          bordered
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data.length,
            showSizeChanger: true,
            locale: { items_per_page: '/trang' },
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          style={{ borderRadius: '15px' }}
          columns={columns}
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
