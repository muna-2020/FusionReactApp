//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditSchoolYear_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear_Hook';
import AddEditSchoolYear_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear_ModuleProcessor';

/**
* @name AddEditSchoolYear.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditSchoolYear = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditSchoolYear_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditSchoolYear_ModuleProcessor": new AddEditSchoolYear_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditSchoolYear_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="SchoolYear" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'SchoolYearManagement')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "SchoolYear")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    autoFocus
                                    id="iSchoolYear"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolYear_ModuleProcessor.HandleChange("iSchoolYear", e.target.value, objContext)
                                    }}
                                    value={state.objData["iSchoolYear"]}
                                    onKeyDown={(e) => objContext.AddEditSchoolYear_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolYear_ModuleProcessor, objContext)}
                                    onFocus={() => objContext.AddEditSchoolYear_ModuleProcessor.ValidateFocus(objContext, "iSchoolYear")}
                                />
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "SchoolYearName")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vSchoolYearName",
                                        DependingTableName: "t_TestDrive_Member_Class_SchoolYear_Data",
                                        DisplayColumn: "vSchoolYearName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditSchoolYear_ModuleProcessor.HandleChange("t_TestDrive_Member_Class_SchoolYear_Data.vSchoolYearName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditSchoolYear_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolYear_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "DisplayOrder")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iDisplayOrder"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolYear_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                    }}
                                    value={state.objData["iDisplayOrder"]}
                                    onKeyDown={(e) => objContext.AddEditSchoolYear_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolYear_ModuleProcessor, objContext)}
                                    onFocus={() => objContext.AddEditSchoolYear_ModuleProcessor.ValidateFocus(objContext, "iDisplayOrder")}
                                />
                            </div>
                        </div>
                    </div>

                </div>


                <div id="ValidationError"></div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditSchoolYear;