// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as AddEditCategoryCompetency_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency_Hook';
import AddEditCategoryCompetency_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency_ModuleProcessor';

/**
 * @name AddEditCategoryCompetency
 * @param {object} props props
 * @summary This component is used to Add/Edit the CategoryCompetency data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditCategoryCompetency = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditCategoryCompetency_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditCategoryCompetency_ModuleProcessor": new AddEditCategoryCompetency_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditCategoryCompetency_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditCategoryCompetency_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;  
    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="CategoryCompetency" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'CategoryCompetency')}
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'PopUpOrder')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    autoFocus
                                    onFocus={(e => { objContext.AddEditCategoryCompetency_ModuleProcessor.ValidateFocus(objContext, 'iDisplayOrder'); })}
                                    className="text-input"
                                    id="iDisplayOrder"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditCategoryCompetency_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditCategoryCompetency_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategoryCompetency_ModuleProcessor, objContext)}
                                    value={state.objData["iDisplayOrder"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'PopUpId')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditCategoryCompetency_ModuleProcessor.ValidateFocus(objContext, 'vCompetencykeyword'); })}
                                    className="text-input"
                                    id="vCompetencykeyword"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditCategoryCompetency_ModuleProcessor.HandleChange("vCompetencykeyword", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditCategoryCompetency_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategoryCompetency_ModuleProcessor, objContext)}
                                    value={state.objData["vCompetencykeyword"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'PopUpCompetency')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "tCompetencyText",
                                        DependingTableName: "t_TestDrive_Category_Competency_Data",
                                        DisplayColumn: "tCompetencyText"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditCategoryCompetency_ModuleProcessor.HandleChange("t_TestDrive_Category_Competency_Data.tCompetencyText", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditCategoryCompetency_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCategoryCompetency_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </React.Fragment>
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
};

export default AddEditCategoryCompetency;
