//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';


/**
 * @name Object_Extranet_School_School
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Extranet_School_School = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/Extranet/School/School",

    /**
     * @summary Initializes Data
     **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the School object to store
     **/
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_School.InitialDataCallParam = objParam;
        Object_Extranet_School_School.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_School_School", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_School_School", Object_Extranet_School_School);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_School_School.URL,
            "Params": Object_Extranet_School_School.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "ReturnDataOnServerRender": Object_Extranet_School_School.ReturnDataOnServerRender
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for School
     */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_School.URL, objParams, "Get", fnCallback, blnNoCache);
    },

    /**
     * @name AddData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for School
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_School.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for School
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_School.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary DeleteData for School
     */
    DeleteData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_School.URL, objParams, "Delete", fnCallback, blnNoCache);
    },

    MethodCall: (objParams, strMethodType, fnCallback) => {
        let arrParams = [{
            "URL": Object_Extranet_School_School.URL,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, fnCallback);
    },

    /**
     * @name SendLogins
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary Send Login Mail for SchoolManagement from Intranet
     */
    SendLogins: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Extranet/School/School/SendSchoolManagmentLogin", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
* @name OpenExtranetPupil
* @param {objParams} objParams Passes objParams
* @param {callback} fnCallback Callback function
* @summary Edits data for PupilManagement
*/
    OpenExtranetSchool: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("Product/Core/Controllers/OpenApplicationController/Index", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }
};

export default Object_Extranet_School_School;

export var GetStateIdBasedOnSchool = (strSchoolId) => {
    let strStateId = ApplicationState.GetProperty("StateIdFor" + strSchoolId);
    console.log("school Id , state Id", strSchoolId, strStateId)
    if (strStateId != undefined) {
        return strStateId;
    } else {

        let objSchoolParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": strSchoolId
                        }
                    }]
            }
        };
        (new ArcadixFetchAndCacheData()).ExecuteSingle("API/Object/Extranet/School/School", objSchoolParams, "Get", (objResponse) => {
            let arrStateData = objResponse["Object_Extranet_School_School;uSchoolId;" + strSchoolId]["Data"];
            if (arrStateData && arrStateData.length > 0)
                ApplicationState.SetProperty("StateIdFor" + strSchoolId, arrStateData[0]["iStateId"]);
        });
    }
}