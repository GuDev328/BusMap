import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import React, { useEffect } from 'react';
import {
  createNotification,
  INotification,
  IUpdateNotification,
  updateNotification,
} from '../../../services/notificationServices';
import { getDetailNotification } from '../../../services/notificationServices';
import dayjs from 'dayjs';

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
  useEffect(() => {
    if (id) {
      getDetailNotification(id).then((res: INotification) => {
        form.setFieldsValue({
          ...res,
          expire_at: dayjs(res.expire_at),
        });
      });
    }
  }, [id, isViewMode]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = async () => {
    const dataForm = await form.validateFields();
    if (!id) {
      const create = await createNotification(dataForm as INotification);
      if (create.status === 200) {
        message.success('Tạo thông báo thành công');
        setUpdateTableData((prev: any) => !prev);
        handleClose();
      }
    } else {
      const update = await updateNotification({
        id,
        ...dataForm,
      } as IUpdateNotification);
      if (update.status === 200) {
        message.success('Cập nhật thông báo thành công');
        setUpdateTableData((prev: any) => !prev);
        handleClose();
      }
    }
  };
  return (
    <Drawer
      width={'70%'}
      title={
        isViewMode
          ? 'Xem chi tiết thông báo'
          : id
            ? 'Chỉnh sửa thông báo'
            : 'Thêm thông báo'
      }
      open={open}
      onClose={onClose}
    >
      <Form form={form} layout="vertical" disabled={isViewMode}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                { required: true, message: 'Tiêu đề không được để trống' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày hết hạn"
              name="expire_at"
              rules={[
                { required: true, message: 'Ngày hết hạn không được để trống' },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày hết hạn"
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Nội dung"
          name="description"
          rules={[{ required: true, message: 'Nội dung không được để trống' }]}
        >
          <Input.TextArea rows={15} />
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isViewMode && (
          <Button type="primary" onClick={handleSubmit}>
            {id ? 'Cập nhật' : 'Tạo thông báo'}
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default DrawerCRU;
