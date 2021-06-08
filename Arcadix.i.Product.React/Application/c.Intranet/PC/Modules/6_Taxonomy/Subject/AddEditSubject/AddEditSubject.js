//React related imports.
import React, { useReducer } from 'react';

//Components used.
import HierarchicalDropDown from "@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown";

//Module related files.
import * as AddEditSubject_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubject_Hook';
import AddEditSubject_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubject_ModuleProcessor';
import * as AddEditSubjectBusinessLogic from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubjectBusinessLogic';

/**
* @name AddEditLanguage.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditSubject = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditSubject_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditSubject_ModuleProcessor": new AddEditSubject_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditSubject_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="SubjectManagementMain" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "SubjectManagementMain" ? "block" : "none") }}>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "SubjectId")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["iSubjectId"] ? state.objData["iSubjectId"] : "-"}
                                </span>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "KeyForImage")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input" type="text" id="vKeyForImage"
                                    onChange={(e) => {
                                        objContext.AddEditSubject_ModuleProcessor.HandleChange("vKeyForImage", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditSubject_ModuleProcessor.ValidateFocus(objContext, "vKeyForImage")}
                                    onKeyDown={(e) => objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)}
                                    value={state.objData["vKeyForImage"]} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "ParentSubjectId")}</span>
                            </div>
                            <div className="row-right">
                                {props.Data.blnIsEdit ?
                                    <span>{props.Data.strParentSubjectName}</span>
                                    :
                                    <HierarchicalDropDown
                                        Id="AddEditSubject_HierarchicalDropDown"
                                        Data={{
                                            HierarchicalDropdownData: props.Data.DropDownData,
                                            SelectedValue: state.objData.iParentSubjectId
                                        }}
                                        Meta={{
                                            ValueColumn: "iSubjectId",
                                            ParentId: 'iParentSubjectId',
                                            DisplayColumn: "vSubjectName",
                                            DependingTableName: "t_TestDrive_Subject_Data",
                                            IsLanguageDependent: "Y",
                                            Root: -2,
                                            DefaultOptionValue: -1, //Pass the id of the default option text      
                                            ShowDefaultOption: true,
                                        }}
                                        Events={{
                                            OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.AddEditSubject_ModuleProcessor.HandleChange("iParentSubjectId", objChangeData["iSubjectId"], objContext)
                                        }}
                                        CallBacks={{
                                            OnBeforeShowNode: (objNode) => objNode["cIsDeleted"] == "N" ? objNode : null
                                        }}
                                        Resource={{
                                            SkinPath: JConfiguration.IntranetSkinPath,
                                            Text: objTextResource["PleaseChoose"]
                                        }}
                                        ParentProps={props}
                                    />
                                }
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "SubjectName")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vSubjectName",
                                        DependingTableName: "t_TestDrive_Subject_Data",
                                        DisplayColumn: "vSubjectName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleChange("t_TestDrive_Subject_Data.vSubjectName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)
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
                                        objContext.AddEditSubject_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                    }}
                                    value={state.objData["iDisplayOrder"]}
                                    onKeyDown={(e) => objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)}
                                    onFocus={() => objContext.AddEditSubject_ModuleProcessor.ValidateFocus(objContext, "iDisplayOrder")}
                                />
                            </div>
                        </div>
                        <div className="col-item" />
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "IsActive")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsActive"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsActive"] == "Y"}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleChange("cIsActive", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item" />
                    </div>
                </div>
                <div id="SubjectManagementDetails" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "SubjectManagementDetails" ? "block" : "none") }} >
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "PopupDisplayName")}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vSubjectDisplayName",
                                        DependingTableName: "t_TestDrive_Subject_Data",
                                        DisplayColumn: "vSubjectDisplayName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleChange("t_TestDrive_Subject_Data.vSubjectDisplayName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "PopupShortName")}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vSubjectShortName",
                                        DependingTableName: "t_TestDrive_Subject_Data",
                                        DisplayColumn: "vSubjectShortName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleChange("t_TestDrive_Subject_Data.vSubjectShortName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "PopupIsTested")}</span></div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsTestedAtThisTime"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsTestedAtThisTime"] == "Y"}
                                        onChange={(e) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleChange("cIsTestedAtThisTime", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" /></label>
                            </div>
                        </div>
                    </div>
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "PopupDescription")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "tSubjectDescription",
                                        DependingTableName: "t_TestDrive_Subject_Data",
                                        DisplayColumn: "tSubjectDescription",
                                        OpenChildNodes: true
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleChange("t_TestDrive_Subject_Data.tSubjectDescription", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                    {objContext.state.blnShowValidationMessage ? <div className="col col-1">{AddEditSubjectBusinessLogic.GetValidationMessage(objContext)}</div> : <React.Fragment />}
                </div>
                <div id="AdaptiveDetails" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "AdaptiveDetails" ? "block" : "none") }} >
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Constance")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="dConstance"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSubject_ModuleProcessor.HandleChange("dConstance", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditSubject_ModuleProcessor.ValidateFocus(objContext, "dConstance")}
                                    onKeyDown={(e) => objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)}
                                    value={state.objData["dConstance"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Variance")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="dVariance"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSubject_ModuleProcessor.HandleChange("dVariance", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditSubject_ModuleProcessor.ValidateFocus(objContext, "dVariance")}
                                    onKeyDown={(e) => objContext.AddEditSubject_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSubject_ModuleProcessor, objContext)}
                                    value={state.objData["dVariance"]} />
                            </div>
                        </div>
                    </div>
                    {objContext.state.blnShowValidationMessage ? <div className="col col-1">{AddEditSubjectBusinessLogic.GetValidationMessage(objContext)}</div> : <React.Fragment />}
                </div>
                <div id="Audit" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Audit" ? "block" : "none") }}>
                    Audit
                </div>
                <div id="ValidationError"></div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditSubject;