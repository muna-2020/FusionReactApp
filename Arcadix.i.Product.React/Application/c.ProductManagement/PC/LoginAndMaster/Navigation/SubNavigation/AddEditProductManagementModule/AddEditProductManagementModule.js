// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as AddEditProductManagementModule_Hook from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/AddEditProductManagementModule/AddEditProductManagementModule_Hook';
import AddEditProductManagementModule_ModuleProcessor from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation/AddEditProductManagementModule/AddEditProductManagementModule_ModuleProcessor';

/**
 * @name AddEditProductManagementModule
 * @param {object} props props
 * @summary This component is used to Add/Edit the TaskFolder data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditProductManagementModule = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditProductManagementModule_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditProductManagementModule_ModuleProcessor": new AddEditProductManagementModule_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditProductManagementModule_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditProductManagementModule_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div id="ProductManagementModule" className="tabcontent">
                    <div className="title">{Localization.TextFormatter(objTextResource, 'BaseData')}</div>
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Name')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    id="vModuleName"
                                    className="text-input"
                                    value={state.objData.vModuleName}
                                    onFocus={() => objContext.AddEditProductManagementModule_ModuleProcessor.ValidateFocus(objContext,"vModuleName")}
                                    onChange={e => {
                                        objContext.AddEditProductManagementModule_ModuleProcessor.HandleChange(
                                            "vModuleName",
                                            e.target.value,
                                            objContext
                                        );
                                    }}
                                />
                            </div>
                         </div>  
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Description')}</span>
                            </div>
                            <div className="row-right">
                                <textarea
                                    id="vDescription"
                                    className="TextArea"
                                    rows="4"
                                    style={{ width: "100%" }}
                                    value={state.objData.vDescription}
                                    onFocus={() => objContext.AddEditProductManagementModule_ModuleProcessor.ValidateFocus(objContext, "vDescription")}
                                    onChange={e => {
                                        objContext.AddEditProductManagementModule_ModuleProcessor.HandleChange(
                                            "vDescription",
                                            e.target.value,
                                            objContext
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
               
                    <div id="ValidationError" />
        </div>
    };
    return (
        state.objData ? GetContent() : <React.Fragment />
    );
};

export default AddEditProductManagementModule;
