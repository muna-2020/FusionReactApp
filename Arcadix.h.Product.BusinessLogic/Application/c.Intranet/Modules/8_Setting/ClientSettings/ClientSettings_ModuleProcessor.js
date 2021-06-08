//Objects required for module.
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';

//Module related imports.
import * as ClientSettings_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/ClientSettings/ClientSettings_OfficeRibbon';

/**
 * @name ClientSettings_ModuleProcessor
 * @param NA
 * @summary Class for ClientSettings module display.
 * @return NA
 */
class ClientSettings_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_ClientSettings",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/ClientSettings",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        let objClientSettingsParams = {
            "SortKeys": [
                {
                    "vKey": {
                        "order": "asc"
                    }
                }
            ]
        };
        
        // ClientSettings
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];
               
        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/ClientSettings"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }       

    /**
     * @name GetDivData
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Gets the particular data to be displayed in the div
     * @return null
     */
    GetDivData(strParentKey, strSubParentKey = "", objContext) {
        let arrReturnData = [];
        if (strSubParentKey == "") {
            arrReturnData = objContext.state.arrData?.filter(objSettingsData => objSettingsData["vParentKey"] == strParentKey);
        }
        else {
            if (strParentKey === "Common" && strSubParentKey == "IISCreation") {
                if (objContext.props.JConfiguration["ProjectIdentifier"]) {
                    arrReturnData = objContext.state.arrData?.filter(objSettingsData => objSettingsData["vParentKey"] == strParentKey && objSettingsData["vSubParentKey"] == strSubParentKey && objSettingsData["vKey"]?.includes(objContext.props.JConfiguration["ProjectIdentifier"]));                
                }
            }
            else {
                arrReturnData = objContext.state.arrData?.filter(objSettingsData => objSettingsData["vParentKey"] == strParentKey && objSettingsData["vSubParentKey"] == strSubParentKey);
            }
        }
        return arrReturnData;
    }

    /**
     * @name HandleSettingsChange
     * @param {string} struXMLConfigurationId ConfigurationId
     * @param {string} strValue Value
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    HandleSettingsChange(struXMLConfigurationId, strValue, objContext) {
        let arrNewSettingsData =[]      
        arrNewSettingsData = objContext.state.arrData.map(objSettingsData => {
            if (objSettingsData["uXMLConfigurationId"] == struXMLConfigurationId)
                return { ...objSettingsData, "vValue": strValue }
            else
                return objSettingsData
        });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrData": arrNewSettingsData } })
    }

    /**
     * @name HandleTabChange
     * @param {string} strDivToShow strDivToShow
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    HandleTabChange(strDivToShow, objContext) {
        let strCurrentTab = objContext.state.strDivToShow;
        document.getElementById(strCurrentTab).classList.remove("active");        
        document.getElementById(strDivToShow).classList.add("active");        
        objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivToShow } })
    }

    /**
     * @name SaveData
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    SaveData(objContext) {
        let arrTabData = objContext.state.arrData.filter(objSettingsData => objSettingsData["vParentKey"] == objContext.state.strDivToShow);
        if (objContext.state.strDivToShow == "Common")
            arrTabData = objContext.state.arrData.filter(objSettingsData => objSettingsData["vParentKey"] == "Common");
        else if (objContext.state.strDivToShow == "Intranet")
            arrTabData = objContext.state.arrData.filter(objSettingsData => objSettingsData["vParentKey"] == "Intranet");
        else if (objContext.state.strDivToShow == "Extranet")
            arrTabData = objContext.state.arrData.filter(objSettingsData => objSettingsData["vParentKey"] == "ExtranetTeacher" || objSettingsData["vParentKey"] == "ExtranetPupil");
        else if (objContext.state.strDivToShow == "Test")
            arrTabData = objContext.state.arrData.filter(objSettingsData => objSettingsData["vParentKey"] == "TestConfiguration" || objSettingsData["vParentKey"] == "TestApplication");
        else if (objContext.state.strDivToShow == "ResultOutput")
            return;

        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Object_Cockpit_MainClient_ClientSettings.EditData({ "vEditData": arrTabData, "uUserId": objContext.props.ClientUserDetails.UserId }, (arrReturnData, cIsNewData) => {
            let arrOtherTabData = objContext.state.arrData.filter(objSettingsData => !objSettingsData["vParentKey"].includes(objContext.state.strDivToShow));
            objContext.dispatch({ type: "SET_STATE", payload: { "arrData": [...arrOtherTabData, ...arrReturnData]  } });
            ApplicationState.SetProperty("blnShowAnimation", false);            
        });           
    }   

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveData": () => objContext.ClientSettings_ModuleProcessor.SaveData(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", ClientSettings_OfficeRibbon.GetClientSettingsOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
        ];
    }
}

export default ClientSettings_ModuleProcessor;