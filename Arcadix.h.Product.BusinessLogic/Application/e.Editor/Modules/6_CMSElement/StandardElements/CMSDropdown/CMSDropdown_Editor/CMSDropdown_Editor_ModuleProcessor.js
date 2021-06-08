//Module realted fies.
import CMSDropdown_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/CMSDropdown_Editor_ContextMenu";

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSDropdown_Editor_ModuleProcessor
 * @summary Contains the Dropdown's editor version module specific methods.
 * */
class CMSDropdown_Editor_ModuleProcessor extends CMSDropdown_Editor_ContextMenu {

    /**
     * @name UpdateElementJson
     * @param {object} objContext {state, props, dispatch, CMSDropdown_Editor_ModuleProcessor}
     * @param {object} objNewElementJson updated element json from sidebar
     * @summary Send the updates of the CMSInput to the parent component.
     */
    UpdateElementJson(objContext, objNewElementJson) {
        objContext.CMSDropdown_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
        objContext.CMSDropdown_Editor_ModuleProcessor.CloseDropdownSidebar();
    }

    /**
     * @name ShowDropdownSidebar
     * @param {object} objContext {state, props, dispatch, CMSDropdown_Editor_ModuleProcessor}
     * @param {any} event onclick event
     * @summary Opens up the side bar.
     */
    ShowDropdownSidebar(objContext) {
        objContext.CMSDropdown_Editor_ModuleProcessor.CloseDropdownSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "FolderID": objContext.props.FolderID,
            "ContainerId": objContext.props.ContainerId,
            "ElementJson": {
                ...objContext.state.ElementJson
            },
            "PassedEvents": {
                // "CloseSidebar": () => {
                //     objContext.CMSDropdown_Editor_ModuleProcessor.CloseSidebarWithoutSave(objContext);
                // },
                "UpdateElementJson": (objElementJson) => {
                    objContext.CMSDropdown_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            },
            "SidebarProps": {
                "SidebarName": "DropdownSidebar",
                "Header": objContext.CMSDropdown_Editor_ModuleProcessor.TextFormatter(objTextResource, "Dropdown_SidebarHeader"),
                "Title": objContext.CMSDropdown_Editor_ModuleProcessor.TextFormatter(objTextResource, "Dropdown_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseDropdownSidebar
     * @summary Closes the side bar.
     */
    CloseDropdownSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    // /**
    //  * @name CloseSidebarWithoutSave
    //  * @param {object} objContext {state, props, dispatch, CMSDropdown_Editor_ModuleProcessor}
    //  * @summary Closes the sidebar without saving.
    //  * */
    // CloseSidebarWithoutSave(objContext) {
    //     if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
    //         objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
    //     }
    // }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDropdown/CMSDropdownStyles.css"
        ];
    }
}

export default CMSDropdown_Editor_ModuleProcessor;
