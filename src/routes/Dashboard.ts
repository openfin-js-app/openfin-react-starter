import AccessibilityIcon from '@material-ui/icons/Accessibility';

import { RouteItem } from './Base';

import Accessibility from '../views/Accessibility/Accessibility';

const dashboardRoutes:RouteItem[]=[
    {
        path:'/dashboard/accessibility',
        sidebarName:"Accessibility",
        navbarName:"View accessibility [Accessibility]",
        icon: AccessibilityIcon,
        component: Accessibility,
    }
];

export default dashboardRoutes;