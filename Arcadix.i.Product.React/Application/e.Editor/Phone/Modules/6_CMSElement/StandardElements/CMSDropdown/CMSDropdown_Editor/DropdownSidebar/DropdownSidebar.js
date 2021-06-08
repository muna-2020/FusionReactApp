//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as DropdownSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/DropdownSidebar/DropdownSidebar_Hooks';
import DropdownSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/DropdownSidebar/DropdownSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application State classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name DropdownSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary DropdownSidebar's.
 * @returns {any} DropdownSidebar
 */
const DropdownSidebar = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, DropdownSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["DropdownSidebar_ModuleProcessor"]: new DropdownSidebar_ModuleProcessor() };

    /**
     * @name DropdownSidebar_Hooks.Initialize
     * @summary Initialize method call in DropdownSidebar_Hooks, that contains all the custom hooks.
     */
    DropdownSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.DropdownSidebar_ModuleProcessor.Initialize(objContext, objContext.DropdownSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSDropdown/DropdownSidebar", objContext.props);
        let blnIsFixedWidth = state.ElementJson["vElementJson"]["cIsFixedWidth"] === "Y" ? true : false;
        let blnIsRandomDisplay = state.ElementJson["vElementJson"]["cIsRandomizedDisplay"] === "Y" ? true : false;
        let blnIsDefaultTextEmpty = state.ElementJson["vElementJson"]["cIsDefaultTextEmpty"] === "Y" ? true : false;
        let blnHidePleaseSelect = state.ElementJson["vElementJson"]["cHidePleaseSelect"] === "Y" ? true : false;
        let blnIsMoveUpDisabled = JSON.stringify(state.SelectedValue) !== "{}" ? state.SelectedValue["iDisplayOrder"] === 1 ? true : false : true;
        let blnIsMoveDownDisabled = JSON.stringify(state.SelectedValue) !== "{}" ? state.SelectedValue["iDisplayOrder"] === state.ElementJson["vElementJson"]["Values"].length ? true : false : true;
        let EditorRef = EditorState.GetReference("EditorRef");
        let objCommonTextResource = EditorState.GetProperty("CommonTextResource");
        let blnIsPointOverride = false;
        if (EditorRef) {
            blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        }
        return (
            <div className="dd-body">
                <div className="title">
                    {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "CharactersticsHeadingText")}
                </div>
                <div className="sub-title">
                    {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "OptionsHeadingText")}
                </div>
                <div className="ddlist-flex">
                    <div className="ddleft">
                        <span className="plus" onClick={() => { objContext.DropdownSidebar_ModuleProcessor.AddNewValue(objContext); }}>
                            <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/AddField.png"} alt="" />
                        </span>
                        <span className="minus" onClick={() => { objContext.DropdownSidebar_ModuleProcessor.RemoveSelectedValue(objContext); }}>
                            <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/DeleteField.png"} alt="" />
                        </span>
                    </div>

                    <div className="ddcenter">
                        <div className="sub-title">
                            {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "ValueHeadingText")}
                        </div>
                        {
                            state.ElementJson["vElementJson"]["Values"].map((objTempValue, intIndex) => {
                                let blnIsChecked = objTempValue["cIsCorrectValue"] === "Y" ? true : false;
                                let blnIsErrorFree = state.Errors.filter(objErrorValue => objErrorValue["iElementDropdownValueId"] === objTempValue["iElementDropdownValueId"]).length > 0 ? false : true;
                                return (
                                    <div key={intIndex} className={"center-flex"} onClick={() => { objContext.DropdownSidebar_ModuleProcessor.SetValuesToState(objContext, objTempValue); }}>
                                        <input
                                            className={!blnIsErrorFree ? "border-red" : ""}
                                            type={"text"}
                                            value={objTempValue["vText"]}
                                            onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangeInputValue(objContext, event.target.value, objTempValue); }} />
                                        <input
                                            type={"radio"}
                                            checked={blnIsChecked}
                                            onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangeCorrectOptionRadio(objContext, objTempValue, !blnIsChecked); }} />
                                        {
                                            state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ?
                                                <input
                                                    type="text"
                                                    value={objTempValue["dWrongPoint"]}
                                                    style={{ width: "50px", height: "25px", "outline": "1px solid gainsboro", marginLeft: "10px" }}
                                                    onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangeWrongPointValue(objContext, event.target.value, objTempValue); }} /> : ""
                                        }
                                    </div>
                                );
                            })
                        }
                        {
                            state.Errors.length > 0 ?
                                <div className={"center-flex"}>
                                    <label className="error-label">
                                        {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "EmptyValuesError")}
                                    </label>
                                </div> : ""
                        }
                    </div>

                    <div className="ddright">
                        <span className={blnIsMoveUpDisabled ? "up ddDisabled" : "up"} onClick={() => { !blnIsMoveUpDisabled ? objContext.DropdownSidebar_ModuleProcessor.MoveSelectedValueUp(objContext) : ""; }}>
                            <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/MoveFieldUp.png"} alt="" />
                        </span>
                        <span className={blnIsMoveDownDisabled ? "down ddDisabled" : "down"} onClick={() => { !blnIsMoveDownDisabled ? objContext.DropdownSidebar_ModuleProcessor.MoveSelectedValueDown(objContext) : ""; }}>
                            <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/MoveFieldDown.png"} alt="" />
                        </span>
                    </div>
                </div>
                <div className="snd-block">
                    <div className="snd-flex">
                        {
                            state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ?
                                <React.Fragment>
                                    <div className="flx">
                                        <span>
                                            {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "CorrectAnswer")}:
                                        </span>
                                        <input type="text" value={state.ElementJson["vElementJson"]["dCorrectPoint"]} onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangePoint(objContext, event.target.value, "dCorrectPoint"); }} />
                                    </div>
                                    <div className="flx">
                                        <span>
                                            {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "NotAnswered")}:
                                        </span>
                                        <input type="text" value={state.ElementJson["vElementJson"]["dNotAnsweredPoint"]} onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangePoint(objContext, event.target.value, "dNotAnsweredPoint"); }} />
                                    </div>
                                </React.Fragment> : ""
                        }
                        <div className="fs">
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "WidthAccordingToTextLabel")}
                            </span>
                            <input type={"radio"} checked={!blnIsFixedWidth} onChange={() => { objContext.DropdownSidebar_ModuleProcessor.OnChangeFixWidthRadio(objContext, !blnIsFixedWidth); }} />
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "FixedWidthLabel")}
                            </span>
                            <input type={"radio"} checked={blnIsFixedWidth} onChange={() => { objContext.DropdownSidebar_ModuleProcessor.OnChangeFixWidthRadio(objContext, !blnIsFixedWidth); }} />
                        </div>
                        <div className="flx">
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "FixedWidthInPixelsLabel")}
                            </span>
                            <input type={"text"}
                                value={!blnIsFixedWidth ? "" : state.ElementJson["vElementJson"]["iWidth"]} disabled={!blnIsFixedWidth} onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangeFixWidthInput(objContext, event.target.value); }} />
                        </div>
                        <div className="flx">
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "RandomDisplayLabel")}
                            </span>
                            <input type={"checkbox"} checked={blnIsRandomDisplay} onChange={() => { objContext.DropdownSidebar_ModuleProcessor.OnChangeRandomDisplayCheckBox(objContext, !blnIsRandomDisplay); }} />
                        </div>
                        <div className="flx cl2">
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "StandardTextLabel")}
                            </span>
                            <input
                                type={"text"}
                                value={state.ElementJson["vElementJson"]["vDefaultText"] ? state.ElementJson["vElementJson"]["vDefaultText"] : objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objCommonTextResource, "Dropdown_StandardTextInDropdown")}
                                disabled={blnIsDefaultTextEmpty}
                                onChange={(event) => { objContext.DropdownSidebar_ModuleProcessor.OnChangeDefaultTextInput(objContext, event.target.value); }}
                            />
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "DefaultTextEmptyLabel")}
                            </span>
                            <input type={"checkbox"} checked={blnIsDefaultTextEmpty} onChange={() => { objContext.DropdownSidebar_ModuleProcessor.OnChangeDefaultTextIsEmptyCheckBox(objContext, !blnIsDefaultTextEmpty); }} />
                        </div>
                        <div className="flx b-border">
                            <span>
                                {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "HidePleaseSelectLabel")}
                            </span>
                            <input type={"checkbox"} checked={blnHidePleaseSelect} onChange={() => { objContext.DropdownSidebar_ModuleProcessor.OnChangeHidePleaseSelectOptionCheckBox(objContext, !blnHidePleaseSelect); }} />
                        </div>
                    </div>
                </div >
                <div className="dropdown-header-footer">
                    <div className="btn" onClick={() => { objContext.DropdownSidebar_ModuleProcessor.OnClickAddButton(objContext); }}>
                        {objContext.DropdownSidebar_ModuleProcessor.TextFormatter(objTextResource, "AttributesAddButtonText")}
                    </div>
                </div>
            </div >
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(DropdownSidebar_ModuleProcessor.StoreMapList()))(DropdownSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DropdownSidebar_ModuleProcessor; 