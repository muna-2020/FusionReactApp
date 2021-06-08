import {useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true)
        };
    }
    else {
        return {};
    }
}

export function InitialDataParams(JConfiguration, objContext) {
    var objParamsProfileData = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uSchoolId": objContext.ClientUserDetails.UserId
                    }
                }]
        },
        "SortKeys": {},
        "OutputColumns": {}
    };

    var objResourceParams = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Contact"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            "URL": "API/Object/Extranet/School",
            "Params": objParamsProfileData,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrDataRequest
    };
};

/**
 * 
 * @param {*} objParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("Getting initial data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/contact")["Data"])
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }   
        }
    }, [
            objContext.props.textresource
        ]);
}

export function HandleChange(objContext, strId, strValue) {
    let objValidation;
    switch (strId) {        
        case "EmailSubject":           
            if (strValue == "") {
                objValidation = { strValidationSubject: "Field cant be empty" };
            }
            else {
                objValidation = { strValidationSubject: null };
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": null } });
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strEmailSubject": strValue } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: objValidation });
            break;
        case "Emailtext":
            if (strValue == "") {
                objValidation = { strValidationText: "Field cant be empty" };
            }
            else {
                objValidation = { strValidationText: null };
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": null } });
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strEmailtext": strValue } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: objValidation });
            break;
        case "imgupload":
            if (strValue == "") {
                objValidation = { strValidationFile: "Field cant be empty" };
            }
            else {
                objValidation = { strValidationText: null };
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strFileUpload": strValue } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: objValidation });
            break;
    }
}

export function Validate(objContext){
    var strElementToFocus = "";
    if (objContext.state.strValidationSubject !== "" && objContext.state.strValidationSubject !== null )
    {
        strElementToFocus = "EmailSubject";
    }
    else if (objContext.state.strValidationText !== "" && objContext.state.strValidationText !== null ) {
        strElementToFocus = "Emailtext";
    }
    if(strElementToFocus !== ""){
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowValidation": true } });
    }
    return strElementToFocus;
}

export function OnClickEmailSend(objContext , strAttachmentArray)
{
    let EmailNote = {
        ["SchoolId"]: objContext.props.ClientUserDetails.UserId,//TeacherDetails..uSchoolId,
        ["strSubject"]: objContext.state.strEmailSubject,
        ["strAttachmentsJson"]: strAttachmentArray,// objContext.state.str,
        ["strUserId"]: objContext.props.ClientUserDetails.UserId,//"D6B9E650-F2D7-40A6-9290-9E48540B1EDA",
        ["strComment"]: objContext.state.strEmailtext//"Testing Send Email",
    };
    SendContactEmail(objContext, EmailNote);    
}

export function OnClickEmailSendOld(objContext , strAttachmentArray, SubjectTextRef,ContentTextRef)
{
    if (objContext.state.strEmailtext !== "" && objContext.state.strEmailSubject !== "") {
        let EmailNote = {
            ["SchoolId"]: objContext.props.ClientUserDetails.UserId,
            ["strSubject"]: objContext.state.strEmailSubject,
            ["strAttachmentsJson"]: strAttachmentArray,
            ["strUserId"]: objContext.props.ClientUserDetails.UserId,
            ["strComment"]: objContext.state.strEmailtext
        };
        SendContactEmail(objContext, EmailNote);
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowValidation": true } });
        if (objContext.state.strValidationSubject !== "" && objContext.state.strValidationSubject !== null)
        {
           SubjectTextRef.current.focus();
        }
        else if (objContext.state.strValidationText !== "" && objContext.state.strValidationText !== null) {
            ContentTextRef.current.focus();
        }
    }
}

export function SendContactEmail(objContext, EmailNote) {
    var objEmailSendParams = EmailNote;
    let arrParams =
        [{
            ["URL"]: "API/Extranet/SharedModule/ContactEmail/SendContactEmail",
            ["Params"]: objEmailSendParams
        }];
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.Execute(arrParams, (response) => {
            console.log(response);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowMailSentDiv": true } });
        });
}

export const ShowValidationMessageOnFocus = (objContext, strId, strValue) => {
    switch (strId) {
        case "EmailSubject":
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": objContext.state.strValidationSubject } });
            break;
        case "Emailtext":
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": objContext.state.strValidationText} });
            break;
        case "imgupload":
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": objContext.state.strValidationText } });
            break;
    }
}

export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        strEmailSubject: "",
        strEmailtext: "",
        strValidationSubject: "Field Cannot Be Empty",
        strValidationText: "Field Cannot Be Empty",
        strValidationMessage: "",
        strFileUpload :"",
        blnShowMailSentDiv:false,
        blnShowValidation:false        
    };
}

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





