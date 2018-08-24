import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { Applcation, Window } from '@albertli/redux-openfin';

import { applicationNewSnackbar } from '../../redux';

import { buttonStyle } from '../../assets/jss/openfin-starter';

const style = {
    primary: buttonStyle.primary,
    info: buttonStyle.info,
    success: buttonStyle.success,
    warning: buttonStyle.warning,
    danger: buttonStyle.danger,
    rose: buttonStyle.rose,
    white: buttonStyle.white,
    simple: buttonStyle.simple,
};

class AccessbilityView extends React.Component<any,any>{
    render(){

        const { classes } = this.props;

        return(
            <React.Fragment>
                <Typography
                    variant={"title"} gutterBottom
                >
                    Accessibility view works
                </Typography>

                <Button size={"small"} variant={"contained"} className={classes.primary}
                >Primary</Button>
                <Button size={"small"} variant={"contained"} className={classes.info}
                >Info</Button>
                <Button size={"small"} variant={"contained"} className={classes.success}
                >Success</Button>
                <Button size={"small"} variant={"contained"} className={classes.warning}
                >Warning</Button>
                <Button size={"small"} variant={"contained"} className={classes.danger}
                >Danger</Button>
                <Button size={"small"} variant={"contained"} className={classes.rose}
                >Rose</Button>


            </React.Fragment>
        )
    }
}

export default withStyles(style)(AccessbilityView);