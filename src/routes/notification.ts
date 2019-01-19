import { RouteItem } from './Base';

import SampleNotification from '../views/NotificationViews/SampleNotification';

const notificationRoutes:RouteItem[]=[
    {
        path:'/notification/sample',
        component: SampleNotification,
    }
]

export default notificationRoutes;