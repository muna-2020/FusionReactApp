// React related imports.
import React from 'react';
//Objects required for module.
import Object_Framework_SystemTracking_DataLog from '@shared/Object/a.Framework/SystemTracking/DataLog/DataLog';
import Object_Cockpit_MainClient_MainClientApplicationType from '@shared/Object/c.Cockpit/MainClient/MainClientApplicationType/MainClientApplicationType';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';

//Module related imports
import * as HistoryLogs_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs/HistoryLogs_MetaData';
import * as HistoryLogs_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs/HistoryLogs_OfficeRibbon';

/**
 * @name HistoryLogs_ModuleProcessor
 * @param NA
 * @summary Class for HistoryLogs module display.
 * @return NA
 */
class HistoryLogs_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs",
            "Object_Cockpit_ApplicationType",
            "Object_Cockpit_MainClient_MainClientApplicationType",
            "Object_Cockpit_MainClient_MainClient"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];    

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //MainClientApplicationType object
        Object_Cockpit_MainClient_MainClientApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientApplicationType];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name LoadLogData
     * @param {object} objContext
     * @summary Loads the Log data from DB for selected filters.
     */
    LoadLogData(objContext) {
        if (objContext.props.ClientUserDetails.MainClientId == 0 && objContext.state.strMainClientId == -1) {
            var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Logs/CurrentLogs", objContext.props);
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            let dtToday = objContext.state.objSearchFilters.dtToDate;
            dtToday.setHours(0, 0, 0, 0);
            let DateFor = dtToday.getDate() + '.' + (dtToday.getMonth() < 9 ? '0' + (dtToday.getMonth() + 1) : (dtToday.getMonth() + 1)) + '.' + dtToday.getFullYear()
            let objParams = {
                "MainClientId": (objContext.props.ClientUserDetails.MainClientId == 0 ? objContext.state.strMainClientId : objContext.props.ClientUserDetails.MainClientId),
                "MainClient": objContext.state.strMainClient,
                "dtToDate": DateFor,// objContext.state.objSearchFilters.dtToDate.toString(),
                "LogType": (objContext.state.objSearchFilters.strType == 'AllLogs' ? "*" : objContext.state.objSearchFilters.strType),//(objChangeData["OptionValue"] == 'AllExceptions' ? "*" :
                "ApplicationTypeId": objContext.state.objSearchFilters.iApplicationTypeId,
                "ApplicationType": objContext.state.objSearchFilters.vApplicationName,
                "strExceptionOrLog": "DataLogFiles"
            };

            Object_Framework_SystemTracking_DataLog.GetData(objParams, (objReturnData) => {
                let arrReturnData = objReturnData[Object.keys(objReturnData)[0]]["Data"] ? objReturnData[Object.keys(objReturnData)[0]]["Data"] : [];
                objContext.dispatch({ type: "SET_STATE", payload: { arrLogData: arrReturnData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    }

    /**
     * @name GetPreviousDate
     * @param {} null
     * @summary Gets the Previous Date
     * @returns {object} Previous Date
     */
    static GetPreviousDate() {
        let dtToday = new Date();
        dtToday.setHours(0, 0, 0, 0);
        dtToday.setDate(dtToday.getDate() - 1);
        return dtToday;
    }

    /**
     * @name GetMinimunDate
     * @param {} null
     * @summary Gets the Previous Date
     * @returns {object} Previous Date
     */
     GetMinimunDate() {
        let dtToday = new Date();
        dtToday.setHours(0, 0, 0, 0);
        dtToday.setDate(dtToday.getDate() - 1);
        return dtToday;
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: objContext.state.arrLogData ?? [],
            AdditionalPaddingIds: ["FilterBlock"],
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        return {
            ...HistoryLogs_MetaData.GetMetaData()
        };
    }

    /**
   * @name GetResourceData
   * @param {object} objContext
   * @summary it returns the object for TextResource
   * @returns {object} TextResource
   */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs", objContext.props) ?? {};       
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetGridEvents(objContext) {
        let objCallBacks = {
            //OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            //OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows),
        };
        return objCallBacks;
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetCallBackforGrid(objRow, objContext) {
        let objDetailsToDisplay = {
            ...objRow,
            "Name": this.GetNameToDisplay(objRow, objContext)
        }
        return objDetailsToDisplay;
            //, "dtExecutionEnd": strDate + ' ' + strTime 
    }

    /**
     * @name GetSearchViewDropDownData
     * @param {object} objContext objContext
     * @summary   Gets data for search based on folder
     * @return {array} arrDropDownData
     */
    GetLogTypeDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs", objContext.props) ?? {};
        var arrDropDownData = [
            {
                "OptionId": 0,
                "OptionText": objTextResource["AllLogs"],
                "OptionValue":"AllLogs"
            },
            {
                "OptionId": 1,
                "OptionText": objTextResource["Debug"],
                "OptionValue": "Debug"
            },
            {
                "OptionId": 2,
                "OptionText": objTextResource["Info"],
                "OptionValue": "Information"
            }
        ]
        return arrDropDownData;
    }

    /**
     * @name HandleDropdownChange
     * @param {object} event takes event object
     * @param {object} objContext takes objContext
     * @summary Handles change of LogType dropdown
     */
    HandleDropdownChange(strAttribute,objChangeData, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [strAttribute]: objChangeData["OptionValue"] } } });
    }

    /**
    * @name HandleDropdownChange
    * @param {object} event takes event object
    * @param {object} objContext takes objContext
    * @summary Handles change of LogType dropdown
    */
    HandleApplicatioTypeDropdownChange(strAttribute, objChangeData, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [strAttribute]: objChangeData["iApplicationTypeId"], ["vApplicationName"]: (objChangeData["iApplicationTypeId"] == -1 ? "*" : objChangeData["vApplicationName"]) } } });
    }

    /**
     * @name OnMainClientDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnMainClientDropDownChange(objContext, objChangeData) {
        let arrApplicationTypeData = [];
        let arrMainClientApplicationTypeData = objContext.props.Object_Cockpit_MainClient_MainClientApplicationType["Data"].filter(objMainClientApplicationTypeData => {
            return objMainClientApplicationTypeData["iMainClientId"] == objChangeData["iMainClientId"]
        });
        arrMainClientApplicationTypeData.map((objMainClientApplicationTypeData) => {
            arrApplicationTypeData = [...arrApplicationTypeData, ...objContext.props.Object_Cockpit_ApplicationType["Data"].filter(objApplicationTypeData => {
                return objApplicationTypeData["iApplicationTypeId"] == objMainClientApplicationTypeData["iApplicationTypeId"]
            })]
        })
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClient": objChangeData["vMainClientIdentifier"],
                "strMainClientId": objChangeData["iMainClientId"],
                "arrApplicationTypeData": arrApplicationTypeData
            }
        });
    };

    /**
     * @name OnDateChange
     * @param {object} event takes event object
     * @param {object} objContext takes objContext
     * @summary Handles date picker change
     */
    OnDateChange(strAttributeName, strSelectedDate, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [strAttributeName]: strSelectedDate } } });
    }

    /**
     * @name OnSearchClick
     * @param {object} event takes event object
     * @summary Handles Search button click event
     */
    OnSearchClick(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        this.LoadLogData(objContext);
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "ExportToExcel": () => objContext.HistoryLogs_ModuleProcessor.ExportToExcel(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", HistoryLogs_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DatePicker/DatePicker.css"
        ]
    }

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown","DatePicker"]
        }
    }

