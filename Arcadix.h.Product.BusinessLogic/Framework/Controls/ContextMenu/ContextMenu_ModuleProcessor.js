//Base classes/methods
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name ContextMenu_ModuleProcessor
 * @summary Contains the context menu specific methods.
 * */
class ContextMenu_ModuleProcessor extends Base_ModuleProcessor {

    constructor() {
        super();
    };

    /**
     * 
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @param {Array} arrMenuList list of context-menus.
     * @param {object} objClientXY {clientX, clientY} this holds the mouse co-ordinates position of context-menu.
     * @summary to display the root-level context-menu.
     */
    ShowContextMenu(objContext, arrMenuList, objClientXY) {
        if (arrMenuList && arrMenuList.length > 0) {
            let arrRootMenuList = [{
                ParentId: 0,
                level: 1,
                isRoot: true,
                key: UniqueId.GetUniqueId(),
                clientX: objClientXY.clientX,
                clientY: objClientXY.clientY,
                contentList: [...arrMenuList.filter(a => a.ParentId === 0)]
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
     * @param {object} objPrevContextDimentions {right,left, top,bottom, righAligned, bottomAligned}.
     * @param {object} objLevel {level} represent level of the mouse-over node.
     * @summary Based on the event(x and y dimensions), second and further levels are added.
     */
    AddSubContextMenu(objContext, objClientXY, objNode, objPrevContextDimentions, objLevel) {
        let arrRemovedContextMenu = [...objContext.state.arrActivemenuList.filter(a => a.level <= objLevel.level)];
        if (objContext.state.arrActivemenuList.find(a => a.ParentId === objNode.Id) === undefined) {   // dont add if already added
            objContext.ContextMenu_ModuleProcessor.RemoveRightSideContextMenus(objContext, objLevel.level);      // removing right side context menus on change of menu
            if (objContext.state.arrMenuList.filter(a => a.ParentId === objNode.Id).length > 0) {  // add only if childrens are there
                let arrNewReactContList = [...arrRemovedContextMenu, {
                    ParentId: objNode.Id,
                    level: parseInt(objContext.ContextMenu_ModuleProcessor.GetLastLevelContextMenu(objContext).level) + 1,
                    righAligned: objPrevContextDimentions.righAligned,
                    bottomAligned: objPrevContextDimentions.bottomAligned,
                    isRoot: false,
                    key: UniqueId.GetUniqueId(),
                    clientX: objClientXY.clientX,
                    clientY: objClientXY.clientY,
                    boundingClient: { ...objPrevContextDimentions },
                    contentList: [...objContext.state.arrMenuList.filter(a => a.ParentId === objNode.Id)]
                }];
                objContext.dispatch({ type: "SET_STATE", payload: { "arrActivemenuList": arrNewReactContList } });
            }
        }
    }

    /**
     * @name RemoveRightSideContextMenus
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @summary To remove the context menus from the right side, when the mouse is moved back to the previous context menu(left).
     * @param {number} intActiveLevel 
     */
    RemoveRightSideContextMenus(objContext, intActiveLevel) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { "arrActivemenuList": [...objContext.state.arrActivemenuList.filter(a => a.level <= intActiveLevel)] }
        });
    }

    /**
     * @name HasSubMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @param {number} Id 
     * @summary check if the ContextMenu has the sub-level ContextMenu.
     * @returns {boolean}
     */
    HasSubMenu(objContext, Id) {
        return objContext.state.arrMenuList.filter(objContextList => { return objContextList.ParentId == Id }).length > 1
    }

    /**
     * @name GetLastLevelContextMenu
     * @param {*} objContext 
     * @summary To return LastLevelContextMenu.
     * @returns {object} last context-menu .
     */
    GetLastLevelContextMenu(objContext) {
        return objContext.state.arrActivemenuList[objContext.state.arrActivemenuList.length - 1];
    }
}

export default ContextMenu_ModuleProcessor;
