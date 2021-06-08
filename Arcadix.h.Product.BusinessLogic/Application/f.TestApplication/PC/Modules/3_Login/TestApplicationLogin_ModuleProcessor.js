//Helper Classes
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_Country from '@shared/Object/c.Cockpit/Country/Country';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_MainClient_MainClientCountry from '@shared/Object/c.Cockpit/MainClient/MainClientCountry/MainClientCountry';
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
 *@name TestApplicationLogin_ModuleProcessor
 *@summary for event handling methods
 * * */
class TestApplicationLogin_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "TestState" },
        "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/f.TestApplication/Modules/3_Login/Login",
            "Object_Cockpit_Language",
            "Object_Cockpit_Country",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_MainClient_MainClientCountry"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this,objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];
        //Language
        let objLanguageParam = {
            "SortKeys": [
                {
                    "iFrameworkLanguageId": {
                        "order": "asc"
                    }
                }
            ]
        }
        Object_Cockpit_Language.Initialize(objLanguageParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Country
        let objCountryParam = {
            "SortKeys": [
                {
                    "iCountryId": {
                        "order": "asc"
                    }
                }
            ]
        }
        Object_Cockpit_Country.Initialize(objCountryParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Country];

        //MainClientLanguage
        let objMainClientLanguageParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": JConfiguration.MainClientId,
                        }
                    },
                    {
                        "match": {
                            "iApplicationTypeId": JConfiguration.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        }
        Object_Cockpit_MainClient_MainClientLanguage.Initialize(objMainClientLanguageParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //MainClientCountry
        let objMainClientCountryParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": JConfiguration.MainClientId,
                        }
                    },
                    {
                        "match": {
                            "iApplicationTypeId": JConfiguration.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        }
        Object_Cockpit_MainClient_MainClientCountry.Initialize(objMainClientCountryParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientCountry];
        return arrDataRequest;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/3_Login/TestApplicationLogin.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Common/ReactJs/PC/Font.css",
        ];
    }

    GetFilteredLanguageData(arrLanguageData, arrMainClientLanguageData) {
        let arrFilteredLanguageData = [];

        arrLanguageData.map(objLanguageData => {
            if (objLanguageData["cIsDeleted"] == "N" && arrMainClientLanguageData.find(obj => obj["iLanguageId"] == objLanguageData["iFrameworkLanguageId"]) ? true : false)
                arrFilteredLanguageData = [...arrFilteredLanguageData, objLanguageData];
        });

        return arrFilteredLanguageData;
    }

    /**
   * @name HandleDropDownChange
   * @param {any} objContext
   * @param {any} objChangeData
   */
    HandleDropDownChange(objChangeData) {
        let strUrl = window.location.href;
        if (objChangeData.iFrameworkLanguageId) {
            if (objChangeData.iFrameworkLanguageId == -1) {
                window.location.href = strUrl.toString().split('?')[0];
            }
            window.location.href = QueryString.SetQueryStringValue(strUrl, "LanguageCultureInfo", objChangeData["vLanguageCultureInfo"]);
        }
        if (objChangeData.iCountryId) {
            if (objChangeData.iCountryId == -1) {
                window.location.href = strUrl.toString().split('?')[0];
            }
            window.location.href = QueryString.SetQueryStringValue(strUrl, "CountryCultureInfo", objChangeData["vCountryCultureInfo"]);
        }
    }
}

export default TestApplicationLogin_ModuleProcessor;