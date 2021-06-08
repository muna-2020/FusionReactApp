//React imports
import React from 'react';

//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSInputFormula_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSInputFormula
 * */
class CMSInputFormula_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSInputFormula_Editor_ModuleProcessor}
     * @param {object} objParams { "Value": CMSInputFormula Value, "Type": string/null }
     * @summary Forms an array with the ContextMenuOptions for the CMSInputFormula element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type } = objParams;
        let arrContextMenuOptions = [];
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            },
            {
                ResourceKey: "Container",
                SubMenuModule: "CMSPageContent"
            }
        ];

        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"]) : [];
        return [
            {
                Module: "CMSInputFormula",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSInputFormula"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSInputFormula_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams 
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSInputFormula_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSInputFormula_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSInputFormula_Editor_ContextMenu;
