import * as React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import * as cx from 'classnames';

import {withStyles, StyleRules} from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const appLogo = require('../../assets/svg/app.svg') as string;
const companyLogo = require('../../assets/svg/company.svg') as string;

class LoadingBarComponent extends React.Component<any,any>{

    state = {
        completed:0,
        count:0,
    };

    timer = null;

    componentDidMount(){
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    progress = ()=>{
        const {completed, count} = this.state;
        if(completed === 100){
            this.setState({completed:0, count: 0 });
        }else{
            this.setState({
               completed: Math.min( Math.round(100*count/(count+2)),100),
               count: count +1,
            });
        }
    };

    render(){
      const { classes } = this.props;
      return(
          <LinearProgress
              className={classes.loadingProgressBar}
              variant={"determinate"}
              value={this.state.completed}
          />
      );
    }

}

const style:any={
    container:{
        position:'relative',
        width:'100%',
        height:'100%',
        overflow:'hidden',
        background:'linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
    },
    appLogoImg:{
        position:'absolute',
        top:'calc(15% + 7px)',
        left:'calc(15% - 70px)',
        width:'60px',
        height:'60px',
    },
    appName:{
        position:'absolute',
        top:'15%',
        left:'15%',
        fontFamily:'"Arial Black", Gadget, sans-serif',
        fontSize:'3rem',
        fontWeight:'bold',
        color:"white",
    },
    versionStr:{
        position:'absolute',
        top:'35%',
        right:'20%',
        fontFamily:'"Arial Black", Gadget, sans-serif',
        fontSize:'1.2rem',
        color:'white',
    },
    loadingProgressBar:{
        position:'absolute',
        top:'66%',
        left:'15%',
        right:'15%',

    },
    companyLogImg:{
        position:'absolute',
        bottom:'40px',
        right:'60px',
        width:'40px',
    },
};

const LoadingBar = withStyles(style)(LoadingBarComponent);

class LoadingComponent extends React.Component<any,any>{
    render(){
        const {classes} = this.props;

        return(
            <div className={classes.container}>
                <img src={appLogo} className={classes.appLogoImg} />
                <div className={classes.appName}>Openfin react starter</div>
                <div className={classes.versionStr}>{process.env['REACT_APP_VERSION']}</div>
                <LoadingBar/>
                <img src={companyLogo} className={classes.companyLogImg} />
                <Particles
                    width={"100%"}
                    height={"100%"}
                />
            </div>
        );
    }
}

export default connect(
    (state:any) => ({
        loading:state.application.loading,
    }),
    dispatch => ({
        actions:{

        }
    })
)(withStyles(style)(LoadingComponent));