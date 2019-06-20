import { RouteItem } from 'react-openfin-mat-impl';

import SampleNotification from '../views/NotificationViews/SampleNotification';

import { mapToPublicPathname } from './utils';

const notificationRoutes:RouteItem[]=[
    {
        path:'/notification/sample',
        component: SampleNotification,
    }
]

export default notificationRoutes.map(mapToPublicPathname);