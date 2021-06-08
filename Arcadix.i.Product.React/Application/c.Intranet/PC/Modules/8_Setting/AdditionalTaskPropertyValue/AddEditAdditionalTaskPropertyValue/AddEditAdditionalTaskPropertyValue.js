import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import * as AddEditAdditionalTaskPropertyValueBusinessLogic from '@shared/Application/c.Intranet/Modules/8_Setting/AdditionalTaskPropertyValue/AddEditAdditionalTaskPropertyValue/AddEditAdditionalTaskPropertyValueBusinessLogic';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const AddEditAdditionalTaskPropertyValue = props => {

    const [state, dispatch] = useReducer(AddEditAdditionalTaskPropertyValueBusinessLogic.Reducer, AddEditAdditionalTaskPropertyValueBusinessLogic.GetInitialState());

    let objContext = { state, props, dispatch };

    /**
    * @param {*} objContext
    * @summary Setting up TabData and RibbonData
    */
    AddEditAdditionalTaskPropertyValueBusinessLogic.useInitializeRibbon(objContext);

    /**
    * @param {*} objContext
    * @summary Setting up Content Data
    */
    AddEditAdditionalTaskPropertyValueBusinessLogic.useInitializeTabs(objContext);
    
    /**
    * @param {*} objContext
    * @summary Setting up objData state
    */
   AddEditAdditionalTaskPropertyValueBusinessLogic.useInitializeData(objContext);

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
                    <span>{AddEditAdditionalTaskPropertyValueBusinessLogic.GetLanguageName(arrMultiLanguageTable, objMultiLanguage, objContext)}</span>

                    <input id={strColumnName}
                        className={state.objValidationMessages[strColumnName] && state.blnSaveClicked ? "text-input error-field" : "text-input"}
                        // className="text-input"
                        type="text"
                        onChange={(e) => {
                            AddEditAdditionalTaskPropertyValueBusinessLogic.HandleChange(strColumnName, e.target.value, objContext, objMultiLanguage["iLanguageId"])
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
                            <input className={state.objValidationMessages["iOrderId"] && state.blnSaveClicked ? "text-input error-field" : "text-input"} type="text" id="iOrderId"
                                onChange={(e) => {
                                    AddEditAdditionalTaskPropertyValueBusinessLogic.HandleChange("iOrderId", e.target.value, objContext)
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
                            {GetMultiLanguageInputs("t_TestDrive_Task_AdditionalTaskProperty_Value_Data.vAdditionalTaskPropertyValueText", objContext)}
                        </div>                        
                    </div>                
                </div>
             
                {
                    objContext.state.blnShowValidationMessage ?
                        <div className="col col-1">{AddEditAdditionalTaskPropertyValueBusinessLogic.GetValidationMessage(objContext)}</div> :
                        <React.Fragment />
                }
            </div>
            <div id="Audit" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Audit" ? "block" : "none") }}>
                {Localization.TextFormatter(objTextResource,'Audit')}
            </div>
        </React.Fragment>        
    );
}

export default connect(AddEditAdditionalTaskPropertyValueBusinessLogic.mapStateToProps)(AddEditAdditionalTaskPropertyValue)
