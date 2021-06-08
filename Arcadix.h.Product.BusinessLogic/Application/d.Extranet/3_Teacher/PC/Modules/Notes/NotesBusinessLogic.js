import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            notes: DataRef(state.Entity, "notes", true),
            textresource: DataRef(state.Entity, "textresource", true)
        };
    }
    else {
        Logger.Log("Not mapping");
        return {};
    }
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let objResourceParams = {
        "ForeignKeyFilter": {
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/Notes"
                    }
                }
            ]
        },
        "OutputColumns": []
    };
    let objNotesParams = {
        "ForeignKeyFilter": {
            "uUserId": props.ClientUserDetails.UserId
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsTeacher": "Y"
                    }
                },
                {
                    "match": {
                        "cIsSchool": "N"
                    }
                },
                {
                    "match": {
                        "cIsPupil": "N"
                    }
                }
            ]
        },
        "SortKeys": [
            {
                "iOrder": {
                    "order": "asc"
                }
            }
        ],
        "OutputColumns": []
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School/Notes",
            "Params": objNotesParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrDataRequest };
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams, intToggleExecute) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    if (intToggleExecute === 0) {
        objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
            //Do something
        });
    }
    else {
        objArcadixFetchAndCacheData.ExecuteCustom(objParams.URL, objParams.MethodType, objParams, function (objReturn) {
            //Do something
        });
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method with a toggle to switch between Execute and ExecuteCustom.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, 0);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;de/d.extranet/3_Teacher/modules/notes") &&
            DataRef(objContext.props.notes, "notes;uUserid;" + objContext.props.ClientUserDetails.UserId + ";cisteacher;y;cisschool;n;cispupil;n")) {
            let arrNotes = GetNotesJson(objContext);
            let objNote1 = {}, objNote2 = {}, objNote3 = {};
            let intIndex = arrNotes.findIndex(note => { return note.iOrder === 1; });
            if (intIndex !== -1) {
                objNote1 = arrNotes[intIndex];
            }
            else {
                objNote1 = { ...GetDefaultNote(1), uUserId: objContext.props.ClientUserDetails, iOrder: 1 };
            }
            intIndex = arrNotes.findIndex(note => { return note.iOrder === 2; })
            if (intIndex !== -1) {
                objNote2 = arrNotes[intIndex];
            }
            else {
                objNote2 = { ...GetDefaultNote(2), uUserId: objContext.props.ClientUserDetails, iOrder: 2 };
            }
            intIndex = arrNotes.findIndex(note => { return note.iOrder === 3; })
            if (intIndex !== -1) {
                objNote3 = arrNotes[intIndex];
            }
            else {
                objNote3 = { ...GetDefaultNote(3), uUserId: objContext.props.ClientUserDetails, iOrder: 3 };
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objNote1": objNote1, "objNote2": objNote2, "objNote3": objNote3 } });
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
        }
    }, [objContext.props.notes])
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the data from entity reducer and returns array with Notes data.
 */
export function GetNotesJson(objContext) {
    let arrNotes = DataRef(objContext.props.notes, "notes;uUserid;" + objContext.props.ClientUserDetails.UserId + ";cisteacher;y;cisschool;n;cispupil;n").Data;
    if (arrNotes.length > 0) {
        arrNotes = arrNotes.filter(note => { return note.cIsTeacher === "Y" && note.cIsSchool === "N" && note.cIsPupil === "N" });
    }
    return arrNotes;
}

/**
 * 
 * @param {*} orderId 
 * @summary   return an object with default value of note
 */
export function GetDefaultNote(orderId = -1) {
    return {
        "uNoteId": "00000000-0000-0000-0000-000000000000",
        "vNote": "",
        "uUserId": "",
        "cIsTeacher": "Y",
        "cIsSchool": "N",
        "cIsPupil": "N",
        "iOrder": orderId
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} intId 
 * @summary   Checks note data and calls save method
 */
export function HandleSave(objContext, intId) {
    let objNote = {};
    if (intId === 1) {
        objNote = objContext.state.objNote1;
    }
    else if (intId === 2) {
        objNote = objContext.state.objNote2;
    }
    else if (intId === 3) {
        objNote = objContext.state.objNote3;
    }
    if (objNote && JSON.stringify(objNote) !== '{}') {
        objNote.uUserId = objContext.props.ClientUserDetails.UserId;
        SaveNote(objContext, objNote);
    }
    else {
        console.log("No data to save");
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} intId 
 * @param {*} strValue 
 * @summary   Tiggers when the text in the note is changed. Set the componet state for respective note.
 */
export function HandleTextChange(objContext, intId, strValue) {
    if (intId === 1) {
        let objNote = { ...objContext.state.objNote1, vNote: strValue };
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objNote1": objNote } });
    }
    else if (intId === 2) {
        let objNote = { ...objContext.state.objNote2, vNote: strValue };
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objNote2": objNote } });
    }
    else if (intId === 3) {
        let objNote = { ...objContext.state.objNote3, vNote: strValue };
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objNote3": objNote } });
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objNote 
 * @summary   Save or Edit a note.
 */
export function SaveNote(objContext, objNote) {
    let jCallParams = {
        "ForeignKeyFilter": {
            "uUserId": objContext.props.ClientUserDetails.UserId
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsTeacher": "Y"
                    }
                },
                {
                    "match": {
                        "cIsSchool": "N"
                    }
                },
                {
                    "match": {
                        "cIsPupil": "N"
                    }
                }
            ]
        },
        "vEditData": objNote,
    }
    let objParams =
    {
        "URL": "API/Object/Extranet/School/Notes",
        "Params": jCallParams,
        "MethodType": "Put"
    };
    DataCall(objParams, 1);
}

/**
 * @summary   Sets Initial states
 */
export function GetInitialState(props) {
    let objInitialState = {
        isLoadComplete: false,
        objNote1: { ...GetDefaultNote(1), "uUserId": props.ClientUserDetails.uUserId },
        objNote2: { ...GetDefaultNote(2), "uUserId": props.ClientUserDetails.uUserId },
        objNote3: { ...GetDefaultNote(3), "uUserId": props.ClientUserDetails.uUserId }
    };
    return objInitialState;
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets states according to action type
 */
export function Reducer(state, action) {
    switch (action.type) {
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                "isLoadComplete": action.payload
            };
    }
}
