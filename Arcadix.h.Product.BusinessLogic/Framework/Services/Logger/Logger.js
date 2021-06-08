//const log = (strTextMessage, value) => {
//    if()
//}
export default class Logger {
    constructor(DEBUG) {
        this.DEBUG = DEBUG
    }
    Log(strTextMessage, value = "") {

        if (!global["mode"]) {

            if (this.DEBUG) {
                //debug is true, log everything
                console.log(strTextMessage, value)
            }
            else {
                var strOverrideModule = QueryString.GetQueryStringValue('OverrideLog'); //gives the module name where logging has to overridden
                var arrOverrideModules = strOverrideModule.split(',');
                arrOverrideModules = arrOverrideModules.filter(x => x !== "");
                var browserUrl = window && window.location ? window.location.pathname : "/react-native/SchoolNative/";
                var arrBrowserUrl = browserUrl.split("/");

                var strServiceNav = QueryString.GetQueryStringValue('ServiceNavigation');
                var arrServiceNavigation = strServiceNav.split('/');

                //first check for service nav. if logging is off, stop it right there
                if (strServiceNav !== "") {
                    if (arrOverrideModules.includes(arrServiceNavigation[0]) || arrOverrideModules.includes(arrServiceNavigation[1])) {
                        console.log(strTextMessage, value)
                    }
                    else {
                        //not logging at all, need not check for main/sub navs 
                    }
                }
                else {
                    //normal nav.
                    if (arrOverrideModules.includes(arrBrowserUrl[2]) || arrOverrideModules.includes(arrBrowserUrl[3]))
                        console.log(strTextMessage, value)
                }

            }
        }
        else {
            console.log(strTextMessage, value)
        }
    }
    LogError(strTextMessage, value = "") {
        console.error(strTextMessage, value);
    }
}
