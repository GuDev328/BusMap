import {
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_ERROR,
  PATH_LAYOUT,
  PATH_LANDING,
  PATH_SITEMAP,
} from './routes.ts';

const DASHBOARD_ITEMS = [
  { title: 'default', path: PATH_DASHBOARD.default },
  { title: 'projects', path: PATH_DASHBOARD.projects },
  { title: 'ecommerce', path: PATH_DASHBOARD.ecommerce },
  { title: 'marketing', path: PATH_DASHBOARD.marketing },
  { title: 'social', path: PATH_DASHBOARD.social },
  { title: 'bidding', path: PATH_DASHBOARD.bidding },
  { title: 'learning', path: PATH_DASHBOARD.learning },
  { title: 'logistics', path: PATH_DASHBOARD.logistics },
];

const AUTHENTICATION_ITEMS = [
  { title: 'sign in', path: PATH_AUTH.signin },
  { title: 'account deleted', path: PATH_AUTH.accountDelete },
];

const ERROR_ITEMS = [
  { title: '400', path: PATH_ERROR.error400 },
  { title: '403', path: PATH_ERROR.error403 },
  { title: '404', path: PATH_ERROR.error404 },
  { title: '500', path: PATH_ERROR.error500 },
  { title: '503', path: PATH_ERROR.error503 },
];

export {
  PATH_LAYOUT,
  PATH_DASHBOARD,
  PATH_AUTH,
  PATH_ERROR,
  PATH_LANDING,
  PATH_SITEMAP,
  DASHBOARD_ITEMS,
  AUTHENTICATION_ITEMS,
  ERROR_ITEMS,
};
