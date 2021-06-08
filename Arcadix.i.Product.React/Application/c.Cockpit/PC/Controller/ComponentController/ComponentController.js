import loadable from '@loadable/component';
import Logger from '@shared/Framework/Services/Logger/Logger';

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';

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
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/c.Cockpit/PC/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/Master'));
    },
    NavigationCommonPage: function () {
        return loadable(() => import(/* webpackChunkName: "NavigationCommonPage" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage'));
    },
    MasterAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "MasterAddEdit" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/MasterAddEdit'));
    },
    ErrorPopup:  function () {
        return loadable(() => import(/* webpackChunkName: "ErrorPopup" */ '@root/Framework/Blocks/Popup/PopupType/ErrorPopup/ErrorPopup'));
    },
    ConfirmationPopup:  function () {
        return loadable(() => import(/* webpackChunkName: "ConfirmationPopup" */ '@root/Framework/Blocks/Popup/PopupType/ConfirmationPopup/ConfirmationPopup'));
    },
    MainClient:function () {
        return loadable(() => import(/* webpackChunkName: "MainClient" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClient/MainClient'));
    },
    AddEditMainClient: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditMainClient" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient'));
    },
    MainClientConfiguration: function () {
        return loadable(() => import(/* webpackChunkName: "MainClientConfiguration" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientConfiguration/MainClientConfiguration'));
    },
    AddEditMainClientConfiguration: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditMainClientConfiguration" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration'));
    },
    Preload: function () {
        return loadable(() => import(/* webpackChunkName: "Preload" */ '@root/Application/c.Cockpit/PC/Modules/SoftwareEngineerSupport/Preload/Preload'));
    },
    CurrentExecutionName: function () {
        return loadable(() => import(/* webpackChunkName: "CurrentExecutionName" */ '@root/Application/c.Cockpit/PC/Modules/SoftwareEngineerSupport/Preload/CurrentExecutionName/CurrentExecutionName'));
    },
    ViewOfflineExecution: function () {
        return loadable(() => import(/* webpackChunkName: "ViewOfflineExecution" */ '@root/Framework/Controls/Offline/ViewOffineExecution/ViewOffineExecution'));
    },
    ClientConfiguration: function () {
        return loadable(() => import(/* webpackChunkName: "ClientConfiguration" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ClientConfiguration/ClientConfiguration'));
    },
    AddEditClientConfiguration: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditClientConfiguration" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration'));
    },
    MainClientThemeConfiguration:  function () {
        return loadable(() => import(/* webpackChunkName: "MainClientThemeConfiguration" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration'));
    },
    AddEditMainClientThemeConfiguration:  function () {
        return loadable(() => import(/* webpackChunkName: "AddEditMainClientThemeConfiguration" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration'));
    },
    Client: function () {
        return loadable(() => import(/* webpackChunkName: "Client" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/Client/Client'));
    },
    AddEditClient: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditClient" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/Client/AddEditClient/AddEditClient'));
    },
    ClientHostUrl: function () {
        return loadable(() => import(/* webpackChunkName: "ClientHostUrl" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ClientHostUrl/ClientHostUrl'));
    },
    AddEditClientHostUrl: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditClientHostUrl" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl'));
    },
    IntranetAdministrator: function () {
        return loadable(() => import(/* webpackChunkName: "IntranetAdministrator" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/IntranetAdministrator/IntranetAdministrator'))
    },
    AddEditIntranetAdministrator: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditIntranetAdministrator" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator'))
    },
    WorkFlow: function () {
        return loadable(() => import(/* webpackChunkName: "WorkFlow" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlow/WorkFlow'));
    },
    AddEditWorkFlow: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditWorkFlow" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow'));
    },
    WorkFlowStatus: function () {
        return loadable(() => import(/* webpackChunkName: "WorkFlowStatus" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlowStatus/WorkFlowStatus'));
    },
    AddEditWorkFlowStatus: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditWorkFlowStatus" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus'));
    }, 
    MainClientApplicationType: function () {
        return loadable(() => import(/* webpackChunkName: "MainClientApplicationType" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientApplicationType/MainClientApplicationType'));
    },
    ApplicationType: function () {
        return loadable(() => import(/* webpackChunkName: "ApplicationType" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ApplicationType/ApplicationType'));
    },
    AddEditApplicationType: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditApplicationType" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ApplicationType/AddEditApplicationType/AddEditApplicationType'));
    },
    Country: function () {
        return loadable(() => import(/* webpackChunkName: "Country" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/Country/Country'));
    },
    AddEditCountry: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditCountry" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/Country/AddEditCountry/AddEditCountry'));
    },
    Language: function () {
        return loadable(() => import(/* webpackChunkName: "Language" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/Language/Language'));
    },
    AddEditLanguage: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditLanguage" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/Language/AddEditLanguage/AddEditLanguage'));
    },
    DbDataLogs: function () {
        return loadable(() => import(/* webpackChunkName: "DbDataLogs" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Logs/HistoryLogs/HistoryLogs'));
    },
    DbDataExceptions: function () {
        return loadable(() => import(/* webpackChunkName: "DbDataExceptions" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Execptions/HistoryExceptions/HistoryExceptions'));
    },
    RedisDataLogs: function () {
        return loadable(() => import(/* webpackChunkName: "RedisDataLogs" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Logs/CurrentLogs/CurrentLogs'));
    },
    RedisDataExceptions: function () {
        return loadable(() => import(/* webpackChunkName: "RedisDataExceptions" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Execptions/CurrentExceptions/CurrentExceptions'));
    },
    //DbDataLogs: function () {
    //    return loadable(() => import(/* webpackChunkName: "DbDataLogs" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/DbData/DbDataLogs/DbDataLogs'));
    //},
    //DbDataExceptions: function () {
    //    return loadable(() => import(/* webpackChunkName: "DbDataExceptions" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/DbData/DbDataExceptions/DbDataExceptions'));
    //},
    //RedisDataLogs: function () {
    //    return loadable(() => import(/* webpackChunkName: "RedisDataLogs" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/RedisData/RedisDataLogs/RedisDataLogs'));
    //},
    //RedisDataExceptions: function () {
    //    return loadable(() => import(/* webpackChunkName: "RedisDataExceptions" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/RedisData/RedisDataExceptions/RedisDataExceptions'));
    //},
    MainClientLanguage: function () {
        return loadable(() => import(/* webpackChunkName: "MainClientLanguage" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientLanguage/MainClientLanguage'));
    },    
    MainClientCountry: function () {
        return loadable(() => import(/* webpackChunkName: "MainClientCountry" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientCountry/MainClientCountry'));
    },
    ProductManagementUser: function () {
        return loadable(() => import(/* webpackChunkName: "ProductManagementUser" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ProductManagementUser/ProductManagementUser'));
    },
    AddEditProductManagementUser: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditProductManagementUser" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser'));
    },
    OnlineHelp: function () {
        return loadable(() => import(/* webpackChunkName: "OnlineHelp" */ '@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/OnlineHelp'));
    },
    AddEditOnlineHelp: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditOnlineHelp" */ '@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp'));
    },
    Tip: function () {
        return loadable(() => import(/* webpackChunkName: "Tip" */ '@root/Application/c.Cockpit/PC/Modules/Tip/Tip'));
    },
    AddEditTip: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTip" */ '@root/Application/c.Cockpit/PC/Modules/Tip/AddEditTip/AddEditTip'));
    },
    OfflineProcess: function () {
        return loadable(() => import(/* webpackChunkName: "OfflineProcess" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcess'));
    },
    OfflineProcessPopup: function () {
        return loadable(() => import(/* webpackChunkName: "OfflineProcessPopup" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup/OfflineProcessPopup'));
    },
    FileWatcher: function () {
        return loadable(() => import(/* webpackChunkName: "FileWatcher" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/FileWatcher/FileWatcher'));
    },
    VimeoPolling: function () {
        return loadable(() => import(/* webpackChunkName: "VimeoPolling" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/VimeoPolling/VimeoPolling'));
    },
    ArcadixAppPool: function () {
        return loadable(() => import(/* webpackChunkName: "ArcadixAppPool" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/ArcadixAppPool/ArcadixAppPool'));
    },
    OneDriveService: function () {
        return loadable(() => import(/* webpackChunkName: "OneDriveService" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/OneDriveService/OneDriveService'));
    },
    Preloader: function () {
        return loadable(() => import(/* webpackChunkName: "Preloader" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/SchedulerServices/Preload/Preload'));
    },
    PreloadPopup: function () {
        return loadable(() => import(/* webpackChunkName: "PreloadPopup" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/SchedulerServices/Preload/PreloadPopup/PreloadPopup'));
    },
    Translator: function () {
        return loadable(() => import(/* webpackChunkName: "Translator" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/SchedulerServices/Translate/Translate'));
    },
    RedisToDb: function () {
        return loadable(() => import(/* webpackChunkName: "RedisToDb" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/SchedulerServices/RedisToDb/RedisToDb'));
    },
    OfflineExecutionDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "OffineExecutionDisplay" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/OffineExecutionDisplay/OffineExecutionDisplay'));
    },
    ActiveServiceStatus: function () {
        return loadable(() => import(/* webpackChunkName: "ActiveServiceStatus" */ '@root/Application/c.Cockpit/PC/Modules/ActivityTracker/WindowServices/ActiveServiceStatus/ActiveServiceStatus'));
    },
};

const ComponentController = {
    GetComponent: function (strUrlParam) {
        console.log("strUrlParam", strUrlParam);
        var strPageName = strUrlParam.split('?')[0];
        if (objComponents[strPageName] != null) {
            try {
                let objComponent = objComponents[strPageName.split('?')[0]]();
                return objComponent;
            }
            catch (error) {
                Logger.LogError("Module Import Error", error);
            }
        }
        else {
            return undefined;
        }
    },
    CheckComponent: function (strPageName) {
        if (objComponents[strPageName.split('?')[0]] !== null) {
            return true;
        }
        else {
            console.log("notfound");
            return false;
        }
    },
    GetFrameworkComponent: function (strFrameworkComponentName) {
        let objFrameworkComponents = FrameworkController.objComponents;
        let objComponent = objFrameworkComponents[strFrameworkComponentName];
        if (objComponent !== undefined && objComponent !== null) {
            try {
                return objComponent();
            }
            catch (error) {
                Logger.LogError("Framework Component", strFrameworkComponentName);
                Logger.LogError("Framework Component Import Error", error);
                console.trace("Import Error");
            }
        }
        else {
            return undefined;
        }
    }
};

export default ComponentController;






