// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditTip_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/Tip/AddEditTip/AddEditTip_ModuleProcessor';
import * as AddEditTip_Hook from '@shared/Application/c.Cockpit/Modules/Tip/AddEditTip/AddEditTip_Hook';


/**
 * @name AddEditTip
 * @param {object} props props
 * @summary This component is used to Add/Edit the Tip data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditTip = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditTip_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditTip_ModuleProcessor": new AddEditTip_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditTip_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditTip_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="Tip" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Tip')}
                </div>
                <div className="col col-2">

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'TipTitle')}</span>
                        </div>
                        <div className="row-right">
                            {/*
                            <input
                                onFocus={(e => { objContext.AddEditTip_ModuleProcessor.ValidateFocus(objContext, 't_TestDrive_Tip_Data.vTipTitle'); })}
                                className="text-input"
                                id="vTipTitle"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditTip_ModuleProcessor.HandleChange("vTipTitle", e.target.value, objContext);
                                }}
                                value={state.objData["vTipTitle"]}
                            /> */}
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vTipTitle",
                                    DependingTableName: "t_TestDrive_Tip_Data",
                                    DisplayColumn: "vTipTitle",
                                    AutoFocus: true
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditTip_ModuleProcessor.HandleChange("t_TestDrive_Tip_Data.vTipTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditTip_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTip_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Order')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditTip_ModuleProcessor.ValidateFocus(objContext, 'iOrder'); })}
                                className="text-input"
                                id="iOrder"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditTip_ModuleProcessor.HandleChange("iOrder", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditTip_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTip_ModuleProcessor, objContext)}
                                value={state.objData["iOrder"]}
                            />
                        </div>
                    </div>
                    

                </div>

                <div className="col col-2">

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
                                    SelectedValue: state.objData && state.objData["iApplicationTypeId"] != undefined ? state.objData["iApplicationTypeId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "iApplicationTypeId",
                                    DisplayColumn: "vApplicationName",
                                    DefaultOptionValue: -1,
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
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTip_ModuleProcessor.HandleDropDownChange("iApplicationTypeId", objChangeData, props, objContext),
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'TipDate')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditTip_ModuleProcessor.ValidateFocus(objContext, 'dtTipDate'); })}
                                placeholder="dd.mm.yyyy"
                                className="text-input"
                                id="dtTipDate"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditTip_ModuleProcessor.HandleChange("dtTipDate", e.target.value, objContext);
                                }}
                                value={state.objData["dtTipDate"]}
                            />
                        </div>
                    </div>

                </div>

                <div className="col col-2">
                    {props.ParentProps.ClientUserDetails.MainClientId == 0 ?
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'MainClient')}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iMainClientId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.MainClientData,
                                        SelectedValue: state.objData && state.objData["iMainClientId"] != undefined ? state.objData["iMainClientId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iMainClientId",
                                        DisplayColumn: "vMainClientIdentifier",
                                        DefaultOptionValue: -1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                        },
                                        JConfiguration: props.Resource.JConfiguration,
                                        SkinPath: props.Resource.SkinPath
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTip_ModuleProcessor.HandleDropDownChange("iMainClientId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditTip_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div> : ""}
                    

                    {
                        //<div className="col-item">
                        //    <div className="row-left">
                        //        <span>{Localization.TextFormatter(objTextResource, 'vDisplayPosition')}</span>
                        //    </div>
                        //    <div className="row-right">
                        //        <input
                        //            onFocus={(e => { objContext.AddEditTip_ModuleProcessor.ValidateFocus(objContext, 'vDisplayPosition'); })}
                        //            className="text-input"
                        //            id="vDisplayPosition"
                        //            type="text"
                        //            onChange={(e) => {
                        //                objContext.AddEditTip_ModuleProcessor.HandleChange("vDisplayPosition", e.target.value, objContext);
                        //            }}
                        //            value={state.objData["vDisplayPosition"]}
                        //        />
                        //    </div>
                        //</div>
                    }
                </div>


            </div>
            <div id="ValidationError" />
        </React.Fragment>

    );
};

export default AddEditTip;