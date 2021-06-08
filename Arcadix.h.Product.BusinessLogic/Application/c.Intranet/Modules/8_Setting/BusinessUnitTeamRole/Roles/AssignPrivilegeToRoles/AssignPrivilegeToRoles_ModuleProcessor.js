//Objects required for module.
import Object_Cockpit_UserRole from '@shared/Object/c.Cockpit/AccessControl/UserRole/UserRole';
import Object_Framework_Services_FrameworkNavigation from "@shared/Object/a.Framework/Services/Navigation/FrameworkNavigation"

/**
 * @name AssignPrivilegeToRoles_ModuleProcessor
 * @summary Class for Add/Edit Roles module.
 */
class AssignPrivilegeToRoles_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [            
            "Object_Framework_Services_FrameworkNavigation",
        ];
    }

    /**
     * @name GetInitialData
     * @summary Returns initial data for Add
     * @returns {object} return initial objData for Add
     */
    GetInitialData(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["RolesGrid"] : 0;
        let objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        return {
            ...objData,
            "t_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel": objData.t_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel?.length > 0 ? objData.t_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel : objContext.props.Data
        };
    }

    /**
     * @name HandleEntityPrivilegeAccessLevelChange
     * @param {object} objAssigendPrivilegeAccessLevel consists of AssigendPrivilegeAccessLevel
     * @param {object} objEntity consists value of Entity
     * @param {object} objEntityPrivilege consists value of EntityPrivilege
     * @param {object} objAccessLevel consists value of AccessLevel
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleEntityPrivilegeAccessLevelChange(objAssigendPrivilegeAccessLevel, objEntity, objEntityPrivilege, objAccessLevel, objContext) {
        if (!objContext.state.blnIsSystemRole) {
            let objUpdatedAccessLevel = {};
            if (objAccessLevel) {
                let intNextAccessLevel = objContext.props.Data?.EntityAccessLevelData?.findIndex(objTemp => objTemp["uEntityAccessLevelId"] == objAccessLevel["uEntityAccessLevelId"]) + 1;
                objUpdatedAccessLevel = intNextAccessLevel < objContext.props.Data.EntityAccessLevelData.length ? objContext.props.Data.EntityAccessLevelData[intNextAccessLevel] : null;
            }
            else {
                objUpdatedAccessLevel = objContext.props.Data.EntityAccessLevelData[0];
            }

            //if (objAssigendPrivilegeAccessLevel["uUserRoleEntityPrivilegeAccessLevelId"]) {
            //    objAssigendPrivilegeAccessLevel = {
            //        ...objAssigendPrivilegeAccessLevel,
            //        "uEntityId": objEntity["uEntityId"],
            //        "uEntityPrivilegeId": objEntityPrivilege["uEntityPrivilegeId"],
            //        "uEntityAccessLevelId": objUpdatedAccessLevel ? objUpdatedAccessLevel["uEntityAccessLevelId"] : null
            //    }
            //}
            //else {
            //    objAssigendPrivilegeAccessLevel = {
            //        ...objAssigendPrivilegeAccessLevel,
            //        "uEntityId": objEntity["uEntityId"],
            //        "uEntityPrivilegeId": objEntityPrivilege["uEntityPrivilegeId"],
            //        "uEntityAccessLevelId": objUpdatedAccessLevel["uEntityAccessLevelId"]
            //    }
            //}

            let arrNewt_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel = objContext.state.objData.t_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel?.filter(objTemp => objTemp["uEntityId"] !== objEntity["uEntityId"] || objTemp["uEntityPrivilegeId"] !== objEntityPrivilege["uEntityPrivilegeId"]) ?? [];
            if (objUpdatedAccessLevel) {
                let objUpdatedPrivilegeAccessLevel = {
                    ...objAssigendPrivilegeAccessLevel,
                    "uEntityId": objEntity["uEntityId"],
                    "uEntityPrivilegeId": objEntityPrivilege["uEntityPrivilegeId"],
                    "uEntityAccessLevelId": objUpdatedAccessLevel["uEntityAccessLevelId"]
                }
                arrNewt_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel = [...arrNewt_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel, objUpdatedPrivilegeAccessLevel];
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, "t_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel": arrNewt_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel } } })
        }
    }
    
    /**
     * @name HandleSystemPrivilegeChange
     * @param {object} objAssigendSystemPrivilege consists of AssigendSystemPrivilege
     * @param {object} objSystemPrivilege consists value of SystemPrivilege
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleSystemPrivilegeChange(objAssigendSystemPrivilege, objSystemPrivilege, objContext) {
        if (!objContext.state.blnIsSystemRole) {
            let arrNewt_Framework_MainClient_UserRole_SystemPrivilege = objContext.state.objData.t_Framework_MainClient_UserRole_SystemPrivilege?.filter(objTemp => objTemp["uSystemPrivilegeId"] !== objSystemPrivilege["uSystemPrivilegeId"]) ?? [];
            if (!objAssigendSystemPrivilege) {
                let objUpdatedSystemPrivilege = {
                    "uSystemPrivilegeId": objSystemPrivilege["uSystemPrivilegeId"],
                };
                arrNewt_Framework_MainClient_UserRole_SystemPrivilege = [...arrNewt_Framework_MainClient_UserRole_SystemPrivilege, objUpdatedSystemPrivilege];
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, "t_Framework_MainClient_UserRole_SystemPrivilege": arrNewt_Framework_MainClient_UserRole_SystemPrivilege } } });
        }
    }
        
    /**
     * @name HandleNavigationAccessChange
     * @param {string} strNavigationName consists of NavigationName
     * @param {boolean} blnChecked checked or unchecked
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleNavigationAccessChange(strNavigationName, blnChecked, objContext) {
        if (!objContext.state.blnIsSystemRole) {
            let arrNewt_Framework_MainClient_UserRole_Navigation = [];
            if (strNavigationName === "AccessAllNavigations") {
                if (!blnChecked) {
                    let arrNavigations = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.state.strApplicationTypeId)?.["Data"]?.[0]?.[objContext.state.strApplicationTypeName] ?? [];
                    arrNewt_Framework_MainClient_UserRole_Navigation = arrNavigations.map(objNav => ({ "vNavigationName": objNav["NavigationName"] }));
                }
                objContext.dispatch({ type: "SET_STATE", payload: { blnAccessAllNavigations: !blnChecked } });
            }
            else {
                arrNewt_Framework_MainClient_UserRole_Navigation = objContext.state.objData.t_Framework_MainClient_UserRole_Navigation?.filter(objTemp => objTemp["vNavigationName"] !== strNavigationName) ?? [];
                if (!blnChecked) {
                    let objUpdatedNavigation = {
                        "vNavigationName": strNavigationName
                    };
                    arrNewt_Framework_MainClient_UserRole_Navigation = [...arrNewt_Framework_MainClient_UserRole_Navigation, objUpdatedNavigation];
                }
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, "t_Framework_MainClient_UserRole_Navigation": arrNewt_Framework_MainClient_UserRole_Navigation } } });
        }
    }

    
    /**
     * @name HandleApplicationTypeDropDownChange
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    HandleApplicationTypeDropDownChange(objChangeData, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strApplicationTypeId": objChangeData["iApplicationTypeId"], "strApplicationTypeName": objChangeData["vApplicationName"]  } });
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objNavigationParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "ApplicationType": objChangeData["iApplicationTypeId"]
                        }
                    }
                ]
            },
        };
        Object_Framework_Services_FrameworkNavigation.GetData(objNavigationParams, (objReturn) => {
            console.log(objReturn);
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit api after validation succeeds
     */
    SaveData(objContext, blnClose = false) {
        //let objValidationObject = this.Validate(objContext);
        //if (!objValidationObject) {
            let objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            };
            if (objContext.state.objData["uUserRoleId"] && objContext.state.objData["uUserRoleId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Cockpit_UserRole.EditData({ "SearchQuery": objSearchQuery, "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "RolesGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } 
        //}
        //else {
        //    objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        //}
    }
}
export default AssignPrivilegeToRoles_ModuleProcessor;