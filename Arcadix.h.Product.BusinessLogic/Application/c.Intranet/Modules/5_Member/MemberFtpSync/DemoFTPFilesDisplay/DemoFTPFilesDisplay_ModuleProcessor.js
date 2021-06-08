//Objects required for module.
import Object_Extranet_MemberFtpSync from '@shared/Object/d.Extranet/2_School/MemberFtpSync/MemberFtpSync';

//Module related imports
import * as DemoFTPFilesDisplay_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay/DemoFTPFilesDisplay_MetaData';

/**
 * @name DemoFTPFilesDisplay_ModuleProcessor
 * @param NA
 * @summary Class for FTPFileDisplay module display.
 * @return NA
 */
class DemoFTPFilesDisplay_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_MemberFtpSync",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        //this.OnPaginationClick(objContext, 1, 10);
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
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay"];
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
            RowData: objContext.state.arrDemoFTPFileDisplayData,
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
            ...DemoFTPFilesDisplay_MetaData.GetDemoFTPFileDisplayMetaData()
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
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay", objContext.props);    
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
            PageNumberClick: (iPageNumber) => { this.OnPaginationClick(objContext, iPageNumber) }
        };
        return objCallBacks;
    }

    /**
     * @name OnFolderDropDownChange
     * @param {*} objContext
     * @param {*} objChangeData
     * @summary   To change the sub subject Dropdown value on change of the sub subject dropdown 
     */
    OnFolderDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DemoFTPFilesDisplayGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "intFolderDropdownSelectedValue": objChangeData["vFolderValue"] } });
        this.OnPaginationClick(objContext, 1, 10, objChangeData)
    };

    /**
     * @name OnPaginationClick 
     * @param {object} objContext objContext
     * @summary Fetch of Data for Grid on each pagination click
     * @returns {object} Grid data
     */
    OnPaginationClick(objContext, intPageNumber, intInitialSize, objChangeData) {   
        if (objChangeData["vFolderValue"] != -1) {
            let intFrom = 10 * (intPageNumber - 1);
            let intSize = intInitialSize ? intInitialSize : (objContext.state.intTotalRowCount > (intFrom + 10)) ? 10 : (objContext.state.intTotalRowCount - intFrom);
            let objFTPMemberImportParams = {
                "iFrom": intFrom,
                "iSize": intSize,
                "FilePath": objChangeData["vFolderValue"],
                "blnIsDemoData": true
            };

            Object_Extranet_MemberFtpSync.GetFileDisplayData(objFTPMemberImportParams, (objReturnData) => {
                let arrDemoFTPFileDisplayData = objReturnData[Object.keys(objReturnData)[1]] ? objReturnData[Object.keys(objReturnData)[1]] : [];
                let intCount = objReturnData[Object.keys(objReturnData)[1]]["Count"] ? objReturnData[Object.keys(objReturnData)[1]]["Count"] : 0;
                objContext.dispatch({ type: "SET_STATE", payload: { "arrDemoFTPFileDisplayData": arrDemoFTPFileDisplayData, "intPageNumber": intPageNumber, "intTotalRowCount": intCount } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DemoFTPFilesDisplayGrid": arrDemoFTPFileDisplayData[1] ? [arrDemoFTPFileDisplayData[1]] : [] });
            }, true);
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "arrDemoFTPFileDisplayData": [], "intPageNumber": 1, "intTotalRowCount": 0 } });
        }
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
        ]
    }
}

export default DemoFTPFilesDisplay_ModuleProcessor;