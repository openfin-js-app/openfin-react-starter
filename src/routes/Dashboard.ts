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
        sidebarName:"Accessibility",
        navbarName:"View accessibility [Accessibility]",
        icon: AccessibilityIcon,
        component: Accessibility,
    },
    {
        path:'/dashboard/view-one',
        sidebarName:"ViewOne",
        navbarName:"View one [ViewOne]",
        icon: BusinessIcon,
        component: ViewOne,
    },
    {
        path:'/dashboard/view-two',
        sidebarName:"ViewTwo",
        navbarName:"View two [ViewTwo]",
        icon: ChatIcon,
        component: ViewTwo,
    },
    {
        path:'/dashboard/config',
        sidebarName:"Configuration",
        navbarName:"App configuration",
        icon: SettingsIcon,
        component: ConfigView,
    },
    {
        path:'/dashboard/report',
        sidebarName:"Report",
        navbarName:"Desktop runtime report",
        icon: ReportIcon,
        component: ReportView,
    },
];

export default dashboardRoutes;