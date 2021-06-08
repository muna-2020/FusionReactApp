//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

/**
* @name TestPdf_ModuleProcessor
* @param NA
* @summary Class for Subject module display.
* @return NA
*/
class TestPdf_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test",
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

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf", "/c.Intranet/Modules/3_Test/Test"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }


    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Insert offline Execution Details and Register SignalR event.
     * @returns {object} return objDataCalls
     */
    InsertOfflineExecutionDetails(objContext) {
        //let strEventName = objContext.props.Data.RowData.vTestName + "_" + Date.now() + "_" + objContext.props.ParentProps.ClientUserDetails.UserId;
        let objParams = {
            ["OfflineProcessParams"]: {
                JConfiguration: objContext.props.JConfiguration,
                TextResource: objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props),
                SelectedRow: objContext.props.Data.RowData,
                vExecutionName: objContext.state.vTestPdfName,
                Event: objContext.state.vTestPdfName,
                SelectedLanguage: objContext.props.Data.SelectedLanguageId
            },
            ["OfflineProcessKeyWord"]: "GenerateTestPdf"
        }
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.StartOfflineExecution(objParams, objContext, (objReturn) => {
            Popup.ClosePopup(objContext.props.Id);
        });

    }


    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation popup for Deleting subject
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SubjectGrid"] : [];
        let intApplicationTypeForSubjectData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intParentSubjectId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForSubjectData),
                    Object_Cockpit_Subject: objContext.props.Object_Cockpit_Subject,
                    IsEdit: blnIsEdit,
                    SubjectData: DataRef(objContext.props.Object_Cockpit_Subject)["Data"],
                    ParentSubjectId: objContext.state.intParentSubjectId,
                    DropDownData: objContext.TestPdf_ModuleProcessor.GetSubjectDropDownData(objContext)
                },
                Meta: {
                    PopupName: "AddEditSubject",
                    HeaderData: AddEditSubject_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
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
                    Text: objTextResource,
                    TextResourcesKey: blnIsEdit ? "EditErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name OpenDeletePopup
    * @param {object} objContext passes Context object
    * @summary Call Confirmation popup for Deleting subject
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["SubjectGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "DeleteConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteSubject(arrSelectedRows, strPopupId)
                },
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
                    Text: objTextResource,
                    TextResourcesKey: "DeleteErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    HandleChange(objContext, event) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "vTestPdfName": event.target.value } });
       // ApplicationState.SetProperty("vTestPdfName", event.target.value);
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

export default TestPdf_ModuleProcessor;