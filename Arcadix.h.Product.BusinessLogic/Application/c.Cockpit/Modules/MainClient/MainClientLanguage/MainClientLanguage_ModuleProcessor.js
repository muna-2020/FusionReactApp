//Objects required for module.
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClientApplicationType from '@shared/Object/c.Cockpit/MainClient/MainClientApplicationType/MainClientApplicationType';

//Module related imports.
import * as MainClientLanguage_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientLanguage/MainClientLanguage_OfficeRibbon';

/**
 * @name MainClientLanguage_ModuleProcessor
 * @summary Class for MainClientLanguage module display.
 */
class MainClientLanguage_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_MainClient_MainClient",
            "Object_Cockpit_Language",
            "Object_Cockpit_ApplicationType",
            "Object_Cockpit_MainClient_MainClientApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClientLanguage",
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

        let objParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        //MainClientLanguage object
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //Language object
        Object_Cockpit_Language.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //MainClientApplicationType object
        Object_Cockpit_MainClient_MainClientApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientApplicationType];
             
        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/MainClientLanguage"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
              
        return arrDataRequest;
    }   

    /**
     * @name OnMainClientDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnMainClientDropDownChange(objContext, objChangeData) {
        let arrMainClientLanguageData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"];     

        let arrFilteredMainClientLanguageData = arrMainClientLanguageData.filter(objMainClientLanguageData => {
            return objMainClientLanguageData["iMainClientId"] == objChangeData["iMainClientId"] 
        })

        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClientId": objChangeData["iMainClientId"],
                "arrMainClientLanguageData": arrFilteredMainClientLanguageData
            }
        });
    };
     
    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit api after validation succeeds
     */
    SaveData(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientLanguage", objContext.props);
        if (objContext.state.strMainClientId != -1) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objData = {
                "vEditData": objContext.state.arrMainClientLanguageData,
                "uUserId": objContext.props.ClientUserDetails.UserId
            }

            Object_Cockpit_MainClient_MainClientLanguage.EditData(objData, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrMainClientLanguageData": objReturn } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }); //, true
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
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }                           
    }

    /**
     * @name CheckBoxClickHandler
     * @param {object} objLanguage takes objLanguage
     * @param {object} objApplicationType takes objApplicationType
     * @param {object} objContext takes objContext
     * @summary Handles checkbox click of Mainclient Language
     */
    CheckBoxClickHandler(objLanguage, objApplicationType, objContext) {
    var objNewMainClientLanguage = {};
    let arrNewMainClientLanguage;

        if ((objContext.state.arrMainClientLanguageData.filter(obj => obj["iLanguageId"] === objLanguage["iFrameworkLanguageId"] && obj["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && obj["iMainClientId"] === objContext.state.strMainClientId)).length > 0)
    {
        arrNewMainClientLanguage = objContext.state.arrMainClientLanguageData.map((objMainClientLanguage) => {

            if (objMainClientLanguage["iLanguageId"] === objLanguage["iFrameworkLanguageId"] && objMainClientLanguage["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && objMainClientLanguage["iMainClientId"] === objContext.state.strMainClientId) {
                if (objMainClientLanguage["cIsDeleted"] === "N") {
                    return { ...objMainClientLanguage, cIsDeleted: "Y" };
                }
                else {
                    return { ...objMainClientLanguage, cIsDeleted: "N" };
                }
            }
            return objMainClientLanguage;
        })
    }
    else {
        objNewMainClientLanguage = {
            "iLanguageId": objLanguage["iFrameworkLanguageId"],
            "iApplicationTypeId": objApplicationType["iApplicationTypeId"],
            "iMainClientId": objContext.state.strMainClientId,
            "cIsDeleted": "N"
        };
        arrNewMainClientLanguage = [...objContext.state.arrMainClientLanguageData, objNewMainClientLanguage];
    }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrMainClientLanguageData": arrNewMainClientLanguage } });
    }  

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveMethod": () => objContext.MainClientLanguage_ModuleProcessor.SaveData(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", MainClientLanguage_OfficeRibbon.GetMainClientLanguageOfficeRibbonData(objRibbonData));    
    } 

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"]
        }
    }
}

export default MainClientLanguage_ModuleProcessor;