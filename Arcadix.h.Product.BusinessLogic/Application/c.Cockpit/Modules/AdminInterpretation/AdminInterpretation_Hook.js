// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        objFilter: { cIsDeleted: "N" },
        intSubjectId: -1,
        intSubSubjectId: -1,
        intThresholdId: -1,
        objThreshold: undefined,
        objThresholdTopic: undefined,
        blnSubjectChanged: false,
        arrCheckedIndices: [],
        arrSelectedTopics: [],
        arrCheckedTopics: []
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useCustomDataLoader(objContext);
    useDataLoaded(objContext);
    useUpdateLatestData(objContext);
    useDataLoadedForSubjectChange(objContext);
    useSetRibbonData(objContext)
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.AdminInterpretation_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useCustomDataLoader
 * @param {object} objContext takes objContext
 * @summary  Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useCustomDataLoader(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            if (objContext.state.intSubSubjectId) {
                //let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
                let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 });
                //let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId && objSubject.cIsTestedAtThisTime === "Y"; });
                let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId });
                (new ObjectQueue()).QueueAndExecute(objContext.AdminInterpretation_ModuleProcessor.CustomDataParams(arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : -1));
            }
        }
    }, [objContext.props.Object_Intranet_Taxonomy_Subject]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", objContext.props)
            && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")
        ) {
            //let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
            let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0; });
            let arrSubSubject = [];
            arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === arrSubjects[0].iSubjectId; });
            let intSubSubjectId = arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : objContext.state.intSubSubjectId;
            if (DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + intSubSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + intSubSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + intSubSubjectId)
            ) {
                objContext.dispatch({ type: "SET_STATE", payload: { "intSubjectId": arrSubjects[0]["iSubjectId"], "intSubSubjectId": arrSubSubject[0]["iSubjectId"], "intThresholdId": DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + intSubSubjectId)["Data"]?.[0]?.["uSubjectFeedbackThresholdId"] } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrApplicationId": objContext.props.Object_Cockpit_ApplicationType["Data"] } });
            }
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/AdminInterpretation"],
        objContext.props.Object_Cockpit_MainClient_MainClient,
        objContext.props.Object_Cockpit_ApplicationType,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription,
        objContext.state.intSubSubjectId
    ]);
}

/**
 * @name useUpdateLatestData
 * @param {object} objContext takes objContext
 * @summary Updates the state with fresh data
 */
export function useUpdateLatestData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && !objContext.state.blnSubjectChanged) {
            objContext.AdminInterpretation_ModuleProcessor.UpdateLatestData(objContext);
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription,
        objContext.state.objThreshold
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
            let strSubSubjectId = objContext.AdminInterpretation_ModuleProcessor.GetSubSubjectId(objContext);
            if (objContext.state.blnSubjectChanged &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + strSubSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + strSubSubjectId) &&
                DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + strSubSubjectId)
            ) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.AdminInterpretation_ModuleProcessor.UpdateLatestData(objContext);
            }
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription
    ]);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.AdminInterpretation_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.AdminInterpretation_ModuleProcessor.SetRibbonData(objContext);
    }
}