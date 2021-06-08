//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Extranet_Teacher_Class
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Extranet_Teacher_Class = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Teacher/Class",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the Class object to store
    **/
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_Teacher_Class.InitialDataCallParam = objParam;
        Object_Extranet_Teacher_Class.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_Teacher_Class", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_Class", Object_Extranet_Teacher_Class);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_Class.URL,
            "Params": Object_Extranet_Teacher_Class.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "ReturnDataOnServerRender": Object_Extranet_Teacher_Class.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Class
    */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Class.URL, objParams, "Get", fnCallback, blnNoCache);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for Class
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Class.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for Class
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Class.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary DeleteData for Class
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Class.URL, objParams, "Delete", fnCallback);
    },

    /**
    * @name SaveCoTeacher
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Saves co teacher for Class
    */
    SaveCoTeacherFetch: (objParams, fnCallback) => {
        //console.log("SaveCoTeacherFetch")
        //ArcadixFetchData.ExecuteCustom("Api/Object/Extranet/Teacher/Class/SaveCoTeacher", "Post", objParams).then((response) => {
        //    response.json().then((objData) => {
        //        fnCallback(objData);
        //        //return objData;
        //    });            
        //});

        let arrRequest = [
            {
                "URL": Object_Extranet_Teacher_Class.URL + '/SaveCoTeacher',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name SaveCoTeacher
    * @param {String} strEntity passes Entity
    * @param {String} strFilters passes Filter
    * @param {object} storeParams passes store params
    * @param {callback} fnCallback callback function
    * @summary Saves co teacher for Class
    */
    SaveCoTeacherCache: (strEntity, strFilters, storeParams, fnCallback) => {
        //ArcadixCacheData.EditData(strEntity, { Filter: strFilters.toLowerCase(), Value: storeParams });
        ArcadixCacheData.AddData(strEntity, { Filter: strFilters, Value: storeParams }, fnCallback);
    },

    /**
    * @name SaveSubjectExpert
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Saves SubjectTeacher for Class
    */
    SaveSubjectExpert: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle("API/Object/Extranet/Teacher/Class/SaveSubjectExpert", objParams, null, fnCallback);
    },

    /**
    * @name UpdatePupilCount
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary Updates the pupil count for Class
    */
    UpdatePupilCount: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle("API/Object/Extranet/Teacher/Class/UpdatePupilCount", objParams, null, fnCallback);
    }
};

export default Object_Extranet_Teacher_Class;
