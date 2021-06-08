//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
  * @name CMSTrueFalse_Editor_ContextMenu
  * @summary Contains the context menu related methods of the CMSTrueFalse
  */
class CMSTrueFalse_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
      * @name GetContextMenuOptions
      * @param {object} objContext {state, props, dispatch, CMSTrueFalse_Editor_ModuleProcessor}
      * @param {object} objParams { "Value": CMSTrueFalse Value, "Type": string/null }
      * @summary Forms an array with the ContextMenuOptions for the TrueFalse element.
      * @returns {any} Context Menu Options
      */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSTrueFalse",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSTrueFalse"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
      * @name OpenContextMenu
      * @param {object} objContext {state, props, dispatch, CMSTrueFalse_Editor_ModuleProcessor}
      * @param {number} intClientX X-Axis coordinates
      * @param {number} intClientY Y-Axis coordinates
      * @param {object} objParams { "Value": CMSTrueFalse Value, "Type": string/null }
      * @summary Opens the context menu.
      */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSTrueFalse_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSTrueFalse_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSTrueFalse_Editor_ContextMenu;
