//Base classes/methods
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name ContextMenu_ModuleProcessor
 * @summary Contains the context menu specific methods.
 * */
class ContextMenu_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name ShowContextMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @param {Array} arrMenuList list of context-menus.
     * @param {object} objClientXY {clientX, clientY} this holds the mouse co-ordinates position of context-menu.
     * @summary to display the root-level context-menu.
     */
    ShowContextMenu(objContext, arrMenuList, objClientXY) {
        if (arrMenuList && arrMenuList.length > 0) {
            let arrRootMenuList = [{
                ParentId: 0,
                intLevel: 1,
                blnIsRoot: true,
                intKey: UniqueId.GetUniqueId(),
                objClientXY: { ...objClientXY },
                arrContentList: [...arrMenuList.filter(objOption => objOption.ParentId === 0 && !objOption.Hidden)]
            }];
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ["arrActivemenuList"]: arrRootMenuList,
                    ["arrMenuList"]: arrMenuList
                }
            });
        }
    }

    /**
     * @name RemoveContextMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @summary To reset the Context menu.
     */
    RemoveContextMenu(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "arrActivemenuList": [] } });
    }

    /**
     * @name AddContextMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @param {object} objClientXY  {clientX, clientY} this holds the mouse co-ordinates position of event.
     * @param {object} objNode the node of the context menu being hovered.
     * @param {object} objPrevContextMenuDimentions {right,left, top,bottom, righAligned, bottomAligned}.
     * @param {object} objLevel {intLevel} represent intLevel of the mouse-over node.
     * @summary Based on the event(x and y dimensions), second and further levels are added.
     */
    AddSubContextMenu(objContext, objClientXY, objNode, objPrevContextMenuDimentions, objLevel) {
        let arrRemovedContextMenu = [...objContext.state.arrActivemenuList.filter(a => a.intLevel <= objLevel.intLevel)];
        if (objContext.state.arrActivemenuList.find(a => a.ParentId === objNode.Id) === undefined) {   // don't add if already added
            objContext.ContextMenu_ModuleProcessor.RemoveRightSideContextMenus(objContext, objLevel.intLevel);      // removing right side context menus on change of menu
            if (objContext.state.arrMenuList.filter(a => a.ParentId === objNode.Id).length > 0) {  // add only if children's are there
                let arrNewReactContList = [...arrRemovedContextMenu, {
                    ParentId: objNode.Id,
                    intLevel: parseInt(objContext.ContextMenu_ModuleProcessor.GetLastLevelContextMenu(objContext).intLevel) + 1,
                    blnIsRoot: false,
                    intKey: UniqueId.GetUniqueId(),
                    objClientXY: { ...objClientXY},
                    objParentMenuDimentions: { ...objPrevContextMenuDimentions },
                    arrContentList: [...objContext.state.arrMenuList.filter(objOption => objOption.ParentId === objNode.Id && !objOption.Hidden)]
                }];
                objContext.dispatch({ type: "SET_STATE", payload: { "arrActivemenuList": arrNewReactContList } });
            }
        }
    }

    /**
     * @name RemoveRightSideContextMenus
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @param {number} intActiveLevel active level.
     * @summary To remove the context menus from the right side, when the mouse is moved back to the previous context menu(left).
     */
    RemoveRightSideContextMenus(objContext, intActiveLevel) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { "arrActivemenuList": [...objContext.state.arrActivemenuList.filter(a => a.intLevel <= intActiveLevel)] }
        });
    }

    /**
     * @name HasSubMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @param {number} Id unique id of the menu node.
     * @summary check if the ContextMenu has the sub-level ContextMenu.
     * @returns {boolean} true if Has sub menu else false
     */
    HasSubMenu(objContext, Id) {
        return objContext.state.arrMenuList.filter(objContextList => { return objContextList.ParentId == Id }).length > 1
    }

    /**
     * @name GetLastLevelContextMenu
     * @param {*} objContext 
     * @summary To return LastLevelContextMenu.
     * @returns {object} last context-menu object.
     */
    GetLastLevelContextMenu(objContext) {
        return objContext.state.arrActivemenuList[objContext.state.arrActivemenuList.length - 1];
    }
}

export default ContextMenu_ModuleProcessor;
