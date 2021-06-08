//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Application State classses.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//SpellCheck base class.
import SpellCheckBase_ModuleProcessor from "@shared/Framework/BaseClass/EditorBaseClass/SpellCheckBase_ModuleProcessor";

/**
 * @name ContextMenuBase_ModuleProcessor
 * @summary Contains the common methods used in <ModuleName>_Editor_ContextMenu.
 * */
class ContextMenuBase_ModuleProcessor extends SpellCheckBase_ModuleProcessor {

    /**
     * @param {Array} arrMenus list of context menu.
     * @param {number} intMenuIndex menu index.
     * @summary this build parent-child relation between the context-menu.
     */
    BuilContextMenuRelation(arrMenus, intMenuIndex = 0) {
        let objMenu = arrMenus[intMenuIndex];
        if (objMenu) {
            if (objMenu.SubMenuModule) {
                let arrNew = arrMenus.map(objMenuTemp => {
                    if (objMenuTemp.Module == objMenu.SubMenuModule) {
                        return { ...objMenuTemp, ParentId: objMenu.Id };
                    } else {
                        return objMenuTemp;
                    }
                });
                return this.BuilContextMenuRelation(arrNew, intMenuIndex + 1);
            } else {
                return this.BuilContextMenuRelation(arrMenus, intMenuIndex + 1);
            }
        }
        return arrMenus;
    }

    /**
     * @name BuildRelationAndShowContextMenu
     * @param {Array} arrContextMenu_Resource list of context menu with updated Text resource.
     * @param {object} objEvent {clientX, clientY}.
     * @summary this build the parent child relation and Show Context-menu.
     */
    BuildRelationAndShowContextMenu(arrContextMenu_Resource, objEvent) {
        let ShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        let arrContextMenuList_NonRelation = [];
        arrContextMenu_Resource.forEach(objContextMenu_Module => {
            let strModule = objContextMenu_Module.Module;
            let arrSingleMenuList = objContextMenu_Module.MenuList.map(objMenu => {
                return {
                    ...objMenu,
                    ["ParentId"]: 0,
                    ["Id"]: UniqueId.GetUniqueId(),
                    ["Module"]: strModule
                };
            });
            arrContextMenuList_NonRelation = [...arrContextMenuList_NonRelation, ...arrSingleMenuList];
        });
        let arrContextMenuList_Relation = this.BuilContextMenuRelation(arrContextMenuList_NonRelation);
        ShowContextMenu({
            ["Data"]: arrContextMenuList_Relation,
            ["objEvent"]: objEvent
        });
    }

    /**
     * @name GetUpdateContextMenuWithResource
     * @param {object} objContext {props, state, dispatch, <module name>_ModuleProcessor}.
     * @param {object} objTextResources text resources of module.
     * @param {Array} arrContextMenu_NonResource context menus
     * @summary this update the TextResources of context-menu.
     * @return {Array} updated context menu with text resource detail.
     */
    UpdateContextMenuWithResource(objContext, objTextResources, arrContextMenu_NonResource) {
        let strTextResourcePrefix = "Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo;
        let arrUpdatedContextMenu = arrContextMenu_NonResource.map(objContextMenu_NonResource => {
            let strModuleResourcePath = objContextMenu_NonResource.ResourcePath, arrSplit = [] ,strModule = ""; // resource path
            if(objContextMenu_NonResource.ResourcePath){
                arrSplit = objContextMenu_NonResource.ResourcePath.split("/");
                strModule = arrSplit[arrSplit.length - 1];  // module name
            }       
            let objReturn = {
                ...objContextMenu_NonResource,
                ["MenuList"]: [...objContextMenu_NonResource.MenuList.map(objMenu_NonResource => {
                    if (objMenu_NonResource["Text"]) {
                        return {
                            ...objMenu_NonResource
                        };
                    }
                    else {
                        let strResourceKey = objMenu_NonResource.ResourceKey;
                        return {
                            ...objMenu_NonResource,
                            ["Text"]: strModuleResourcePath ? objTextResources[strTextResourcePrefix + strModuleResourcePath]["Data"][0][strModule][strResourceKey] : objMenu_NonResource["Text"],
                            ["objTextResource"]: strModuleResourcePath ? objTextResources[strTextResourcePrefix + strModuleResourcePath]["Data"][0][strModule] : {}
                        };
                    }
                })]
            };
            return objReturn;
        });
        return arrUpdatedContextMenu;
    }

    /**
     * @name FetchAndCacheContextMenuResource
     * @param {Array} arrContextMenuDetail text-resource requests.
     * @param {function} fnCallback Call back
     * @summary this fetch and cache the context-menu resources.
     */
    FetchAndCacheContextMenuTextResource(arrContextMenuDetail, fnCallback) {
        let arrResourcePaths = [];
        // get all resource paths.
        arrContextMenuDetail.map(objContextMenu => {
            if (objContextMenu.ResourcePath) {
                if (!arrResourcePaths.includes(objContextMenu.ResourcePath)) {
                    arrResourcePaths = [
                        ...arrResourcePaths,
                        objContextMenu.ResourcePath
                    ];
                }
            }
        });
        // arrResourcePaths
        Object_Framework_Services_TextResource.Initialize(arrResourcePaths);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, (objTextResources) => {
            fnCallback(objTextResources);
        });
    }

    /**
     * @name ShowContextMenu
     * @param {object} param0 {objContext, objClientXY, arrContextMenuDetail}.
     * @summary update the Context menu with the TextResources and call the Context menu to display it.
     */
    ShowContextMenu({ objContext, objClientXY, arrContextMenuDetail }) {
        this.FetchAndCacheContextMenuTextResource(arrContextMenuDetail, (objTextResources) => {
            this.BuildRelationAndShowContextMenu(this.UpdateContextMenuWithResource(objContext, objTextResources, arrContextMenuDetail), objClientXY);
        });
    }

}

export default ContextMenuBase_ModuleProcessor;