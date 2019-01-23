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
        sidebarName:"accessibility.sidebar",
        navbarName:"accessibility.navbar",
        icon: AccessibilityIcon,
        component: Accessibility,
    },
    {
        path:'/childWindow/view-one',
        sidebarName:"viewOne.sidebar",
        navbarName:"viewOne.navbar",
        icon: BusinessIcon,
        component: ViewOne,
    },
    {
        path:'/childWindow/view-two',
        sidebarName:"viewTwo.sidebar",
        navbarName:"viewTwo.navbar",
        icon: ChatIcon,
        component: ViewTwo,
    },
    {
        path:'/childWindow/report',
        sidebarName:"report.sidebar",
        navbarName:"report.navbar",
        icon: ReportIcon,
        component: ReportView,
    },
];

export default childRoutes;