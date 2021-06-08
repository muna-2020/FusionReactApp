//Objects required for module.
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

/**
* @name TestFolderDetails_ModuleProcessor
* @summary Class for Test module display.
*/
class TestFolderDetails_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_Language",
            "Object_Cockpit_Skin", 
            "Object_Intranet_Member_IntranetAdministrator"
        ];
    }


    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //Skin
        Object_Cockpit_Skin.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Skin]; 

        //IntranetAdministrator
        Object_Intranet_Member_IntranetAdministrator.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_IntranetAdministrator];

        return arrDataRequest;
    }

    /**
     * @name GetTestFolderDetails
     * @param {object} objSelectedRow SelectedRow
     * @param {object} objContext objContext
     * @summary Gets the property details to be displayed on TestFolderDetails
     */
    GetTestFolderDetails(objSelectedRow, objContext) {
        let strOwner = "", strEditedBy = "";
        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        ///Language details
        let arrLanguageIds = objSelectedRow.t_TestDrive_FileSystem_TestFolder_Language?.map(objLanguage => { return objLanguage["iLanguageId"] })?.sort() ?? [];
        let strMainClientLanguage = arrLanguageIds.find(strLangId => strLangId == JConfiguration.InterfaceLanguageId);
        if (strMainClientLanguage) {
            arrLanguageIds = [strMainClientLanguage, ...arrLanguageIds.filter(strLangId => strLangId != JConfiguration.InterfaceLanguageId)];
        }

        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });

        let arrLanguageDetails = arrLanguageIds.map(iLanguageId => { return objLanguages[iLanguageId] });

        let objTestFolderDetails = {
            ...objSelectedRow,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
        };

        return objTestFolderDetails;
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId uUserId
     * @param {object} objContext objContext
     * @summary Gets the administrator name for the UserId
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"];
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }
}

export default TestFolderDetails_ModuleProcessor;