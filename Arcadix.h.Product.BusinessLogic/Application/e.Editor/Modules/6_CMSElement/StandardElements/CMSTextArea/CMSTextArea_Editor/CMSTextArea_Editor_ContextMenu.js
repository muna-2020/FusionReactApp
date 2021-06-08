//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSTextArea_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSTextArea
 * */
class CMSTextArea_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {props, state, dispatch}
     * @summary gets context menu list based on the slide element type
     * @returns {Array} slide context menu array
     */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let arrContextMenuOptions = [
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSTextArea_Editor_ModuleProcessor.ShowTextAreaSidebar,
                params: { objContext }
            }
        ];
        if (objContext.state.ElementJson["vElementJson"]["cIsDictation"] === "Y") {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    Disable: blnIsPointOverride ? false : true,
                    ClickEvent: objContext.CMSTextArea_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext }
                }
            ];
        }
        // let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
        //     objContext.props.ParentRef.current.GetContextMenuOptions() : [];
        return [
            {
                Module: "CMSTextArea",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSTextArea"
            }
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSTextArea_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSTextArea_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSTextArea_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSTextArea_Editor_ContextMenu;
