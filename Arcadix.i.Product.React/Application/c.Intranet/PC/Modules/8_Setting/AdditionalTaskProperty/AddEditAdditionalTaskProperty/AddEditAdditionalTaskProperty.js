import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import * as AddEditAdditionalTaskPropertyBusinessLogic from '@shared/Application/c.Intranet/Modules/8_Setting/AdditionalTaskProperty/AddEditAdditionalTaskProperty/AddEditAdditionalTaskPropertyBusinessLogic';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const AdditionalTaskProperty = props => {

    const [state, dispatch] = useReducer(AddEditAdditionalTaskPropertyBusinessLogic.Reducer, AddEditAdditionalTaskPropertyBusinessLogic.GetInitialState());

    let objContext = { state, props, dispatch };

    /**
    * @param {*} objContext
    * @summary Setting up TabData and RibbonData
    */
    AddEditAdditionalTaskPropertyBusinessLogic.useInitializeRibbon(objContext);

    /**
    * @param {*} objContext
    * @summary Setting up Content Data
    */
    AddEditAdditionalTaskPropertyBusinessLogic.useInitializeTabs(objContext);
    
    /**
    * @param {*} objContext
    * @summary Setting up objData state
    */
   AddEditAdditionalTaskPropertyBusinessLogic.useInitializeData(objContext);

    let objTextResource = props.Data.objTextResource;
    /**
     * JSX for multi language inputs
     */
    const GetMultiLanguageInputs = (strColumnName, objContext) => {
        let strTableName = strColumnName.split('.')[0];
        let strMultiLanguageKey = strColumnName.split('.')[1];
        var arrMultiLanguageTable = state.objData[strTableName];
        let domMultiLanguageInputs = [];
        
        if (arrMultiLanguageTable) {
            arrMultiLanguageTable.map((objMultiLanguage) => {
                domMultiLanguageInputs = [...domMultiLanguageInputs,
                <div className="language">
                    <span>{AddEditAdditionalTaskPropertyBusinessLogic.GetLanguageName(arrMultiLanguageTable, objMultiLanguage, objContext)}</span>
                        <input id={strColumnName}
                        className={state.objValidationMessages[strColumnName] && state.blnSaveClicked ? "text-input error-field" : "text-input"}
                        // className="text-input"
                        type="text"
                        onChange={(e) => {
                            AddEditAdditionalTaskPropertyBusinessLogic.HandleChange(strColumnName, e.target.value, objContext, objMultiLanguage["iLanguageId"])
                        }}
                        value={objMultiLanguage[strMultiLanguageKey]} />
                </div>
                ];
            })
        }        
        return domMultiLanguageInputs;
    }
    
    return (
        <React.Fragment>
            <div id="General" className="tabcontent subject-management">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'Order')}</span>
                        </div>
                        <div className="row-left">
                                <input className={state.objValidationMessages["iOrderId"] && state.blnSaveClicked ? "text-input error-field" : "text-input"}  type="text" id="iOrderId"
                                onChange={(e) => {
                                    AddEditAdditionalTaskPropertyBusinessLogic.HandleChange("iOrderId", e.target.value, objContext)
                                }}
                                value={state.objData["iOrderId"]} />                   
                        </div>                        
                    </div>   
                </div>  
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'Value')}</span>
                        </div>
                        <div className="row-left">
                            {GetMultiLanguageInputs("t_TestDrive_Task_AdditionalTaskProperty_Data.vAdditionalTaskProperty", objContext)}
                        </div>                        
                    </div>                
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,"AnswerMandatory")}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsAnswerMandatory" 
                                    name="check"
                                    type="checkbox"
                                    checked={state.objData["cIsAnswerMandatory"] && state.objData["cIsAnswerMandatory"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                    onChange={(e) => {
                                        AddEditAdditionalTaskPropertyBusinessLogic.HandleChange("cIsAnswerMandatory", e.target.value, objContext, "", e.target.checked)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                    <div className="col-item" />
                </div>
                {
                    objContext.state.blnShowValidationMessage ? 
                    <div className="col col-1">{AddEditAdditionalTaskPropertyBusinessLogic.GetValidationMessage(objContext)}</div> :
                     <React.Fragment />}
            </div>
            <div id="Audit" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Audit" ? "block" : "none") }}>
                {Localization.TextFormatter(objTextResource,"Audit")}
            </div>
        </React.Fragment>        
    );
}

export default connect(AddEditAdditionalTaskPropertyBusinessLogic.mapStateToProps)(AdditionalTaskProperty)