/**
     * @name
     * @param {any} objRow
     * @param {any} objContext
     * @summary forms the JSX based on the check in status of the document.
     * @return {object} React JSX
     */
    GetNameToDisplay(objRow, objContext) {
        let dtToday = objContext.state.objSearchFilters.dtToDate;
        dtToday.setHours(0, 0, 0, 0);
        let FileName = dtToday.getDate() + '.' + (dtToday.getMonth() < 9 ? '0' + (dtToday.getMonth() + 1) : (dtToday.getMonth() + 1)) + '.' + dtToday.getFullYear()  + '/Details/' + objRow["FileName"] 
        return <div className="flex align-middle pointer">
            <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + FileName + "&Type=ExceptionLogFiles" + "&MainClientId=" + JConfiguration.MainClientId + "&DisplayFileName=" + objRow["FileName"]}>
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: objContext.ImageMeta.DownloadImage
                    }}
                    Events={{
                        //OnClickEventHandler: () => { this.Open(objRow, objContext) }
                    }}
                    ParentProps={objContext.props.ParentProps}
                />
            </a>
        </div >
    }

    /**
     * @name Open
     * @param {any} objRow
     * @param {any} objContext
     * @summary Opens the webNav document reader
     */
    Open(objRow, objContext) {
        let dtToday = objContext.state.objSearchFilters.dtToDate;
        dtToday.setHours(0, 0, 0, 0);
        let FileName = dtToday.getDate() + '.' + (dtToday.getMonth() < 9 ? '0' + (dtToday.getMonth() + 1) : (dtToday.getMonth() + 1)) + '.' + dtToday.getFullYear() + '/Details/' + objRow["FileName"] 
        let vUrltoOpen = JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + FileName + "&Type=ExceptionLogFiles" + "&MainClientId=" + JConfiguration.MainClientId + "&DisplayFileName=" + objRow["FileName"]
        //window.open(vUrltoOpen);

    }


    /**
     * @name GetApplicationTypeData
     * @param {object} objContext props
     * @returns {object} Get ApplicationType
     */
    GetApplicationTypeData(objContext) {
        let arrApplicationTypeData = [];
        if (objContext.props.ClientUserDetails.MainClientId != 0) {
            let arrMainClientApplicationTypeData = objContext.props.Object_Cockpit_MainClient_MainClientApplicationType["Data"].filter(objMainClientApplicationTypeData => {
                return objMainClientApplicationTypeData["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId
            });
            arrMainClientApplicationTypeData.map((objMainClientApplicationTypeData) => {
                arrApplicationTypeData = [...arrApplicationTypeData, ...objContext.props.Object_Cockpit_ApplicationType["Data"].filter(objApplicationTypeData => {
                    return objApplicationTypeData["iApplicationTypeId"] == objMainClientApplicationTypeData["iApplicationTypeId"]
                })]
            })
        }
        ApplicationState.SetProperty("blnShowAnimation", false);
        objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrApplicationTypeData": arrApplicationTypeData } });
    }
}

export default HistoryLogs_ModuleProcessor;