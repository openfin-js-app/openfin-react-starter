import * as React from 'react';
import { useContext } from 'react';
import { ApplicationContext } from 'react-openfin';

import { ClientContext } from '../../reduxs/client/context';

import {
    ClientCounter
} from '../../components';

const ViewTwo:React.FunctionComponent<{}> = (
    {
    }
)=>{

    const {
        state:{
            winTop, winLeft, winWidth, winHeight,
        }
    } = useContext(ApplicationContext);

    const {
        state:{
            count
        },
        actions:{
            updateClientCount
        }
    } = useContext(ClientContext);

    return(
        <React.Fragment>
            <div><span>ViewTwo works</span></div>
            <div><span>X:&lt;{winLeft}&gt;|Y:&lt;{winTop}&gt;|W&lt;{winWidth}&gt;H&lt;{winHeight}&gt;</span></div>
            <ClientCounter
                count={count}
                onChange={updateClientCount}
            />
        </React.Fragment>
    );
}

export default ViewTwo;