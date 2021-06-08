//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//ApplicationState State classses.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

import * as MultiMediaManagement_MetaData from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_MetaData";

/**
 * @name MultiMediaManagement_ContextMenu
 * @summary Contains the context menu related methods of MultiMediaManagement Popup
 * */
class MultiMediaManagement_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {props, state, dispatch}
     * @param {string} strContextMenuType Tree/Folder
     * @param {object} objNode selected node
     * @summary gets context menu list based on the slide element type
     * @returns {Array} slide context menu array
     */
    GetContextMenuOptions(objContext, strContextMenuType, objNode) {
        let arrContextMenuOptions;
        if (strContextMenuType === "Folder") {
            objNode = { "Id": 0 };
            arrContextMenuOptions = [
                {
                    ResourceKey: "Add_Root_Folder",
                    ClickEvent: objContext.MultiMediaManagement_ModuleProcessor.AddEditFolder,
                    params: { objContext, objNode, "strActionType": "Add" }
                }
            ]
        }
        else {
            var strNodeType = objNode["Type"].split("_")[0];
            if (objNode["Type"].toLowerCase().includes("folder")) {
                arrContextMenuOptions = [
                    {
                        ResourceKey: "Add_Folder",
                        ClickEvent: objContext.MultiMediaManagement_ModuleProcessor.AddEditFolder,
                        params: { objContext, objNode, "strActionType": "Add" }
                    },
                    {
                        ResourceKey: "Edit_Folder",
                        ClickEvent: objContext.MultiMediaManagement_ModuleProcessor.AddEditFolder,
                        params: { objContext, objNode, "strActionType": "Edit" }
                    },
                    {
                        ResourceKey: `Add_${strNodeType}`, // objContext.props.Data.MediaType
                        ClickEvent: objContext.MultiMediaManagement_ModuleProcessor.AddEditElement,
                        params: { objContext, objNode, "strActionType": "Add", "strMediaType": strNodeType }
                    }
                ];
            }
            else {
                arrContextMenuOptions = [
                    {
                        ResourceKey: `Edit_${strNodeType}`, // objContext.props.Data.MediaType
                        ClickEvent: objContext.MultiMediaManagement_ModuleProcessor.AddEditElement,
                        params: { objContext, objNode, "strActionType": "Edit", "strMediaType": strNodeType }
                    }
                ];
            }
        }
        return [
            {
                Module: "MultiMediaManagement",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement"
            }
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {string} strContextMenuType Tree/Folder
     * @param {object} objNode selected node object
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, strContextMenuType, objNode) {
        objContext.MultiMediaManagement_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.MultiMediaManagement_ModuleProcessor.GetContextMenuOptions(objContext, strContextMenuType, objNode)
        });
    }
}

export default MultiMediaManagement_ContextMenu;
