//React related imports.
import { useEffect } from 'react';

//Objects required for module.
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Extranet_Teacher_PracticeTestDisplay_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PractiseTestDisplay_Module';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        isPreSelectValueSet: false,
        arrClassData: [],
        arrPupilData: [],
        arrPracticeTestData: [],
        blnClassChangedInDropdown: false,
        strSelectedPupilId: '-1'
    };
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useDataLoaderForPupil(objContext);
    useGetPracticeTestDetailsForSelectedPupil(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PracticeTestDisplay_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") == "Y";
    let arrDataToCheck = [];
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    var strPupilId = "-1";
    if (blnIsPupil) {
        strPupilId = objContext.props.ClientUserDetails.UserId;
        arrDataToCheck = [
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PracticeTestDisplay"],
            objContext.props.Extranet_Teacher_PracticeTestDisplay_Module];
    }
    else {
        arrDataToCheck = [
            objContext.props.Object_Extranet_Teacher_Class,
            objContext.props.Object_Extranet_Pupil_Pupil,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PracticeTestDisplay"]
        ];
        if (objContext.state.strSelectedPupilId !== undefined) {
            strPupilId = objContext.state.strSelectedPupilId;
        }
    }
    useEffect(() => {
        if (objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PracticeTestDisplay", objContext.props)
            && (blnIsPupil || DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId))
            && (blnIsPupil || DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + ApplicationState.GetProperty("SelectedClassId") + ";iStateId;" + iStateId))) {
            if (blnIsPupil) {
                let arrPracticeTestDisplayData = DataRef(objContext.props.Extranet_Teacher_PracticeTestDisplay_Module, "Extranet_Teacher_PracticeTestDisplay_Module;uPupilId;" + strPupilId);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrPracticeTestData": arrPracticeTestDisplayData } });
            }
            else {
                let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId);
                let arrPupilData = objContext.PracticeTestDisplay_ModuleProcessor.GetPupilData(objContext);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrClassData": arrClassData, "arrPupilData": arrPupilData } });
            }

            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, arrDataToCheck);
}

/**
 * @name useDataLoaderForPupil
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaderForPupil(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iStateId": iStateId
                            }
                        }
                    ]
                }
            };
            Object_Extranet_Pupil_Pupil.GetData(objPupilParams);
        }
    }, [objContext.state.blnClassChangedInDropdown]);
}

/**
 * @name useGetPracticeTestDetailsForSelectedPupil
 * @param {*} objContext objContext
 * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useGetPracticeTestDetailsForSelectedPupil(objContext) {
    var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") == "Y";

    var strPupilId = "-1";
    if (blnIsPupil) {
        strPupilId = objContext.props.ClientUserDetails.UserId;
    }
    else {
        if (objContext.state.strSelectedPupilId !== undefined) {
            strPupilId = objContext.state.strSelectedPupilId;
        }
    }
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.strSelectedPupilId !== "-1") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let strCycleTypeId = objContext.PracticeTestDisplay_ModuleProcessor.GetCycleTypeId();
            let objPracticeTestParams = {
                "uClassId": strClassId,
                "iCycleTypeId": strCycleTypeId,
                "uPupilId": objContext.state.strSelectedPupilId,
                SearchQuery: {
                    must: [
                        {
                            match: {
                                "uPupilId": objContext.state.strSelectedPupilId
                            }
                        }
                    ]
                }
            };
            Extranet_Teacher_PracticeTestDisplay_Module.GetData(objPracticeTestParams, (objReturn, cIsNewData) => {
                if (cIsNewData) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "arrPracticeTestData": objReturn
                        }
                    });
                }
            });
        }
    }, [objContext.state.strSelectedPupilId]);
}
