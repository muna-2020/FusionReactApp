//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as AssignPrivilegeToRoles_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/AssignPrivilegeToRoles/AssignPrivilegeToRoles_Hook';
import AssignPrivilegeToRoles_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/AssignPrivilegeToRoles/AssignPrivilegeToRoles_ModuleProcessor';

/**
* @name AssignPrivilegeToRoles.
* @param {object} props props.
* @summary This component is used to Add/Edit the Roles data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AssignPrivilegeToRoles = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AssignPrivilegeToRoles_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AssignPrivilegeToRoles_ModuleProcessor": new AssignPrivilegeToRoles_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AssignPrivilegeToRoles_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetEntityPrivilegeAccessContent
     * @summary Forms the jsx required for the EntityPrivilegeAccess Content.
     * @returns {object} jsx
     */
    const GetEntityPrivilegeAccessContent = () => {
        return <div className="entity-privilege-access">
            <table>
                <tbody>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, "Entities")}</td>
                    {
                        objContext.props.Data?.EntityPrivilegeData?.map((objEntityPrivilege) => {
                            let objEntityPrivilegeData = objEntityPrivilege.t_Framework_MainClient_EntityPrivilege_Data?.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId) ?? {};
                            return <td>{objEntityPrivilegeData["vEntityPrivilegeName"]}</td>
                        })
                    }
                </tr>
                {
                    objContext.props.Data?.EntityData?.map((objEntity) => {
                        let objEntityData = objEntity.t_Framework_MainClient_Entity_Data?.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId) ?? {};
                        return <tr>
                            <td>{objEntityData["vEntityName"]}</td>
                            {
                                objContext.props.Data?.EntityPrivilegeData?.map((objEntityPrivilege) => {
                                    let objAssigendPrivilegeAccessLevel = objContext.state.objData.t_Framework_MainClient_UserRole_EntityPrivilegeAccessLevel?.find(objTemp => objTemp["uEntityId"] == objEntity["uEntityId"] && objTemp["uEntityPrivilegeId"] == objEntityPrivilege["uEntityPrivilegeId"]) ?? {};
                                    let objAccessLevel = objContext.props.Data?.EntityAccessLevelData?.find(objTemp => objTemp["uEntityAccessLevelId"] == objAssigendPrivilegeAccessLevel["uEntityAccessLevelId"]);
                                    return <td>
                                        <img
                                            src={props.Resource.SkinPath + "/Images/Common/Icons/" + (objAccessLevel?.["vIdentifier"] ?? "None") + ".svg"}
                                            onClick={() => objContext.AssignPrivilegeToRoles_ModuleProcessor.HandleEntityPrivilegeAccessLevelChange(objAssigendPrivilegeAccessLevel, objEntity, objEntityPrivilege, objAccessLevel, objContext)} />
                                    </td>
                                })
                            }
                        </tr>
                    })                    
                }
                </tbody>
            </table>
            <div className="entity-accesslevel">
            <img src={props.Resource.SkinPath + "/Images/Common/Icons/None.svg"} />
            <span>{Localization.TextFormatter(objTextResource, "None")}</span>
            {
                objContext.props.Data?.EntityAccessLevelData?.map((objEntityAccessLevel) => {
                    let objEntityAccessLevelData = objEntityAccessLevel.t_Framework_MainClient_EntityAccessLevel_Data?.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId) ?? {};
                    return <React.Fragment>
                        <img src={props.Resource.SkinPath + "/Images/Common/Icons/" + (objEntityAccessLevel?.["vIdentifier"] ?? "None") + ".svg"} />
                        <span>{objEntityAccessLevelData["vEntityAccessLevelName"]}</span>
                    </React.Fragment>
                })
            }
            </div>
        </div>
    }

    /**
     * @name GetSystemPrivilegeContent
     * @summary Forms the jsx required for the SystemPrivilege Content.
     * @returns {object} jsx
     */
    const GetSystemPrivilegeContent = () => {
        return <div className="entity-privilege-access">
            <table>
                <tbody>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, "Privileges")}</td>
                    <td/>
                </tr>
                {
                    objContext.props.Data?.SystemPrivilegeData?.map((objSystemPrivilege) => {
                        let objSystemPrivilegeData = objSystemPrivilege.t_Framework_MainClient_SystemPrivilege_Data?.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId) ?? {};
                        let objAssigendSystemPrivilege = objContext.state.objData.t_Framework_MainClient_UserRole_SystemPrivilege?.find(objTemp => objTemp["uSystemPrivilegeId"] == objSystemPrivilege["uSystemPrivilegeId"]);
                        let blnAssigned = objAssigendSystemPrivilege ? true : false
                        return <tr>
                            <td>{objSystemPrivilegeData["vSystemPrivilegeName"]}</td>                                                         
                            <td>
                                <img
                                    src={props.Resource.SkinPath + "/Images/Common/Icons/" + (blnAssigned ? "Organization": "None") + ".svg"}
                                    onClick={() => objContext.AssignPrivilegeToRoles_ModuleProcessor.HandleSystemPrivilegeChange(objAssigendSystemPrivilege, objSystemPrivilege, objContext)}
                                />
                            </td>                                                           
                        </tr>
                    })
                }
                </tbody>
            </table>
            <div className="entity-accesslevel">
                <img src={props.Resource.SkinPath + "/Images/Common/Icons/None.svg"} />
                <span>{Localization.TextFormatter(objTextResource, "NotAssigned")}</span>
                <img src={props.Resource.SkinPath + "/Images/Common/Icons/Organization.svg"} />
                <span>{Localization.TextFormatter(objTextResource, "Assigned")}</span>
            </div>
        </div>
    }
    
    /**
     * @name GetNavigationContent
     * @summary Forms the jsx required for the Navigation Content.
     * @returns {object} jsx
     */
    const GetNavigationContent = () => {
        let arrNavigations = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.state.strApplicationTypeId)?.["Data"]?.[0]?.[objContext.state.strApplicationTypeName] ?? [];
        arrNavigations = arrNavigations.sort((a, b) => a["ParentNavigationId"] - b["ParentNavigationId"]);

        return <div className="navigation-content">
            {
                JConfiguration.ApplicationTypeName != "ProductManagement" ? 
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ApplicationType')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                        <WrapperComponent
                            ComponentName={"Dropdown"}
                            Id="iApplicationTypeId"
                            Data={{
                                DropdownData: props.Data.DropdownData.ApplicationTypeData,
                                SelectedValue: state.strApplicationTypeId ?? -1
                            }}
                            Meta={{
                                IsLanguageDependent: "N",
                                ValueColumn: "iApplicationTypeId",
                                DisplayColumn: "vApplicationName",
                                DefaultOptionValue: - 1,
                                ShowDefaultOption: "true"
                            }}
                            Resource={{
                                Text: {
                                    DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseSelect")
                                },
                                JConfiguration: props.Resource.JConfiguration,
                                SkinPath: props.Resource.SkinPath
                            }}
                            Callbacks={{
                                CheckDeletedDropDownData: (objNode) => {
                                    return objNode["cIsDeleted"] == "N" ? true : false
                                }
                            }}
                            Events={{
                                OnChangeEventHandler: (objChangeData, props) => objContext.AssignPrivilegeToRoles_ModuleProcessor.HandleApplicationTypeDropDownChange(objChangeData, objContext),
                            }}
                            ParentProps={{ ...props }}
                        />
                    </div>
                    </div>
                    :
                    <React.Fragment/>
            }
            <div className="navigation-list">
                <ul>
                    <li>
                        <div className="checkbox-block">
                            <label className="checkbox">
                                <input type="checkbox"
                                    onChange={() => { objContext.AssignPrivilegeToRoles_ModuleProcessor.HandleNavigationAccessChange("AccessAllNavigations", objContext.state.blnAccessAllNavigations, objContext) }}
                                    checked={objContext.state.blnAccessAllNavigations} // if sent !blnChecked means add and  blnChecked means delete
                                />
                                <span className="checkmark"></span>
                            </label>
                            <b>{Localization.TextFormatter(objTextResource, "AccessAllNavigations")}</b>
                        </div>
                    </li>
                </ul>
            {
                //arrNavigations.map((objNavigation) => {
                //    return <div className="checkbox-block">
                //        <label className="checkbox">
                //            <input type="checkbox"
                //                onChange={() => { objContext.CycleSchool_ModuleProcessor.ClickHandler(objContext, objTestItem, !blnChecked) }}
                //                //checked={} // if sent !blnChecked means add and  blnChecked means delete
                //            />
                //            <span className="checkmark"></span>
                //        </label>
                //        <span>{objNavigation["NavigationName"]}</span>
                //    </div>
                //})
                GetNavigationList(arrNavigations, 0)
            }
            </div>
        </div>
    }
        
    /**
     * @name GetNavigationList
     * @summary Forms the jsx required for the Navigation List Recursively.
     * @returns {object} jsx
     */
    const GetNavigationList = (arrNodes, strParentId) => {
        var domNodes = [];
        for (var intNodeIndex in arrNodes) {
            let objNode = arrNodes[intNodeIndex];
            if (objNode && objNode["ParentNavigationId"] == strParentId) {
                var domChildren = [];
                let blnHasChildren = arrNodes.find(objCheckNode => objCheckNode[props.Meta.ParentIdField] == objNode[props.Meta.IdField]);
                if (blnHasChildren) {
                    domChildren = <ul className={"sub-navigation-list"}
                    >
                        {GetNavigationList(arrNodes, objNode["NavigationId"])}
                    </ul>
                }
                let blnChecked = objContext.state.objData.t_Framework_MainClient_UserRole_Navigation?.find(objTemp => objTemp["vNavigationName"] == objNode["NavigationName"]) ? true : false;
                let domNode = <ul id={objNode[props.Meta.IdField]}>
                    {
                        //<li >
                        //    {objNode["NavigationName"]}
                        //</li>
                    }
                    <li>
                    <div className="checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                onChange={() => { objContext.AssignPrivilegeToRoles_ModuleProcessor.HandleNavigationAccessChange(objNode["NavigationName"], blnChecked, objContext) }}
                                checked={blnChecked} // if sent !blnChecked means add and  blnChecked means delete
                            />
                            <span className="checkmark"></span>
                        </label>
                        <span >{objNode["NavigationName"]}</span>
                        </div>
                    </li>
                    {blnHasChildren ? domChildren : <React.Fragment />}
                </ul >
                domNodes.push(domNode);
            }
        }
        return domNodes;
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div className="tabcontent subject-management assign-privilege">
                    <h3>{Localization.TextFormatter(objTextResource, "RoleManagement") + ": " + Localization.TextFormatter(objTextResource, state.strDivToShow)}</h3>
                    <div id="Privileges" style={{ display: (state.strDivToShow == "Privileges" ? "block" : "none") }}>                    
                         {GetEntityPrivilegeAccessContent()}
                    </div>
                    <div id="SystemPrivilege" style={{ display: (state.strDivToShow == "SystemPrivilege" ? "block" : "none") }}>
                        {GetSystemPrivilegeContent()}
                    </div>
                    <div id="Navigation" style={{ display: (state.strDivToShow == "Navigation" ? "block" : "none") }}>
                        {GetNavigationContent()}
                    </div>
                </div>
                <div id="ValidationError"/>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
})
export default connect(IntranetBase_Hook.MapStoreToProps(AssignPrivilegeToRoles_ModuleProcessor.StoreMapList()))(AssignPrivilegeToRoles);
//export default AssignPrivilegeToRoles;