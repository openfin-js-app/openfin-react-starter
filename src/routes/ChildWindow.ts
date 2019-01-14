import AccessibilityIcon from '@material-ui/icons/Accessibility';
import BusinessIcon from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import ReportIcon from '@material-ui/icons/Report';

import { RouteItem } from './Base';

import Accessibility from '../views/Accessibility/Accessibility';
import ViewOne from '../views/ViewOne/ViewOne';
import ViewTwo from '../views/ViewTwo/ViewTwo';
import ReportView from '../views/ReportView/ReportView';

const childRoutes:RouteItem[]=[
    {
        path:'/childWindow/accessibility',
        sidebarName:"Accessibility",
        navbarName:"View accessibility",
        icon: AccessibilityIcon,
        component: Accessibility,
    },
    {
        path:'/childWindow/view-one',
        sidebarName:"ViewOne",
        navbarName:"View one",
        icon: BusinessIcon,
        component: ViewOne,
    },
    {
        path:'/childWindow/view-two',
        sidebarName:"ViewTwo",
        navbarName:"View two",
        icon: ChatIcon,
        component: ViewTwo,
    },
    {
        path:'/childWindow/report',
        sidebarName:"Report",
        navbarName:"Desktop runtime report",
        icon: ReportIcon,
        component: ReportView,
    },
];

export default childRoutes;