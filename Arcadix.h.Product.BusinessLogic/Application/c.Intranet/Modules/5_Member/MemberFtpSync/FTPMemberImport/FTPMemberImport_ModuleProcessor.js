//Objects required for module.
import Object_Extranet_MemberFtpSync from '@shared/Object/d.Extranet/2_School/MemberFtpSync/MemberFtpSync';

//Module related imports
import * as FTPMemberImport_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport/FTPMemberImport_MetaData';

/**
 * @name FTPMemberImport_ModuleProcessor
 * @param NA
 * @summary Class for FTPMemberImport module display.
 * @return NA
 */
class FTPMemberImport_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_MemberFtpSync",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.OnPaginationClick(objContext, 1, 10);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: objContext.state.arrFTPMemberImportData,
            RowsPerPage: 10,
            TotalRowCount: objContext.state.intTotalRowCount,
            PageNumber: objContext.state.intPageNumber
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
            ...FTPMemberImport_MetaData.GetFTPMemberImportMetaData()
        };
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {};
        return objCallBacks;
    }

    /**
     * @name GetResourceData
     * @param {object} objContext
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport", objContext.props);       
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
            PageNumberClick: (iPageNumber) => { this.OnPaginationClick(objContext, iPageNumber) },
            //OnClickRow: (Data, event) => this.OpenFTPAuditPopup(Data.SelectedRow, objContext)
        };
        return objCallBacks;
    }

    /**
     * @name OnPaginationClick 
     * @param {object} objContext objContext
     * @summary Fetch of Data for Grid on each pagination click
     * @returns {object} Grid data
     */
    OnPaginationClick(objContext, intPageNumber, intInitialSize) {        
        let intFrom = 10 * (intPageNumber - 1);
        let intSize = intInitialSize ? intInitialSize : (objContext.state.intTotalRowCount > (intFrom + 10)) ? 10 : (objContext.state.intTotalRowCount - intFrom);
        let objFTPMemberImportParams = {
            "From": intFrom,
            "Size": intSize,           
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDemoData": "N"
                        }
                    }
                    //,
                    //{
                    //    "range": {
                    //        "dtCreatedOn": {
                    //            "lt": this.GetCurrentDate()
                    //        }
                    //    }
                    //}
                ]
            }
        };

        Object_Extranet_MemberFtpSync.GetData(objFTPMemberImportParams, (objReturnData) => {
            let arrFTPMemberImportData = objReturnData[Object.keys(objReturnData)[0]]["Data"] ? objReturnData[Object.keys(objReturnData)[0]]["Data"] : [];
            let intCount = objReturnData[Object.keys(objReturnData)[0]]["Count"] ? objReturnData[Object.keys(objReturnData)[0]]["Count"] : 0;
            objContext.dispatch({ type: "SET_STATE", payload: { "arrFTPMemberImportData": arrFTPMemberImportData, "intPageNumber": intPageNumber, "intTotalRowCount": intCount } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "FTPMemberImportGrid": arrFTPMemberImportData[0] ? [arrFTPMemberImportData[0]] : [] });
        }, true);
    }

    /**
     * @name GetCurrentDate
     * @summary Returns the Current day's date.
     * @return {object} dtToday
     */
    GetCurrentDate() {
        let dtToday = new Date();
        dtToday.setHours(0, 0, 0, 0);
        return dtToday;
    }

    /**
     * @name OpenFileContentPopup
     * @param {object} objContext
     * @summary Returns jsx for displaying audit FileContent popup.
     * @return {object}
     */
    OpenFileContentPopup(objContext) {
        let objSelectedRow = ApplicationState.GetProperty("SelectedRows")["FTPMemberImportGrid"] ? ApplicationState.GetProperty("SelectedRows")["FTPMemberImportGrid"][0] : {};
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport", objContext.props);  
        Popup.ShowPopup({
            Data: {
                FileContentData: objSelectedRow,
                HeaderTitle: Localization.TextFormatter(objTextResource, "FileContent")
            },
            Meta: {
                PopupName: "FileContentPopup",
                Type: "Display",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: "auto",
                Width: "auto"
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name OpenFTPAuditPopup
     * @param {object} objContext
     * @summary Loads the FTPAuditPopup to displaying audit data.
     * @return {object}
     */
    OpenFTPAuditPopup(objContext) {
        let objSelectedRow = ApplicationState.GetProperty("SelectedRows")["FTPMemberImportGrid"] ? ApplicationState.GetProperty("SelectedRows")["FTPMemberImportGrid"][0] : {};
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport", objContext.props);  
        let strObjectType = objSelectedRow.vFileName ? objSelectedRow.vFileName.substring(objSelectedRow.vFileName.lastIndexOf('_') + 1, objSelectedRow.vFileName.lastIndexOf(".")) : "";
        let strExternalSourceId = objSelectedRow.vFileName ? objSelectedRow.vFileName.substring(objSelectedRow.vFileName.indexOf('_') + 1, objSelectedRow.vFileName.lastIndexOf("_")) : "";
        if (strObjectType != "" && strExternalSourceId != "") {
            Popup.ShowPopup({
                Data: {
                    ObjectType: strObjectType,
                    ExternalSourceId: strExternalSourceId,
                    TransactionId: objSelectedRow.vTransactionId ? objSelectedRow.vTransactionId : "",
                    HeaderTitle: Localization.TextFormatter(objTextResource, "FTPAuditPopup")
                },
                Meta: {
                    PopupName: "FTPAuditPopup",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: "auto",
                    Width: "auto"
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {},
                CallBacks: {}
            });
        }        
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/5_Member/MemberSyncAudit/FileContentPopup/FileContentPopup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/5_Member/MemberSyncAudit/FTPAuditPopup/FTPAuditPopup.css"
        ]
    }
}

export default FTPMemberImport_ModuleProcessor;