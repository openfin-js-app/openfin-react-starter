import { RouteCompItem, RouteItem } from './Base';
import Dashboard from '../layouts/Dashboard/Dashboard';

export * from './Base';

const ENABLE_LOADING_VIEW = process.env['REACT_APP_ENABLE_LOADING_VIEW'].toLowerCase() === 'true';

const indexRoutes:(RouteCompItem| RouteItem)[] = [
    {
        path:'/dashboard',
        component: Dashboard,
    }
];

export default indexRoutes;