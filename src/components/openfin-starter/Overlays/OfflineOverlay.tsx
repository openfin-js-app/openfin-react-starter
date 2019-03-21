import * as React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { WithStyles, withStyles} from '@material-ui/core/styles';

import { offlineOverlayStyle as style } from '../../../assets/jss/openfin-starter';

const noInternetConn:string = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDk5Ljk0MyA0OTkuOTQzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTkuOTQzIDQ5OS45NDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTc5LjM5LDIzMC44OTVjLTIyLjk3OSwwLTQxLjYwNiwxOC42MTgtNDEuNjA2LDQxLjYwN1YzOTMuODVjMCwyMi45NjksMTguNjI4LDQxLjYwNSw0MS42MDYsNDEuNjA1aDYuMTk2ICAgYzIyLjk3OSwwLDQxLjYwNi0xOC42MjcsNDEuNjA2LTQxLjYwNVYyNzIuNTAyYzAtMjIuOTc5LTE4LjYyNy00MS42MDctNDEuNjA2LTQxLjYwN0gxNzkuMzlMMTc5LjM5LDIzMC44OTV6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMzE1Ljc2MSw0MzUuNDU1aDYuMTk2YzIyLjk3OSwwLDQxLjYwNi0xOC42MjcsNDEuNjA2LTQxLjYwNVYyMDMuMTU0YzAtMjIuOTY5LTE4LjYyOC00MS42MDYtNDEuNjA2LTQxLjYwNmgtNi4xOTYgICBjLTIyLjk3OSwwLTQxLjYwNiwxOC42MjgtNDEuNjA2LDQxLjYwNlYzOTMuODVDMjc0LjE2NCw0MTYuODE4LDI5Mi43OTEsNDM1LjQ1NSwzMTUuNzYxLDQzNS40NTV6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNNDU4LjMzNyw2NC40NzloLTYuMjA2Yy0yMi45NjksMC00MS41OTcsMTguNjI3LTQxLjU5Nyw0MS42MDZ2Mjg3Ljc3NGMwLDIyLjk2OSwxOC42MjgsNDEuNjA1LDQxLjU5Nyw0MS42MDVoNi4yMDYgICBjMjIuOTc5LDAsNDEuNjA2LTE4LjYyNyw0MS42MDYtNDEuNjA1VjEwNi4wNzVDNDk5Ljk0Myw4My4xMDYsNDgxLjMxNiw2NC40NzksNDU4LjMzNyw2NC40Nzl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNOTkuMDM2LDM5My44NXYtNzEuNjYyYzAtMjIuOTY5LTE4LjYzOC00MS42MDUtNDEuNjA2LTQxLjYwNWgtNi4xOTdjLTIyLjk3OSwwLTQxLjYwNiwxOC42MjctNDEuNjA2LDQxLjYwNXY3MS42NjIgICBjMCwyMi45NjksMTguNjM3LDQxLjYwNSw0MS42MDYsNDEuNjA1aDYuMTk3QzgwLjM5OCw0MzUuNDU1LDk5LjAzNiw0MTYuODE4LDk5LjAzNiwzOTMuODV6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMjIuNDQsMjMzLjk1NWwzMC45OTItMzAuOTkybDMwLjk4MiwzMC45OTJjNS4xMzUsNS4xMzUsMTMuNDU0LDUuMTM1LDE4LjU4OSwwYzUuMTQ1LTUuMTM1LDUuMTM1LTEzLjQ1NSwwLTE4LjU4OSAgIGwtMzAuOTgyLTMwLjk4M2wzMC45ODItMzAuOTgyYzUuMTM1LTUuMTM1LDUuMTM1LTEzLjQ1NCwwLTE4LjU4OXMtMTMuNDU1LTUuMTM1LTE4LjU4OSwwbC0zMC45ODIsMzAuOTgyTDIyLjQ0LDEzNC44MTEgICBjLTUuMTM1LTUuMTM1LTEzLjQ1NS01LjEzNS0xOC41ODksMGMtNS4xMzUsNS4xMzUtNS4xMzUsMTMuNDQ1LDAsMTguNThsMzAuOTkyLDMwLjk5MkwzLjg2LDIxNS4zNjUgICBjLTUuMTM1LDUuMTM1LTUuMTM1LDEzLjQ1NCwwLDE4LjU4OUM4Ljk4NiwyMzkuMDg5LDE3LjMxNSwyMzkuMDg5LDIyLjQ0LDIzMy45NTV6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPC9zdmc+Cg==';

interface IProps extends WithStyles<typeof style>{
    onClose:(...args:any[])=>void
}

const OfflineOverlayComp:React.FunctionComponent<IProps> = (
    {
        classes, onClose,
    }
)=>{

    const handleReloadBtnClick = ()=>{
        location.reload();
    }

    return(<div className={classes.outmostContainer}>

        <img className={cx(classes.bannerImg, classes.oneRow)} src={noInternetConn}/>
        <Typography
            className={classes.oneRow}
            variant="h4" gutterBottom align="center"
        >
            Network disconnected
        </Typography>

        <div className={cx(classes.controlBtnContainer)}>
            <Button variant="outlined" color="primary" className={classes.button}
                    onClick={handleReloadBtnClick}
            >
                Reload
            </Button>
            <Button variant="outlined" color="secondary" className={classes.button}
                    onClick={onClose}
            >
                Exit
            </Button>
        </div>
    </div>)

}

export default withStyles(style)(OfflineOverlayComp);