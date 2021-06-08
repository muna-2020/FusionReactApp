// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditOnlineHelp_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp_ModuleProcessor';
import * as AddEditOnlineHelp_Hook from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp_Hook';

/**
 * @name AddEditOnlineHelp
 * @param {object} props props
 * @summary This component is used to Add/Edit the OnlineHelp data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditOnlineHelp = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditOnlineHelp_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditOnlineHelp_ModuleProcessor": new AddEditOnlineHelp_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditOnlineHelp_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditOnlineHelp_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="OnlineHelp" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'OnlineHelp')}
                </div>
                <div className="col col-2">

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'vHelpKey')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditOnlineHelp_ModuleProcessor.ValidateFocus(objContext, 'vHelpKey'); })}
                                className="text-input"
                                id="vHelpKey"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditOnlineHelp_ModuleProcessor.HandleChange("vHelpKey", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditOnlineHelp_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditOnlineHelp_ModuleProcessor, objContext)}
                                value={state.objData["vHelpKey"]}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'iApplicationTypeId')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iApplicationTypeId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.ApplicationTypeData,
                                    SelectedValue: state.objData["iApplicationTypeId"] != undefined && state.objData ? state.objData["iApplicationTypeId"] : -1
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
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditOnlineHelp_ModuleProcessor.HandleDropDownChange("iApplicationTypeId", objChangeData, props, objContext),
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'uHelpGroupId')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="uHelpGroupId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.HelpGroupData,
                                    SelectedValue: state.objData["uHelpGroupId"] != undefined && state.objData ? state.objData["uHelpGroupId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "uHelpGroupId",
                                    DisplayColumn: "vHelpGroupKey",
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
                                        return objNode["iMainClientId"] == objContext.state.objData["iMainClientId"] && objNode["iApplicationTypeId"] == objContext.state.objData["iApplicationTypeId"] ? true : false
                                    }
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditOnlineHelp_ModuleProcessor.HandleDropDownChange("uHelpGroupId", objChangeData, props, objContext),
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'vDisplayPosition')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditOnlineHelp_ModuleProcessor.ValidateFocus(objContext, 'vDisplayPosition'); })}
                                className="text-input"
                                id="vDisplayPosition"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditOnlineHelp_ModuleProcessor.HandleChange("vDisplayPosition", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditOnlineHelp_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditOnlineHelp_ModuleProcessor, objContext)}
                                value={state.objData["vDisplayPosition"]}
                            />
                        </div>
                    </div>

                </div>

                <div className="col col-2">

                    {
                        //<div className="col-item">
                        //<div className="row-left">
                        //    <span>{Localization.TextFormatter(objTextResource, 'iOrderId')}</span>
                        //</div>
                        //<div className="row-right">
                        //    <input
                        //        onFocus={(e => { objContext.AddEditOnlineHelp_ModuleProcessor.ValidateFocus(objContext, 'iOrderId'); })}
                        //        className="text-input"
                        //        id="iOrderId"
                        //        type="text"
                        //        onChange={(e) => {
                        //            objContext.AddEditOnlineHelp_ModuleProcessor.HandleChange("iOrderId", e.target.value, objContext);
                        //        }}
                        //        value={state.objData["iOrderId"]}
                        //    />
                        //</div>
                        //</div>
                    }

                   

                </div>


            </div>
            <div id="ValidationError" />
        </React.Fragment>

    );
};

export default AddEditOnlineHelp;