// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditProductManageFolder_Hook from '@shared/Application/c.ProductManagement/Modules/1_Folder/AddEditFolder/AddEditFolder_Hook';
import AddEditProductManageFolder_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/1_Folder/AddEditFolder/AddEditFolder_ModuleProcessor';

/**
 * @name AddEditFolder
 * @param {object} props props
 * @summary This component is used to Add/Edit the TaskFolder data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditFolder = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditProductManageFolder_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditProductManageFolder_ModuleProcessor": new AddEditProductManageFolder_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AddEditProductManageFolder_ModuleProcessor.Initialize(objContext, objContext.AddEditProductManageFolder_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditProductManageFolder_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditProductManageFolder_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/1_Folder/Folder", props);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div id="TaskFolder" className="task-tabcontent">
            <div className="title">{Localization.TextFormatter(objTextResource, 'BaseData')}</div>
            <div className="col col-1">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, 'Name')}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="vFolderName"
                            autoFocus
                            className="text-input"
                            value={state.objData.vFolderName}
                            onFocus={() => objContext.AddEditProductManageFolder_ModuleProcessor.ValidateFocus(objContext, "vFolderName")}
                            onKeyDown={(e) => objContext.AddEditProductManageFolder_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditProductManageFolder_ModuleProcessor, objContext)}
                            onChange={e => {
                                objContext.AddEditProductManageFolder_ModuleProcessor.HandleChange(
                                    "vFolderName",
                                    e.target.value,
                                    objContext
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, 'Title')}</span>
                    </div>
                    <div className="row-right">
                       
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
                            className="textarea"
                            rows="4"
                            style={{ width: "100%" }}
                            type="text"
                            value={state.objData["vDescription"]}
                            onFocus={() => objContext.AddEditProductManageFolder_ModuleProcessor.ValidateFocus(objContext, "vDescription")}
                            onChange={e => {
                                objContext.AddEditProductManageFolder_ModuleProcessor.HandleChange(
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
    return state.isLoadComplete && state.objData ? GetContent() : <React.Fragment />
};

export default connect(IntranetBase_Hook.MapStoreToProps(AddEditProductManageFolder_ModuleProcessor.StoreMapList()))(AddEditFolder);