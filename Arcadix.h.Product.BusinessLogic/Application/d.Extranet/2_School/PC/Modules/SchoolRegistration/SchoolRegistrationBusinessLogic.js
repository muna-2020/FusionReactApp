import {useLayoutEffect,useEffect} from 'react';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

/**
 * 
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = "ArcadixFetchData", objContext) {
    switch(strToggleExecute)
    {
     case 'ArcadixFetchData':
            ArcadixFetchData.ExecuteCustom("API/Extranet/School/SchoolRegistration", "GET", {})
                .then(response => response.json())
                .then(objResponse => {
                    objContext.dispatch({
                        type: "SET_STATE_VALUES",
                       payload: {
                           "arrObjectGenerator": objResponse.schoolregistrationData.objectgenerator,
                           "arrSchoolType": objResponse.schoolregistrationData.schooltype,
                           "arrStateId": objResponse.schoolregistrationData.state,
                           "arrTextresource": objResponse.schoolregistrationData.textresource,
                           "arrTitleId": objResponse.schoolregistrationData.title
                       }
                    }); 
                })
                .catch((err) => {
                    console.error(err)
                })
            break;
      case 'FetchExecute':
            ArcadixFetchData.ExecuteCustom("API/Extranet/School/SchoolRegistration", "POST",arrParams)
                .then(response => response.json())
                .then(objResponse => {
                    objContext.dispatch({
                        type: "SET_STATE_VALUES",
                       payload: {
                           "strFormStatus": objResponse.schoolregistrationData.StatusCode                          
                          }
                    });
                    // setTimeout(()=>{
                    //     ApplicationState.SetProperty("blnShowAnimation", false); 
                    // },1000)
                    ApplicationState.SetProperty("blnShowAnimation", false); 
                    
                })
                .catch((err) => {
                    console.error(err)
                })
            break;
    }
  }

/**
 *
 * @param {*} objContext
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
      //Logger.Log("Getting initial data");
          DataCall([], 'ArcadixFetchData', objContext);
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
        if (!objContext.state.isLoadComplete && ((objContext.state.arrObjectGenerator).length > 0) && ((objContext.state.arrSchoolType).length > 0) && ((objContext.state.arrStateId).length > 0) && ((objContext.state.arrTextresource).length > 0) && ((objContext.state.arrTitleId).length > 0)){
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });           
        }
        //else {
        //    Logger.Log("data is loading");
        //}
    },
        [
            objContext.state.arrObjectGenerator,
            objContext.state.arrSchoolType,
            objContext.state.arrStateId,
            objContext.state.arrTextresource,
            objContext.state.arrTitleId
        ]);
}

export function useFormStatusMessage(objContext){
    useEffect(() => {
        if(objContext.state.strFormStatus !== ""){
            let objResourceData = objContext.state.arrTextresource["0"]["SchoolRegistration"]; 
            let strFormStatusMessage = "";
            switch(objContext.state.strFormStatus){
                case 0 :
                strFormStatusMessage = objResourceData["EmailExist"];
                break;
                case 1 :
                strFormStatusMessage = objResourceData["StreetandiZipCodeExist"];
                break;
                case 2 :
                strFormStatusMessage = objResourceData["Success"];
                break;
            }
            objContext.dispatch({type:"SET_STATE_VALUES", payload:{"strFormStatusMessage": strFormStatusMessage}});
        }    
    }, [objContext.state.strFormStatus]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Edits the school entity
 */
export function SaveData(objContext,RefMethods){
   // ApplicationState.SetProperty("blnShowAnimation", true); UserId
   var blnIsFormValid =  RefMethods.IsValid();
   if(blnIsFormValid){
    var objsaveData = RefMethods.GetSaveData();
  
    let objParams = {
        "ForeignKeyFilter": {},
        "SearchQuery": {},
        "vAddData": objsaveData,
        "uUserId": "00000000-0000-0000-0000-000000000000" 
    };
    let arrDataRequest = [
        {
            "URL": "API/Extranet/School/SchoolRegistration",
            "Params": objParams,
            "MethodType": "Post"
        }];   
    ApplicationState.SetProperty("blnShowAnimation", true);
    DataCall(arrDataRequest[0], 'FetchExecute', objContext);
   }   
}

export function LoadPrevComponent(objContext){
    objContext.dispatch({
        type: "SET_STATE_VALUES",
       payload: {
          "strFormStatus": ""                         
          }
    }); 
}

export function GetValidationMessage(objContext, strValidationType)
{
    let objTextResource = objContext.state.arrTextresource["0"]["SchoolRegistration"];   
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "strValidationMessage": objTextResource[strValidationType]}});
};

 export function GetInitialState() {
    return {
        isLoadComplete: false,      
        arrObjectGenerator: [],
        arrSchoolType: [],
        arrStateId: [],
        arrTextresource: [],
        arrTitleId:[],
        strFormStatus:"",
        strValidationMessage:"",
        strFormStatusMessage: ""
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
  