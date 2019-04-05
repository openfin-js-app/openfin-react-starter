import * as React from 'react';
import { useContext } from 'react';
import { ApplicationContext } from 'react-openfin';
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
    actions:{
        handleUpdateClientCount:(count:number)=>void
    }

}

const ViewTwo:React.FunctionComponent<IProps> = (
    {
        clientCount,
        actions:{
            handleUpdateClientCount
        }
    }
)=>{

    const {
        state:{
            winTop, winLeft, winWidth, winHeight,
        }
    } = useContext(ApplicationContext);

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
    }),
    dispatch => ({
        actions:{
            handleUpdateClientCount:(count:number)=>{
                dispatch(clientSetValue({count}))
            }
        }
    })
)(ViewTwo);