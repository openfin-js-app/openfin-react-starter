import * as React from 'react';
import { connect } from 'react-redux';

import {
    IRootState,
    clientSetValue,
} from '../../reduxs';

import {
    ClientCounter
} from '../../components';

interface IProps {
    clientCount:number,
    winTop:number;
    winLeft:number;
    winWidth:number;
    winHeight:number;
    actions:{
        handleUpdateClientCount:(count:number)=>void
    }

}

const ViewTwo:React.FunctionComponent<IProps> = (
    {
        clientCount,
        winTop,winLeft,winWidth,winHeight,
        actions:{
            handleUpdateClientCount
        }
    }
)=>{
    return(
        <React.Fragment>
            <div><span>ViewTwo works</span></div>
            <div><span>X:&lt;{winLeft}&gt;|Y:&lt;{winTop}&gt;|W&lt;{winWidth}&gt;H&lt;{winHeight}&gt;</span></div>
            <ClientCounter
                count={clientCount}
                onChange={handleUpdateClientCount}
            />
        </React.Fragment>
    );
}

export default connect(
    (state:IRootState)=>({
        clientCount : state.client.count,
        winTop : state.application.winTop,
        winLeft : state.application.winLeft,
        winWidth : state.application.winWidth,
        winHeight : state.application.winHeight,
    }),
    dispatch => ({
        actions:{
            handleUpdateClientCount:(count:number)=>{
                dispatch(clientSetValue({count}))
            }
        }
    })
)(ViewTwo);