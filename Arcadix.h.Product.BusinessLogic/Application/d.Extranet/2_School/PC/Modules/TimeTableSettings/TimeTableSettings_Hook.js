//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the TimeTableSettings component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"]
        && Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime", props)
        && Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
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
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        Logger.Log("getting required data");
        objContext.TimeTableSettings_ModuleProcessor.LoadInitialData(objContext);
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
        if (!objContext.state.isLoadComplete 
            && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"]
            && Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime", objContext.props)
            && Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject", objContext.props)
        )
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime"],
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject"]
    ]);    
}