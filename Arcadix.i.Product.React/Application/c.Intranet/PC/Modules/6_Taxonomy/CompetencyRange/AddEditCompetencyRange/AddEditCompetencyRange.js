// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as AddEditCompetencyRange_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/AddEditCompetencyRange/AddEditCompetencyRange_Hook';
import AddEditCompetencyRange_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/AddEditCompetencyRange/AddEditCompetencyRange_ModuleProcessor';

/**
 * @name AddEditCompetencyRange
 * @param {object} props props
 * @summary This component is used to Add/Edit the CompetencyRange data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditCompetencyRange = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditCompetencyRange_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditCompetencyRange_ModuleProcessor": new AddEditCompetencyRange_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditCompetencyRange_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditCompetencyRange_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="CompetencyRange" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'CompetencyRange')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpDisplaySequence')} :</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditCompetencyRange_ModuleProcessor.ValidateFocus(objContext, 'iDisplayOrder'); })}
                                id="iDisplayOrder"
                                className="text-input"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditCompetencyRange_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                }}
                                onKeyDown={(e) => objContext.AddEditCompetencyRange_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCompetencyRange_ModuleProcessor, objContext)}
                                value={state.objData["iDisplayOrder"]} />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpCycle')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vCompetencyRange",
                                    DependingTableName: "t_testdrive_Category_Competency_CompetencyRange_Data",
                                    DisplayColumn: "vCompetencyRange"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditCompetencyRange_ModuleProcessor.HandleChange("t_testdrive_Category_Competency_CompetencyRange_Data.vCompetencyRange", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditCompetencyRange_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCompetencyRange_ModuleProcessor, objContext)
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
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpIsPreselect')}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIspreselect"
                                    name="check"
                                    type="checkbox"
                                    checked={state.objData["cIspreselect"] && state.objData["cIspreselect"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                    onChange={(e) => {
                                        objContext.AddEditCompetencyRange_ModuleProcessor.HandleChange("cIspreselect", e.target.checked ? "Y" : "N", objContext)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ValidationError" ></div>
        </React.Fragment>
    );
}

export default AddEditCompetencyRange;
