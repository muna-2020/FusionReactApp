// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Objects required for module.
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Intranet_Taxonomy_Subject)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
        && DataRef(props.Object_Intranet_Test_TestAlgorithm)["Data"]
        && DataRef(props.Object_Intranet_Test_TestProgressDisplay)["Data"]
        && DataRef(props.Object_Intranet_Member_IntranetAdministrator)["Data"]
        && DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"]
        && DataRef(props.Object_TestApplication_TestResultAttributes)["Data"]
        && DataRef(props.Object_Intranet_Setting_Certificate)["Data"]
        && DataRef(props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objTextResource: {},
        arrMainClientlanguageData: [],
        arrLanguageData: [],
        objSelectedTest: {},
        objSelectedRow: {},
        blnToggleToLoadDataFromRedux: true,

        //Grid Data
        arrTestData: [],
        arrFilterdTestData: [],
        arrHeaderData: [],
        arrCheckedRowIndices: [],
        blnAllRowsSelected: false,
        intSelectedRowIndex: 0,

        //Search
        blnSearchMode: false,
        strSearchText: "",
        blnSearchFromSameFolder: true,
        strTestUsageId: -1,
        blnInternalTesting: false,

        //Dropdown Data
        arrSubjectData: [],
        arrCategoryData: [],
        arrCategoryCompetencyData: []
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
    useLoadTheSelecedFolderTest(objContext);
    useResetOnFolderSelection(objContext);
    useSetTreeContextMenuData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Test_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty('FolderId', 0);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("CutCopySource", { "Test": null });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }

        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            && DataRef(objContext.props.Object_Intranet_Test_TestAlgorithm)["Data"]
            && DataRef(objContext.props.Object_Intranet_Test_TestProgressDisplay)["Data"]
            && DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"]
            && DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"]
            && DataRef(objContext.props.Object_TestApplication_TestResultAttributes)["Data"]
            && DataRef(objContext.props.Object_Intranet_Setting_Certificate)["Data"]
            && DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            ApplicationState.SetProperty("CutCopySource", { "Test": null });
            let objRootNode = { iTestFolderId: "0", iTestParentFolderId: "-1", vTestFolderName: "Tests" };
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objRootNode);
            }
        }
    }, [
        objContext.props.Object_Intranet_Test_IntranetTest,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test"],
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Intranet_Test_TestAlgorithm,
        objContext.props.Object_Intranet_Test_TestProgressDisplay,
        objContext.props.Object_Intranet_Member_IntranetAdministrator,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_TestApplication_TestResultAttributes,
        objContext.props.Object_Intranet_Setting_Certificate,
        objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup
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
            objContext.Test_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Test_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
* @name useLoadTheSelecedFolderTest
* @param {object} objContext objContext
* @summary To make the get request for the selected folder.
*/
export function useLoadTheSelecedFolderTest(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete
            && objContext.props.FolderId != 0
            //&& !DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iFolderId;" + objContext.props.FolderId).Data
        ) {
            objContext.Test_ModuleProcessor.LoadSelectedFolderTests(objContext);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "strTestUsageId": -1 } });
    }, [objContext.props.FolderId]);
}

/**
* @name useLoadTheSelecedFolderTest
* @param {object} objContext objContext
* @summary To make the get request for the selected folder.
*/
export function useResetOnFolderSelection(objContext) {
    useEffect(() => {
        //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": null });
        //let arrRowData = objContext.Test_ModuleProcessor.GetTestGridData(objContext)["RowData"];
        //objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": arrRowData[0] } });
    }, [objContext.props.FolderId, objContext.props.Object_Intranet_Test_IntranetTest]);
}

/**
 * @name useSetTreeContextMenuData
 * @param {object} objContext context object
 * @summary To set and update the ContextMenu Data when the State changes.
 * @returns null
 */
export function useSetTreeContextMenuData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("GetTreeContextMenuData", (objRowData) => objContext.Test_ModuleProcessor.GetContextMenuData(objRowData, objContext));
        }
    }, [objContext.state.isLoadComplete, objContext.props.Object_Intranet_Task_TaskFolder, objContext.props.CutCopySource]);
}