//Module realted fies.
import CMSMultiInput_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/CMSMultiInput_Editor_ContextMenu";

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSMultiInput_Editor_ModuleProcessor
 * @summary Contains the MultiInput's editor version module specific methods.
 * */
class CMSMultiInput_Editor_ModuleProcessor extends CMSMultiInput_Editor_ContextMenu {

    /**
     * @name UpdateElementJson
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
     * @param {object} objElementJson updated element json from sidebar
     * @summary Send the updates of the CMSMultiInput to the parent component.
     */
    UpdateElementJson(objContext, objElementJson) {
        objContext.CMSMultiInput_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        objContext.CMSMultiInput_Editor_ModuleProcessor.CloseSidebar();
    }

    /**
     * @name ShowMultiInputSidebar
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
     * @summary Opens up the side bar.
     */
    ShowMultiInputSidebar(objContext) {
        objContext.CMSMultiInput_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "ContainerId": objContext.props.ContainerId,
            "FolderID": objContext.props.FolderID,
            "ElementJson": { ...objContext.state.ElementJson },
            "PassedEvents": {
                "CloseSidebar": () => {
                    objContext.CMSMultiInput_Editor_ModuleProcessor.CloseSidebarWithoutSave(objContext);
                },
                "UpdateElementJson": (objElementJson) => {
                    objContext.CMSMultiInput_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            },
            "SidebarProps": {
                "SidebarName": "MultiInputSidebar",
                "Header": objContext.CMSMultiInput_Editor_ModuleProcessor.TextFormatter(objTextResource, "MultiInput_SidebarHeader"),
                "Title": objContext.CMSMultiInput_Editor_ModuleProcessor.TextFormatter(objTextResource, "MultiInput_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name CloseSidebarWithoutSave
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
     * @summary Closes the sidebar without saving.
     * */
    CloseSidebarWithoutSave(objContext) {
        if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"], false);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMultiInput/CMSMultiInputStyles.css",
        ];
    }
}

export default CMSMultiInput_Editor_ModuleProcessor;
