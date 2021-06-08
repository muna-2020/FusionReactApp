//Objects required for module.
import Object_SupportApplication_Demo_Book from '@shared/Object/SupportApplication/Demo/Practice/Book/Book';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditBook_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Practice/Book/AddEditBook/AddEditBook_MetaData';

/**
* @name Book_ModuleProcessor
* @summary Class for Book module display.
*/
class Book_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_SupportApplication_Demo_Book", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/l.Demo/Modules/Book", "Object_Cockpit_MainClient_MainClientLanguage", "Object_Cockpit_Language"];
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

        //Book object
        Object_SupportApplication_Demo_Book.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_SupportApplication_Demo_Book];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/l.Demo/Modules/Book"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }
    /**
     * @name OnBeforeGridRowRender
     * @summary CallBack for on click row
     */
    OnBeforeGridRowRender(objRow, objContext) {
        //Just write your logic here for the row
        return objRow;
    }

    /**
    * @name GetEvents
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetEvents(objContext) {
        let objCallBacks = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name GetCallBacks
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name SaveData
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation popup for Deleting subject
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditBook_MetaData.GetAddEditMetaData();
        var objTextResource = objContext.props.Object_Framework_Services_TextResource.GetData("/l.Demo/Modules/Book", objContext.props);
        let arrMainClientlanguageData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"];
        let arrLanguageData = DataRef(objContext.props.Object_Cockpit_Language)["Data"];
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        if (!blnShowErrorPopup) {
            Popup.ShowPopup({
                PopupName: "MasterAddEdit",
                PopupProps: {
                    Data: {
                        ModuleName: "AddEditBook",
                        arrHeaderData,
                        objTextResource,
                        JConfiguration: objContext.props.JConfiguration,
                        MainClientLanguageData: arrMainClientlanguageData.filter(x => x["iApplicationTypeId"] == 7 && x["cIsDeleted"] === "N"),
                        ClientUserDetails: objContext.props.ClientUserDetails,
                        LanguageData: arrLanguageData,
                        blnIsEdit: blnIsEdit,
                        blnIsAdd: !blnIsEdit,
                        Object_SupportApplication_Demo_Book: objContext.props.Object_SupportApplication_Demo_Book
                    }
                }
            });
        } else {
            Popup.ShowErrorPopup({
                TextResources: objTextResource,
                TextResourcesKey: "Edit"
            });
        }
    }

    /**
    * @name DeletePopup  
    * @param {object} objContext passes Context object
    * @summary Call Confirmation popup for Deleting subject
    */
    OpenDeletePopup(objContext) {
        var objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/l.Demo/Modules/Book"]
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

        var strDeleteVariables = "";
        arrSelectedRows.map(objSelectedRows => {
            strDeleteVariables = strDeleteVariables + objSelectedRows["vCountryCultureInfo"] + ", ";
        });

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                TextResources: objTextResource,
                TextResourcesKey: "Delete",
                Variables: objVaribales,
                ConfirmEvent: (objModal) => this.DeleteCountry(arrSelectedRows, objModal)
            });
        }
        else {
            Popup.ShowErrorPopup({
                TextResources: objTextResource,
                TextResourcesKey: "Delete"
            });
        }
    }

    /**
    * @name DeleteCountry
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Country and close popup on success
    */
    //DeleteCountry(arrSelectedRows, objModal) {
    //    let arrDeleteRow = [];
    //    arrSelectedRows.map(objSelectedRows => {
    //        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    //    });
    //    Object_Cockpit_Country.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
    //        if (cIsNewData) {
    //            ApplicationState.SetProperty("SelectedRows", []);
    //            Popup.ClosePopup(objModal);
    //        }
    //    });
    //}
}

export default Book_ModuleProcessor;