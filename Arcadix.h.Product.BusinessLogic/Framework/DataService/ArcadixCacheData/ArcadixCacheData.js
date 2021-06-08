import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { AddValue, EditValue, DeleteValue, DeleteKey, DeleteProperty, AddProperty } from '@shared/Framework/DataService/ArcadixCacheData/Redux/Actions/ActionCreators';
import { processUrl, getProcessUrl } from '@shared/Framework/DataService/ArcadixCacheData/Redux/ProcessUrl';




//This class is responsibe for modifying the redux store
class ArcadixCacheData {

    // Add new data to store
    // strEntity: key by which this entity is saved eg: 'school' or 'teacher'
    // objParams: the new object ot be added eg {iSchoolId:3,tSchoolName:'abc',tLocation:'Bangalore'}
    static AddData(strEntity, objParams, fnCallBack) {
        store.dispatch(AddValue(strEntity, objParams, fnCallBack));
    }
    //edit existing object in store by passing the primary key name and the object
    // strEntity: key by which this entity is saved eg: 'school' or 'teacher'
    // objParams: {key:<unique Key name eg: 'iSchoolId'>,Value:<the entire object to be edited (the edited object is replaced instead of the old one) eg:{iSchoolId:3,tSchoolName:'test',tLocation:'Bangalore'}>}
    static EditData(strEntity, objParams, fnCallBack) {
        store.dispatch(EditValue(strEntity, objParams, fnCallBack));
    }
    //delete existing object in store by passing the primary key name and the object
    // strEntity: key by which this entity is saved eg: 'school' or 'teacher'
    // objParams: {key:<unique Key name eg: 'iSchoolId'>,Value:<the entire object to be edited (the edited object is replaced instead of the old one) eg:{iSchoolId:3,tSchoolName:'test',tLocation:'Bangalore'}>}
    static DeleteData(strEntity, objParams, fnCallBack) {
        store.dispatch(DeleteValue(strEntity, objParams, fnCallBack));
    }

    // get data from store the data can be filtered by sending the filter in params
    // strEntity: key by which this entity is saved eg: 'school' or 'teacher'
    // objParams:  {key:<unique Key name eg: 'iSchoolId'>,value :<value of the key to be searched eg: 23>} an array of such objects can be sent for multiple values
    static GetData(strEntity, fnCallBack, objParams) {
        var state = store.getState();
        var CurrentState = state.Entity;
        if (CurrentState[strEntity]) {
            if (objParams) {
                let result = [];
                if (objParams.length !== undefined) {

                    objParams.forEach(param => {
                        var val = CurrentState[strEntity].filter(item => item[param.key] === param.value);
                        result = [...result, val];
                    });
                } else {
                    var val = CurrentState[strEntity].filter(item => item[objParams.key] === objParams.value);
                    result = [...result, val];
                }
                fnCallBack(result);
            }
            else {
                fnCallBack(CurrentState[strEntity]);
            }
        }
        else {
            fnCallBack([]);
        }
    }

    static ReplaceData(strEntity, objParams, fnCallBack) {        
            store.dispatch(DeleteKey(strEntity, objParams));

    }

