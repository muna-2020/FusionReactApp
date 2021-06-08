// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as AddEditApplicationType_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/AddEditApplicationType/AddEditApplicationType_Hook';
import AddEditApplicationType_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/AddEditApplicationType/AddEditApplicationType_ModuleProcessor';

/**
 * @name AddEditAppliocationType
 * @param {object} props props
 * @summary This component is used to Add/Edit the AppliocationType data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditApplicationType = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditApplicationType_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditApplicationType_ModuleProcessor": new AddEditApplicationType_ModuleProcessor()  };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditCountry_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditApplicationType_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="ApplicationType" className="tabcontent subject-management multilanguage-div">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'ApplicationType')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ApplicationName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                className="text-input"
                                onKeyDown={(e) => objContext.AddEditApplicationType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationType_ModuleProcessor, objContext)}
                                onFocus={(e => { objContext.AddEditApplicationType_ModuleProcessor.ValidateFocus(objContext, 'vApplicationName'); })}
                                id="vApplicationName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditApplicationType_ModuleProcessor.HandleChange("vApplicationName", e.target.value, objContext);
                                }}
                                value={state.objData["vApplicationName"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ApplicationTypeName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vApplicationTypeName",
                                    DependingTableName: "t_Framework_ApplicationType_Data",
                                    DisplayColumn: "vApplicationTypeName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData,
                                }}
                                Events={{
                                    OnChange: (e, objApplicationType) => {
                                        objContext.AddEditApplicationType_ModuleProcessor.HandleChange("t_Framework_ApplicationType_Data.vApplicationTypeName", e.target.value, objContext, objApplicationType["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditApplicationType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationType_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={props}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ApplicationGroupName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                className="text-input"
                                onKeyDown={(e) => objContext.AddEditApplicationType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationType_ModuleProcessor, objContext)}
                                onFocus={(e => { objContext.AddEditApplicationType_ModuleProcessor.ValidateFocus(objContext, 'vApplicationGroupName'); })}
                                id="vApplicationGroupName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditApplicationType_ModuleProcessor.HandleChange("vApplicationGroupName", e.target.value, objContext);
                                }}
                                value={state.objData["vApplicationGroupName"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'DisplayOrder')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                className="text-input"
                                onKeyDown={(e) => objContext.AddEditApplicationType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationType_ModuleProcessor, objContext)}
                                onFocus={(e => { objContext.AddEditApplicationType_ModuleProcessor.ValidateFocus(objContext, 'iDisplayOrder'); })}
                                id="iDisplayOrder"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditApplicationType_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext);
                                }}
                                value={state.objData["iDisplayOrder"]}
                            />
                        </div>
                    </div>
                   
                </div>

            </div>
            <div id="ValidationError" />
        </React.Fragment>
    );
};

export default AddEditApplicationType;