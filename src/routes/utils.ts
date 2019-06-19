import {RouteItem} from 'react-openfin-mat-impl';

let localPublicPathname;
try {
    localPublicPathname = new URL(process.env.PUBLIC_URL).pathname
}catch(e){
    localPublicPathname=process.env.PUBLIC_URL
}

export const publicPathname = localPublicPathname;

export function mapToPublicPathname(routeItem:RouteItem):RouteItem {
    routeItem.path = localPublicPathname + routeItem.path;
    return routeItem;
}
