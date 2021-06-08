import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            objectgenerator: DataRef(state.Entity, "objectgenerator", true),
            school: DataRef(state.Entity, "school", true)
        };
    }
    else {
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
    let objClassResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Class"
                    }
                }
            ]
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ]
    };
    let objPupilResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil"
                    }
                }
            ]
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ]
    };
    let objClassGridConfigParams = {};
    let objPupilGridConfigParams = {};
    let objSchoolYearParams = {
        "SearchQuery": {
            "must":
                [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
        }
    };
    let objClassParams = {};
    let objSchoolYearPeriodParams = {
        "SearchQuery": {
            "must":
                [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
        }
    };
    let objClassGroupParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };
    let arrParams = [];
    if (props.JConfiguration.ApplicationTypeId === "6") {
      
        let objSchoolParams = {            
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": props.ClientUserDetails.MainClientId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "OutputColumns":["vName","vFirstName","uSchoolId","dtModifiedOn"]
        };

        arrParams = [...arrParams,
        {
            "URL": "API/Object/Extranet/School",
            "Params": objSchoolParams,
            "MethodType": "Get"
        },
        ]

    }
    if (IsSchoolOrAdminTeacher({ props })) {
        objClassGridConfigParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vObjectName": "SchoolClassGrid"
                        }
                    }
                ]
            }
        };
        objPupilGridConfigParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vObjectName": "SchoolPupilGrid"
                        }
                    }
                ]
            }
        };
        objClassParams = {
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Teacher",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Teacher.uSchoolId": GetSchoolIdByApplicationType(props),
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        };
        let objTeacherParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": GetSchoolIdByApplicationType(props),
                "Type": "nested"
            }
        };
        arrParams = [...arrParams,
        {
            "URL": "API/Object/Extranet/Teacher/Teacher",
            "Params": objTeacherParams,
            "MethodType": "Get"
        }
        ];
    }
    else if (JConfiguration.ApplicationTypeId === "1") {
        objClassGridConfigParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vObjectName": "TeacherClassGrid"
                        }
                    }
                ]
            }
        };
        objPupilGridConfigParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vObjectName": "TeacherPupilGrid"
                        }
                    }
                ]
            }
        };
        objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
    }
    arrParams = [...arrParams,
    {
        "URL": "API/Object/Framework/Blocks/TextResource",
        "Params": objClassResourceParams,
        "ReturnDataOnServerRender": true,
        "MethodType": "Get"
    },
    {
        "URL": "API/Object/Framework/Blocks/TextResource",
        "Params": objPupilResourceParams,
        "ReturnDataOnServerRender": true,
        "MethodType": "Get"
    },
    {
        "URL": "API/Object/Framework/Blocks/ObjectGenerator",
        "Params": objClassGridConfigParams,
        "MethodType": "Get",
        "IsAuthenticationRequired": "false"
    },
    {
        "URL": "API/Object/Framework/Blocks/ObjectGenerator",
        "Params": objPupilGridConfigParams,
        "MethodType": "Get",
        "IsAuthenticationRequired": "false"
    },
    {
        "URL": "API/Object/Extranet/School/SchoolYear",
        "Params": objSchoolYearParams,
        "MethodType": "Get"
    },
    {
        "URL": "API/Object/Extranet/Teacher/Class",
        "Params": objClassParams,
        "MethodType": "Get"
    },
    {
        "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
        "Params": objSchoolYearPeriodParams,
        "MethodType": "Get"
    },
    {
        "URL": "API/Object/Extranet/Teacher/ClassGroup",
        "Params": objClassGroupParams,
        "MethodType": "Get"
    },
    {
        "URL": "API/Object/Extranet/Pupil/Gender",
        "Params": {},
        "MethodType": "Get"
    }
    ];
    return { "DataCalls": arrParams };
}



/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(objContext, arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
}

function SchoolDataLoaded(objContext) {
    let blnDataLoaded = false;
    if (objContext.props.JConfiguration.ApplicationTypeId === "6") {      
        if (DataRef(objContext.props.school, "school;imainclientid;" + objContext.props.ClientUserDetails.MainClientId + ";cisdeleted;n")) {
            blnDataLoaded = true;
        }
    } else {
        blnDataLoaded = true;
    }

    return blnDataLoaded;

}


/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassObjectName = "";
    let strPupilbjectName = "";
    if (IsSchoolOrAdminTeacher(objContext)) {
        strClassObjectName = "SchoolClassGrid";
        strPupilbjectName = "SchoolPupilGrid";
    }
    else {
        strClassObjectName = "TeacherClassGrid";
        strPupilbjectName = "TeacherPupilGrid";
    }
    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Class") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil") &&
            DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;" + strClassObjectName) &&
            DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;" + strPupilbjectName) &&
            SchoolDataLoaded(objContext)
        ) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.textresource, objContext.props.objectgenerator, objContext.props.school]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns a JObject with Class and Pupuil text resources.
 */
export function GetTextResource(objContext) {
    let objClassTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Class")["Data"][0]["Class"];
    let objPupilTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil")["Data"][0]["Pupil"];
    return {
        "Class": objClassTextResource,
        "Pupil": objPupilTextResource
    };
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns a JObject with Class and Pupuil Grid Configuration.
 */
export function GetGridConfiguration(objContext) {
    let strClassObjectName = "";
    let strPupilbjectName = "";
    if (IsSchoolOrAdminTeacher(objContext)) {
        strClassObjectName = "SchoolClassGrid";
        strPupilbjectName = "SchoolPupilGrid";
    }
    else {
        strClassObjectName = "TeacherClassGrid";
        strPupilbjectName = "TeacherPupilGrid";
    }
    let arrClassGridConfigurationData = DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;" + strClassObjectName).Data;
    let arrPupilGridConfigurationData = DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;" + strPupilbjectName).Data;
    let objClassGridConfiguration = arrClassGridConfigurationData[0];
    let objPupilGridConfiguration = arrPupilGridConfigurationData[0];
    return {
        "Class": objClassGridConfiguration,
        "Pupil": objPupilGridConfiguration
    };
}

/**
 * gets userId  based on teacher or school by iApplicationTypeId
 ** @param {any} props
 */
export function GetSchoolIdByApplicationType(props) {
    let strUserId = props.ClientUserDetails.UserId;
    if (props.ClientUserDetails.ApplicationTypeId == "1") {
        strUserId = props.ClientUserDetails.TeacherDetails.uSchoolId;
    }
    return strUserId;
}

function IsSchoolOrAdminTeacher(objContext) {
    let blnSchoolOrAdminTeacher = false;
    if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
        blnSchoolOrAdminTeacher = true;
    } else {
        if (objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
            blnSchoolOrAdminTeacher = true;
        }
    }
    return blnSchoolOrAdminTeacher;
}

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState() {
    return {
        isLoadComplete: false
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
};