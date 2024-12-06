function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_SITEMAP = '/sitemap';
const ROOTS_LAYOUT = '/layouts';
const ROOTS_CORPORATE = '/corporate';
const ROOTS_PROFILE = '/user-profile';
const ROOTS_SOCIAL = '/social';
const ROOTS_BLOG = '/blog';
const ROOTS_CAREERS = '/careers';
const ROOTS_ACCOUNT = '/account';
const ROOTS_AUTH = '/auth';
const ROOTS_PROJECTS = '/projects';
const ROOTS_CONTACTS = '/contacts';
const ROOTS_USER_MGMT = '/user-management';
const ROOTS_SUBSCRIPTION = '/subscription';
const ROOTS_INVOICE = '/invoice';
const ROOTS_FILE_MGMT = '/file-manager';
const ROOTS_INBOX = '/inbox';
const ROOTS_CALENDAR = '/calendar';
const ROOTS_ERRORS = '/errors';
export const ROOTS_ACCOUNT_MANAGEMENT = '/account-management';
export const ROOTS_BUS_ROUTE_MANAGEMENT = '/bus-route-management';
export const ROOTS_BUS_STOP_MANAGEMENT = '/bus-stop-management';
export const ROOTS_NOTIFICATION_MANAGEMENT = '/notification-management';
export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  projects: path(ROOTS_DASHBOARD, '/projects'),
  ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  marketing: path(ROOTS_DASHBOARD, '/marketing'),
  social: path(ROOTS_DASHBOARD, '/social'),
  bidding: path(ROOTS_DASHBOARD, '/bidding'),
  learning: path(ROOTS_DASHBOARD, '/learning'),
  logistics: path(ROOTS_DASHBOARD, '/logistics'),
};

export const PATH_SITEMAP = {
  root: ROOTS_SITEMAP,
};

export const PATH_LAYOUT = {
  root: ROOTS_LAYOUT,
  sidebar: {
    light: path(ROOTS_LAYOUT, '/sidebar/light'),
    dark: path(ROOTS_LAYOUT, '/sidebar/dark'),
    minimized: path(ROOTS_LAYOUT, '/sidebar/minimized'),
  },
  header: {
    light: path(ROOTS_LAYOUT, '/header/light'),
    dark: path(ROOTS_LAYOUT, '/header/dark'),
    overlay: path(ROOTS_LAYOUT, '/header/overlay'),
  },
};
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  accountDelete: path(ROOTS_AUTH, '/account-delete'),
};

export const PATH_ERROR = {
  root: ROOTS_ERRORS,
  error400: path(ROOTS_ERRORS, '/400'),
  error403: path(ROOTS_ERRORS, '/403'),
  error404: path(ROOTS_ERRORS, '/404'),
  error500: path(ROOTS_ERRORS, '/500'),
  error503: path(ROOTS_ERRORS, '/503'),
};
