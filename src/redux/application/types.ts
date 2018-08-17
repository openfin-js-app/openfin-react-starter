export interface ApplicationNewSnackbarOption {
    message:string;
    variant?:'primary'|'success'|'warning'|'error'|'info';
}

export interface ApplicationSetSnackbarStatusOption {
    open:boolean;
}

export interface ApplicationCloseSnackbarOption {
    event?:any;
    reason:string;
}

export interface SnackBarMsg {
    key:number;
    message:string;
    variant:'primary'|'success'|'warning'|'error'|'info';
}

export interface ApplicationState {
    username:string;
    computerName:string;
    deviceId:string;
    deviceUserId:string;
    loading:boolean;
    drawerOpen:boolean;
    launchBarCollapse:boolean;
    snackBarOpen:boolean;
    snackBarMsgInfo:Partial<SnackBarMsg>;
    snackBarMsgQueue:Partial<SnackBarMsg>[];
    openfinVersion:string;
    openfinHostSpec:any;
    windowsState:string;
}