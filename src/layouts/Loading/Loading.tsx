import * as React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

import { withTranslation, WithTranslation } from 'react-i18next';

import appLogo from'../../assets/svg/app.svg';
import companyLogo from'../../assets/svg/company.svg';

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
        width:'100vw',
        height:'100vh',
        overflow:'hidden',
        background:'linear-gradient(141deg,  #4dd0e1, #26c6da, #00bcd4, #00acc1, #0097a7, #00838f, #006064)',
        backgroundSize: '200%',
        animation: 'gba 5s infinite',
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
    statusMsg:{
        color:'white',
        position:'absolute',
        top:'calc( 66% + 20px )',
        left:'calc( 15% + 20px )',
        right:'calc( 15% + 20px )',
        fontFamily:'"Arial Black", Gadget, sans-serif',
    },
    companyLogImg:{
        position:'absolute',
        bottom:'40px',
        right:'60px',
        width:'40px',
    },
};

export const LoadingBar = withStyles(style)(LoadingBarComponent);

interface IProps extends WithStyles<typeof style>, WithTranslation {
    loading:boolean,
    loadingMsg:string,
}

class LoadingComponent extends React.Component<IProps,{}>{
    render(){
        const {
            classes, loadingMsg, t
        } = this.props;

        return(
            <div className={classes.container}>
                <img src={appLogo} className={classes.appLogoImg} />
                <div className={classes.appName}>{t('appName')}</div>
                <div className={classes.versionStr}>{process.env.REACT_APP_VERSION}</div>
                <LoadingBar/>
                <img src={companyLogo} className={classes.companyLogImg} />
                <div className={classes.statusMsg}>{t(loadingMsg)}</div>
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
        loadingMsg:state.application.loadingMsg,
    }),
    dispatch => ({
        actions:{

        }
    })
)(withStyles(style)(
    withTranslation('landing')(LoadingComponent)
));