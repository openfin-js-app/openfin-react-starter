import * as React from 'react';
import { connect } from 'react-redux';

import {
    IRootState,
    clientSetValue,
} from '../../redux';

import {
    ClientCounter
} from '../../components';

interface IProps {
    clientCount:number,
    actions:{
        handleUpdateClientCount:(count:number)=>void
    }

}
class ViewTwo extends React.Component<IProps,{}>{
    render(){

        const {
            clientCount,
            actions:{
                handleUpdateClientCount
            }
        } = this.props;

        return(
            <React.Fragment>
                <span>ViewTwo works</span>
                <ClientCounter
                    count={clientCount}
                    onChange={handleUpdateClientCount}
                />
            </React.Fragment>
        );
    }
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