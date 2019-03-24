import * as React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';

import { WithStyles, withStyles} from '@material-ui/core/styles';


interface IProps {
    count:number,
    onChange:(count:number)=>void
}

const ClientCounterComp:React.FunctionComponent<IProps> = (
    {
        count,onChange,
    }
)=>{

    const handleIncBtnClick = ()=>{
        onChange(
            count+1
        )
    }

    const handleDecBtnClick = ()=>{
        onChange(
            count-1
        )
    }

    return(<React.Fragment>
        <span>{count}</span>
        <Button variant="contained" color="primary"
                onClick={handleIncBtnClick}
        >
            Increase
        </Button>
        <Button variant="contained" color="secondary"
                onClick={handleDecBtnClick}
        >
            Decrease
        </Button>
    </React.Fragment>)

}

export default ClientCounterComp;