import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState'

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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Notes"
                    }
                }
            ]
        }
    };
    let objNotesParams = {};
    if(JConfiguration.ApplicationTypeId === "1") //Teacher Extranet
    {
        objNotesParams = {
            "ForeignKeyFilter": {
                "uUserId": props.ClientUserDetails.UserId
            },
            "SearchQuery": {
                "must":[
                    {
                        "match":{
                            "cIsTeacher":"Y"
                        }
                    },
                    {
                        "match":{
                            "cIsSchool":"N"
                        }
                    },
                    {
                        "match":{
                            "cIsPupil":"N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iOrder":{
                        "order":"asc"
                    }
                }
            ]    
        };
    }
    else 
    if(JConfiguration.ApplicationTypeId === "6")
    {
        objNotesParams = {
            "ForeignKeyFilter": {
                "uUserId": props.ClientUserDetails.UserId
            },
            "SearchQuery": {
                "must":[
                    {
                        "match":{
                            "cIsTeacher":"N"
                        }
                    },
                    {
                        "match":{
                            "cIsSchool":"Y"
                        }
                    },
                    {
                        "match":{
                            "cIsPupil":"N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iOrder":{
                        "order":"asc"
                    }
                }
            ]    
        };
    }
    let arrDataRequest = [
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
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
export function DataCall(arrParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method with a toggle to switch between Execute and ExecuteCustom.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useLayoutEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/notes")) {
            if (objContext.props.JConfiguration.ApplicationTypeId === "1" &&
                DataRef(objContext.props.notes, "notes;uuserid;" + objContext.props.ClientUserDetails.UserId + ";cisteacher;y;cisschool;n;cispupil;n")) {
                SetNotesToState(objContext);
            }
            else
                if (objContext.props.JConfiguration.ApplicationTypeId === "6" &&
                    DataRef(objContext.props.notes, "notes;uuserid;" + objContext.props.ClientUserDetails.UserId + ";cisteacher;n;cisschool;y;cispupil;n")) {
                    SetNotesToState(objContext);
                }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.textresource, objContext.props.notes]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the notes from store and sets it to local state. Also sets 'isLoadComplete' to true.
 */
function SetNotesToState(objContext)
{
    let arrNotesData = GetNotesJson(objContext);
    if(objContext.state.strNoteUpdated === "")
    {
        let arrNotes = [];
        for(let intCount = 0; intCount < 3; intCount++)
        {
            let objNoteDetails = {};
            let intTempOrderId = intCount + 1;
            let arrTempNote = arrNotesData.filter(objNote => objNote.iOrder === intTempOrderId);
            if(arrTempNote.length > 0)
            {
                objNoteDetails = {...arrTempNote[0]};
            }
            else
            {
                objNoteDetails = {...GetDefaultNote(objContext, intTempOrderId)};
            }
            arrNotes = [...arrNotes, objNoteDetails];
        }
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"arrNotes": arrNotes}});
        objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });       
    }
    else
    {
        let objNoteDetails = {...arrNotesData.filter(objNote => objNote.iOrder === parseInt(objContext.state.strNoteUpdated))[0]};
        let arrNotes = objContext.state.arrNotes.map(objNote=>{
            if(objNote.iOrder === parseInt(objContext.state.strNoteUpdated))
            {
                return {...objNote, vNote: objNoteDetails.vNote, uNoteId: objNoteDetails.uNoteId};
            }
            else
            {
                return objNote;
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"arrNotes": arrNotes}});
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the data from store and returns array with Notes data. Checks for application type id.
 */
export function GetNotesJson(objContext) {
    let arrNotes = [];
    if(objContext.props.JConfiguration.ApplicationTypeId === "1")
    {
        arrNotes = DataRef(objContext.props.notes, "notes;uuserid;" + objContext.props.ClientUserDetails.UserId + ";cisteacher;y;cisschool;n;cispupil;n").Data;
        if(arrNotes.length > 0)
        {
            arrNotes = arrNotes.filter(note=>{return note.cIsTeacher === "Y" && note.cIsSchool === "N" && note.cIsPupil === "N"});
        }
    }
    else
    if(objContext.props.JConfiguration.ApplicationTypeId === "6")
    {
        arrNotes = DataRef(objContext.props.notes, "notes;uuserid;" + objContext.props.ClientUserDetails.UserId + ";cisteacher;n;cisschool;y;cispupil;n").Data;
        if(arrNotes.length > 0)
        {
            arrNotes = arrNotes.filter(note=>{return note.cIsTeacher === "N" && note.cIsSchool === "Y" && note.cIsPupil === "N"});
        }
    }
    return arrNotes;
}

/**
 * 
 * @param {*} orderId 
 * @summary   return an object with default value of note
 */
export function GetDefaultNote(objContext, orderId = -1)
{
    let objNote = {
        "uNoteId": "00000000-0000-0000-0000-000000000000",
        "vNote": "",
        "uUserId": objContext.props.ClientUserDetails.UserId,
        "cIsSchool": "",
        "cIsTeacher": "",
        "cIsPupil": "",
        "iOrder": orderId                
    };
    if(objContext.props.JConfiguration.ApplicationTypeId === "1")
    {
        return {...objNote, "cIsSchool": "N", "cIsTeacher": "Y", "cIsPupil": "N"};
    }
    else
    if(objContext.props.JConfiguration.ApplicationTypeId === "6")
    {
        return {...objNote, "cIsSchool": "Y", "cIsTeacher": "N", "cIsPupil": "N"};
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} intId 
 * @summary   Checks note data and calls save method
 */
export function HandleSave(objContext, intId, arrNotes) {
    let objNoteDetails = {...arrNotes.filter(objNote=> objNote.iOrder === intId)[0]};
    let strTempSaveNoteId = intId;
    if(objNoteDetails && JSON.stringify(objNoteDetails) !== '{}')
    {
        Logger.Log("Save Note", objNoteDetails);
        SaveNote(objContext, objNoteDetails);
        objContext.dispatch({type:"SET_STATE_VALUES", payload: {"strNoteUpdated": strTempSaveNoteId, "arrNotes": arrNotes}});
    }
    else
    {
        Logger.Log("No data to save");
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objNote 
 * @summary   Save or Edit a note.
 */
export function SaveNote(objContext, objNote) {
    let objDataParams = {};
    let arrParams = [];
    if(objContext.props.JConfiguration.ApplicationTypeId === "1")
    { 
        objDataParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            "SearchQuery": {
                "must":[
                    {
                        "match":{
                            "cIsTeacher":"Y"
                        }
                    },
                    {
                        "match":{
                            "cIsSchool":"N"
                        }
                    },
                    {
                        "match":{
                            "cIsPupil":"N"
                        }
                    }
                ]
            }
        };
    }
    else
    if(objContext.props.JConfiguration.ApplicationTypeId === "6")
    { 
        objDataParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            "SearchQuery": {
                "must":[
                    {
                        "match":{
                            "cIsTeacher":"N"
                        }
                    },
                    {
                        "match":{
                            "cIsSchool":"Y"
                        }
                    },
                    {
                        "match":{
                            "cIsPupil":"N"
                        }
                    }
                ]
            }
        };
    }
    if(objNote.uNoteId === '00000000-0000-0000-0000-000000000000')
    {
        objDataParams = {...objDataParams, "vAddData": objNote};
        arrParams = [...arrParams, {
            "URL": "API/Object/Extranet/School/Notes",
            "Params": objDataParams,
            "MethodType": "Post"
        }];
    }
    else
    {
        objDataParams = {...objDataParams, "vEditData": objNote};
        arrParams = [...arrParams, {
            "URL": "API/Object/Extranet/School/Notes",
            "Params": objDataParams,
            "MethodType": "Put"
        }];
    }
    DataCall(arrParams);
    ApplicationState.SetProperty("blnShowAnimation", true);
}

/**
 * @summary   Sets Initial states
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrNotes: [],
        strNoteUpdated: ""
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets states according to action type
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case "SET_STATE_VALUES":
            return{
                ...state,
                ...action.payload
            };
        case "DATA_LOAD_COMPLETE":
        return{
            ...state,
            "isLoadComplete": action.payload
        };
    }
}
