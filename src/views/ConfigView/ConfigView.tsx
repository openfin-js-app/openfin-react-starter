import * as React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import SplitterLayout from 'react-splitter-layout';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';

import { WithStyles, withStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import {ConfigField as ConfigFieldComp} from '../../components';

import {configViewStyle as style} from '../../assets/jss/openfin-starter';

import { IConfigTab, IConfigField } from '../../redux/config/types';

import { configUpdateOneField, configUpdateGlobalFilterStr } from '../../redux'

import {IConfigState} from '../../redux/config/types';

interface IProps extends WithStyles<typeof style>{
    config:IConfigState,
    globalFilterString:string,
    actions:{
        handleGlobalFilterStrChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        handleUpdateOneField:( tabName:string, fieldName:string )=>(value:any)=>void,
    }
}

interface IState {
    currentTab:number,
}

class ConfigView extends React.Component<IProps,IState>{

    state = {
        currentTab:0,
    };

    handleTabItemClick(currentTab){
        return function () {
            this.setState({currentTab})
        }.bind(this);
    }

    render(){

        const {
            classes,
            config,globalFilterString,
            actions:{
                handleGlobalFilterStrChange,
                handleUpdateOneField,
            }
        } = this.props;

        const {currentTab} = this.state;

        const tabs:IConfigTab[] = config._tabs;
        const tabName = tabs[currentTab]._name;

        const tabShownCnt = tabs.filter(
            oneTab => (globalFilterString === '' || oneTab._fieldLabels.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1)
        ).length;
        const filedShownCnt = tabs[currentTab]._fields.filter(
            oneField => (globalFilterString === '' || oneField._label.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1)
        ).length;

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
                    onChange={handleGlobalFilterStrChange}
                    margin={'dense'}
                />
            </div>
            <div className={classes.configContainer}>
                <SplitterLayout primaryMinSize={200} secondaryMinSize={600} secondaryInitialSize={800}>
                    <div className={classes.configLeftSection}>
                        <Scrollbars
                            renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
                        >
                            <List>
                                {tabShownCnt>0?
                                    tabs.map((oneTab:IConfigTab, index:number)=>{
                                        if (globalFilterString===''|| oneTab._fieldLabels.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1){
                                            return(
                                                <ListItem button className={cx('active')} key={index} dense={true}
                                                          onClick={this.handleTabItemClick(index)}
                                                >
                                                    <ListItemIcon>
                                                        {oneTab._svgUrl?<img src={oneTab._svgUrl}/>:<oneTab._icon/>}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={oneTab._label}
                                                    />
                                                    {currentTab===index?
                                                        <ListItemSecondaryAction>
                                                            <CheckIcon/>
                                                        </ListItemSecondaryAction>
                                                        :null}
                                                </ListItem>
                                            );
                                        }else{
                                            return null;
                                        }
                                    }):
                                    <Paper>
                                        <Typography component={"p"}>
                                            Not found ...
                                        </Typography>
                                    </Paper>
                                }
                            </List>
                        </Scrollbars>
                    </div>
                    <Scrollbars
                        renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
                    >
                        <div className={classes.configMainSection}>
                            <GridList cellHeight={52} className={classes.configMainGridList} cols={12}>
                                {filedShownCnt>0?
                                    tabs[currentTab]._fields.map((oneField:IConfigField, index:number)=>(
                                        globalFilterString === '' || oneField._label.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1?
                                        <GridListTile key={index} cols={oneField._cols || 3} rows={oneField._rows || 1}>
                                            <ConfigFieldComp
                                                value={config[tabName][oneField._name]}
                                                onChange={handleUpdateOneField(tabName,oneField._name)}
                                                {...oneField}
                                            />
                                        </GridListTile>:null
                                    )):
                                    <Paper style={{width:'100%'}}>
                                        <Typography component={"p"}>
                                            Not found ...
                                        </Typography>
                                    </Paper>
                                }
                            </GridList>
                        </div>
                        <div style={{marginBottom:'100px'}}/>
                    </Scrollbars>
                </SplitterLayout>
            </div>
        </React.Fragment>);
    }
}

export default connect(
    (state:any)=>({
        config:state.config,
        globalFilterString:state.config.configGlobalFilterString,
    }),
    dispatch => ({
        actions:{
            handleGlobalFilterStrChange:(event)=>{
                dispatch(configUpdateGlobalFilterStr({configGlobalFilterString:event.target.value}))
            },
            handleUpdateOneField: (tabName:string, fieldName:string)=>(value)=>{
                dispatch(configUpdateOneField({
                    name:`${tabName}.${fieldName}`,
                    value,
                }))
            }
        }
    })
)(withStyles(style)(ConfigView));