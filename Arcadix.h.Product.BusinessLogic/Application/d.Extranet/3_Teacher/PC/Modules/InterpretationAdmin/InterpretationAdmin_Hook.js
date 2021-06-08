//React related imports.
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        intSelectedSubSubjectId: -1, //undefined,
        intSelectedThresholdId: -1,
        blnIsClickedPlus: false,
        blnTopicEdit: false,
        strTopic: '',
        strTopicEditText: '',
        strThresholdFeedback: '',
        arrDefaultTasks: GetDefaultTasks(),
        objThreshold: undefined,
        blnFormatedLoadComplete: false,
        arrTopicDescriptionTaskData: [],
        blnSubjectChanged: false
    };
}

/**
* @name GetDefaultTasks
* @summary Gets the default array of task
* @returns {*} array
* */
function GetDefaultTasks() {
    let objEmptyTask = {
        uFeedbackThresholdTopicDescriptionId: '',
        uFeedbackThresholdTopicDescriptionTaskId: '',
        iTaskId: '',
        vTaskName: '',
        iOrder: 1
    };
    let arrTasks = [objEmptyTask, objEmptyTask, objEmptyTask, objEmptyTask, objEmptyTask];
    return arrTasks;
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useCustomDataLoader(objContext);
    useDataLoaded(objContext);
    useUpdateLatestData(objContext);
    useDataLoadedForSubjectChange(objContext)
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.InterpretationAdmin_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useUpdateLatestData
 * @param {object} objContext takes objContext
 * @summary Updates the state with fresh data
 */
export function useUpdateLatestData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && !objContext.state.blnSubjectChanged) {
            objContext.InterpretationAdmin_ModuleProcessor.UpdateLatestData(objContext);
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription
    ]);
}

/**
 * @name useDataLoadedForSubjectChange
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoadedForSubjectChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strSubSubjectId = objContext.InterpretationAdmin_ModuleProcessor.GetSubSubjectId(objContext);
            if (objContext.state.blnSubjectChanged &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + strSubSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + strSubSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + strSubSubjectId)) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.InterpretationAdmin_ModuleProcessor.UpdateLatestData(objContext);
            }
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription,
    ]);
}

export function useCustomDataLoader(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            if (objContext.state.intSelectedSubSubjectId) {
                let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
                let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId && objSubject.cIsTestedAtThisTime === "Y"; });
                (new ObjectQueue()).QueueAndExecute(objContext.InterpretationAdmin_ModuleProcessor.CustomDataParams(arrSubSubject[0].iSubjectId));
            }
        }
    }, [objContext.props.Object_Intranet_Taxonomy_Subject]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N") &&
            objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/InterpretationAdmin", objContext.props)
        ) {
            let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
            let arrSubSubject = [];
            arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId; });
            if (DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + arrSubSubject[0].iSubjectId)) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription,
        "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/InterpretationAdmin"
    ]);
}