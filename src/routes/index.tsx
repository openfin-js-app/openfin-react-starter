import * as React from 'react';
import {
    RouteItem,
    LoadingLyt,
    DashboardLyt,
    ChildWindowLyt,
    NotificationLyt,
    LaunchBarLyt,
} from 'react-openfin-mat-impl';


import { ClientPrefix } from '../components'
import launchBarItems from '../constants/launchBarItems';

import dashboardRoutes from './Dashboard';
import childrenRoutes from './ChildWindow';
import notificationRoutes from './notification';

import appLogo from '../assets/svg/app.svg';
import companyLogo from '../assets/svg/company.svg';

const ENABLE_LOADING_VIEW = process.env.REACT_APP_ENABLE_LOADING_VIEW.toLowerCase() === 'true';

// Layouts
const Loading:React.FunctionComponent<{}> = ({})=>(
    <LoadingLyt appLogo={appLogo} companyLogo={companyLogo} version={process.env.REACT_APP_VERSION}/>
)

const Dashboard:React.FunctionComponent<{}> = ({...rest}) => {
    return (<DashboardLyt
        appLogo={appLogo}
        routes={dashboardRoutes}
        headerPrefixElements={<ClientPrefix {...rest} />}
        {...rest}
    />)
}

const ChildWindow:React.FunctionComponent<{}> = ({...rest}) => {
    return (<ChildWindowLyt appLogo={appLogo} routes={childrenRoutes} {...rest}/>)
}

const Notification:React.FunctionComponent<{}> = ({})=>{
    return (<NotificationLyt routes={notificationRoutes}/>)
}

const LaunchBar:React.FunctionComponent<{}> = ({})=>{
    return (<LaunchBarLyt appLogo={appLogo} items={launchBarItems}/>)
}

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
        path:'/childWindow',
        component: ChildWindow,
    },
    {
        path:'/notification',
        component: Notification,
    },
    {
        path:'/launchBar',
        component: LaunchBar,
    },
    {
        redirect: true, path:'/',
        to: ENABLE_LOADING_VIEW?"/loading":process.env.REACT_APP_DEFAULT_VIEW_URL,
        navbarName:"Redirect"
    }
];

export default indexRoutes;