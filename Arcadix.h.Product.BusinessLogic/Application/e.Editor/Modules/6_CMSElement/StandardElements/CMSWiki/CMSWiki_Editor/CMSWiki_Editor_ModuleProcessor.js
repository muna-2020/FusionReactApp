//Module realted fies.
import CMSWiki_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/CMSWiki_Editor_ContextMenu";

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSWiki_Editor_ModuleProcessor
 * @summary Contains the Wiki's editor version module specific methods.
 * */
class CMSWiki_Editor_ModuleProcessor extends CMSWiki_Editor_ContextMenu {

    /**
     * @name ShowWikiSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    ShowWikiSidebar(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.CMSWiki_Editor_ModuleProcessor.CloseWikiSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Mode": "edit",
            "ContainerId": objContext.props.ContainerId,
            "FolderID": objContext.props.FolderID,
            "ElementJson": { ...objContext.state.ElementJson },
            "PassedEvents": {
                UpdateElementJson: (objNewElementJson) => {
                    if (objContext.state.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] === objNewElementJson["vElementJson"]["Values"][0]["vWikiKeyword"]) {
                        objContext.CMSWiki_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    }
                    objContext.CMSWiki_Editor_ModuleProcessor.CloseWikiSidebar();
                },
                CloseSidebar: () => {
                    objContext.CMSWiki_Editor_ModuleProcessor.CloseWikiSidebar();
                }
            },
            "ComponentController": objContext.props.ComponentController,
            "SidebarProps": {
                "SidebarName": "WikiSidebar",
                "Header": objContext.CMSWiki_Editor_ModuleProcessor.TextFormatter(objTextResource, "Wiki_SidebarHeader"),
                "Title": objContext.CMSWiki_Editor_ModuleProcessor.TextFormatter(objTextResource, "Wiki_SidebarTitle"),
                "Header": "Wiki",
                "Title": "Wiki",
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseWikiSidebar
     * @summary Closes the side bar.
     */
    CloseWikiSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSWiki/CMSWikiStyles.css"
        ];
    }
}

export default CMSWiki_Editor_ModuleProcessor;
