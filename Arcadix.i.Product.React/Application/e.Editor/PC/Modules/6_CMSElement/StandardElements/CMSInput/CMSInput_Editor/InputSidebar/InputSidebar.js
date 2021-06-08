//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as InputSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/InputSidebar/InputSidebar_Hooks';
import InputSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/InputSidebar/InputSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application State classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name InputSidebar
 * @param {object} props props from parent
 * @param {reference} ref ref to component
 * @summary InputSidebar's.
 * @returns {component} InputSidebar
 */
const InputSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, InputSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["InputSidebar_ModuleProcessor"]: new InputSidebar_ModuleProcessor() };

    /**
     * @name InputSidebar_Hooks.Initialize
     * @summary Initialize method call in InputSidebar_Hooks, that contains all the custom hooks.
     */
    InputSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.InputSidebar_ModuleProcessor.Initialize(objContext, objContext.InputSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSInput/InputSidebar", objContext.props);
        let blnValidWidth = state.ElementJson["vElementJson"]["iWidthInPixel"] && parseInt(state.ElementJson["vElementJson"]["iWidthInPixel"]) >= 10 ? true : false;
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = false;
        if (EditorRef) {
            blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        }
        return (
            <div className="overlay-textarea-flex">
                <div className="text-field-sidebar">
                    <h3>
                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "GeneralAttributesHeading")}
                    </h3>
                    <div className="check-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CaseAttributeCheckBoxLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="checkbox"
                                disabled={state.blnIsNumberOnlyBox ? true : false}
                                checked={state.blnIsNumberOnlyBox ? false : state.ElementJson["vElementJson"]["cIsCaseSensitive"] === "Y" ? true : false}
                                onChange={(event) => { objContext.InputSidebar_ModuleProcessor.OnCaseChange(objContext); }} />
                            <span>
                                {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CaseAttributeCheckBoxValue")}
                            </span>
                        </div>
                    </div>

                    <div className="check-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NumberAttributeCheckBoxLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="checkbox"
                                disabled={state.blnIsLetterOnlyBox || state.blnIsWordOnlyBox || state.blnIsNumberOnlyBox ? true : false}
                                checked={state.blnIsWordOnlyBox ? false : state.blnIsNumberOnlyBox || state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ? true : false}
                                onChange={(event) => { objContext.InputSidebar_ModuleProcessor.OnNumberOnlyChange(objContext); }} />
                        </div>
                    </div>
                    {
                        blnIsPointOverride ?
                            <React.Fragment>
                                <div className="check-flex">
                                    <div className="flex-left">
                                        <span>
                                            {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NotAnsweredLabel")}
                                        </span>
                                    </div>
                                    <div className="flex-right">
                                        <input
                                            type="text"
                                            value={state.NAFieldValue}
                                            onChange={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.OnNAInputChange(objContext, event.target.value); }} />
                                    </div>
                                </div>

                                <div className="check-flex">
                                    <div className="flex-left">
                                        <span>
                                            {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "WrongAnswerLabel")}
                                        </span>
                                    </div>
                                    <div className="flex-right">
                                        <input
                                            type="text"
                                            value={state.WAFieldValue}
                                            onChange={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.OnWAInputChange(objContext, event.target.value); }} />
                                    </div>
                                </div>

                                <div className="check-flex">
                                    <div className="flex-left">
                                        <span>
                                            {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CorrectAnswerLabel")}
                                        </span>
                                    </div>
                                    <div className="flex-right">
                                        <input
                                            type="text"
                                            value={state.CAFieldValue}
                                            onChange={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.OnCAInputChange(objContext, event.target.value); }} />
                                    </div>
                                </div>
                            </React.Fragment> : ""
                    }
                    <h3>
                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "EnterPossibleValuesAttributesHeading")}
                    </h3>
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueAttributeInputLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="text"
                                className={state.Errors["ValueError"] ? "border-red" : ""}
                                value={state.ValueFieldValue}
                                onChange={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.OnValueInputChange(objContext, event.target.value); }} />
                        </div>
                    </div>
                    <div className="text-flex">
                        <div className="flex-left" />
                        <div className="flex-right">
                            {
                                state.Errors["ValueError"] !== "" ?
                                    <span className="error-message">
                                        {state.Errors["ValueError"]}
                                    </span> : <span />
                            }
                        </div>
                    </div>
                    {
                        state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ?
                            <div className="text-flex">
                                <div className="flex-left">
                                    <span>
                                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ToleranceAttributeInputLabel")}
                                    </span>
                                </div>
                                <div className="flex-right">
                                    <input type="text" value={state.ToleranceFieldValue}
                                        onChange={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.OnToleranceInputChange(objContext, event.target.value); }} />
                                </div>
                            </div>
                            : ""
                    }
                    <div className="button-right">
                        {
                            state.ShowCancelButton ?
                                <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.InputSidebar_ModuleProcessor.HideCancelButton(objContext); }} className="btn">
                                    {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CancelButtonText")}
                                </button> : ""
                        }
                        {
                            state.iElementInputValueId ?
                                <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.InputSidebar_ModuleProcessor.UpdateValue(objContext); }} className="btn">
                                    {
                                        objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValuesUpdateButtonText")
                                    }
                                </button> :
                                <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.InputSidebar_ModuleProcessor.AddValue(objContext); }} className="btn">
                                    {
                                        objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValuesAddButtonText")
                                    }
                                </button>
                        }
                    </div>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr style={{ textAlign: "left" }}>
                                <th>
                                    {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValuesColumnLabel")}
                                </th>
                                <th style={{ textAlign: "center" }}>
                                    {
                                        state.ElementJson && state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ? objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "TolearanceColumnLabel") : ""
                                    }
                                </th>
                                <th style={{ width: "50px" }}>
                                    {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueActionColumnHeading")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.ElementJson["vElementJson"]["Values"].length > 0 ?
                                    state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                                        let strCLassName = "";
                                        if (objContext.state.Errors["ListError"].length > 0 && objContext.state.Errors["ListError"].filter(strValueId => strValueId === objTempValue["iElementInputValueId"]).length > 0) {
                                            strCLassName += " border-red";
                                        }
                                        return (
                                            <tr key={objTempValue["iElementInputValueId"]} className={"background-gray" + strCLassName}
                                                onClick={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.SetValuesForUpdate(objContext, objTempValue); }}>
                                                <td>
                                                    {objTempValue["vText"]}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {objTempValue["dTolerance"]}
                                                </td>
                                                <td style={{ textAlign: "center" }}
                                                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.InputSidebar_ModuleProcessor.RemoveValue(objContext, objTempValue); }}>
                                                    <span className="cross" style={{ cursor: "pointer" }}>
                                                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueDeleteButtonText")}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    <tr>
                                        <td colSpan="3">
                                            <p className="text-center error-message">
                                                {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NoValueEnteredYet")}
                                            </p>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                    {
                        state.Errors["ListError"].length > 0 ?
                            <div className="text-flex">
                                <div className="flex-left" />
                                <div className="flex-right">
                                    <span className="error-message">
                                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NonNumericValuesError")}
                                    </span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <h3>
                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "DisplayHeadingText")}
                    </h3>
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "WidthAttributeLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="text"
                                className={!blnValidWidth ? "border-red" : ""}
                                value={state.ElementJson["vElementJson"]["iWidthInPixel"]}
                                onChange={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.ChangeWidth(objContext, event.target.value); }} />
                        </div>
                    </div>
                    {
                        !blnValidWidth ?
                            <div className="text-flex">
                                <div className="flex-left" />
                                <div className="flex-right">
                                    <span className="error-message">
                                        {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "MinWidthError")}
                                    </span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <div className="button-right">
                        <button
                            className="btn"
                            disabled={state.ElementJson["vElementJson"]["Values"].length > 0 ? false : true}
                            onClick={(event) => { event.preventDefault(); objContext.InputSidebar_ModuleProcessor.Save(objContext); }}>
                            {objContext.InputSidebar_ModuleProcessor.TextFormatter(objTextResource, "AttributesSaveButtonText")}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(InputSidebar_ModuleProcessor.StoreMapList()))(InputSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = InputSidebar_ModuleProcessor; 
