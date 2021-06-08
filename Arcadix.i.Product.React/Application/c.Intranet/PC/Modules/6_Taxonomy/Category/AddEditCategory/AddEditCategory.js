// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as AddEditCategory_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory_Hook';
import AddEditCategory_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory_ModuleProcessor';


/**
 * @name AddEditCategory
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditCategory = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditCategory_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditCategory_ModuleProcessor": new AddEditCategory_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditCategory_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditCategory_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;

    return (
        <React.Fragment>
            <div id="Category" className="tabcontent subject-management multilanguage-div">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Category')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vCategoryName",
                                    DependingTableName: "t_TestDrive_Category_Data",
                                    DisplayColumn: "vCategoryName",
                                    AutoFocus: true
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditCategory_ModuleProcessor.HandleChange("t_TestDrive_Category_Data.vCategoryName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditCategory_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategory_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'PopUpOrder')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditCategory_ModuleProcessor.ValidateFocus(objContext, 'iDisplayOrder'); })}
                                className="text-input"
                                id="iDisplayOrder"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditCategory_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                }}
                                onKeyDown={(e) => objContext.AddEditCategory_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategory_ModuleProcessor, objContext)}
                                value={state.objData["iDisplayOrder"]} />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpConceptAndSkills')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "tConceptAndSkills",
                                    DependingTableName: "t_TestDrive_Category_Data",
                                    DisplayColumn: "tConceptAndSkills"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditCategory_ModuleProcessor.HandleChange("t_TestDrive_Category_Data.tConceptAndSkills", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditCategory_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategory_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpClarificationNotes')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "tClarificationNotes",
                                    DependingTableName: "t_TestDrive_Category_Data",
                                    DisplayColumn: "tClarificationNotes"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditCategory_ModuleProcessor.HandleChange("t_TestDrive_Category_Data.tClarificationNotes", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditCategory_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategory_ModuleProcessor, objContext)
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
                            <span>{Localization.TextFormatter(objTextResource, 'CategoryKeyword')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditCategory_ModuleProcessor.ValidateFocus(objContext, 'vCategoryKeyword'); })}
                                className="text-input"
                                id="vCategoryKeyword"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditCategory_ModuleProcessor.HandleChange("vCategoryKeyword", e.target.value, objContext)
                                }}
                                onKeyDown={(e) => objContext.AddEditCategory_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategory_ModuleProcessor, objContext)}
                                value={state.objData["vCategoryKeyword"]} />
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </div>
        </React.Fragment>
    );
}

export default AddEditCategory;
