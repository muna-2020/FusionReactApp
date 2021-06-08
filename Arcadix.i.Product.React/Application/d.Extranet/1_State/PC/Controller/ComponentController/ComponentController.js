import loadable from '@loadable/component';

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'));
    },    
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/Master'));
    },
    Contact: function () {
        return loadable(() => import(/* webpackChunkName: "Contact" */ '@root/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact'));
    },
    Notes: function () {
        return loadable(() => import(/* webpackChunkName: "Notes" */ '@root/Application/d.Extranet/2_School/PC/Modules/Notes/Notes'));
    },
    StateProfile: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolProfile" */ '@root/Application/d.Extranet/1_State/PC/Modules/StateProfile/StateProfile'));
    } 
    ,
    StateModule: function () {
        return loadable(() => import(/* webpackChunkName: "StateModule" */ '@root/Application/d.Extranet/1_State/PC/Modules/StateModule/StateModule'));
    }
};

const ComponentController = {
    GetComponent: function (strUrlParam) {
        console.log("strUrlParam", strUrlParam);
        var strPageName = strUrlParam.split('?')[0];
        if (objComponents[strPageName] !== null) {
            try {
                let objComponent = objComponents[strPageName.split('?')[0]]();
                return objComponent;
            }
            catch (error) {
                Logger.LogError("Module Import Error", error);
            }
        }
        else {
            Logger.LogError("notfound:", strUrlParam);
            return undefined;
        }
    }
};

export default ComponentController;