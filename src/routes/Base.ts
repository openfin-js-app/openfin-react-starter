import * as React from 'react';
import {SvgIconProps} from '@material-ui/core/SvgIcon'

export type RouteItem = (RouteCompItem|RouteRedirectItem);

export interface RouteCompItem {
    path:string,
    sidebarName?:string,
    navbarName?:string,
    icon?:React.ComponentType<SvgIconProps>,
    component:React.ComponentType<any>,
    [key:string]:any,
}

export interface RouteRedirectItem {
    redirect:boolean,
    path:string,
    to:string,
    navbarName:string,
}