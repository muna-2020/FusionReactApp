//Objects required for module.
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClientApplicationType from '@shared/Object/c.Cockpit/MainClient/MainClientApplicationType/MainClientApplicationType';

//Module related imports.
import * as MainClientApplicationType_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientApplicationType/MainClientApplicationType_OfficeRibbon';

/**
 * @name MainClientApplicationType_ModuleProcessor
 * @summary Class for MainClientApplicationType module display.
 */
class MainClientApplicationType_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClient",
            "Object_Cockpit_Language",
            "Object_Cockpit_ApplicationType",
            "Object_Cockpit_MainClient_MainClientApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClientApplicationType"
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

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //MainClientApplicationType object
        Object_Cockpit_MainClient_MainClientApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientApplicationType];

        //Language object
        Object_Cockpit_Language.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];


        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/MainClientApplicationType"];
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
        let arrMainClientApplicationTypeData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"];

        let arrFilteredMainClientApplicationTypeData = arrMainClientApplicationTypeData.filter(objMainClientApplicationTypeData => {
            return objMainClientApplicationTypeData["iMainClientId"] == objChangeData["iMainClientId"]
        })

        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClientId": objChangeData["iMainClientId"],
                "arrMainClientApplicationTypeData": arrFilteredMainClientApplicationTypeData
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientApplicationType", objContext.props);
        if (objContext.state.strMainClientId != -1) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objData = {
                "vEditData": objContext.state.arrMainClientApplicationTypeData,
                "uUserId": objContext.props.ClientUserDetails.UserId
            }
            Object_Cockpit_MainClient_MainClientApplicationType.EditData(objData, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrMainClientApplicationTypeData": objReturn } });
                ApplicationState.SetProperty("blnShowAnimation", false);
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
    CheckBoxClickHandler(objApplicationType, objContext) {
        var objNewMainClientApplicationType = {};
        let arrNewMainClientApplicationType;

        if ((objContext.state.arrMainClientApplicationTypeData.filter(obj =>  obj["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && obj["iMainClientId"] === objContext.state.strMainClientId)).length > 0) {
            arrNewMainClientApplicationType = objContext.state.arrMainClientApplicationTypeData.map((objMainClientApplicationType) => {
                if (objMainClientApplicationType["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && objMainClientApplicationType["iMainClientId"] === objContext.state.strMainClientId) {
                    if (objMainClientApplicationType["cIsDeleted"] === "N") {
                        return { ...objMainClientApplicationType, cIsDeleted: "Y" };
                    }
                    else {
                        return { ...objMainClientApplicationType, cIsDeleted: "N" };
                    }
                }
                return objMainClientApplicationType;
            })
        }
        else {
            objNewMainClientApplicationType = {
                "iApplicationTypeId": objApplicationType["iApplicationTypeId"],
                "vApplicationName": objApplicationType["vApplicationName"],
                "vApplicationGroupName": objApplicationType["vApplicationGroupName"],
                "iDisplayOrder": objApplicationType["iDisplayOrder"],
                "iMainClientId": objContext.state.strMainClientId,
                "cIsDeleted": "N"
            };
            arrNewMainClientApplicationType = [...objContext.state.arrMainClientApplicationTypeData, objNewMainClientApplicationType];
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrMainClientApplicationTypeData": arrNewMainClientApplicationType } });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveMethod": () => objContext.MainClientApplicationType_ModuleProcessor.SaveData(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", MainClientApplicationType_OfficeRibbon.GetMainClientApplicationTypeOfficeRibbonData(objRibbonData));
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

export default MainClientApplicationType_ModuleProcessor;