import {
  Button,
  Drawer,
  Flex,
  FloatButton,
  Layout,
  Popover,
  theme,
  Tooltip,
} from 'antd';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  AppstoreAddOutlined,
  BellOutlined,
  GithubOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Logo, NProgress } from '../../components';
import { PATH_AUTH, PATH_LANDING } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ROOTS_ACCOUNT_MANAGEMENT } from '../../constants/routes';
import ListNotification from '../../components/Notification/ListNotification';
const { Header, Content, Footer } = Layout;

export const GuestLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const nodeRef = useRef(null);
  const [navFill, setNavFill] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  const handleBTNLogin = () => {
    username ? navigate(ROOTS_ACCOUNT_MANAGEMENT) : navigate(PATH_AUTH.signin);
  };

  const [openPopover, setOpenPopover] = useState(false);
  const hidePopover = () => {
    setOpenPopover(false);
  };
  const handleOpenChangePopover = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout
        className="layout"
        style={{
          minHeight: '100vh',
          // backgroundColor: 'white',
        }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#10af7e',
            backdropFilter: navFill ? 'blur(8px)' : 'none',
            boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
            gap: 12,
            top: 0,
            padding: isMobile ? '0 1rem' : '0 2rem',
          }}
        >
          <Logo color="white" asLink href={PATH_LANDING.root} />
          <div>
            <Popover
              content={<ListNotification />}
              title="Thông báo"
              trigger="click"
              open={openPopover}
              onOpenChange={handleOpenChangePopover}
            >
              <Button
                type="text"
                style={{
                  borderColor: 'white',
                  color: 'white',
                  marginRight: 12,
                }}
                icon={<BellOutlined />}
              ></Button>
            </Popover>

            <Button
              type="text"
              onClick={handleBTNLogin}
              style={{ color: 'white', borderColor: 'white' }}
              icon={<LoginOutlined />}
            >
              {username ? 'Xin chào, ' + username : 'Đăng nhập'}
            </Button>
          </div>
        </Header>
        <Content
          style={{
            // background: 'rgba(255, 255, 255, 1)',
            borderRadius,
            transition: 'all .25s',
          }}
        >
          <TransitionGroup>
            <SwitchTransition>
              <CSSTransition
                key={`css-transition-${location.key}`}
                nodeRef={nodeRef}
                onEnter={() => {
                  setIsLoading(true);
                }}
                onEntered={() => {
                  setIsLoading(false);
                }}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                {() => (
                  <div
                    ref={nodeRef}
                    className="site-layout-content"
                    style={{ background: 'none' }}
                  >
                    <Outlet />
                  </div>
                )}
              </CSSTransition>
            </SwitchTransition>
          </TransitionGroup>
          <FloatButton.BackTop />
        </Content>
      </Layout>
    </>
  );
};
