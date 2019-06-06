import * as React from 'react';
import { useContext } from 'react';
import { ApplicationContext } from 'react-openfin';
import { RouteItem } from 'react-openfin-mat-impl'

import { useTranslation } from 'react-i18next';

import cx from 'classnames';

import {makeStyles} from "@material-ui/styles";
import Button from '@material-ui/core/Button';

import dashboardRoutes from '../../routes/Dashboard';
import childWindowRoutes from '../../routes/ChildWindow';

import { clientPrefixComp as style } from '../../assets/jss/sample-name';

interface IProps {
    location?:{
        pathname:string,
    }
}

function makeBrand(props:IProps) {
    let name = null;
    if (props.location.pathname.includes('childWindow')){
        childWindowRoutes.forEach((prop:RouteItem):any => {
            if (prop.path === props.location.pathname){
                name = prop.navbarName;
            }
        });
    }else{
        dashboardRoutes.forEach((prop:RouteItem):any => {
            if (prop.path === props.location.pathname){
                name = prop.navbarName;
            }
        });
    }
    return name;
}

declare const window:any;

const useStyles = makeStyles(style);

const ClientPrefix:React.FunctionComponent<IProps> = (
    props
)=>{

    const { location } = props;

    const classes = useStyles({});

    const {
        actions:{
            onNewSnackBar,
        }
    } = useContext(ApplicationContext);

    const { t, i18n } = useTranslation('menu', { useSuspense: false });

    const bannerLabel = t(makeBrand(props));

    let stylClz;

    if (location.pathname.endsWith('view-one')){
        stylClz = classes.success;
    }else if (location.pathname.endsWith('view-two')){
        stylClz = classes.warning;
    }else{
        stylClz = classes.title;
    }

    const handleBandBtnClick = () =>{
        if (location.pathname.endsWith('view-one')){
            onNewSnackBar({
                message:`Banner of ${bannerLabel} clicked`,
                variant:'success'
            })
        }else if (location.pathname.endsWith('view-two')){
            stylClz = classes.warning;
            onNewSnackBar({
                message:`Banner of ${bannerLabel} clicked`,
                variant:'warning'
            })
        }
    }

    return (
        <Button
            href={"#"} className={stylClz}
            onClick = {handleBandBtnClick}
        >
            {t('appName')+"|"+ bannerLabel}
        </Button>
    )
}

export default ClientPrefix;