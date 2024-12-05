import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  BoxPlotOutlined,
  GroupOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import { PATH_LANDING } from '../../constants';
import { COLOR } from '../../App.tsx';
import {
  ROOTS_ACCOUNT_MANAGEMENT,
  ROOTS_BUS_ROUTE_MANAGEMENT,
  ROOTS_BUS_STOP_MANAGEMENT,
} from '../../constants/routes.ts';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem(
    <Link to={ROOTS_ACCOUNT_MANAGEMENT}>Quản lý tài khoản</Link>,
    'account-management',
    <UserOutlined />
  ),
  getItem(
    <Link to={ROOTS_BUS_ROUTE_MANAGEMENT}>Quản lý tuyến xe</Link>,
    'bus-route-management',
    <BoxPlotOutlined />
  ),
  getItem(
    <Link to={ROOTS_BUS_STOP_MANAGEMENT}>Quản lý điểm dừng</Link>,
    'bus-stop-management',
    <GroupOutlined />
  ),
];

const rootSubmenuKeys = ['account-management'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="#333"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 50, w: 50 }}
        style={{ padding: '7px 0', background: '#10af7e' }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['500'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['111'],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: 'none' }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
