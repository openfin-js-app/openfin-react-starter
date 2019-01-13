import { Theme, createStyles } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import {
    primaryColor, warningColor, dangerColor, successColor, infoColor, roseColor
} from '../../openfin-starter-constant';

const snackbarContent = (theme:Theme) => createStyles({
    outmostContent:{
        minWidth: 288,
        maxWidth: 568,
        borderRadius: 4,
    },
    primary:{
        backgroundColor:primaryColor,
    },
    success:{
        backgroundColor:green[600],
    },
    error:{
        backgroundColor:theme.palette.error.dark,
    },
    info:{
        backgroundColor:infoColor,
    },
    warning:{
        backgroundColor:amber[700],
    },
    rose:{
        backgroundColor:roseColor,
    },
    icon:{
        fontSize:20,
    },
    iconVariant:{
        opacity:0.9,
        marginRight: theme.spacing.unit,
    },
    message:{
        display:"flex",
        alignItems: 'center',
    },
});

export default snackbarContent;