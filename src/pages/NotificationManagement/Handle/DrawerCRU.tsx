import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import React from 'react';

interface DrawerCRUProps {
  id?: string;
  isViewMode?: boolean;
  open: boolean;
  onClose: () => void;
}

const DrawerCRU = ({ open, onClose, id, isViewMode }: DrawerCRUProps) => {
  const [form] = Form.useForm();
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
      <Form form={form} layout="vertical">
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
              name="expiredAt"
              rules={[
                { required: true, message: 'Ngày hết hạn không được để trống' },
              ]}
            >
              <div style={{ width: '100%' }}>
                <DatePicker
                  placeholder="Chọn ngày hết hạn"
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                />
              </div>
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
        <Button type="primary">Tạo thông báo</Button>
      </div>
    </Drawer>
  );
};

export default DrawerCRU;
