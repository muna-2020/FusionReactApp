//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name ContextMenu_CompontProcessor.
* @summary Class for ContextMenu.
*/
class ContextMenu_CompontProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "ContextMenuDetails" }
        ];
    };

    /**
   * @name RemoveContextMenu
   * @summary To reset the Context menu. 
   */
    RemoveContextMenu(objContext){
        objContext.dispatch({ type: "SET_STATE", payload: { "arrReactContList": [] } });
    }


    /**
     * @name GetLastLevelContextMenu
     * @summary To return LastLevelContextMenu .
     * @returns {object}
     */
    GetLastLevelContextMenu(objContext){
        return objContext.state.arrReactContList[objContext.state.arrReactContList.length - 1];
    }

    /**
     * @name RemoveRightSideContextMenus
     * @summary To remove the context menus from the right side, when the mouse is moved back to the previous context menu(left).
     * @param {*} strCurrentLevel
     */
    RemoveRightSideContextMenus(strCurrentLevel, objContext){
        console.log('currentLevel berfore', strCurrentLevel);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrReactContList": objContext.state.arrReactContList.filter(a => a.level <= strCurrentLevel) } });
    }

    /**
     * @name IsSubLevelsPresent
     * @summary To check it the menu has the sub levels.
     * @param {*} strId 
     * @returns {boolean}
     */
    IsSubLevelsPresent(strId, objContext){
        return objContext.state.arrContextList.filter(objContextList => { return objContextList.ParentId == strId }).length > 1
    }

}

export default ContextMenu_CompontProcessor;