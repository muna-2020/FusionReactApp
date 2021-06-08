//React related imports.
import { useEffect } from 'react';

import Interpretation_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_ModuleProcessor'
/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objInterpretation_ModuleProcessor = new Interpretation_ModuleProcessor();
    let intSelectedSubjectId = objInterpretation_ModuleProcessor.GetUserpreferenceSubjectId();

    if (
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N") &&
        props.Object_Framework_Services_TextResource !== undefined &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/Interpretation", props)
    ) {
        intSelectedSubjectId = intSelectedSubjectId ? intSelectedSubjectId : arrSubjects[0].iSubjectId;
        let arrSubjects = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y" && objSubject.cIsTestedAtThisTime === "Y"; });
        let arrSubSubject = [];
        //if (objContext.state.intSelectedSubjectId !== -1) {
        //    arrSubSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === state.intSelectedSubjectId; });
        //}
        //else {
        arrSubSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === intSelectedSubjectId });
        //}
        if (
            DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + arrSubSubject[0].iSubjectId) &&
            DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + arrSubSubject[0].iSubjectId) &&
            DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + arrSubSubject[0].iSubjectId)
        ) {
            
            blnIsLoadComplete = true;
        }

    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedSubjectId: intSelectedSubjectId,
        intSelectedSubSubjectId: undefined,
        intSelectedThresholdId: -1,
        blnOpenIndex: []
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useCustomDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Interpretation_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N") &&
            objContext.props.Object_Framework_Services_TextResource !== undefined &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/Interpretation", objContext.props)) {
            let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y" && objSubject.cIsTestedAtThisTime === "Y"; });
            let arrSubSubject = [];
            if (objContext.state.intSelectedSubjectId !== -1) {
                arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === objContext.state.intSelectedSubjectId; });
            }
            else {
                arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId; });
            }
            if (DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + arrSubSubject[0].iSubjectId)) {
                if (objContext.state.intSelectedSubjectId === -1) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": arrSubjects[0].iSubjectId } });
                }
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription,
        objContext.props.Object_Framework_Services_TextResource]
    );
}

/**
 * @name useCustomDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method for custom data
 */
export function useCustomDataLoader(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            if (objContext.state.intSelectedSubSubjectId === undefined) {
                let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y" && objSubject.cIsTestedAtThisTime === "Y"; });
                let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId; });
                (new ObjectQueue()).QueueAndExecute(objContext.Interpretation_ModuleProcessor.CustomDataParams(arrSubSubject[0].iSubjectId));
            }
            else {
                (new ObjectQueue()).QueueAndExecute(objContext.Interpretation_ModuleProcessor.CustomDataParams(objContext.state.intSelectedSubSubjectId));
            }
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.state.intSelectedSubSubjectId]
    );
}
