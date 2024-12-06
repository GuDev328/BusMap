import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import { omit } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  createAccount,
  getDetailAccount,
  IAccount,
  IUpdateAccount,
  updateAccount,
} from '../../../services/accountServices';

interface DrawerCRUProps {
  id?: string;
  isViewMode?: boolean;
  open: boolean;
  onClose: () => void;
}

const DrawerCRU = ({ open, onClose, id, isViewMode }: DrawerCRUProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (id) {
      getDetailAccount(id).then((res: IAccount) => {
        form.setFieldsValue(res);
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
      const create = await createAccount(
        omit(dataForm, ['confirmPassword']) as IAccount
      );
      if (create.status === 201) {
        message.success('Tạo tài khoản thành công');
        handleClose();
      }
    } else {
      const update = await updateAccount(dataForm as IUpdateAccount);
      // if (update.status === 200) {
      //   message.success('Cập nhật tài khoản thành công');
      //   handleClose();
      // }
    }
  };

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
      onClose={handleClose}
    >
      <Form disabled={isViewMode} form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống' }]}
            >
              <Input disabled={Boolean(id)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Họ tên"
              name="username"
              rules={[
                { required: true, message: 'Họ tên không được để trống' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Quyền"
              initialValue={id ? 1 : 1}
              rules={[{ required: true, message: 'Quyền không được để trống' }]}
              name="role"
            >
              <Select>
                <Select.Option value={0}>Admin Tổng</Select.Option>
                <Select.Option value={1}>Admin</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Trạng thái"
              initialValue={id ? true : true}
              rules={[
                { required: true, message: 'Trạng thái không được để trống' },
              ]}
              name="active"
            >
              <Select disabled={!id || isViewMode}>
                <Select.Option value={true}>Hoạt động</Select.Option>
                <Select.Option value={false}>Khóa</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {!id && (
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
        )}
      </Form>
      {!isViewMode && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} type="primary">
            {id ? 'Chỉnh sửa' : 'Tạo tài khoản'}
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default DrawerCRU;
