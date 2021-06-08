//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TabbedPopup_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_Hook';
import TabbedPopup_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_ModuleProcessor';
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";

/**
* @name TaskQuestion.
* @param {object} props props.
* @summary This component is used to Display TabbedPopup_Sample.
* @returns {object} React.Fragement that contains the content to be Displayed on popup.
*/
const TabbedPopup_Sample = props => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TabbedPopup_Sample_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TabbedPopup_Sample", ["TabbedPopup_Sample_ModuleProcessor"]: new TabbedPopup_Sample_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TabbedPopup_Sample_Hook, that contains all the custom hooks.
    * @returns null
    */
    TabbedPopup_Sample_Hook.Initialize(objContext);

    /**
* @name  InitializeSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.TabbedPopup_Sample_ModuleProcessor.Initialize(objContext, objContext.TabbedPopup_Sample_ModuleProcessor);


    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        return (
            <React.Fragment>
                <div id="Stammdaten" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "FirstTab" ? "block" : "none") }}>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span >{Localization.TextFormatter(props.Resource.Text, 'TextBoxColumn')}:</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="TextBoxColumn"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.TabbedPopup_Sample_ModuleProcessor.HandleChange("TextBoxColumn", e.target.value, objContext)
                                    }}
                                    value={state.objData["TextBoxColumn"]}
                                    onFocus={() => objContext.TabbedPopup_Sample_ModuleProcessor.ValidateFocus(objContext, "TextBoxColumn")}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span >{Localization.TextFormatter(props.Resource.Text, 'LabelColumn')}:</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.TabbedPopup_Sample_ModuleProcessor.ValidateFocus(objContext, 'LabelColumn'); })}
                                    id="LabelColumn"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.TabbedPopup_Sample_ModuleProcessor.HandleChange("LabelColumn", e.target.value, objContext)
                                    }}
                                    value={objContext.state.objData["LabelColumn"]} />
                            </div>
                        </div>
                    </div>
                    <div id="ValidationError"></div>
                </div>
                <div id="Extra" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "SecondTab" ? "block" : "none") }}>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(props.Resource.Text, 'TextBoxColumn')}:</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["TextBoxColumn"] ? state.objData["TextBoxColumn"] : "-"}
                                </span>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(props.Resource.Text, 'LabelColumn')}:</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["LabelColumn"] ? state.objData["LabelColumn"] : "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="ValidationError"></div>
                </div>
            </React.Fragment >
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );

}

export default connect(TabbedPopup_Sample_ModuleProcessor.StoreMapList())(TabbedPopup_Sample);
