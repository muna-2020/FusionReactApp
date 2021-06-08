//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the teacher component
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strFeedbackTab: "",
        intCheckboxSelectionCount: 0,
        strYesComment: "",
        strNoComment: ""
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useSetInitialFeedbackTab(objContext);
}

export function useSetInitialFeedbackTab(objContext) {
    useEffect(() => {
        if (objContext.props.Data.strFeedbackTab == "")
            objContext.dispatch({ type: "SET_STATE", payload: { "strFeedbackTab": "" } });
        if (objContext.props.Data.strFeedbackTab == "Yes")
            objContext.dispatch({ type: "SET_STATE", payload: { "strFeedbackTab": "Yes" } });
        if (objContext.props.Data.strFeedbackTab == "No")
            objContext.dispatch({ type: "SET_STATE", payload: { "strFeedbackTab": "No" } });
    }, []);
}

/** 
* @name useDataLoader
* @param {object} objContext objContext
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.SurveyPopup_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

///**
// * @name useDataLoaderForClassChange
// * @param {object} objContext objContext
// * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
// */
//export function useDataLoaderForClassChange(objContext) {
//    useEffect(() => {
//        if (objContext.state.isLoadComplete) {
//            objContext.SurveyPopup_ModuleProcessor.LoadClassChangeData(objContext);
//        }
//    }, [objContext.state.blnClassChangedInDropdown]);
//}

///**
//* @name useDataLoaded
//* @param {object} objContext objContext
//* @summary Checks if the data is loaded to props and then set the component state accordingly.
//*/
//export function useDataLoaded(objContext) {
//    useEffect(() => {
//        if (
//            !objContext.state.isLoadComplete &&
//            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
//            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"]
//        ) {
//                objContext.dispatch({ type: "SET_STATE", payload: {"isLoadComplete": true} });
//        }
//    }, [
//        objContext.props.Object_Extranet_Teacher_Class,
//        objContext.props.Object_Extranet_Pupil_Pupil
//    ]);
//}