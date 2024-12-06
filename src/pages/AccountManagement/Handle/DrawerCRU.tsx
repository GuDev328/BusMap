import { Button, Col, Divider, Drawer, Form, Input, Row, Select } from 'antd';
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
          ? 'Xem chi tiết tài khoản'
          : id
            ? 'Chỉnh sửa tài khoản'
            : 'Thêm tài khoản'
      }
      open={open}
      onClose={onClose}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[
                { required: true, message: 'Họ tên không được để trống' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Quyền"
          initialValue={id ? '2' : '2'}
          rules={[{ required: true, message: 'Quyền không được để trống' }]}
          name="role"
        >
          <Select>
            <Select.Option value="1">Admin Tổng</Select.Option>
            <Select.Option value="2">Admin</Select.Option>
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary">Tạo tài khoản</Button>
      </div>
    </Drawer>
  );
};

export default DrawerCRU;
