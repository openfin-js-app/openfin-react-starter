export default (el:any,rawPlatform:string) =>{
    if(!el){
        return
    }

    const platform = rawPlatform.toLowerCase();
    let cls;

    if (platform.match(/mac/gi)){
        cls = 'mac';
    }else if (platform.match(/win/gi)){
        cls = 'win';
    }else {
        cls = 'unknown';
    }

    el.classList.add(`platform-${cls}`);
}