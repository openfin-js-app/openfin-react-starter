export interface IApplicationNewSnackbarOption {
    message:string;
    variant?:'primary'|'success'|'warning'|'error'|'info'|'rose';
}

export interface IApplicationSetSnackbarStatusOption {
    open:boolean;
}

export interface IApplicationCloseSnackBarOption {
    event?:any;
    reason:string;
}

export interface ISnackBarMsg {
    key:number;
    message:string;
    variant:'primary'|'success'|'warning'|'error'|'info';
}

export interface IApplicationState {
    username:string;
    computerName:string;
    deviceId:string;
    deviceUserId:string;
    loading:boolean;
    drawerOpen:boolean;
    launchBarCollapse:boolean;
    snackBarOpen:boolean;
    snackBarMsgInfo:Partial<ISnackBarMsg>;
    snackBarMsgQueue:Array<Partial<ISnackBarMsg>>;
    openfinVersion:string;
    openfinHostSpec:any;
    windowsState:string;
}