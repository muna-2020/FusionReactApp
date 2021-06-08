//React related imports...
import React from 'react';

//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Module related imports
import * as Audit_MetaData from '@shared/Framework/Blocks/Audit/Audit_MetaData';
import Object_Framework_SystemTracking_DataAudit from '@shared/Object/a.Framework/SystemTracking/DataAudit/DataAudit';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name Audit_ComponentProcessor
 * @param NA
 * @summary Class for Audit display.
 * @return NA
 */
class Audit_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        let objAuditParams = {            
            "PrimaryKeyValue": objContext.props.Data.PrimaryKeyValue,
            "ObjectKey": objContext.props.Data.ObjectKey,
            "AuditType": objContext.props.Data.AuditType            
        }
        Object_Framework_SystemTracking_DataAudit.GetData(objAuditParams, (objReturnData) => {
            
            if (objReturnData[Object.keys(objReturnData)[0]]["Data"].length > 0) {
                let arrAuditData = objReturnData[Object.keys(objReturnData)[0]]["Data"].sort((obj1, obj2) => new Date(obj2["dtCreatedOn"]) - new Date(obj1["dtCreatedOn"]));
                objContext.dispatch({ type: "SET_STATE", payload: { "arrAuditData": arrAuditData } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AuditGrid": null });
                if (objContext.props.CallBacks.GetInitialRowData) {
                    objContext.props.CallBacks.GetInitialRowData(arrAuditData[0]);
                }
            }          
            else{
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
                if (objContext.props.CallBacks.GetInitialRowData) {
                    objContext.props.CallBacks.GetInitialRowData(null);
                }
            }
        })
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {

        let objData = {
            RowData: objContext.state.arrAuditData
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
        let objMetaData = Audit_MetaData.GetAuditMetaData();
        if (objContext.props.Data.DisplayColumns) {
            let arrNewHeaderDataData = [];
            objContext.props.Data.DisplayColumns.map((strColumn) => {
                arrNewHeaderDataData = [...arrNewHeaderDataData, ...objMetaData.HeaderData.filter((objHeaderData) => objHeaderData["vColumnName"] == strColumn)]
            })
            objMetaData.HeaderData = [...arrNewHeaderDataData];
        }
        return objMetaData;
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name OnBeforeGridRowRender
    * @param {object} objRow
    * @param {object} objContext
    * @summary returns the modified row data
    * @return {object} modified objRow data.
    */
    OnBeforeGridRowRender(objRow, objContext) {

        let objReturnRow = {
            ...objRow,
            Details: this.GetDetailsIcon(objRow, objContext),
            User: this.GetUserName(objRow, objContext)
        }
        return objReturnRow;
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = objContext.props.Resource.Text;
        let ImagePathDetails = {
            "FileIcon": "/Images/Common/Icons/Excel_icon.gif"
        }
        let SkinPath = objContext.props.Resource.SkinPath;
        return {
            Text,
            ImagePathDetails,
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
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext)
        };
        return objCallBacks;
    }

    /**
     * @name OnClickRow
     * @param {object} objSelectedRow
     * @param {object} objContext
     * @summary Handles the click event of the grid.
     */
    OnClickRow(objSelectedRow, objContext) {
        if (objContext.props.Events && objContext.props.Events.OnClickRow) {
            objContext.props.Events.OnClickRow(objSelectedRow);
        }
    }

    /**
    * @name GetDetailsIcon
    * @param {object} objContext
    * @summary Returns jsx for details icon.
    * @return {object}
    */
    GetDetailsIcon(objRow, objContext) {
        return <div class="flex">
            <img src={objContext.props.Resource.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/details.svg"} className="mr-10" onClick={() => this.OpenDetailsPopup(objRow, objContext)} />
        </div>
    }

    /**
     * @name OpenDetailsPopup
     * @param {object} objRow
     * @param {object} objContext
     * @summary Returns jsx for displaying audit details popup.
     * @return {object}
     */
    OpenDetailsPopup(objRow, objContext) {
        Popup.ShowPopup({
            Data: {
                AuditData: objRow ? objRow : {},
                HeaderTitle: "Audit Data"
            },
            Meta: {
                PopupName: "AuditPopup",
                Type:"Display",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: 700,
                Width: 500
            },
            Resource: {
                Text: objContext.props.Resource.Text,
                SkinPath: objContext.props.Resource.JConfiguration.IntranetSkinPath,
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name GetDetailsIcon
     * @param {object} objRow
     * @param {object} objContext
     * @summary Returns jsx for details icon.
     * @return {object}
     */
    GetUserName(objRow, objContext) {
        let strUserName = "";
        if (objContext.props.CallBacks && objContext.props.CallBacks.GetAuditUserName) {
            strUserName = objContext.props.CallBacks.GetAuditUserName(objRow.uUserId);
        }
        return strUserName;
    }

    /**
     * @name OpenDetailsPopup
     * @param {object} objContext
     * @summary Returns jsx for displaying audit details popup.
     * @return {object}
     */
    OpenComparePopup(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["AuditGrid"];
        if (arrSelectedRows && arrSelectedRows.length == 2) {
            //let arrAuditData = arrSelectedRows.map(objSelectedRow => objSelectedRow["vData"]);
            Popup.ShowPopup({
                Data: {
                    AuditData: arrSelectedRows,
                    HeaderTitle: "Audit Data"
                },
                Meta: {
                    PopupName: "AuditPopup",
                    Type:"Compare",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 600,
                    Width: 800
                },
                Resource: {
                    Text: objContext.props.Resource.Text,
                    SkinPath: objContext.props.Resource.JConfiguration.IntranetSkinPath,
                },
                Events: {},
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objContext.props.Resource.Text,
                    TextResourcesKey: "CompareErrorPopup",
                    SkinPath: objContext.props.Resource.SkinPath
                },
                CallBacks: {}
            });
        }
    }
}

export default Audit_ComponentProcessor;
