// React related imports.
import React from 'react';

//Object Required for module
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';


class OfflineProcessPopup_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_OfflineProcess_OfflineProcessExecution",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup",
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

        ////MainClient object
        //Object_Cockpit_OfflineProcess_OfflineProcessExecution.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_OfflineProcess_OfflineProcessExecution];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadDataForGrid(objContext) {
        var arrFilters = [];
        arrFilters = [...arrFilters, {
            "match": {
                "vHostName": objContext.props.Data.strHostName
            }
        }, {
            "match": {
                "iMainClientId": objContext.props.Data.MainClientId
            }
        },
        {
            "match": {
                "cIsDeleted": "N"
            }
        }];
        let objOfflineProgressPopupParam = {
            "SearchQuery": {
                ... {
                    "must": arrFilters
                }
            },
            "vMainClientIdentifier": objContext.props.Data.MainClientIdentifier
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.GetData(objOfflineProgressPopupParam, (objReturn, blnIsFromCall) => {
            let arrOfflineExecution = objReturn[Object.keys(objReturn)[0]] ? objReturn[Object.keys(objReturn)[0]] : [];
            if (arrOfflineExecution.Count > 0) {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineExecutionGridData": arrOfflineExecution["Data"] } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "OfflineProcessPopupGrid": arrOfflineExecution["Data"] != [] ? [arrOfflineExecution["Data"][0]] : [] });

                let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
                ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, "OfflineProcessPopupGrid": arrOfflineExecution["Data"] != [] ? [0] : [] });
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineExecutionGridData": objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution == undefined ? [] : objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution["Object_Cockpit_OfflineProcess_OfflineProcessExecution;vHostName;" + objContext.props.Data.strHostName + ";iMainClientId;" + objContext.props.Data.MainClientId + ";cIsDeleted;" + "N"]["Data"] } });
            }
        });

    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: objContext.state.arrOfflineExecutionGridData ? objContext.state.arrOfflineExecutionGridData : []
        };
        return objData;
    }

    /**
     * @name GetCallBackforGrid
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    GetCallBackforGrid(objRow, objContext) {
        return objRow["iProgressValue"] != 100 || objRow.t_TestDrive_OfflineProcess_Execution_File.length <= 0 ? {
            ...objRow,
            "Status": "Running",
            "vOfflineProcessKeyword": objRow["t_TestDrive_OfflineProcess_Definition"][0]["vOfflineProcessKeyword"],
            "dateExecutionStart": objRow["dtExecutionStart"] ? Localization.DateTimeFormatter(objRow["dtExecutionStart"]) : "_",
            "dateExecutionEnd": objRow["dtExecutionEnd"] ? Localization.DateTimeFormatter(objRow["dtExecutionEnd"]) : "_",
            "dateLastExecutedOn": objRow["dtCreatedOn"] ? Localization.DateTimeFormatter(objRow["dtCreatedOn"]) : "_",
            "DownloadExecution": "-"
        } :
            {
                ...objRow,
                "Status": "Completed",
                "vOfflineProcessKeyword": objRow["t_TestDrive_OfflineProcess_Definition"][0]["vOfflineProcessKeyword"],
                "dateExecutionEnd": objRow["dtExecutionEnd"] ? Localization.DateTimeFormatter(objRow["dtExecutionEnd"]) : "_",
                "dateExecutionStart": objRow["dtExecutionStart"] ? Localization.DateTimeFormatter(objRow["dtExecutionStart"]) : "_",
                "dateLastExecutedOn": objRow["dtCreatedOn"] ? Localization.DateTimeFormatter(objRow["dtCreatedOn"]) : "_",
                "DownloadExecution": this.DownloadExecution(objRow, objContext)
            };//, "dtExecutionEnd": strDate + ' ' + strTime 
    }

    /**
     * @name
     * @param {any} objRow
     * @param {any} objContext
     * @summary forms the JSX based on the check in status of the document.
     * @return {object} React JSX
     */
    DownloadExecution(objRow, objContext) {
        return <div className="flex align-middle pointer">
            <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objRow.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"] + "&Type=Offline/" + objRow.t_TestDrive_OfflineProcess_Definition[0]["vOfflineProcessKeyword"] + "&MainClientId=" + objRow["iMainClientId"] + "&DisplayFileName=" + objRow.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"]}>
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: objContext.ImageMeta.TestImage
                    }}
                    Events={{
                        OnClickEventHandler: () => { this.Open(objRow, objContext) }
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
        let vUrltoOpen = JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objRow.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"] + "&Type=Offline/" + objRow.t_TestDrive_OfflineProcess_Definition[0]["vOfflineProcessKeyword"] + "&MainClientId=" + objRow["iMainClientId"] + "&DisplayFileName=" + objRow.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"]
        window.open(vUrltoOpen);

    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
        ];
    }


}
export default OfflineProcessPopup_ModuleProcessor;