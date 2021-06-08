// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as AddEditCompetencyLevel_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/AddEditCompetencyLevel/AddEditCompetencyLevel_Hook';
import AddEditCompetencyLevel_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/AddEditCompetencyLevel/AddEditCompetencyLevel_ModuleProcessor';

/**
 * @name AddEditCompetencyLevel
 * @param {object} props props
 * @summary This component is used to Add/Edit the Competency Level data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditCompetencyLevel = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditCompetencyLevel_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditCompetencyLevel_ModuleProcessor": new AddEditCompetencyLevel_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditClientHostUrl_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditCompetencyLevel_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (

        <React.Fragment>
            <div id="CompetencyLevel" className="tabcontent subject-management multilanguage-div">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpOrder')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditCompetencyLevel_ModuleProcessor.ValidateFocus(objContext, 'iDisplayOrder'); })}
                                className="text-input"
                                id="iDisplayOrder"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditCompetencyLevel_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                }}
                                onKeyDown={(e) => objContext.AddEditCompetencyLevel_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCompetencyLevel_ModuleProcessor, objContext)}
                                value={state.objData["iDisplayOrder"]} />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'PopUpName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "cCompetencyLevel",
                                    DependingTableName: "t_testdrive_Category_Competency_CompetencyLevel_Data",
                                    DisplayColumn: "cCompetencyLevel"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditCompetencyLevel_ModuleProcessor.HandleChange("t_testdrive_Category_Competency_CompetencyLevel_Data.cCompetencyLevel", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditCompetencyLevel_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCompetencyLevel_ModuleProcessor, objContext)
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
};

export default AddEditCompetencyLevel;