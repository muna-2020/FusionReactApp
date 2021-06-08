//React imports
import React from 'react';

//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSSample_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSSample
 * */
class CMSSample_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    GetContextMenuOptions(objContext, objParams) {
        let arrContextMenuOptions = [];
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "SampleContextMenu1",
                Disable: false,
                ClickEvent: objContext.CMSSample_Editor_ModuleProcessor.SampleContextMenuAction1,
                params: { objContext, "TestValue": "1" }
            },
            {
                ResourceKey: "SampleContextMenu2",
                Disable: false,
                ClickEvent: objContext.CMSSample_Editor_ModuleProcessor.SampleContextMenuAction2,
                params: { objContext, "TestValue": "2" }
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSSample",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSSample"
            },
            ...arrParentContextMenuOptions
        ];
    }

    SampleContextMenuAction1(objParams) {
        alert('Action 1 clicked')
    }

    SampleContextMenuAction2(objParams) {
        alert('Action 2 clicked')
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSCheckbox Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSSample_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSSample_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSSample_Editor_ContextMenu;