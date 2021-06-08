import { useState, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {    
    if (!global["mode"]) {
        return {
            selectedItem: state.ApplicationState.selectedItem,
            teacher: DataRef(state.Entity, "teacher", true),
            textresource: DataRef(state.Entity, "textresource", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp 
        };
    }
    else {
        return {};
    }
}

/**
 * loading initial data
 * @param {any} JConfiguration
 * @param {any} props
 */
export function InitialDataParams(JConfiguration, props) {
    var objResourceParams = {
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/TeacherLogin"
                    }
                }
            ]
        }
    };

    var objParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClientUserDetails.UserId,
            "Type": "nested"
        },       
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ]
    };
       
    var arrDataRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Teacher/Teacher",
            "Params": objParams,
            "MethodType": "Get",
            "IsAuthenticationRequired": "false"
        }
    ];
    return { "DataCalls": arrDataRequest };
}

/**
 *
 * @param {*} objParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objContext) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();    
    objArcadixFetchAndCacheData.Execute(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, function (objReturn) {
       });   
}

/**
 *
 * @param {*} objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const [isLoading, setIsLoading] = useState(true);
    const getRequiredData = () => {
        //Logger.Log("getting required data");
        DataCall(objContext);
    };
    useLayoutEffect(getRequiredData, []);
}

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useLayoutEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo +"/d.extranet/2_school/modules/teacherlogin")
        )
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });           
        }
        //else {
        //   Logger.Log("data is loading");
        //}
      },
    [
        objContext.props.textresource,
        objContext.props.teacher
    ]); //once both of these are loaded oly if condition wll execute
}

export function GenerateLogins(objContext, strProgressBarID) {
    var strSelectedTeacherIds ="";
    objContext.state.arrTeacherData.map(objTeacher => {
        if (objTeacher.isSelected) {
            strSelectedTeacherIds += objTeacher.uTeacherId + ",";
        }
    });
    strSelectedTeacherIds = strSelectedTeacherIds.substring(0, strSelectedTeacherIds.length - 1);
    var objDataParamsProgressBarMethod = {
        ["URL"]: "API/Extranet/School/Modules/TeacherLogin/SendTeacherLogin",
        ["Params"]: {
            ["TeacherIds"]: strSelectedTeacherIds,//"E92A7F5F-5C82-43E7-8743-001C5855F6CD,C0550931-94C2-429F-BD03-F70B141FDFF7,5C9808A6-4F53-4FC8-8396-3CB6AE7783C3",
            ["ProgressBarId"]: strProgressBarID,
            ["SchoolId"]: objContext.props.ClientUserDetails.UserId //"48A04201-9D1F-4533-8327-C69F2D4BDFBB",            
        }
    };
  
    ArcadixFetchData.Execute([objDataParamsProgressBarMethod], (response) => {
        Logger.Log(response);
    });
}

export function SendRequest(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    return new Promise(function (resolve, reject) {
        objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {            
            resolve({ Data: objReturn, success: true });
        });
    });
}

export function MarkAll(objContext, value) {
    let arrTeacherData = objContext.state.arrTeacherData.map(t => {
        return { ...t, isSelected: value };
    });
    objContext.dispatch({ type: 'update', payload: arrTeacherData });
}

export function OnClickEmail(objContext) {
    var arrSelectedTeacherIds = [];
    objContext.state.arrTeacherData.map(objTeacher => {
        if (objTeacher.isSelected) {
            arrSelectedTeacherIds = [...arrSelectedTeacherIds, objTeacher.uTeacherId];
        }
    });
    if (arrSelectedTeacherIds.length > 0) {
        return true;
    }
}

export function GetInitialState() {
    return {
        arrTeacherData: undefined,
        activeTeachersCount: 0,
        blnStateLoaded: false,
        isLoadComplete: false,
        blnShowPopup: false
    };
}

//Sets states according to action type
export function Reducer(state, action) {
    switch (action.type) {
        case "initialUpdate": {
            return {
                ...state,
                blnStateLoaded: true,
                activeTeacherCount: action.payload.length,
                arrTeacherData: action.payload.map(t => { return { ...t, isSelected: false }; })
            };
        }

        case 'update':
        {
            return {
                ...state,
                arrTeacherData: action.payload
            };
        }

        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload };
        }

        case 'SetShowPopup': {
            return {
                ...state,
                blnShowPopup: action.payload
            };
        }
    }
}
