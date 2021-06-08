//React imports 
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;00000000-0000-0000-0000-000000000000;uSchoolYearPeriodId;;uUserId;" + props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_School_Document, "Object_Extranet_School_Document;uClassId;00000000-0000-0000-0000-000000000000;uSchoolYearPeriodId;;uUserId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolDocument", props)
    ) {
        //ApplicationState.SetProperty("ExpandedNodes", { ...ApplicationState.GetProperty("ExpandedNodes"), ["SchoolDocumentTree"]: [] });
        //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["SchoolDocumentTree"]: null });
        blnIsLoadComplete = false;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedFolder: undefined,
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        blnShowMenu: false,
        blnCurrentSchoolYearPeriod: true,
        showDocumentListTab:false // used in phone JSX
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSchoolYearPeriodChangeDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.SchoolDocument_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded 
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 * @param {*} objContext
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;00000000-0000-0000-0000-000000000000;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_School_Document, "Object_Extranet_School_Document;uClassId;00000000-0000-0000-0000-000000000000;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolDocument", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            //ApplicationState.SetProperty("ExpandedNodes", { ...ApplicationState.GetProperty("ExpandedNodes"), ["SchoolDocumentTree"]: [] });
            let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] : null;
            if (fnExpandTreeNodes) {
                fnExpandTreeNodes([]);
            }
            //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["SchoolDocumentTree"]: null });
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] ? ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode({});
            }
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    },
        [
            objContext.props.Object_Extranet_School_DocumentFolder,
            objContext.props.Object_Extranet_School_Document,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolDocument"],
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod
        ]);
}

/**
 * @name useSchoolYearPeriodChangeDataLoader
 * @summary hook for load folders and documents after schoolyear period changes.
 * @param {any} objContext
 */
export function useSchoolYearPeriodChangeDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            objContext.SchoolDocument_ModuleProcessor.GetDataAfterSchoolYearChange(objContext);
        }
    }, [objContext.state.objSchoolYearPeriod]);
}