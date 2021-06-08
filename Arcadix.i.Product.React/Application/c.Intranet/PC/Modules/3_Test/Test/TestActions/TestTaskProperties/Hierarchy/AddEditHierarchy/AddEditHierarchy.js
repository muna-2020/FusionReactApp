//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditHierarchy_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/AddEditHierarchy/AddEditHierarchy_Hook';
import AddEditHierarchy_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/AddEditHierarchy/AddEditHierarchy_ModuleProcessor';

/**
* @name AddEditHierarchy.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditHierarchy = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditHierarchy_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditHierarchy_ModuleProcessor": new AddEditHierarchy_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditHierarchy_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        var objTextResources = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        return (
            <React.Fragment>
                <div className="testtaskproperty">
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "AufgabenName")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["PageName"] ? state.objData["PageName"] : "-"}
                                </span>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "PageTyp")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["PageType"] ? state.objData["PageType"] : "Test"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "AnswerMandatory")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsAnswerMandatory"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsAnswerMandatory"] == "Y"}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditHierarchy_ModuleProcessor.HandleChange("cIsAnswerMandatory", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "SubjectPath")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["SubjectName"] ? state.objData["SubjectName"] : "-"}
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "Subject")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["SubSubjectName"] ? state.objData["SubSubjectName"] : "_"}
                                </span>
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

export default AddEditHierarchy;