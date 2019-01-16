import AccessibilityIcon from '@material-ui/icons/Accessibility';
import BusinessIcon from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import ReportIcon from '@material-ui/icons/Report';
import SettingsIcon from '@material-ui/icons/Settings';

import { RouteItem } from './Base';

import Accessibility from '../views/Accessibility/Accessibility';
import ViewOne from '../views/ViewOne/ViewOne';
import ViewTwo from "../views/ViewTwo/ViewTwo";
import ReportView from "../views/ReportView/ReportView";
import ConfigView from '../views/ConfigView/ConfigView';

const dashboardRoutes:RouteItem[]=[
    {
        path:'/dashboard/accessibility',
        sidebarName:"accessibility.sidebar",
        navbarName:"accessibility.navbar",
        icon: AccessibilityIcon,
        component: Accessibility,
    },
    {
        path:'/dashboard/view-one',
        sidebarName:"viewOne.sidebar",
        navbarName:"viewOne.navbar",
        icon: BusinessIcon,
        component: ViewOne,
    },
    {
        path:'/dashboard/view-two',
        sidebarName:"viewTwo.sidebar",
        navbarName:"viewTwo.navbar",
        icon: ChatIcon,
        component: ViewTwo,
    },
    {
        path:'/dashboard/config',
        sidebarName:"configuration.sidebar",
        navbarName:"configuration.navbar",
        icon: SettingsIcon,
        component: ConfigView,
    },
    {
        path:'/dashboard/report',
        sidebarName:"report.sidebar",
        navbarName:"report.navbar",
        icon: ReportIcon,
        component: ReportView,
    },
];

export default dashboardRoutes;