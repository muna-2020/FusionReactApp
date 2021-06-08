// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as  AddEditAdditionalPropertyValue_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue_Hook';
import AddEditAdditionalPropertyValue_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue_ModuleProcessor';

/**
 * @name AdditionalPropertyValue
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in pop up required for add/edit.
 */
const AdditionalPropertyValue = props => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditAdditionalPropertyValue_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditAdditionalPropertyValue_ModuleProcessor": new AddEditAdditionalPropertyValue_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditCategory_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditAdditionalPropertyValue_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;


    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="AdditionalPropertyValue" className="tabcontent subject-management multilanguage-div">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'vAdditionalPropertyValue')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Order')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    autoFocus
                                    onFocus={(e => { objContext.AddEditAdditionalPropertyValue_ModuleProcessor.ValidateFocus(objContext, 'OrderId'); })}
                                    className="text-input"
                                    id="iOrderId"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditAdditionalPropertyValue_ModuleProcessor.HandleChange("iOrderId", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditAdditionalPropertyValue_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditAdditionalPropertyValue_ModuleProcessor, objContext)}
                                    value={state.objData["iOrderId"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left" style={{ flex: "0 0 50%" }} >
                                <span >{Localization.TextFormatter(objTextResource, 'vAdditionalPropertyValue')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vAdditionalTaskPropertyValueText",
                                        DependingTableName: "t_TestDrive_Task_AdditionalTaskProperty_Value_Data",
                                        DisplayColumn: "vAdditionalTaskPropertyValueText"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditAdditionalPropertyValue_ModuleProcessor.HandleChange("t_TestDrive_Task_AdditionalTaskProperty_Value_Data.vAdditionalTaskPropertyValueText", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditAdditionalPropertyValue_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditAdditionalPropertyValue_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div id="ValidationError"></div>
                </div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

}

export default AdditionalPropertyValue;