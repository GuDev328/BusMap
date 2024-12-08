/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from 'antd';

import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ROOTS_ACCOUNT_MANAGEMENT,
  ROOTS_BUS_ROUTE_MANAGEMENT,
} from '../../constants/routes';
import { login } from '../../services/authServices';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  if (token) {
    navigate(ROOTS_BUS_ROUTE_MANAGEMENT);
  }

  const onFinish = async (values: any) => {
    const res = await login(values);
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('role', res.data.role);
      navigate(ROOTS_BUS_ROUTE_MANAGEMENT);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: '100%', padding: '1rem' }}
        >
          <Logo imgSize={{ w: 100, h: 100 }} color="white" />
          <Text className="text-white" style={{ fontSize: 18 }}>
            Chào ngày mới!
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Đăng nhập</Title>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Hãy nhập email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
