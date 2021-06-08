//React related imports.
import React, { useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TimeTableClassTime_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/TimeTableClassTime_Hook';
import TimeTableClassTime_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/TimeTableClassTime_ModuleProcessor';


//Inline Images import
import imgClose from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/close.svg?inline';
import imgPlus from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/plus.svg?inline';

/**
* @name TimeTableClassTime
* @param {object} props props
* @summary This component displays the TimeTableClassTime data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the components with TimeTableClassTime
*/
const TimeTableClassTime = (props) => {

    const viewStartHourRef = useRef([]);
    const viewStartMinutesRef = useRef([]);
    const viewEndHourRef = useRef([]);
    const viewEndMinutesRef = useRef([]);

    const addStartHourRef = useRef([]);
    const addStartMinutesRef = useRef([]);
    const addEndHourRef = useRef([]);
    const addEndMinutesRef = useRef([]);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TimeTableClassTime_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TimeTableClassTime", ["TimeTableClassTime_ModuleProcessor"]: new TimeTableClassTime_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TimeTableClassTime_Hook, that contains all the custom hooks.
    * @returns null
    */
    TimeTableClassTime_Hook.Initialize(objContext);

    /**
    * @summary  Triggered after validation.
    */
    useEffect(() => {
        //if (state.strInputTagIdToAutoFocus !== "") {
        //    document.getElementById(state.strInputTagIdToAutoFocus).focus();  
        //    dispatch({ type: 'SET_STATE', payload: { "strInputTagIdToAutoFocus": "" } });
        //}
        if (state.objInputTagIdToAutoFoucs !== null) {
            state.objInputTagIdToAutoFoucs.focus();
            dispatch({ type: 'SET_STATE', payload: { "objInputTagIdToAutoFoucs": null } });
        }
        //if (state.strInvaidFieldId != "") {
        //    document.getElementById(state.strInvaidFieldId).setAttribute("style", "border: 3px solid #000;");
        //    document.getElementById(state.strInvaidFieldId).focus();
        //    dispatch({ type: 'SET_STATE', payload: { "strInvaidFieldId": "" } });
        //}
        if (state.objInvaidFieldId != null) {
            state.objInvaidFieldId.setAttribute("style", "border: 3px solid #000;");
            state.objInvaidFieldId.focus();
            dispatch({ type: 'SET_STATE', payload: { "objInvaidFieldId": null } });
        }
        //if (state.strRemoveValidationBoxFromId != "") {
        //    let strAttributes = document.getElementById(state.strRemoveValidationBoxFromId).getAttribute("style");
        //    if (strAttributes !== null && strAttributes.includes("border: 3px solid #000;")) {
        //        strAttributes = strAttributes.replace("border: 3px solid #000;", "");
        //        document.getElementById(state.strRemoveValidationBoxFromId).setAttribute("style", strAttributes);
        //    }
        //    dispatch({ type: 'SET_STATE', payload: { "strRemoveValidationBoxFromId": "" } });
        //}
        if (state.objRemoveValidationBoxFromId != null) {
            let strAttributes = state.objRemoveValidationBoxFromId.getAttribute("style");
            if (strAttributes !== null && strAttributes.includes("border: 3px solid #000;")) {
                strAttributes = strAttributes.replace("border: 3px solid #000;", "");
                state.objRemoveValidationBoxFromId.setAttribute("style", strAttributes);
            }
            dispatch({ type: 'SET_STATE', payload: { "strRemoveValidationBoxFromId": null } });
        }
        if (state.blnReset) {
            //document.getElementById("ErrorMsg").setAttribute("style", "display: none");
            props.ErrorMsgRef.current.setAttribute("style", "display: none");
            window.dispatchEvent(new Event('resize'));
            dispatch({ type: 'SET_STATE', payload: { "blnReset": false } });
        }
    }, [state.strInputTagIdToAutoFocus,
    state.objInputTagIdToAutoFoucs,
    state.strInvaidFieldId,
    state.objInvaidFieldId,
    state.strRemoveValidationBoxFromId,
    state.objRemoveValidationBoxFromId,
    state.blnReset]);

    /**
    * @name HandleSave
    * @param {*} event event
    * @summary Checks situations and calls 'SaveTimeTableSlots'. Called by 'SAVE' button.
    */
    function HandleSave(event) {
        event.preventDefault();
        let arrTimeTableSlots = [...state.arrSavedTimeTableSlots, ...state.arrNewTimeTableSlots];
        if (arrTimeTableSlots.length > 0) {
            let objValidateResult = objContext.TimeTableClassTime_ModuleProcessor.ValidateData(objContext, arrTimeTableSlots);
            let objValidateResultRef = objContext.TimeTableClassTime_ModuleProcessor.ValidateDataRef(objContext, state.arrSavedTimeTableSlots, state.arrNewTimeTableSlots, viewStartHourRef, viewStartMinutesRef, viewEndHourRef, viewEndMinutesRef, addStartHourRef, addStartMinutesRef, addEndHourRef, addEndMinutesRef);
            //if (!objValidateResult.blnIsDataValid) {
            if (!objValidateResultRef.blnIsDataValid) {
                let objTextResource = props.Object_Framework_Services_TextResource;
                objValidateResultRef["arrErrors"].forEach(objError => {
                    Logger.Log(".........Errors", objError.strErrorAtId);
                    // document.getElementById(objError.strErrorAtId).setAttribute("style", "border: 3px solid black;");
                    objError.objErrorAtId.current.setAttribute("style", "border: 3px solid black;");
                });
                //document.getElementById("labelError").innerText = Localization.TextFormatter(objTextResource, 'ErrorMessage');
                props.LabelErrorRef.current.innerText = Localization.TextFormatter(objTextResource, 'ErrorMessage');
                //document.getElementById("ErrorMsg").setAttribute("style", "display:block");
                props.ErrorMsgRef.current.setAttribute("style", "display: block");
                //window.dispatchEvent(new Event('resize'));
                //document.getElementById(objValidateResult["arrErrors"][0].strErrorAtId).focus();
                objValidateResultRef["arrErrors"][0].objErrorAtId.current.focus();
            }
            else {
                objContext.TimeTableClassTime_ModuleProcessor.CleanUpAndSaveData(objContext, arrTimeTableSlots);
            }
        }
    }

    /**
    * @name ViewTimeTableSlot
    * @param {object} objTimeTableSlot TimeTableSlot
    * @param {Integer} intCount Count
    * @summary Called by the render method to form the JSX for saved time table slots.
    * @returns {object} jsx, React.Fragment
    */
    function ViewTimeTableSlot(objTimeTableSlot, intCount, index) {
        let arrTimeTableClassTimeDropDownData = objContext.TimeTableClassTime_ModuleProcessor.GetDropDownData(objContext);
        let strSerialNumbers = intCount + ".";
        let strDropdownId = "strLessonType_" + objTimeTableSlot.intId;
        let strStartHourId = "strStartAtHour_" + objTimeTableSlot.intId;
        let strStartMinutesId = "strStartAtMinutes_" + objTimeTableSlot.intId;
        let strEndHourId = "strEndAtHour_" + objTimeTableSlot.intId;
        let strEndMinutesId = "strEndAtMinutes_" + objTimeTableSlot.intId;
        let objTimeTableClassTimeDropDownData = {
            DropdownData: arrTimeTableClassTimeDropDownData,
            SelectedValue: objTimeTableSlot.strLessonType
        };
        let ViewStartHourRef = viewStartHourRef.current[index]
        let ViewStartMinutesRef = viewStartMinutesRef.current[index]
        let ViewEndHourRef = viewEndHourRef.current[index]
        let ViewEndMinutesRef = viewEndMinutesRef.current[index]
        return (
            <tr key={objTimeTableSlot.intId}>
                <td>
                    <div className="menu-flex">
                        <span>{strSerialNumbers}</span>
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={strDropdownId} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id={strDropdownId}
                                    Meta={objContext.TimeTableClassTime_ModuleProcessor.GetMetaDataAddTimeTableSlotDropdown()}
                                    Data={objTimeTableClassTimeDropDownData}
                                    Resource={objContext.TimeTableClassTime_ModuleProcessor.GetResourceDataAddTimeTableSlotDropdown()}
                                    Events={objContext.TimeTableClassTime_ModuleProcessor.GetEventsDataViewTimeTableSlotDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="time-range-flex">
                        <input type="text" id={strStartHourId} ref={ViewStartHourRef} name={strStartHourId} value={objTimeTableSlot.strStartAtHour} placeholder="HH" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeSavedSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], ViewStartHourRef, ViewStartMinutesRef); }} />
                        <span>:</span>
                        <input type="text" id={strStartMinutesId} ref={ViewStartMinutesRef} name={strStartMinutesId} value={objTimeTableSlot.strStartAtMinutes} placeholder="MM" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeSavedSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], ViewStartMinutesRef, ViewEndHourRef); }} />
                        <span>-</span>
                        <input type="text" id={strEndHourId} ref={ViewEndHourRef} name={strEndHourId} value={objTimeTableSlot.strEndAtHour} placeholder="HH" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeSavedSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], ViewEndHourRef, ViewEndMinutesRef); }} />
                        <span>:</span>
                        <input type="text" id={strEndMinutesId} ref={ViewEndMinutesRef} name={strEndMinutesId} value={objTimeTableSlot.strEndAtMinutes} placeholder="MM" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeSavedSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], ViewEndMinutesRef, null); }} />
                    </div>
                </td>
                <td>
                    <div className="span close">
                        <img src={imgClose} id={objTimeTableSlot.intId} onClick={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleRemoveSavedSlot(objContext, parseInt(event.target.id)) }} alt="" />
                    </div>
                </td>
            </tr>
        );
    }

    /**
    * @name AddTimeTableSlot
    * @param {object} objTimeTableSlot TimeTableSlot
    * @param {Integer} intCount Count
    * @summary Called by the render method to form the JSX for new time table slot.
    * @returns {object} jsx, React.Fragment
    */
    function AddTimeTableSlot(objTimeTableSlot, intCount, index) {
        let arrTimeTableClassTimeDropDownData = objContext.TimeTableClassTime_ModuleProcessor.GetDropDownData(objContext);
        let strSerialNumbers = intCount + ".";
        let strDropdownId = "strLessonType_" + objTimeTableSlot.intId;
        let strStartHourId = "strStartAtHour_" + objTimeTableSlot.intId;
        let strStartMinutesId = "strStartAtMinutes_" + objTimeTableSlot.intId;
        let strEndHourId = "strEndAtHour_" + objTimeTableSlot.intId;
        let strEndMinutesId = "strEndAtMinutes_" + objTimeTableSlot.intId;
        let objTimeTableClassTimeDropDownData = {
            DropdownData: arrTimeTableClassTimeDropDownData,
            SelectedValue: objTimeTableSlot.strLessonType
        };

        let AddStartHourRef = addStartHourRef.current[index]
        let AddStartMinutesRef = addStartMinutesRef.current[index]
        let AddEndHourRef = addEndHourRef.current[index]
        let AddEndMinutesRef = addEndMinutesRef.current[index]

        return (
            <tr key={objTimeTableSlot.intId}>
                <td>
                    <div className="menu-flex">
                        <span>{strSerialNumbers}</span>
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={strDropdownId} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id={strDropdownId}
                                    Meta={objContext.TimeTableClassTime_ModuleProcessor.GetMetaDataAddTimeTableSlotDropdown()}
                                    Data={objTimeTableClassTimeDropDownData}
                                    Resource={objContext.TimeTableClassTime_ModuleProcessor.GetResourceDataAddTimeTableSlotDropdown()}
                                    Events={objContext.TimeTableClassTime_ModuleProcessor.GetEventsDataAddTimeTableSlotDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="time-range-flex">
                        <input type="text" id={strStartHourId} ref={AddStartHourRef} name={strStartHourId} value={objTimeTableSlot.strStartAtHour} placeholder="HH" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeNewSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], AddStartHourRef, AddStartMinutesRef); }} />
                        <span>:</span>
                        <input type="text" id={strStartMinutesId} ref={AddStartMinutesRef} name={strStartMinutesId} value={objTimeTableSlot.strStartAtMinutes} placeholder="MM" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeNewSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], AddStartMinutesRef, AddEndHourRef); }} />
                        <span>-</span>
                        <input type="text" id={strEndHourId} ref={AddEndHourRef} name={strEndHourId} value={objTimeTableSlot.strEndAtHour} placeholder="HH" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeNewSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], AddEndHourRef, AddEndMinutesRef); }} />
                        <span>:</span>
                        <input type="text" id={strEndMinutesId} ref={AddEndMinutesRef} name={strEndMinutesId} value={objTimeTableSlot.strEndAtMinutes} placeholder="MM" onChange={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleChangeNewSlot(objContext, parseInt(event.target.id.split("_")[1]), event.target.value, event.target.id.split("_")[0], AddEndMinutesRef, null); }} />
                    </div>
                </td>
                <td>
                    <div className="span close" >
                        <img src={imgClose} alt="" id={objTimeTableSlot.intId} onClick={(event) => { objContext.TimeTableClassTime_ModuleProcessor.HandleRemoveNewSlot(objContext, parseInt(event.target.id)); }} />
                    </div>
                </td>
            </tr>
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = props.Object_Framework_Services_TextResource;
        let intCount = 0;
        viewStartHourRef.current = state.arrSavedTimeTableSlots.map(
            (ref, index) => viewStartHourRef.current[index] = React.createRef()
        )
        viewStartMinutesRef.current = state.arrSavedTimeTableSlots.map(
            (ref, index) => viewStartMinutesRef.current[index] = React.createRef()
        )
        viewEndHourRef.current = state.arrSavedTimeTableSlots.map(
            (ref, index) => viewEndHourRef.current[index] = React.createRef()
        )
        viewEndMinutesRef.current = state.arrSavedTimeTableSlots.map(
            (ref, index) => viewEndMinutesRef.current[index] = React.createRef()
        )

        addStartHourRef.current = state.arrNewTimeTableSlots.map(
            (ref, index) => addStartHourRef.current[index] = React.createRef()
        )
        addStartMinutesRef.current = state.arrNewTimeTableSlots.map(
            (ref, index) => addStartMinutesRef.current[index] = React.createRef()
        )
        addEndHourRef.current = state.arrNewTimeTableSlots.map(
            (ref, index) => addEndHourRef.current[index] = React.createRef()
        )
        addEndMinutesRef.current = state.arrNewTimeTableSlots.map(
            (ref, index) => addEndMinutesRef.current[index] = React.createRef()
        )
        return (
            <React.Fragment>
                <h2 class="padding-top-20">{Localization.TextFormatter(objTextResource, 'HeadingText')}</h2>
                <table className="time-table-settings-table">
                    <tr className="transparent">
                        <th colspan="3">{Localization.TextFormatter(objTextResource, 'LessonText')}</th>
                    </tr>
                    <tr className="transparent">
                        <td colspan="3">
                            <div className="control-buttons">
                                <div className="control-buttons-left">
                                    <button className="button yellow-button" onClick={() => { objContext.TimeTableClassTime_ModuleProcessor.HandleAddRow(objContext); }}>
                                        <img src={imgPlus} alt="" />
                                        <span>{Localization.TextFormatter(objTextResource, 'AddButtonText')}</span>
                                    </button>
                                </div>
                                <div className="control-buttons-right">
                                    <button className="button white-button" onClick={() => { objContext.TimeTableClassTime_ModuleProcessor.HandleReset(objContext); }}>
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
                        (state.arrSavedTimeTableSlots.length + state.arrNewTimeTableSlots.length == 0)
                            ? <div id="divNoClassTime">
                                <span>{Localization.TextFormatter(objTextResource, 'NoClassTimeText')}</span>
                            </div> : <React.Fragment />
                    }
                    {
                        state.arrSavedTimeTableSlots && state.arrSavedTimeTableSlots.map((objSavedTimeTableSlot, index) => {
                            if (!objSavedTimeTableSlot.blnIsDeleted) {
                                intCount += 1;
                                return ViewTimeTableSlot(objSavedTimeTableSlot, intCount, index);
                            }
                        })
                    }
                    {
                        state.arrNewTimeTableSlots && state.arrNewTimeTableSlots.map((jNewTimeTableSlot, index) => {
                            if (!jNewTimeTableSlot.blnIsDeleted) {
                                intCount += 1;
                                return AddTimeTableSlot(jNewTimeTableSlot, intCount, index);
                            }
                        })
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
export default connect(ExtranetBase_Hook.MapStoreToProps(TimeTableClassTime_ModuleProcessor.StoreMapList()))(TimeTableClassTime);