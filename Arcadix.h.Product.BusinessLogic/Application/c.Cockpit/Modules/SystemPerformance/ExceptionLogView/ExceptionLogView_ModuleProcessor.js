//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';

//Module Object
import * as ExceptionLogView_MetaData from '@shared/Application/c.Cockpit/Modules/SystemPerformance/ExceptionLogView/ExceptionLogView_MetaData';
import * as CockpitBase_Form from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Form';


/**
 * @name ExceptionLogView_ModuleProcessor
 * @summary Class for ExceptionLogView module display.
 */
class ExceptionLogView_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Cockpit_ExceptionLogView", "Object_Cockpit_MainClient_MainClient", "Object_Cockpit_ClientConfig", "Object_Cockpit_ApplicationType",
            "Object_Framework_Services_TextResource", "Object_Cockpit_MainClient_MainClientLanguage", "Object_Cockpit_Language"];
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

        ////ExceptionLogView object
        //Object_Cockpit_ExceptionLogView.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_ExceptionLogView];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ExceptionLogView"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetPresentDate
     * @summary Gets the current date.
     * @returns {object} return todays date.
     */
    static GetPresentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = yyyy + '/' + mm + '/' + dd;
        return today;
    }

    /**
     * @name GetPreviousDate
     * @summary gets the yesterday date.
     * @returns {object} return yesterday date
     */
    static GetPreviousDate() {
        var date = new Date(); //"August 1, 2019 01:15:00"
        date.setDate(date.getDate() - 1);

        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var yesterday = yyyy + '/' + mm + '/' + dd;

        return yesterday;
    }

    /**
     * @param {*} objContext objContext
     * @summary MetaData for BusinessUnit
     * @return {[]} arrayMetaData
     */
    GetMetaData(objContext) {
        let strType = objContext.state.objData.vType;
        console.log("GetMetaData", strType);
        if (strType === "JSError")
            return ExceptionLogView_MetaData.GetJSErrorMetaData();
        else if (strType === "SQLError")
            return ExceptionLogView_MetaData.GetSQLErrorMetaData();
        else if (strType === "ServerError")
            return ExceptionLogView_MetaData.GetServerErrorMetaData();
        else if (strType === "ElasticException")
            return ExceptionLogView_MetaData.GetElasticExceptionMetaData();
        else if (strType === "ElasticInsertFail")
            return ExceptionLogView_MetaData.GetElasticInsertFailMetaData();
        else if (strType === "ElasticUpdateFail")
            return ExceptionLogView_MetaData.GetElasticUpdateFailMetaData();
        else if (strType === "ElasticDeleteFail")
            return ExceptionLogView_MetaData.GetElasticDeleteFailMetaData();
        else if (strType === "KeyCloakExceptions")
            return ExceptionLogView_MetaData.GetKeyCloakExceptionsMetaData();
    }

    /**
     * @name OnMainClientDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @param {*} objContext objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnMainClientDropDownChange(objChangeData, props, objContext) {
        this.HandleChange("iMainClientId", objChangeData["iMainClientId"].toString(), objContext);
    };


    /**
     * @name OnApplicationTypeDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @param {*} objContext objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnApplicationTypeDropDownChange(objChangeData, props, objContext) {
        this.HandleChange("iApplicationTypeId", objChangeData["iApplicationTypeId"].toString(), objContext);
    };

    /**
     * @name OnHourDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @param {*} objContext objContext
     * @summary   To change the Hour on change of the dropdown value
     */
    OnHourDropDownChange(objChangeData, props, objContext) {
        this.HandleChange("strHour", objChangeData["value"].toString(), objContext);
    };

    /**
     * @name CreateItemEventHandler
     * @param {*} objItem objItem
     * @summary   To filter the dropdown data based on the condition
     * @return {bool} boolean
     */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name HandleChange
     * @param {string} strId consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strId, strValue, objContext) {
        var objNewData = CockpitBase_Form.HandleChange(objContext, strId, strValue, "objData");
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    };

    /**
     * @name Search
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    Search(objContext) {
        let strMainClientId = objContext.state.objData.iMainClientId;
        let strApplicationTypeId = objContext.state.objData.iApplicationTypeId;
        let strFromDate = objContext.state.objData.dtFromDate;
        let strToDate = objContext.state.objData.dtToDate;
        let strType = objContext.state.objData.vType;
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": strMainClientId
                        }
                    },
                    {
                        "match": {
                            "iApplicationTypeId": strApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "dtFromDate": strFromDate
                        }
                    },
                    {
                        "match": {
                            "dtToDate": strToDate
                        }
                    },
                    {
                        "match": {
                            "vType": strType
                        }
                    }
                ]
            }
        };

        let arrParams = [
            {
                "URL": "API/Object/Cockpit/ExceptionLogView",
                "Params": objParams,
                "MethodType": "Get"
            }
        ];
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.Execute(arrParams, function (objReturn, cIsNewData) {
            if (cIsNewData) {
                console.log("objReturn ", objReturn);
                let arrExceptionLogView = DataRef(objReturn.Object_Cockpit_ExceptionLogView, "Object_Cockpit_ExceptionLogView;iMainClientId:" + strMainClientId + ";iApplicationTypeId:" + strApplicationTypeId + ";dtFromDate:" + strFromDate + ";dtToDate:" + strToDate + ";vType:" + strType)["Data"];
                console.log("arrExceptionLogView", arrExceptionLogView);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrExceptionLogView": arrExceptionLogView } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        });
    };

    /**
     * @name GetHourDropDownData
     * @summary gets Hour Drop down data
     * @returns {object} array of Hour Drop down data
     */
    static GetHourDropDownData() {
        return [
            { id: '*', value: '*' },
            { id: 1, value: 1 },
            { id: 2, value: 2 },
            { id: 3, value: 3 },
            { id: 4, value: 4 },
            { id: 5, value: 5 },
            { id: 6, value: 6 },
            { id: 7, value: 8 },
            { id: 9, value: 9 },
            { id: 10, value: 10 },
            { id: 11, value: 11 },
            { id: 12, value: 12 },
            { id: 13, value: 13 },
            { id: 14, value: 14 },
            { id: 15, value: 15 },
            { id: 16, value: 16 },
            { id: 17, value: 17 },
            { id: 18, value: 18 },
            { id: 19, value: 19 },
            { id: 20, value: 20 },
            { id: 21, value: 21 },
            { id: 22, value: 22 },
            { id: 23, value: 23 },
            { id: 24, value: 24 }
        ]
    }

    /**
     * @name SetBlnDbOrRedis
     * @param {object} objContext objContext
     * @param {bool} blnValue to toggle between DB and Redis Checkbox
     * @summary set the DB or Redis checkbox
     */
    SetBlnDbOrRedis(objContext, blnValue) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnDbData": blnValue } });
    }


    /**
     * @name OnTabClick
     * @param {*} objSelectedTab objSelectedTab
     * @param {*} objContext objContext
     * @summary function to change tabdata on tab click and set that tab as active
     */
    OnTabClick(objSelectedTab, objContext) {
        var arrTabData = ApplicationState.GetProperty("ModuleTabData").ExceptionLogView.map(objData => {
            if (objData.text == objSelectedTab.text) {
                return { ...objData, type: 'dropdown' };
            }
            else {
                return { ...objData, type: '' };
            }
        });
        let presentDate = ExceptionLogView_ModuleProcessor.GetPresentDate();
        let previousDate = ExceptionLogView_ModuleProcessor.GetPreviousDate();
        var objSearchData = {
            "iMainClientId": -1,
            "iApplicationTypeId": -1,
            "dtFromDate": previousDate,
            "dtToDate": presentDate,
            "vType": objSelectedTab.text
        };
        var objNewData = { ...objContext.state, "objData": objSearchData, "arrExceptionLogView": [] };
        objContext.dispatch({ type: "SET_STATE", payload: objNewData });
        ApplicationState.SetProperty("ModuleTabData", { "ExceptionLogView": arrTabData });
    }

}

export default ExceptionLogView_ModuleProcessor;