import { RouteItem } from './Base';
import Loading from '../layouts/Loading/Loading';
import Dashboard from '../layouts/Dashboard/Dashboard';

export * from './Base';

const ENABLE_LOADING_VIEW = process.env['REACT_APP_ENABLE_LOADING_VIEW'].toLowerCase() === 'true';

const indexRoutes:RouteItem[] = [
    {
        path:'/loading',
        component:Loading,
    },
    {
        path:'/dashboard',
        component: Dashboard,
    },
    {
        redirect: true, path:'/',
        to: ENABLE_LOADING_VIEW?"/loading":process.env['REACT_APP_DEFAULT_VIEW_URL'],
        navbarName:"Redirect"
    }
];

export default indexRoutes;