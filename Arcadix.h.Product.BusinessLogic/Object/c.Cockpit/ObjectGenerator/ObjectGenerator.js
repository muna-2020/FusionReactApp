//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Cockpit_ObjectGenerator = {

    /**
    * @summary URL
    */
    URL: "API/Object/Cockpit/ObjectGenerator",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {arrObjectGeneratorParams} arrObjectGeneratorParams Passes objParam
    * @summary Initialize initial data call param and then adds the Teacher object to store
    */
    Initialize: function (arrObjectGeneratorParams, strReturnDataOnServerRender) {
        let arrInitialCalls = arrObjectGeneratorParams.map(objGeneratorName => {
            let objObjectGeneratorParams = {
                "SearchQuery": {
                    "must": [{
                        "match": {
                            "vObjectName": objGeneratorName
                        }
                    }]
                }
            };
            return objObjectGeneratorParams;
        });

        Object_Cockpit_ObjectGenerator.InitialDataCallParam = arrInitialCalls;
        Object_Cockpit_ObjectGenerator.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Cockpit_ObjectGenerator", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_ObjectGenerator", Object_Cockpit_ObjectGenerator);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Teacher
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        let arrReturn = Object_Cockpit_ObjectGenerator.InitialDataCallParam.map(objCall => {
            return {
                "URL": Object_Cockpit_ObjectGenerator.URL,
                "Params": objCall,
                "MethodType": "Get",
                "UseFullName": true,
                "IsMultiIndexData": "N",
                "IsInMemoryCache": "N",
                "ReturnDataOnServerRender": Object_Cockpit_ObjectGenerator.ReturnDataOnServerRender
            };
        });
        return arrReturn;
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Teacher
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ObjectGenerator.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for Teacher
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ObjectGenerator.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for Teacher
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ObjectGenerator.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Teacher
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_ObjectGenerator.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_ObjectGenerator;