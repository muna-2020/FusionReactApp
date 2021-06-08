import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import * as AddEditTestTaskPropertiesBusinessLogic from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties//AddEditTestTaskProperties/AddEditTestTaskPropertiesBusinessLogic';

const AddEditTestTaskProperties = props => {

    const [state, dispatch] = useReducer(AddEditTestTaskPropertiesBusinessLogic.Reducer, AddEditTestTaskPropertiesBusinessLogic.GetInitialState());

    let objContext = { state, props, dispatch };

    /**
    * @param {*} objContext
    * @summary Setting up TabData and RibbonData
    */
    //AddEditTestTaskPropertiesBusinessLogic.useInitializeRibbon(objContext);

    /**
    * @param {*} objContext
    * @summary Setting up Content Data
    */
    //AddEditTestTaskPropertiesBusinessLogic.useInitializeTabs(objContext);

    /**
    * @param {*} objContext
    * @summary Setting up objData state
    */
    //AddEditTestTaskPropertiesBusinessLogic.useInitializeData(objContext);

    return (
        <React.Fragment>
            <div id="Hierarchy" className="tabcontent subject-management">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{props.Data.objTextResource["AnswerMandatory"]}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsAnswerMandatory"
                                    name="check"
                                    type="checkbox"
                                    checked={state.objData["cIsAnswerMandatory"] && state.objData["cIsAnswerMandatory"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                    onChange={(e) => {
                                        AddEditTestTaskPropertiesBusinessLogic.HandleChange("cIsAnswerMandatory", e.target.value, objContext, "", e.target.checked)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                    <div className="col-item" />
                </div>
                {
                    objContext.state.blnShowValidationMessage ?
                        <div className="col col-1">{AddEditTestTaskPropertiesBusinessLogic.GetValidationMessage(objContext)}</div> :
                        <React.Fragment />
                }
            </div>
            <div id="Audit" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Audit" ? "block" : "none") }}>
                Audit
            </div>
        </React.Fragment>

    );
}

export default connect(AddEditTestTaskPropertiesBusinessLogic.mapStateToProps)(AddEditTestTaskProperties)
