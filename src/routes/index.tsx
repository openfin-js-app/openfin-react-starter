import * as React from 'react';
import { useContext } from 'react';

import { ApplicationContext } from 'react-openfin';

import {
    RouteItem,
    LoadingLyt,
    DashboardLyt,
    ChildWindowLyt,
    NotificationLyt,
    LaunchBarLyt,
} from 'react-openfin-mat-impl';

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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

export const Dashboard:React.FunctionComponent<{}> = ({...rest}) => {

    const {
        actions:{
            onNewSnackBar
        }
    } = useContext(ApplicationContext);


    const handleLogoutBtnClick = ()=>{
        onNewSnackBar({
            variant:'rose',
            message:'User clicked the logout btn',
            // README
            // vertical and horizontal fields are optional
            vertical:'top',
            horizontal:'right',
        })
    }

    return (<DashboardLyt
        appLogo={appLogo}
        routes={dashboardRoutes}
        // !!!README!!!
        // uncomment to hide the btn to switch to the launchbar
        // hideSwitchToLaunchbar
        menuItems={[{
            icon:<ExitToAppIcon/>,
            label:'staticMenu.logout',
            onClick: handleLogoutBtnClick,
        }]}
        // !!!README!!!
        // comment to use the default prefix upon the header
        headerPrefixElements={<ClientPrefix {...rest} />}
        // !!!README!!!
        // uncomment to add custom suffix element upon the header
        // headerSuffixElements={...}
        {...rest}
    />)
}

export const ChildWindow:React.FunctionComponent<{}> = ({...rest}) => {
    return (<ChildWindowLyt appLogo={appLogo} routes={childrenRoutes} {...rest}/>)
}

export const Notification:React.FunctionComponent<{}> = ({})=>{
    return (<NotificationLyt routes={notificationRoutes}/>)
}

export const LaunchBar:React.FunctionComponent<{}> = ({})=>{
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