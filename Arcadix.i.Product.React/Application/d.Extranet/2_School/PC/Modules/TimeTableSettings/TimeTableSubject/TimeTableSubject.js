//React related imports.
import React, { useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TimeTableSubject_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSubject/TimeTableSubject_Hook';
import TimeTableSubject_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSubject/TimeTableSubject_ModuleProcessor';


//Inline Images import
import imgClose from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/close.svg?inline';
import imgPlus from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/plus.svg?inline';
import imgEdit from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSubject/edit_gray.png?inline';

/**
* @name TimeTableSubject
* @param {object} props props
* @summary This component displays the TimeTableSubject data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the components with TimeTableClassTime
*/
const TimeTableSubject = (props) => {

    const subNameRef = useRef([]);
    const subAbbreviationRef = useRef([]);

    const subjectNameRef = useRef(null);
    const subjectAbbreviationRef = useRef(null);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TimeTableSubject_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TimeTableSubject", ["TimeTableSubject_ModuleProcessor"]: new TimeTableSubject_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TimeTableSubject_Hook, that contains all the custom hooks.
    * @returns null
    */
    TimeTableSubject_Hook.Initialize(objContext);

    /**
    * @summary   This is used to remove error msg box on reset
    */
    useEffect(() => {
        if (state.blnReset) {
            //document.getElementById("ErrorMsg").setAttribute("style", "display:none");
            props.ErrorMsgRef.current.setAttribute("style", "display:none");
            dispatch({ type: 'SET_STATE', payload: { "blnReset": false } });
        }
        window.dispatchEvent(new Event('resize'));
    }, [state.blnReset]);

    /**
     * @name HandleSave
     * @param {object} e Event
     * @summary Checks situations and calls 'SaveTimeTableSlots'. Called by 'SAVE' button.
     */
    function HandleSave(e) {
        e.preventDefault();
        let objValidateResult = {};
        if (state.strOperation === 'edit') {
            if (JSON.stringify(state.objSubjectToEdit) !== '{}') {
                objValidateResult = objContext.TimeTableSubject_ModuleProcessor.ValidateData(1, state.objSubjectToEdit, state.arrSavedSubjects, subNameRef, subAbbreviationRef);
                if (!objValidateResult.blnIsDataValid) {
                    let objTextResource = props.Object_Framework_Services_TextResource;
                    objValidateResult["arrErrors"].forEach(objError => {
                        Logger.Log(".........Errors", objError.strErrorAtId);
                        //document.getElementById(objError.strErrorAtId).setAttribute("style", "border: 3px solid black;");
                        objError.objErrorAtId.current.setAttribute("style", "border: 3px solid black;");
                    });
                    //document.getElementById("labelError").innerText = Localization.TextFormatter(objTextResource, 'ErrorMessage');
                    props.LabelErrorRef.current.innerText = Localization.TextFormatter(objTextResource, 'ErrorMessage');
                    //document.getElementById("ErrorMsg").setAttribute("style", "display:block");
                    props.ErrorMsgRef.current.setAttribute("style", "display:block");
                    //document.getElementById(objValidateResult["arrErrors"][0]["strErrorAtId"]).focus();
                    objValidateResult["arrErrors"][0]["objErrorAtId"].current.focus();
                    //window.dispatchEvent(new Event('resize'));
                }
                else {
                    objContext.TimeTableSubject_ModuleProcessor.CleanUpAndSaveData(objContext, state.objSubjectToEdit);
                }
            }
        }
        else {
            if (JSON.stringify(state.objNewSubject) !== '{}') {
                objValidateResult = objContext.TimeTableSubject_ModuleProcessor.ValidateData(2, state.objNewSubject, state.arrSavedSubjects, subjectNameRef, subjectAbbreviationRef);
                if (!objValidateResult.blnIsDataValid) {
                    let objTextResource = props.Object_Framework_Services_TextResource;
                    objValidateResult["arrErrors"].forEach(objError => {
                        Logger.Log(".........Errors", objError.strErrorAtId);
                        //document.getElementById(objError.strErrorAtId).setAttribute("style", "border: 3px solid black;");
                        objError.objErrorAtId.current.setAttribute("style", "border: 3px solid black;");
                    });
                    //document.getElementById("labelError").innerText = Localization.TextFormatter(objTextResource, 'ErrorMessage');
                    props.LabelErrorRef.current.innerText = Localization.TextFormatter(objTextResource, 'ErrorMessage');
                    //document.getElementById("ErrorMsg").setAttribute("style", "display:block");
                    props.ErrorMsgRef.current.setAttribute("style", "display:block");
                    //document.getElementById(objValidateResult["arrErrors"][0]["strErrorAtId"]).focus();
                    objValidateResult["arrErrors"][0]["objErrorAtId"].current.focus();
                    //window.dispatchEvent(new Event('resize'));
                }
                else {
                    objContext.TimeTableSubject_ModuleProcessor.CleanUpAndSaveData(objContext, state.objNewSubject);
                }
            }
        }
    }

    /**
     * @name DynamicValidations
     * @param {string} strValue Value for the subject input
     * @param {String} strFieldName FieldName
     * @summary Check for valid entries in a check box
     * @returns {boolean} true/false
     */
    function DynamicValidations(strValue, strFieldName, ref) {
        if (strValue !== "") {
            let strAttributes = ref.current.getAttribute("style"); //document.getElementById(strFieldName).getAttribute("style");
            if (strAttributes !== null && strAttributes.includes("border: 3px solid black;")) {
                strAttributes = strAttributes.replace("border: 3px solid black;", "");
                //document.getElementById(strFieldName).setAttribute("style", strAttributes);
                ref.current.setAttribute("style", strAttributes)
            }
        }
        else {
            // document.getElementById(strFieldName).setAttribute("style", "border: 3px solid black;");
            // document.getElementById(strFieldName).focus();
            ref.current.setAttribute("style", "border: 3px solid black;");
            ref.current.focus();
        }
        return true;
    }

    /**
    * @name HandleChangeSavedSubject
    * @param {String} strValue Value for the saved subject input
    * @param {String} strFieldName FieldName
    * @summary This method is triggerd whenever the 'e_subName' or 'e_subAbbreviation' input field is changed. Sets 'objSubjectToEdit' state to the changed values.
    */
    function HandleChangeSavedSubject(strValue, strFieldName, ref) {
        if (DynamicValidations(strValue, strFieldName, ref)) {
            let objTempSubject = Object.assign({}, state.objSubjectToEdit);
            if (strFieldName === "e_subName") {
                objTempSubject.strSubjectName = strValue;
            }
            else {
                objTempSubject.strSubjectAbbreviation = strValue;
            }
            dispatch({ type: 'SET_STATE', payload: { "objSubjectToEdit": objTempSubject } });
        }
    }

    /**
    * @name HandleChangeNewSubject
    * @param {String} strValue Value for the new subject input
    * @param {String} strFieldName FieldName
    * @summary This method is triggerd whenever the 'subjectName' or 'subjectAbbreviation' input field is changed. Sets 'objNewSubject' state to the changed values.
    */
    function HandleChangeNewSubject(strValue, strFieldName, ref) {
        if (DynamicValidations(strValue, strFieldName, ref)) {
            let objTempSubject = Object.assign({}, state.objNewSubject);
            if (strFieldName === "subjectName") {
                objTempSubject.strSubjectName = strValue;
            }
            else {
                objTempSubject.strSubjectAbbreviation = strValue;
            }
            dispatch({ type: 'SET_STATE', payload: { "objNewSubject": objTempSubject } });
        }
    }

    /**
    * @name ViewSubjects
    * @param {object} objSubject Subject
    * @summary Called by the render method to form the JSX for saved time table slots.
    * @returns {object} jsx, React.Fragment
    */
    function ViewSubjects(objSubject, index) {
        let objTextResource = props.Object_Framework_Services_TextResource;
        let strSubjectNameInputId = "subjectName_" + objSubject.intId;
        let strSubjectAbbreviationInputId = "subjectAbbreviation_" + objSubject.intId;
        let SubNameRef = subNameRef.current[index];
        let SubAbbreviationRef = subAbbreviationRef.current[index];
        if (!state.blnEditRow || state.objSubjectToEdit.intId !== objSubject.intId) {
            return (
                <tr key={objSubject.intId}>
                    <td>
                        <label id={strSubjectNameInputId} value={objSubject.strSubjectName}> {objSubject.strSubjectName} </label>
                    </td>
                    <td>
                        <label id={strSubjectAbbreviationInputId} value={objSubject.strSubjectAbbreviation}> {objSubject.strSubjectAbbreviation} </label>
                    </td>
                    {objSubject.blnIsSchoolSubject ?
                        <td>
                            <span className="edit">
                                <img src={imgEdit} alt="" id={objSubject.intId} onClick={(event) => { objContext.TimeTableSubject_ModuleProcessor.HandleEdit(objContext, parseInt(event.target.id)); }} />
                            </span>
                        </td> : <td />
                    }
                </tr>
            );
        }
        else {
            return (
                <tr key={objSubject.intId}>
                    <td>
                        <input type="text" id="e_subName" name="e_subName" ref={SubNameRef} value={state.objSubjectToEdit.strSubjectName} placeholder={Localization.TextFormatter(objTextResource, 'NameText')} onChange={(event) => { HandleChangeSavedSubject(event.target.value, event.target.id, SubNameRef); }} />
                    </td>
                    <td>
                        <input type="text" id="e_subAbbreviation" name="e_subAbbreviation" ref={SubAbbreviationRef} value={state.objSubjectToEdit.strSubjectAbbreviation} placeholder={Localization.TextFormatter(objTextResource, 'AbbreviationText')} onChange={(event) => { HandleChangeSavedSubject(event.target.value, event.target.id, SubAbbreviationRef); }} />
                    </td>
                    <td>
                        <span className="edit">
                            <img src={imgClose} alt="" id={objSubject.intId} onClick={(event) => { objContext.TimeTableSubject_ModuleProcessor.HandleDelete(objContext, parseInt(event.target.id)); }} />
                        </span>
                    </td>
                </tr>
            );
        }
    }

    /**
    * @name AddSubject
    * @param {object} objSubject Subject
    * @summary Called by the render method to form the JSX for new time table slot.
    * @returns {object} jsx, React.Fragment
    */
    function AddSubject(objSubject) {
        let objTextResource = props.Object_Framework_Services_TextResource;
        if (state.blnAddRow) {
            return (
                <tr key={objSubject.intId}>
                    <td>
                        <input type="text" id="subjectName" ref={subjectNameRef} placeholder={Localization.TextFormatter(objTextResource, 'NameText')} onChange={(event) => { HandleChangeNewSubject(event.target.value, event.target.id, subjectNameRef); }} />
                    </td>
                    <td>
                        <input type="text" id="subjectAbbreviation" ref={subjectAbbreviationRef} placeholder={Localization.TextFormatter(objTextResource, 'AbbreviationText')} onChange={(event) => { HandleChangeNewSubject(event.target.value, event.target.id, subjectAbbreviationRef); }} />
                    </td>
                    <td />
                </tr>
            );
        }
    }

    /**
    * @name GetContent
    * @summary  returns the required jsx for component
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = props.Object_Framework_Services_TextResource;

        subNameRef.current = state.arrSavedSubjects.map(
            (ref, index) => subNameRef.current[index] = React.createRef()
        )
        subAbbreviationRef.current = state.arrSavedSubjects.map(
            (ref, index) => subAbbreviationRef.current[index] = React.createRef()
        )

        return (
            <React.Fragment>
                <h2 class="padding-top-20">{Localization.TextFormatter(objTextResource, 'HeadingText')}</h2>
                <table className="time-table-settings-table subject-table">
                    <tr className="transparent">
                        <th colspan="1">{Localization.TextFormatter(objTextResource, 'SubjectNameText')}</th>
                        <th colspan="2">{Localization.TextFormatter(objTextResource, 'SubjectAbbreviationText')}</th>
                    </tr>
                    <tr className="transparent">
                        <td colspan="3">
                            <div className="control-buttons">
                                <div className="control-buttons-left">
                                    <button className="button yellow-button" onClick={(event) => { objContext.TimeTableSubject_ModuleProcessor.HandleAddRow(objContext); }}>
                                        <img src={imgPlus} alt="" />
                                        <span>{Localization.TextFormatter(objTextResource, 'AddButtonText')}</span>
                                    </button>
                                </div>
                                <div className="control-buttons-right">
                                    <button className="button white-button" onClick={(event) => { objContext.TimeTableSubject_ModuleProcessor.HandleReset(objContext); }}>
                                        <span>{Localization.TextFormatter(objTextResource, 'ResetButtonText')}</span>
                                    </button>
                                    <button className="button brown-button" onClick={HandleSave}>
                                        <span>{Localization.TextFormatter(objTextResource, 'SaveButtonText')}</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {
                        state.arrSavedSubjects && state.arrSavedSubjects.map((objSavedSubject, index) => {
                            if (!objSavedSubject.blnIsDeleted) {
                                return ViewSubjects(objSavedSubject, index);
                            }
                        })
                    }
                    {
                        AddSubject(state.objNewSubject)
                    }
                </table>
            </React.Fragment>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TimeTableSubject_ModuleProcessor.StoreMapList()))(TimeTableSubject);