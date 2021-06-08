//React imports 
import { useEffect } from 'react';

//Objects required for module.
import Extranet_Pupil_PracticeTest_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest_Module';

/**
* @name GetInitialState
* @summary State of the teacher component
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrAllSubject: [],
        arrSubject: [],
        arrSubSubject: [],
        objSubject: { "iSubjectId" : -1},
        objSubSubject: { "iSubjectId": -1 },
        AllTaskCount: undefined,
        CorrectTaskCount: undefined,
        NotTaskCount: undefined,
        WrongTaskCount: undefined
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useDataLoaderForTasks(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PracticeTest_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strCycleTypeId = objContext.PracticeTest_ModuleProcessor.strCycleTypeId;
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsDeleted;N")["Data"] &&
            objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PracticeTest", objContext.props)
        ) {
            objContext.dispatch({ type: "SET_STATE", payload: {isLoadComplete: true}});
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.Object_Intranet_Cycle_Cycle,
            objContext.props.Object_Intranet_Taxonomy_Subject,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PracticeTest"]
        ]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary hook for load Tasks.
 */
export function useDataLoaderForTasks(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            if (objContext.state.objSubject) {
                let objTaskParams = objContext.PracticeTest_ModuleProcessor.GetTaskParams(objContext);

                ApplicationState.SetProperty("blnShowAnimation", true);
                Extranet_Pupil_PracticeTest_Module.GetData(objTaskParams, (objReturn, cIsNewData) => {
                    if (cIsNewData) {
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }
                });
            }
        }
    }, [objContext.state.objSubject, objContext.state.objSubSubject]);
}