//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as MultiInputSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/MultiInputSidebar/MultiInputSidebar_Hooks';
import MultiInputSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/MultiInputSidebar/MultiInputSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application State classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name MultiInputSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary MultiInputSidebar's.
 * @returns {any} MultiInputSidebar
 */
const MultiInputSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, MultiInputSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["MultiInputSidebar_ModuleProcessor"]: new MultiInputSidebar_ModuleProcessor() };

    /**
     * @name MultiInputSidebar_Hooks.Initialize
     * @summary Initialize method call in MultiInputSidebar_Hooks, that contains all the custom hooks.
     */
    MultiInputSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MultiInputSidebar_ModuleProcessor.Initialize(objContext, objContext.MultiInputSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar", objContext.props);
        let blnValidWidth = state.ElementJson["vElementJson"]["iWidthInPixel"] && parseInt(state.ElementJson["vElementJson"]["iWidthInPixel"]) >= 10 ? true : false;
        let arrDropdownData = objContext.MultiInputSidebar_ModuleProcessor.GetDropdownData(objContext);
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = false;
        if (EditorRef) {
            blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        }
        return (
            <div className="overlay-textarea-flex">
                <div className="text-field-sidebar">
                    <h3>
                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "GeneralAttributesHeading")}
                    </h3>
                    <div className="check-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CaseAttributeCheckBoxLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="checkbox"
                                disabled={state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ? true : false}
                                checked={state.ElementJson["vElementJson"]["cIsCaseSensitive"] === "Y" ? true : false}
                                onChange={(event) => { objContext.MultiInputSidebar_ModuleProcessor.OnCaseChange(objContext); }} />
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CaseAttributeCheckBoxValue")}
                            </span>
                        </div>
                    </div>
                    <div className="check-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NumberAttributeCheckBoxLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="checkbox"
                                disabled={state.ElementJson["vElementJson"]["cIsCaseSensitive"] === "Y" ? true : false}
                                checked={state.ElementJson && state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ? true : false}
                                onChange={(event) => { objContext.MultiInputSidebar_ModuleProcessor.OnNumberOnlyChange(objContext); }} />
                        </div>
                    </div>
                    {
                        blnIsPointOverride ?
                            <React.Fragment>
                                <div className="check-flex">
                                    <div className="flex-left">
                                        <span>
                                            {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NotAnsweredLabel")}
                                        </span>
                                    </div>
                                    <div className="flex-right">
                                        <input
                                            type="text"
                                            value={state.NAFieldValue}
                                            onInput={(event) => { event.stopPropagation(); event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.OnNAInputChange(objContext, event.target.value); }} />
                                    </div>
                                </div>
                                <div className="check-flex">
                                    <div className="flex-left">
                                        <span>
                                            {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "WrongAnswerLabel")}
                                        </span>
                                    </div>
                                    <div className="flex-right">
                                        <input
                                            type="text"
                                            value={state.WAFieldValue}
                                            onInput={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.OnWAInputChange(objContext, event.target.value); }} />
                                    </div>
                                </div>
                            </React.Fragment> : ""
                    }
                    <h3>
                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "EnterPossibleValuesAttributesHeading")}
                    </h3>
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueAttributeInputLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="text"
                                className={state.Errors["ValueError"] ? "border-red" : ""}
                                value={state.ValueFieldValue}
                                onChange={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.OnValueInputChange(objContext, event.target.value); }} />
                        </div>
                    </div>
                    {
                        blnIsPointOverride ?
                            <div className="text-flex">
                                <div className="flex-left">
                                    <span>
                                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CorrectAnswerLabel")}
                                    </span>
                                </div>
                                <div className="flex-right">
                                    <input
                                        type="text"
                                        value={state.CAFieldValue}
                                        onInput={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.OnCAInputChange(objContext, event.target.value); }} />
                                </div>
                            </div> : ""
                    }
                    {
                        state.Errors["ValueError"] !== "" ?
                            <div className="text-flex">
                                <div className="flex-left" />
                                <div className="flex-right">
                                    <span className="error-message">
                                        {state.Errors["ValueError"]}
                                    </span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    {
                        state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ?
                            <div className="text-flex">
                                <div className="flex-left">
                                    <span>
                                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ToleranceAttributeInputLabel")}
                                    </span>
                                </div>
                                <div className="flex-right">
                                    <input
                                        type="text"
                                        value={state.ToleranceFieldValue}
                                        onChange={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.OnToleranceInputChange(objContext, event.target.value); }} />
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <div className="button-right">
                        {
                            state.ShowCancelButton ?
                                <button
                                    className="btn"
                                    onClick={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.HideCancelButton(objContext); }}>
                                    {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CancelButtonText")}
                                </button> : ""
                        }
                        {
                            state.iElementMultiInputValueId ?
                                <button className="btn" onClick={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.UpdateValue(objContext); }}>
                                    {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValuesUpdateButtonText")}
                                </button>
                                :
                                <button className="btn" onClick={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.AddValue(objContext); }}>
                                    {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValuesAddButtonText")}
                                </button>
                        }
                    </div>
                    <div className="value-div">
                        <table style={{ width: "100%" }}>
                            <tr style={{ textAlign: "left" }}>
                                <th>
                                    {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValuesColumnLabel")}
                                </th>
                                {
                                    state.ElementJson && state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ?
                                        <th style={{ textAlign: "center" }}>
                                            {
                                                objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "TolearanceColumnLabel")
                                            }
                                        </th> : ""
                                }

                                <th style={{ width: "50px" }}>
                                    {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "CorrectAnswerColumnLabel")}
                                </th>
                                <th style={{ width: "50px" }}>
                                    {/* {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ActionColumnLabel")} */}
                                </th>
                            </tr>
                            {
                                state.ElementJson["vElementJson"]["Values"].length > 0 ?
                                    state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                                        let strCLassName = "background-gray";
                                        if (objContext.state.Errors["ListError"].length > 0 && objContext.state.Errors["ListError"].filter(strValueId => strValueId === objTempValue["iElementMultiInputValueId"]).length > 0) {
                                            strCLassName += " border-red";
                                        }
                                        return (
                                            <tr
                                                key={objTempValue["iElementMultiInputValueId"]}
                                                className={strCLassName}
                                                onClick={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.SetValuesForUpdate(objContext, objTempValue); }}>
                                                <td style={{ border: "none" }}>
                                                    {objTempValue["vText"]}
                                                </td>
                                                {
                                                    state.ElementJson && state.ElementJson["vElementJson"]["cIsNumber"] === "Y" ?
                                                        <td style={{ textAlign: "center", border: "none" }}>
                                                            {objTempValue["dTolerance"]}
                                                        </td> : ""
                                                }
                                                <td style={{ textAlign: "center", border: "none" }}>
                                                    {objTempValue["dCorrectPoint"]}
                                                </td>
                                                <td style={{ textAlign: "center", border: "none" }}>
                                                    <span
                                                        className="cross"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(event) => {
                                                            event.preventDefault(); event.stopPropagation(); objContext.MultiInputSidebar_ModuleProcessor.RemoveValue(objContext, objTempValue);
                                                        }}>
                                                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueDeleteButtonText")}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    <tr>
                                        <td colSpan="3">
                                            <p className="text-center">
                                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NoValueEnteredYet")}
                                            </p>
                                        </td>
                                    </tr>
                            }
                        </table>
                    </div>
                    {
                        state.Errors["ListError"].length > 0 ?
                            <div className="text-flex">
                                <div className="flex-left" />
                                <div className="flex-right">
                                    <span className="error-message">
                                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "NonNumericValuesError")}
                                    </span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    {
                        state.ElementJson["vElementJson"]["Values"].length === 0 ?
                            <div className="text-flex">
                                <div className="flex-left" />
                                <div className="flex-right">
                                    <span className="error-message">
                                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "EmptyValuesError")}
                                    </span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <h3>
                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "DisplayHeadingText")}
                    </h3>
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "UnitOfMeasurementLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="text"
                                value={state.ElementJson["vElementJson"]["vMeasurementUnit"]}
                                onChange={(event) => { objContext.MultiInputSidebar_ModuleProcessor.ChangeUnitOfMeasurementInput(objContext, event.target.value); }} />
                        </div>
                    </div>
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "PlacementLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="radio"
                                className="multiinputsidebar-placement-radio"
                                checked={state.ElementJson["vElementJson"]["cHasMeasurementPrefix"] === "Y" ? true : false}
                                onChange={(event) => { objContext.MultiInputSidebar_ModuleProcessor.ChangeMeasurementPrefixSelection(objContext); }} />
                            {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "BeforeCheckBoxLabel")}
                            <input
                                type="radio"
                                className="multiinputsidebar-placement-radio"
                                checked={state.ElementJson["vElementJson"]["cHasMeasurementPrefix"] === "N" ? true : false}
                                onChange={(event) => { objContext.MultiInputSidebar_ModuleProcessor.ChangeMeasurementPrefixSelection(objContext); }} />
                            {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "AfterCheckBoxLabel")}
                        </div>
                    </div>
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "WidthAttributeLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <input
                                type="text"
                                className={!blnValidWidth ? "border-red" : ""}
                                value={state.ElementJson["vElementJson"]["iWidthInPixel"]}
                                onChange={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.ChangeWidth(objContext, event.target.value); }} />
                        </div>
                    </div>
                    {
                        !blnValidWidth ?
                            <div className="text-flex">
                                <div className="flex-left" />
                                <div className="flex-right">
                                    <span className="error-message">
                                        {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "MinWidthError")}
                                    </span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <div className="text-flex">
                        <div className="flex-left">
                            <span>
                                {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "VisibleInTestLabel")}
                            </span>
                        </div>
                        <div className="flex-right">
                            <select onChange={(event) => { objContext.MultiInputSidebar_ModuleProcessor.ChangeNumberOfFieldsVisibleInTest(objContext, event.target.value); }}>
                                <option value={0} selected={parseInt(objContext.state.ElementJson["vElementJson"]["iNumberOfInputDisplay"]) === 0 ? true : false}>
                                    {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "AllOptionInDrodownText")}
                                </option>
                                {
                                    arrDropdownData.map(strValue => {
                                        return (
                                            <option value={parseInt(strValue)} selected={parseInt(strValue) === parseInt(objContext.state.ElementJson["vElementJson"]["iNumberOfInputDisplay"]) ? true : false}>
                                                {strValue}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="button-right">
                        <button
                            className="btn"
                            onClick={(event) => { event.preventDefault(); objContext.MultiInputSidebar_ModuleProcessor.Save(objContext); }}>
                            {objContext.MultiInputSidebar_ModuleProcessor.TextFormatter(objTextResource, "AttributesSaveButtonText")}
                        </button>
                    </div>
                </div>
            </div >
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(MultiInputSidebar_ModuleProcessor.StoreMapList()))(MultiInputSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MultiInputSidebar_ModuleProcessor; 