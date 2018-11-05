import * as React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';

import { WithStyles, withStyles} from '@material-ui/core/styles';


interface IProps {
    count:number,
    onChange:(count:number)=>void
}

export default class ClientCounterComp extends React.Component<IProps,{}>{


    handleIncBtnClick = ()=>{
        this.props.onChange(
            this.props.count+1
        )
    }

    handleDecBtnClick = ()=>{
        this.props.onChange(
            this.props.count-1
        )
    }

    render(){

        const {
            count, onChange
        } = this.props;

        return(<React.Fragment>
            <span>{count}</span>
            <Button variant="contained" color="primary"
                    onClick={this.handleIncBtnClick}
            >
                Increase
            </Button>
            <Button variant="contained" color="secondary"
                    onClick={this.handleDecBtnClick}
            >
                Decrease
            </Button>
        </React.Fragment>)
    }
}