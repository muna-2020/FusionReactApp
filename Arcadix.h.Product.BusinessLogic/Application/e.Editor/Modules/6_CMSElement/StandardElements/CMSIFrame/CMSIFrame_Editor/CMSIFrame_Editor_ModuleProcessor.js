//Module related fies.
import CMSIFrame_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/CMSIFrame_Editor_ContextMenu";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name CMSIFrame_Editor_ModuleProcessor
 * @summary Contains the IFrame's editor version module specific methods.
 * */
class CMSIFrame_Editor_ModuleProcessor extends CMSIFrame_Editor_ContextMenu {

    /**
     * @name PreserveTextState
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objState state to be preserved.
     * @summary Preserving text state for undo-redo purpose.
     */
    PreserveTextState(objContext, objState) {
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [objState.ElementJson.iElementId]: { ...objState }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
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
     * @name ShowPropertiesSidebar
     * @param {object} objContext {state, props, dispatch, CMSIFrame_Editor_ModuleProcessor}
     * @param {object} objElementJson Element json to be sent to sidebar.
     * @summary Opens up the side bar.
     */
    ShowPropertiesSidebar(objParams) {
        let { objContext } = objParams;
        objContext.CMSIFrame_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "ElementJson": { ...objContext.state.ElementJson },
            "PassedEvents": {
                "CloseSidebar": () => {
                    objContext.CMSIFrame_Editor_ModuleProcessor.CloseSidebarWithoutSave(objContext);
                },
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSIFrame_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "ElementJson": objNewElementJson
                        }
                    });
                }
            },
            "SidebarProps": {
                "SidebarName": "IFramePropertiesSidebar",
                "Header": "IFrame",
                "Title": "Properties",
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseSidebarWithoutSave
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
     * @summary Closes the sidebar without saving.
     * */
    CloseSidebarWithoutSave(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSIFrame/CMSIFrameStyles.css"
        ];
    }
}

export default CMSIFrame_Editor_ModuleProcessor;
