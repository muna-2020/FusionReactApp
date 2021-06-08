import { useState, useLayoutEffect } from "react";
import ArcadixFetchAndCacheData, { DataRef } from "@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData";


/**
 * this function has to be sent to connect HOC for redux mapping
 * this will contain the Entity/ApplicationState mappings
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true)
        };
    } else {
        return {};
    }
}

/**
 * @param {*} JConfiguration
 * @param {*} props
 * this function will return an object which contains an arrays -
 *  arrDataRequest -> an array containing the data params.
 */
export function InitialDataParams(JConfiguration, props) {
    var strCycleId = QueryString.GetQueryStringValue("CycleId");
    var objResourceParams = {
        SearchQuery: {
            must: [
                {
                    match: {
                        Id: JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/DataComparison"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            URL: "API/Object/Blocks/TextResource/TextResource",
            Params: objResourceParams,
            ReturnDataOnServerRender: true,
            MethodType: "Get"
        },
        {
            URL: "API/Extranet/TeacherDataComparison",
            Params: {
                uCycleId: strCycleId, // "0FDDDE67-6793-4093-9790-9E3611356C8B",
                iStateId: props.Data.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].iStateId,
                uSchoolId: props.Data.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
                uTeacherId: props.Data.ClientUserDetails.UserId,
                uClassId: ApplicationState.GetProperty("SelectedClassId"),
                FromDate: "",
                ToDate: ""
            },
            MethodType: "Get"
        }
    ];
    return { DataCalls: arrDataRequest };
}

/**
 * This method will make the Execute api call and return a promise. You resolve the same in the custom hook below and carry out any specific operation
 * @param {*} props 
  objArcadixFetchAndCacheData.Execute is used to fetch textresource
  ArcadixFetchData.Execute is used to fetch data directly from database(tablevalues)
 * // 
 */
export function DataCall(arrParams, strToggleData = "TextResource", dispatch) {
    if (strToggleData === "TextResource") {
        var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) { });
    } else if (strToggleData === "Data") {
        ArcadixFetchData.Execute(arrParams, function (objReturn) {
            dispatch({
                type: "SETDATA",
                payload: DataRef(objReturn.teacherdatacomparison).Data
            });
        });
    }
}

/**
 * Custom hook which will carry out the data call portion and take care of re-rendering on prop/state changes
 * @param {*} props
 */
export function useDataLoader(objContext) {
    //ApplicationState.SetProperty("blnShowAnimation", true);
    const GetRequiredData = () => {
        DataCall([InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls[0]], "TextResource", objContext.dispatch);
        DataCall([InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls[1]], "Data", objContext.dispatch);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useLayoutEffect(() => {
        if (
            DataRef(
                objContext.props.textresource,
                "textresource;id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/DataComparison"
            ) &&
            Object.keys(objContext.state.objData).length > 0
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.textresource, objContext.state.objData]);
}

/**
 * @summary Sets Initial states
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {}
    };
}

/**
 * @summary reducer to maintain component state
 * @param {any} state
 * @param {any} action
 */
export function Reducer(state, action) {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE": {
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        }
        case "SETDATA": {
            return {
                ...state,
                ["objData"]: action.payload
            };
        }
    }
}
