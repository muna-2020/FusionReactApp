//Objects required for module.
import Object_Cockpit_MainClient_MainClientCountry from '@shared/Object/c.Cockpit/MainClient/MainClientCountry/MainClientCountry';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_Country from '@shared/Object/c.Cockpit/Country/Country';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClientApplicationType from '@shared/Object/c.Cockpit/MainClient/MainClientApplicationType/MainClientApplicationType';

//Module related imports.
import * as MainClientCountry_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientCountry/MainClientCountry_OfficeRibbon';

/**
 * @name MainClientCountry_ModuleProcessor
 * @summary Class for MainClientCountry module display.
 */
class MainClientCountry_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClientCountry",
            "Object_Cockpit_MainClient_MainClient",
            "Object_Cockpit_Country",
            "Object_Cockpit_ApplicationType",
            "Object_Cockpit_MainClient_MainClientApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClientCountry",
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

        let objApplicationTypeParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objCountryParams = {
            "SortKeys": [
                {
                    "iCountryId": {
                        "order": "asc"
                    }
                }
            ]
        };

        //MainClientCountry object
        Object_Cockpit_MainClient_MainClientCountry.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientCountry];

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //Country object
        Object_Cockpit_Country.Initialize(objCountryParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Country];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize(objApplicationTypeParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //MainClientApplicationType object
        Object_Cockpit_MainClient_MainClientApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientApplicationType];
             
        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/MainClientCountry"];
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
        let arrMainClientCountryData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry)["Data"];     
        let arrFilteredMainClientCountryData = arrMainClientCountryData.filter(objMainClientCountryData => {
            return objMainClientCountryData["iMainClientId"] == objChangeData["iMainClientId"] 
        })

        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClientId": objChangeData["iMainClientId"],
                "arrMainClientCountryData": arrFilteredMainClientCountryData
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientCountry", objContext.props);
        if (objContext.state.strMainClientId != -1) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objData = {
                "vEditData": objContext.state.arrMainClientCountryData,
                "uUserId": objContext.props.ClientUserDetails.UserId
            }           
        
            objContext.props.Object_Cockpit_MainClient_MainClientCountry.EditData(objData, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrMainClientCountryData": objReturn } }); 
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
     * @param {object} objCountry takes objCountry
     * @param {object} objApplicationType takes objApplicationType
     * @param {object} objContext takes objContext
     * @summary Handles checkbox click of Mainclient Country
     */
    CheckBoxClickHandler(objCountry, objApplicationType, objContext) {
    var objNewMainClientCountry = {};
    let arrNewMainClientCountry;

        if ((objContext.state.arrMainClientCountryData.filter(obj => obj["iCountryId"] === objCountry["iCountryId"] && obj["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && obj["iMainClientId"] === objContext.state.strMainClientId)).length > 0)
    {
        arrNewMainClientCountry = objContext.state.arrMainClientCountryData.map((objMainClientCountry) => {

            if (objMainClientCountry["iCountryId"] === objCountry["iCountryId"] && objMainClientCountry["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && objMainClientCountry["iMainClientId"] === objContext.state.strMainClientId) {
                if (objMainClientCountry["cIsDeleted"] === "N") {
                    return { ...objMainClientCountry, cIsDeleted: "Y" };
                }
                else {
                    return { ...objMainClientCountry, cIsDeleted: "N" };
                }
            }
            return objMainClientCountry;
        })
    }
    else {
        objNewMainClientCountry = {
            "iCountryId": objCountry["iCountryId"],
            "iApplicationTypeId": objApplicationType["iApplicationTypeId"],
            "iMainClientId": objContext.state.strMainClientId,
            "cIsDeleted": "N"
        };
        arrNewMainClientCountry = [...objContext.state.arrMainClientCountryData, objNewMainClientCountry];
    }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrMainClientCountryData": arrNewMainClientCountry } });
    }  

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveMethod": () => objContext.MainClientCountry_ModuleProcessor.SaveData(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", MainClientCountry_OfficeRibbon.GetMainClientCountryOfficeRibbonData(objRibbonData));
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

export default MainClientCountry_ModuleProcessor;