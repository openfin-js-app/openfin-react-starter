import AccessibilityIcon from '@material-ui/icons/Accessibility';
import BusinessIcon from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import ReportIcon from '@material-ui/icons/Report';
import SettingsIcon from '@material-ui/icons/Settings';

import { RouteItem, ReportView } from 'react-openfin-mat-impl';

import { MyConfigView } from '../constants/configTabs';

import Accessibility from '../views/Accessibility/Accessibility';
import ViewOne from '../views/ViewOne/ViewOne';
import ViewTwo from "../views/ViewTwo/ViewTwo";

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
        // !!!README!!!
        // to hide a view like basing on entitlement,
        // set shown field to false or a cb returning false
        // shown:()=>{return false},
    },
    {
        path:'/dashboard/config',
        sidebarName:"configuration.sidebar",
        navbarName:"configuration.navbar",
        icon: SettingsIcon,
        component: MyConfigView,
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