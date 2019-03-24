import * as React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import { makeStyles } from '@material-ui/styles';

import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { useTranslation } from 'react-i18next';

import { sidebarCompStyle as style } from '../../../assets/jss/openfin-starter'

import {RouteItem, IRouteCompItem} from '../../../routes';

interface IProps {
    open:boolean,
    routes:RouteItem[],
    color:string,
    image:string,
}

const useStyles = makeStyles(style);

function activeRoute(routeName:string, props:any){
    return props.location.pathname.indexOf(routeName) > -1;
}

const SidebarComp:React.FunctionComponent<IProps> = (
    props
)=>{
    const {
        open, routes, color, image
    } = props;

    const classes = useStyles();

    const { t, i18n } = useTranslation('menu', { useSuspense: false });

    const links = (
        <List className={classes.list}>
            {routes.map((prop:RouteItem, key:number)=>{
                if (prop.redirect) return null;
                prop = prop as IRouteCompItem;
                const listItemClasses = cx({
                    [" "+classes[color]]:activeRoute(prop.path,props)
                });
                const whiteFontClasses = cx({
                    [" "+classes.whiteFont]:activeRoute(prop.path,props)
                });
                return(<NavLink
                    to={prop.path} key={key}
                    className={classes.item}
                    activeClassName={"active"}
                >
                    <ListItem button className={classes.itemLink + listItemClasses}>
                        <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                            <prop.icon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={t(prop.sidebarName)}
                            className={classes.itemText + whiteFontClasses}
                            disableTypography={true}
                        />
                    </ListItem>
                </NavLink>);
            })}
        </List>
    );

    return(<React.Fragment>
        <Drawer
            anchor={"left"}
            variant={"persistent"}
            open={open}
            classes={{paper:classes.drawerPaper}}
        >
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined?(
                <div className={classes.background}
                     style={{backgroundImage:"url("+image+")"}}
                />
            ):null}
            <Typography
                className={cx(classes.releaseTypo, classes.whiteFont)}
                variant={"body2"} gutterBottom align={"right"}
            >
                {process.env.REACT_APP_VERSION}
            </Typography>
        </Drawer>
    </React.Fragment>);
}

export default SidebarComp;
