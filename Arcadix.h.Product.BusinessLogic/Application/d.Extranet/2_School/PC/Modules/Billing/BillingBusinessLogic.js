import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from "@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData";
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * this function has to be sent to connect HOC for redux mapping
 * this will contain the Entity/ApplicationState mappings
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true)
        };
    }
    else {
        return {};
    }
}

/**
 * this function will return an object containing two arrays -
 *  1. arrDataRequest -> ann array containing the data params. Please follow the param format, and for more details look into the _____ doc
 *  2. arrResourceRequest -> an array containing the params for resource data realted to the module. 
 * @param {*} JConfiguration 
 * @param {*} props 
 */
export function InitialDataParams(JConfiguration, props) {
    var strFromDate = QueryString.GetQueryStringValue("From");
    var strTo = QueryString.GetQueryStringValue("To");
    var strCycleTypeId = GetCycleTypeId();
    var objParams = {
        "cIsEmptyData": "Y",
        "iStateId": props.ClientUserDetails.SchoolDetails.iStateId,
        "strFromDate": strFromDate,
        "strToDate": strTo,
        "iCycleTypeId": strCycleTypeId,
        "uSchoolId": props.ClientUserDetails.SchoolDetails.uSchoolIds
    };

    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Billing"
                    }
                }
            ]
        }
    };

    var arrDataRequest = [
        {
            URL: "API/Extranet/Billing",
            Params: objParams,
            MethodType: "Get",
            NoCache: true
        },
        {
            URL: "API/Object/Blocks/TextResource/TextResource",
            Params: objResourceParams,
            ReturnDataOnServerRender: true,
            MethodType: "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": {},
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrDataRequest };
}

/**
 * Populates the data
*/
export function LoadData(objContext) {
    ApplicationState.SetProperty("blnShowAnimation", true);
    var strFromDate = QueryString.GetQueryStringValue("From");
    var strTo = QueryString.GetQueryStringValue("To");
    var strCycleTypeId = GetCycleTypeId();
    var objParams = {
        "cIsEmptyData": "N",
        "iStateId": objContext.props.ClientUserDetails.SchoolDetails.iStateId,
        "strFromDate": strFromDate,
        "strToDate": strTo,
        "iCycleTypeId": strCycleTypeId,
        "uSchoolId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId
    };
    var arrDataRequest = [
        {
            URL: "API/Extranet/Billing",
            Params: objParams,
            MethodType: "Get",
            NoCache: true
        }
    ];
    ArcadixFetchData.Execute(arrDataRequest, function (objReturn) {
        objContext.dispatch({
            type: "SETDATA",
            payload: DataRef(objReturn.billing).Data
        });
        ApplicationState.SetProperty("blnShowAnimation", false);
    });
}

/**
 * This method will make the Execute api call and return a promise. You resolve the same in the custom hook below and carry out any specific operation
 * @param {*} props 
 */
export function DataCall(arrParams, dispatch) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        dispatch({
            type: "SETDATA",
            payload: objReturn.billing
        });
    });
}

/**
 * Custom hook which will carry out the data call portion and take care of re-rendering on prop/state changes
 * @param {*} props 
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, objContext.dispatch);
    };
    useLayoutEffect(GetRequiredData, []);
}


/**
 * @summary Custom hook which will check if all the data is loaded
 * @param {any} props
 * @param {any} state
 * @param {any} dispatch
 */
export function useDataLoaded(objContext) {
    useLayoutEffect(() => {
        if (
            DataRef(objContext.props.textresource, "textresource;id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Billing")
            && DataRef(objContext.props.schoolyearperiod) 
            && objContext.state.objData
            && Object.keys(objContext.state.objData).length > 0) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        } else {
            Logger.Log("data is loading");
        }
    },
        [
            objContext.props.textresource,
            objContext.state.objData,
            objContext.props.schoolyearperiod
        ]);
}

function GetCycleTypeId() {
    return "6";
}

/**
 *  update the state by selected schoolyearperiod 
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })    
}



/**
 * @summary reducer to maintain component state
 * @param {any} state
 * @param {any} action
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case "SETDATA":
            return {
                ...state,
                ["objData"]: action.payload
            };
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            }
    }
}

/**
  * @summary Sets Initial states
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        objSchoolYearPeriod:undefined
    };
}



