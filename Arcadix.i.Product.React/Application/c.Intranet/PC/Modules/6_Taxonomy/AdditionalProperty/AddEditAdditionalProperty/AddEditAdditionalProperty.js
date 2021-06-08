// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as  AddEditAdditionalProperty_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty_Hook';
import AddEditAdditionalProperty_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty_ModuleProcessor';

/**
 * @name AdditionalProperty
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AdditionalProperty = props => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditAdditionalProperty_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditAdditionalProperty_ModuleProcessor": new AddEditAdditionalProperty_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditCategory_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditAdditionalProperty_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;


    const GetContent = () => {
        let objSelectedValuesforDropDown = objContext.AddEditAdditionalProperty_ModuleProcessor.GetSelectedValuesforDropDown(objContext);
        let objMultiselectData = {
            MultiSelectDropdownData: props.Data.MultiselectDropdownData.TargetGroup,
            SelectedItems: objSelectedValuesforDropDown["arrMultiselectDropDownValue"]
        };
        if (objSelectedValuesforDropDown["arrMultiselectDropDownValue"].length == 0) {
            objMultiselectData = {
                MultiSelectDropdownData: props.Data.MultiselectDropdownData.TargetGroup,
            }
        }
        return (
            <React.Fragment>
                <div id="AdditionalProperty" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'AdditionalProperty')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Order')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    autoFocus
                                    onFocus={(e => { objContext.AddEditAdditionalProperty_ModuleProcessor.ValidateFocus(objContext, 'OrderId'); })}
                                    className="text-input"
                                    id="iOrderId"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditAdditionalProperty_ModuleProcessor.HandleChange("iOrderId", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditAdditionalProperty_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditAdditionalProperty_ModuleProcessor, objContext)}
                                    value={state.objData["iOrderId"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span >{Localization.TextFormatter(objTextResource, 'vAdditionalProperty')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vAdditionalProperty",
                                        DependingTableName: "t_TestDrive_Task_AdditionalTaskProperty_Data",
                                        DisplayColumn: "vAdditionalTaskProperty"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditAdditionalProperty_ModuleProcessor.HandleChange("t_TestDrive_Task_AdditionalTaskProperty_Data.vAdditionalTaskProperty", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditAdditionalProperty_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditAdditionalProperty_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "IsAnswerMandatory")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsAnswerMandatory"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsAnswerMandatory"] == "Y"}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditAdditionalProperty_ModuleProcessor.HandleChange("cIsAnswerMandatory", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item" />
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span >{Localization.TextFormatter(objTextResource, 'Dependency')}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iSubjectId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.TargetGroup,
                                        SelectedValue: objSelectedValuesforDropDown["intDefaultDropDownSelectedValue"] ? objSelectedValuesforDropDown["intDefaultDropDownSelectedValue"] : -1
                                    }}
                                    Meta={{
                                        ValueColumn: "iAdditionalPropertyDependencyId",
                                        DisplayColumn: "vDependencyName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultOptionText")
                                        },
                                        JConfiguration: props.JConfiguration,
                                        SkinPath: props.JConfiguration.IntranetSkinPath
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditAdditionalProperty_ModuleProcessor.HandleDropDownChange("iDependencyId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditAdditionalProperty_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span >{Localization.TextFormatter(objTextResource, 'Subject')}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"MultiSelectDropdown"}
                                    Id="MultiSelectDropDown"
                                    Meta={{
                                        DisplayColumn: 'vSubjectName',
                                        ValueColumn: 'iSubjectId',
                                        IsLanguageDependent: "Y",
                                        DependingTableName: "t_TestDrive_Subject_Data",
                                        ShortNameColumn: "vSubjectShortName",
                                        DefaultOptionValue: -1,
                                        ShowDefaultOption: true,
                                        DefaultOptionTextKey: 'DefaultOptionText'
                                    }}
                                    Data={objMultiselectData}
                                    Resource={{
                                        SkinPath: JConfiguration.IntranetSkinPath,
                                        Text: objTextResource
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (arrItem) => objContext.AddEditAdditionalProperty_ModuleProcessor.HandleMultiSelectDropDownChange("iSubjectId", arrItem, props, objContext, props.Data.MultiselectDropdownData.AdditionalPropertySubjectTable)
                                    }}
                                    CallBacks={{
                                        CheckDeletedDropDownData: (objItem) => {
                                            return objItem["cIsDeleted"] == "N" && objItem["iParentSubjectId"] == "0" ? true : false
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

export default AdditionalProperty;