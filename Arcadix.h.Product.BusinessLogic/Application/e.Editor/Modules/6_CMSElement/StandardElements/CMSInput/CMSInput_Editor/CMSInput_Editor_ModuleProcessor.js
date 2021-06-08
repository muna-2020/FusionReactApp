//Module realted fies.
import CMSInput_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/CMSInput_Editor_ContextMenu";

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSInput_Editor_ModuleProcessor
 * @summary Contains the Input's editor version module specific methods.
 * */
class CMSInput_Editor_ModuleProcessor extends CMSInput_Editor_ContextMenu {

    /**
     * @name UpdateElementJson
     * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
     * @param {object} objElementJson updated element json from sidebar
     * @summary Send the updates of the CMSInput to the parent component.
     */
    UpdateElementJson(objContext, objElementJson) {
        objContext.CMSInput_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        objContext.CMSInput_Editor_ModuleProcessor.CloseInputSidebar();
    }

    /**
     * @name ShowInputSidebar
     * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
     * @summary Opens up the side bar.
     */
    ShowInputSidebar(objContext) {
        objContext.CMSInput_Editor_ModuleProcessor.CloseInputSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "FolderID": objContext.props.FolderID,
            "ContainerId": objContext.props.ContainerId,
            "Mode": "edit",
            "ElementJson": {
                ...objContext.state.ElementJson
            },
            "PassedEvents": {
                // "CloseSidebar": () => {
                //     objContext.CMSInput_Editor_ModuleProcessor.CloseSidebarWithoutSave(objContext);
                // },
                "UpdateElementJson": (objElementJson) => {
                    objContext.CMSInput_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            },
            "SidebarProps": {
                "SidebarName": "InputSidebar",
                "Header": objContext.CMSInput_Editor_ModuleProcessor.TextFormatter(objTextResource, "Input_SidebarHeader"),
                "Title": objContext.CMSInput_Editor_ModuleProcessor.TextFormatter(objTextResource, "Input_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseInputSidebar
     * @summary Closes the side bar.
     */
    CloseInputSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    // /**
    //  * @name CloseSidebarWithoutSave
    //  * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
    //  * @summary Closes the sidebar without saving.
    //  * */
    // CloseSidebarWithoutSave(objContext) {
    //     if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
    //         objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
    //     }
    // }
}

export default CMSInput_Editor_ModuleProcessor;
