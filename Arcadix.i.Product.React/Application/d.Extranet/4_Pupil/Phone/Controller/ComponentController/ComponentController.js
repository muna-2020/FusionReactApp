import loadable from '@loadable/component';

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'));
    },
    PerformanceResponse: function () {
        return loadable(() => import(/* webpackChunkName: "PerformanceView" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/PerformanceResponse/PerformanceResponse'));
    },
    ViewCSRStateProps: function () {
        return loadable(() => import(/* webpackChunkName: "ViewCSRStateProps" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/ViewCSRStateProps/ViewCSRStateProps'));
    },
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ "@root/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Master/Master"));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Home: function () {
        return loadable(() => import(/* webpackChunkName: "Home" */ "@root/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Home/Home"));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    //Pupil: function () {
    //    return loadable(() => import(/* webpackChunkName: "Home" */ "@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home"));
    //    // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    //},
    PupilNews: function () {
        return loadable(() => import(/* webpackChunkName: "PupilNews" */ "@root/Application/d.Extranet/4_Pupil/Phone/Modules/PupilNews/PupilNews"));
    },
    PupilAddContactPopup: function () {
        return loadable(() => import(/* webpackChunkName: "PupilAddContactPopup" */ "@root/Application/d.Extranet/4_Pupil/Phone/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/PupilAddContactPopup"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilShareNewsPopup: function () {
        return loadable(() => import(/* webpackChunkName: "PupilShareNewsPopup" */ '@root/Application/d.Extranet/4_Pupil/Phone/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/PupilShareNewsPopup'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
};

const ComponentController = {
    GetComponent: function (strComponentName) {
        if (objComponents[strComponentName.split('?')[0]] !== null) {
            return objComponents[strComponentName.split('?')[0]]();
        } else {
            return undefined;
        }
    }
};

export default ComponentController;
