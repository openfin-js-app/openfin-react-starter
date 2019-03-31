import * as React from 'react';
import { useState, useContext }from 'react';
import {
    ConfigContext,
    IConfigField,
    IConfigTab,
    MuiTheme,
} from 'react-openfin';
import {Scrollbars} from 'react-custom-scrollbars';
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

import { makeStyles } from '@material-ui/styles';

import {useTranslation} from 'react-i18next';

import cx from 'classnames';

import {ConfigField as ConfigFieldComp} from '../../components';

import {configViewStyle as style} from '../../assets/jss/openfin-starter';

const useStyles = makeStyles(style);

const ConfigView:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles();

    const {
        config,
        actions:{
            onUpdateGlobalFilterString,
            onUpdateOneField,
        }
    } = useContext(ConfigContext);

    const theme = config.application.theme;
    const globalFilterString = config.configGlobalFilterString;

    const [ currentTab, setCurrentTab] = useState<number>(0);
    const { t, i18n } = useTranslation('config', { useSuspense: false });

    const getTabIcon = (oneTab:IConfigTab)=>{
        if (theme === MuiTheme.DARK && oneTab._svgUrl_dark){
            return oneTab._svgUrl_dark;
        }
        return oneTab._svgUrl;
    }

    function handleTabItemClick(tabNumber:number){
        return ()=> {
            setCurrentTab(tabNumber)
        };
    }

    const tabs:IConfigTab[] = config._tabs;
    const tabName = tabs[currentTab]._name;

    const tabShownCnt = tabs.filter(
        oneTab => (globalFilterString === '' || oneTab._fieldLabels.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1)
    ).length;
    const filedShownCnt = tabs[currentTab]._fields.filter(
        oneField => (globalFilterString === '' || oneField._label.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1)
    ).length;

    const handleGlobalFilterStrChange = (event)=>{
        onUpdateGlobalFilterString(event.target.value);
    }
    const handleUpdateOneField = (tabName:string, fieldName:string)=>(value)=>{
        onUpdateOneField(tabName, fieldName, value);
    }

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
                placeholder={t('common.globalFilterPlaceholder')}
                fullWidth
                onChange={handleGlobalFilterStrChange}
                margin={'dense'}
            />
        </div>
        <div className={classes.configContainer}>
            <SplitterLayout primaryMinSize={200} secondaryMinSize={400} secondaryInitialSize={600}>
                <div className={classes.configLeftSection}>
                    <Scrollbars
                        renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
                    >
                        <List>
                            {tabShownCnt>0?
                                tabs.map((oneTab:IConfigTab, index:number)=>{
                                    if (globalFilterString===''|| oneTab._fieldLabels.toLowerCase().indexOf(globalFilterString.toLowerCase())>-1){
                                        return(
                                            <ListItem button className={cx('active',classes.configLeftListItem)} key={index} dense={true}
                                                      onClick={handleTabItemClick(index)}
                                            >
                                                <ListItemIcon>
                                                    {oneTab._svgUrl?<img src={getTabIcon(oneTab)}/>:<oneTab._icon/>}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={t(oneTab._label)}
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
                                    <Typography variant='body2'>
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
                                    globalFilterString === '' || ( t(oneField._label) as string ).toLowerCase().indexOf(globalFilterString.toLowerCase())>-1?
                                        <GridListTile key={index} cols={oneField._cols || 3} rows={oneField._rows || 1}>
                                            <ConfigFieldComp
                                                value={config[tabName][oneField._name]}
                                                onChange={handleUpdateOneField(tabName,oneField._name)}
                                                {...oneField}
                                            />
                                        </GridListTile>:null
                                )):
                                <Paper style={{width:'100%'}}>
                                    <Typography variant='body2'>
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

export default ConfigView;