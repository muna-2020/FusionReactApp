//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Objects required for module.
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';

/**
* @name TaskFolderDetails_ModuleProcessor
* @summary Class for Task module display.
*/
class TaskFolderDetails_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_Skin", 
            "Object_Cockpit_Language",
            "Object_Intranet_Member_IntranetAdministrator",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task",
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

        //Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/2_Task/Task"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetTaskFolderDetails
     * @param {object} objSelectedRow SelectedRow
     * @param {object} objContext objContext
     * @summary Gets the property details to be displayed on TaskFolderDetails
     */
    GetTaskFolderDetails(objSelectedRow, objContext) {
        let strOwner = "", strEditedBy = "";
        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Language details
        let arrLanguageIds = objSelectedRow?.t_CMS_FileSystem_PageFolder_Langauge ? objSelectedRow.t_CMS_FileSystem_PageFolder_Langauge.map(objLanguage => { return objLanguage["iLanguageId"] }) : [];
        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"]?.map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });
        let arrLanguageDetails = arrLanguageIds?.map(iLanguageId => { return objLanguages[iLanguageId] }) ?? [];

        let objTaskFolderDetails = {
            ...objSelectedRow,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
        };

        return objTaskFolderDetails;
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId uUserId
     * @param {object} objContext objContext
     * @summary Gets the administrator name for the UserId
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] ?? [];
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            //props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css"
        ];
    }
}

export default TaskFolderDetails_ModuleProcessor;