//Module realted fies.
import CMSOverlay_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor_ContextMenu";

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSOverlay_Editor_ModuleProcessor
 * @summary Contains the Overlay's editor version module specific methods.
 * */
class CMSOverlay_Editor_ModuleProcessor extends CMSOverlay_Editor_ContextMenu {

    /**
     * @name UpdateElementJson
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objElementJson updated element json from sidebar
     * @summary Send the updates of the CMSInput to the parent component.
     */
    UpdateElementJson(objContext, objElementJson) {
        objContext.CMSOverlay_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        objContext.CMSOverlay_Editor_ModuleProcessor.CloseOverlaySidebar();
    }

    /**
     * @name ShowOverlaySidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    ShowOverlaySidebar(objContext) {
        objContext.CMSOverlay_Editor_ModuleProcessor.CloseOverlaySidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Mode": "edit",
            "FolderID": objContext.props.FolderID,
            "ContainerId": objContext.props.ContainerId,
            "ElementJson": {
                ...objContext.state.ElementJson
            },
            "PassedEvents": {
                "CloseSidebar": () => {
                    objContext.CMSOverlay_Editor_ModuleProcessor.CloseSidebarWithoutSave(objContext);
                },
                "UpdateElementJson": (objElementJson) => {
                    objContext.CMSOverlay_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            },
            "ComponentController": objContext.props.ComponentController,
            "SidebarProps": {
                "SidebarName": "OverlaySidebar",
                "Header": objContext.CMSOverlay_Editor_ModuleProcessor.TextFormatter(objTextResource, "Overlay_SidebarHeader"),
                "Title": objContext.CMSOverlay_Editor_ModuleProcessor.TextFormatter(objTextResource, "Overlay_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseOverlaySidebar
     * @summary Closes the side bar.
     */
    CloseOverlaySidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name CloseSidebarWithoutSave
     * @param {object} objContext {state, props, dispatch, CMSOverlay_Editor_ModuleProcessor}
     * @summary Closes the sidebar without saving.
     * */
    CloseSidebarWithoutSave(objContext) {
        if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
            objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSOverlay/CMSOverlayStyles.css"
        ];
    }
}

export default CMSOverlay_Editor_ModuleProcessor;
