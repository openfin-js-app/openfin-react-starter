import * as React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import SplitterLayout from 'react-splitter-layout';
import ReactJson from 'react-json-view';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';

import { withStyles } from '@material-ui/core/styles';
import * as cx from 'classnames';

import {ConfigField as ConfigFieldComp} from '../../components';

import {configViewStyle as style} from '../../assets/jss/openfin-starter';

import { ConfigTab, ConfigField } from '../../redux/config/types';

class ConfigView extends React.Component<any,any>{

    state = {
        currentTab:0,
    };

    render(){

        const {
            classes,
            config,
        } = this.props;

        const {currentTab} = this.state;

        const tabs:ConfigTab[] = config._tabs;
        const tabName = tabs[currentTab]._name;

        return (<React.Fragment>
            <div className={classes.topInputContainer}>
                <TextField
                    id={'filter-string-input'}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position={'start'}>
                                <SearchIcon/>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink:true,
                    }}
                    placeholder={'Input to filter the configutation setting items'}
                    fullWidth
                    margin={'dense'}
                />
                <div className={classes.configContainer}>
                    <SplitterLayout primaryMinSize={200} secondaryMinSize={600} secondaryInitialSize={800}>
                        <div className={classes.configLeftSection}>
                            <Scrollbars>
                                <List>
                                    {tabs.map((oneTab:ConfigTab,index:number)=>{
                                        return(
                                            <ListItem button className={cx('active')} key={index} dense={true}>
                                                <ListItemIcon>
                                                    {oneTab._svgUrl?<img src={oneTab._svgUrl}/>:<oneTab._icon/>}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={oneTab._label}
                                                />
                                                {currentTab==index?
                                                    <ListItemSecondaryAction>
                                                        <CheckIcon/>
                                                    </ListItemSecondaryAction>
                                                :null}
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Scrollbars>
                        </div>
                        <Scrollbars>
                            <div className={classes.configMainSection}>
                                <GridList cellHeight={50} className={classes.configMainGridList} cols={12}>
                                    {tabs[currentTab]._fields.map((oneField:ConfigField,index:number)=>(
                                        <GridListTile key={index} cols={oneField._cols || 3} rows={oneField._rows || 1}>
                                            <ConfigFieldComp
                                                value={config[tabName][oneField._name]}
                                                {...oneField}
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                            <ReactJson src={config} theme={'monokai'}/>
                            <div style={{marginBottom:'100px'}}/>
                        </Scrollbars>
                    </SplitterLayout>
                </div>
            </div>
        </React.Fragment>);
    }
}

export default connect(
    (state:any)=>({
        config:state.config,
    }),
    dispatch => ({
        actions:{

        }
    })
)(withStyles(style)(ConfigView));