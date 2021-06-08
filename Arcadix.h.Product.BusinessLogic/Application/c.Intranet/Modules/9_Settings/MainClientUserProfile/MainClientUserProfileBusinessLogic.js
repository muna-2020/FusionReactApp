import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
//import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {                                  
            language: DataRef(state.Entity, "language", true),
            targetgroup: DataRef(state.Entity, "targetgroup", true),
            mainclient: DataRef(state.Entity, "mainclient", true),            
            textresource: DataRef(state.Entity, "textresource", true)
        };
    }    
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) { 
    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/9_Settings/MainClientUserProfile"
                    }
                }
            ]
        }
    };

    var objMainClientLanguage={};
    var objTargetGroupData={};
    var objMainClientData={};

    var arrDataRequest = [ 
        {
            "URL": "API/Object/Framework/SystemObjects/Language",
            "Params": objMainClientLanguage,
            "MethodType": "Get"
        },
       {
            "URL": "API/Object/Framework/SystemObjects/TargetGroup",
            "Params": objTargetGroupData,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/SystemObjects/MainClient",
            "Params": objMainClientData,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrDataRequest
    }
};
/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        //Do something
    });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("Getting initial data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }
    useLayoutEffect(GetRequiredData, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useEffect(()=>{
        if( DataRef(objContext.props.language) && 
            DataRef(objContext.props.targetgroup)&& 
            DataRef(objContext.props.mainclient)&& 
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/9_settings/mainclientuserprofile"))
        {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.language,objContext.props.targetgroup,objContext.props.mainclient,objContext.props.textresource]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the data required for the form. 
 */
export function GetData(objContext) {

   // const objColumnData = DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;teacherprofile")["Data"][0];
    let objResourceData = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/9_settings/mainclientuserprofile").Data[0]["MainClientUserProfile"];
    let arrLanguageData = DataRef(objContext.props.language)["Data"];
    let objMainClientData = DataRef(objContext.props.mainclient)["Data"][0];
    let arrTitle = DataRef(objContext.props.mainclient)["Data"][0]["t_Framework_MainClient_Data"];
    let objTitle=arrTitle.filter((item) => item.iLanguageId == JConfiguration.InterfaceLanguageId);
    
    let arrTargetGroupData = DataRef(objContext.props.targetgroup)["Data"];
    let objDefaultDropDownTargetData={
        "iTargetGroupId": -1,
        "vTargetGroupName": objResourceData["Please_Choose"]
    };
    arrTargetGroupData=[objDefaultDropDownTargetData,...arrTargetGroupData,];
    

    let objDefaultDropDownLanguageData={
        "iFrameworkLanguageId": -1,
        "vLanguageIdentifier":objResourceData["Please_Choose"]
    };
    arrLanguageData=[objDefaultDropDownLanguageData,...arrLanguageData,];
    objMainClientData={...objMainClientData,"vTitle":objTitle[0].vTitle};
    console.log("arrTargetGroupData/////////////////////////////////////////////",objMainClientData);
    let objDropDownData = {
        vTargetGroup: {
            "ValueColumn": "iTargetGroupId",
            "DisplayColumn": "vTargetGroupName",
            "cISLanguageDependent": "N",
            "DependingTableName": "",
            "CheckDeletedDropDownData":"N",
            "SelectedValue":objMainClientData.iTargetGroupId, 
            "Data": arrTargetGroupData
        },
        vLanguage: {
            "ValueColumn": "iFrameworkLanguageId",
            "DisplayColumn": "vLanguageIdentifier",
            "cISLanguageDependent": "N",
            "DependingTableName": "",
            "CheckDeletedDropDownData":"N",
            "SelectedValue":JConfiguration.InterfaceLanguageId, 
            "Data": arrLanguageData
        }
    };
    let arrColumnData =[
        {
            vColumnName: "vTitle",
            vDataType: "string",
            iDisplayOrder: 1,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "Title",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType:null
        },
        {
            vColumnName: "vManagerName",
            vDataType: "string",
            iDisplayOrder: 2,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "ManagerName",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType: null
        },
        {
            vColumnName: "vStreet",
            vDataType: "string",
            iDisplayOrder: 3,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "Street",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType:null
        },
        {
            vColumnName: "vTown",
            vDataType: "string",
            iDisplayOrder: 4,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "Town",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType:null
        },
        {
            vColumnName: "iZIPCode",
            vDataType: "int",
            iDisplayOrder: 5,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "ZipCode",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType: "number"
        },
        {
            vColumnName: "vPhone",
            vDataType: "string",
            iDisplayOrder: 6,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "Telefon",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType:null
        },
        {
            vColumnName: "vEmail",
            vDataType: "string",
            iDisplayOrder: 7,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "E-Mail",
            vControlType: "textbox",
            IsMandatory: null,
            vValidationType:"email"
        },
        
        {
            vColumnName: "vLanguage",
            vDataType: "string",
            iDisplayOrder: 7,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "Language",
            vControlType: "dropdown",
            IsMandatory: null,
            vValidationType:null
        },
        {
            vColumnName: "vTargetGroup",
            vDataType: "string",
            iDisplayOrder: 8,
            vTextResourcePage: "IntranetAdministrator",
            vTextResourceKey: "Targetgroup",
            vControlType: "dropdown",
            IsMandatory: null,
            vValidationType:null
         }

    ];
   
    return {
        MetaData: arrColumnData,
        Data: objMainClientData,
        DropDownData: objDropDownData,
        TextResource: objResourceData
    };
};


/**
 * 
 * @param {*} objContext 
 * @param {*} strValidationType 
 * @summary   Gets invoked when ever there is a validation error in the form data.
 */
export function GetValidationMessage(objContext, strValidationType)
{
    if(objContext.state.strValidationMessage === "" && strValidationType)
    {
        let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/teacherprofile").Data[0]["TeacherProfile"];
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "strValidationMessage": objTextResource[strValidationType]}});
    }
    else if(strValidationType === undefined || strValidationType === null)
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "strValidationMessage": ""}});
    }   
   
};



/**
* @summary Returns Initial state of the component.
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strValidationMessage: ""
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export function Reducer(state, action)
    {
        switch(action.type)
        {
            case "DATA_LOAD_COMPLETE":
            return{
                ...state,
                ["isLoadComplete"]:action.payload
            }
            case "SET_STATE_VALUES":
            return{
                ...state,
                ...action.payload
            }
        }
    };




