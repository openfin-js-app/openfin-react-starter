import * as React from 'react';
import { useState, useEffect } from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import { Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {useTranslation} from 'react-i18next';

import appLogo from'../../assets/svg/app.svg';
import companyLogo from'../../assets/svg/company.svg';

const style = (theme:Theme) => createStyles({
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
});

const useStyles = makeStyles(style);

interface ILoadingBarComponentState{
    completed:number,
    count:number,
}

export const LoadingBarComponent:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles();

    const [state,setState] = useState<ILoadingBarComponentState>({
        completed:0,
        count:0,
    });

    let timer = null;

    const progress = ()=>{
        const {completed, count} = state;
        if(completed === 100){
            setState({completed:0, count: 0 });
        }else{
            setState({
                completed: Math.min( Math.round(100*count/(count+2)),100),
                count: count +1,
            });
        }
    };

    useEffect(()=>{
        timer = setInterval(progress, 500);
        return ()=>{
            clearInterval(timer);
        }
    });

    return(
        <LinearProgress
            className={classes.loadingProgressBar}
            variant={"determinate"}
            value={state.completed}
        />
    );

}

interface IProps{
    loading:boolean,
    loadingMsg:string,
}

const LoadingComponent:React.FunctionComponent<IProps> = (
    {
        loadingMsg,
    }
) => {

    const classes = useStyles();

    const { t, i18n } = useTranslation('landing', { useSuspense: false });

    return(
        <div className={classes.container}>
            <img src={appLogo} className={classes.appLogoImg} />
            <div className={classes.appName}>{t('appName')}</div>
            <div className={classes.versionStr}>{process.env.REACT_APP_VERSION}</div>
            <LoadingBarComponent/>
            <img src={companyLogo} className={classes.companyLogImg} />
            <div className={classes.statusMsg}>{t(loadingMsg)}</div>
            <Particles
                width={"100%"}
                height={"100%"}
            />
        </div>
    );
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
)(LoadingComponent);