    static IsExisting(strEntity, objParams) {
        var objCurrentStates = store.getState();
        var objCurrentState = objCurrentStates.Entity;
        if (objCurrentState[strEntity]) {
            if (objParams.Filter) {
                if (objCurrentState[strEntity][objParams.Filter]) {
                    let objExistingData = objCurrentState[strEntity][objParams.Filter].Data.filter(item => item[objParams.key] === objParams["Value"][objParams.Key]);
                    if (objExistingData === undefined || objExistingData.length === 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                let objExistingData = objCurrentState[strEntity].Data.filter(item => item[objParams.key] === objParams["Value"][objParams.Key]);
                if (objExistingData === undefined || objExistingData.length === 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            return false;
        }

    }

    // check if the data is present already in the store
    static IsDataPresent(arrParams = []) {
        let blnDataPresent = true;
        let objReturnData = {};
        for (var i = 0; i < arrParams.length; i++) {
            let strEntity = getProcessUrl(arrParams[i].URL, arrParams[i].MethodType, true);
            let objCurrentState = store.getState();
            if (arrParams[i].MethodType && arrParams[i].MethodType.toUpperCase() === "GET") {
                if (arrParams[i].Params && ShouldAddFilters(arrParams[i].Params)) {
                    let strFilters = ArcadixCacheData.fnGetFilters(strEntity, arrParams[i].Params);
                    if (objCurrentState.Entity[strEntity]) {
                        if (objCurrentState.Entity[strEntity][strFilters]?.["Data"]) {
                            objReturnData[strFilters] = objCurrentState.Entity[strEntity][strFilters];
                            arrParams[i].Params["Timestamp"] = objCurrentState.Entity[strEntity][strFilters].TimeStamp;
                        }
                    }
                }
                else {
                    if (objCurrentState.Entity[strEntity]?.["Data"]) {
                        objReturnData[strEntity] = objCurrentState.Entity[strEntity];
                        arrParams[i].Params["Timestamp"] = objCurrentState.Entity[strEntity].TimeStamp;
                    }

                }
            }
        }
        return {
            Data: objReturnData,
            DataRequest: arrParams
        };
    }

    static fnGetFilters(strEntity, objFilters) {
        let objReturnFilters = "";
        if (objFilters && (objFilters.SearchQuery || objFilters.ForeignKeyFilter)) {
            if (objFilters.ForeignKeyFilter) {
                let ForeignKeys = Object.keys(objFilters.ForeignKeyFilter);
                ForeignKeys.forEach(item => {
                    if (item.toLowerCase() !== "type") {
                        objReturnFilters += ";" + item + ";" + objFilters.ForeignKeyFilter[item];
                    }
                });
            }
            if (objFilters.SearchQuery && objFilters.SearchQuery.must) {
                objFilters.SearchQuery.must.map(Condition => {
                    if (Condition.match) {
                        let Keys = Object.keys(Condition.match);
                        for (let j = 0; j < Keys.length; j++) {
                            objReturnFilters += ";" + Keys[j] + ";" + Condition.match[Keys[j]];
                        }
                    } else if (Condition.nested && Condition.nested.query.bool.must) {
                        Condition.nested.query.bool.must.map(nestedCondition => {
                            let Keys = Object.keys(nestedCondition.match);
                            for (let j = 0; j < Keys.length; j++) {
                                objReturnFilters += ";" + Keys[j] + ";" + nestedCondition.match[Keys[j]];
                            }
                        });
                    }
                });
            }
        }
        return strEntity + objReturnFilters;
    }

    /**
     * Deletes the entity from store
     * @param {any} strEntity => Entity to be deleted.
     */
    static DeleteEntity(strEntity) {
        store.dispatch(DeleteProperty(strEntity));
    }

    /**
     * @summary => The method allows to add the Entity Management Object to the store
     * @param {any} strEntity => Entity where the object needs to be added.
     * @param {any} objParams =>  the structure required is as follows { Value: [EntityObject] }
     */
    static AddEntityObject(strEntity,objParams) {
        store.dispatch(AddProperty(strEntity, objParams));
    }

    static AddPrefetchDataToStore(objResponse) {
        //---Adding Prefetch Data into Redux-----
        let strEntity = getProcessUrl(objResponse.URL, "GET", true);
        let strFilters = ArcadixCacheData.fnGetFilters(strEntity, objResponse.Params);
        let objResponseData = {
            Data: objResponse.Data[strFilters],
            TimeStamp: JSON.parse(objResponse.HeaderData["timestamp"])[strFilters],
            PrimaryKeyName: JSON.parse(objResponse.HeaderData["primarykeyname"])[strFilters],
            Count: JSON.parse(objResponse.HeaderData["count"])[strFilters]
        };
        if (objResponse.Params && ShouldAddFilters(objResponse.Params)) {
            ArcadixCacheData.ReplaceData(strEntity, { Filter: strFilters, Value: objResponseData });
        }
        else {
            ArcadixCacheData.ReplaceData(strEntity, { Value: objResponseData });
        }
    }
}


export function ShouldAddFilters(objParams) {
    if ((!objParams.ForeignKeyFilter || Object.keys(objParams.ForeignKeyFilter).length == 0)
        &&
        (!objParams.SearchQuery || Object.keys(objParams.SearchQuery).length == 0)) {
        return false;
    } else {
        return true;
    }
}

export default ArcadixCacheData;