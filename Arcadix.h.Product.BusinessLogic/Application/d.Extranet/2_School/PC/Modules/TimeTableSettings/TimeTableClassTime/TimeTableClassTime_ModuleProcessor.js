import { object } from "prop-types";

/**
* @name TimeTableClassTime_ModuleProcessor
* @summary Class for TimeTableClassTime module display and manipulate.
*/
class TimeTableClassTime_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_School_TimeTableClassTime"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        return [];
    }

    /**
* @name GetPrefetchFiles
* @param {object} props props
* @returns {object} PrefetchFiles
*/
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }

    /**
    * @name GetTimeTableClassTimeJson
    * @param {object} objContext Context object
    * @summary Gets the data from entity reducer and returns array with timetable data. Called by TimeTable component.
    * @returns {Array} TimeTableSlots
    */
    GetTimeTableClassTimeJson(objContext) {
        let arrTimeTableSlots = [];
        let arrTimeTable = DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + objContext.TimeTableClassTime_ModuleProcessor.GetUserId(objContext.props) + ";cIsDeleted;N").Data.filter(slot => { return slot.cIsDeleted === "N"; });
        if (arrTimeTable.length > 0) {
            arrTimeTableSlots = objContext.TimeTableClassTime_ModuleProcessor.GetRequiredJsonFromRawData(arrTimeTable);
        }
        return arrTimeTableSlots;
    }

    /**
    * @name HandleAddRow
    * @param {object} objContext Context object
    * @summary Adds a new TimeTableSlot adding tray to th UI. Sets initial time table details and generates a new ID for the time table slot to be added.Sets the states accordingly.Invoked by the 'ADD' button.
    */
    HandleAddRow(objContext) {
        let objNewTimeTableSlot = {
            'intId': 1,
            "strClassTimeId": "00000000-0000-0000-0000-000000000000",
            'strLessonType': 'Lesson',
            'strStartAtHour': "",
            'strStartAtMinutes': "",
            'strEndAtHour': "",
            'strEndAtMinutes': "",
            "blnIsDeleted": false,
            "intDisplayOrder": 1
        };
        if (objContext.state.arrSavedTimeTableSlots && objContext.state.arrSavedTimeTableSlots.length > 0) {
            objNewTimeTableSlot.intId = objContext.state.arrSavedTimeTableSlots[objContext.state.arrSavedTimeTableSlots.length - 1].intId + 1;
            objNewTimeTableSlot.intDisplayOrder = objContext.state.arrSavedTimeTableSlots[objContext.state.arrSavedTimeTableSlots.length - 1].intDisplayOrder + 1;
        }
        if (objContext.state.arrNewTimeTableSlots !== undefined && objContext.state.arrNewTimeTableSlots.length > 0) {
            objNewTimeTableSlot.intId = objContext.state.arrNewTimeTableSlots[objContext.state.arrNewTimeTableSlots.length - 1].intId + 1;
            objNewTimeTableSlot.intDisplayOrder = objContext.state.arrNewTimeTableSlots[objContext.state.arrNewTimeTableSlots.length - 1].intDisplayOrder + 1;
        }
        if (objContext.state.arrNewTimeTableSlots !== undefined && objContext.state.arrNewTimeTableSlots.length > 0) {
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": [...objContext.state.arrNewTimeTableSlots, objNewTimeTableSlot] } });
        }
        else {
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": [objNewTimeTableSlot] } });
        }
    }

    /**
    * @name GetDropDownData
    * @param {object} objContext Context object
    * @summary Returns an array for dropdown(lesson/pause).
    * @returns {Array} TimeTableClassTimeDropDownData
    */
    GetDropDownData(objContext) {
        const objTextResource = objContext.props.Object_Framework_Services_TextResource;
        let arrTimeTableClassTimeDropDownData = [
            { key: Localization.TextFormatter(objTextResource, 'DropdownLessonItem'), value: "Lesson" },
            { key: Localization.TextFormatter(objTextResource, 'DropdownPauseItem'), value: "Pause" }
        ];
        return arrTimeTableClassTimeDropDownData;
    }

    /**
    * @name GetRequiredJsonFromRawData
    * @param {Array} arrData Data
    * @summary Manipulates Json data according to the component to display
    * @returns {Array} TimeTableData
    */
    GetRequiredJsonFromRawData(arrData) {
        let arrTimeTableData = [];
        for (let intCount = 0; intCount < arrData.length; intCount++) {
            arrTimeTableData.push({
                "intId": intCount + 1,
                "strClassTimeId": arrData[intCount].uClassTimeId.toString(),
                "strLessonType": arrData[intCount].cIsBreak === 'N' ? "Lesson" : "Pause",
                "strStartAtHour": arrData[intCount].vClassTimeFrom.toString().split(":")[0],
                "strStartAtMinutes": arrData[intCount].vClassTimeFrom.toString().split(":")[1],
                "strEndAtHour": arrData[intCount].vClassTimeTo.toString().split(":")[0],
                "strEndAtMinutes": arrData[intCount].vClassTimeTo.toString().split(":")[1],
                "blnIsDeleted": false,
                "intDisplayOrder": arrData[intCount].iDisplayOrder
            });
        }
        return arrTimeTableData;
    }

    /**
    * @name FormatData
    * @param {object} objContext Context object
    * @param {Array} arrTimeTableSlots TimeTableSlots
    * @summary Cleans up the JSON array for 'intId' parameter. Called by 'CleanUpaAndSaveData' method and returns cleaned up JSON array.
    * @returns {Array} TimeTableSlotsToSave
    */
    FormatData(objContext, arrTimeTableSlots) {
        let arrTimeTableSlotsToSave = [];
        for (let intCount = 0; intCount < arrTimeTableSlots.length; intCount++) {
            let objTimeTableSlot = { ...arrTimeTableSlots[intCount], intId: intCount + 1 };
            if (parseInt(arrTimeTableSlots[intCount].strStartAtHour) > -1 && parseInt(arrTimeTableSlots[intCount].strStartAtHour) < 10) {
                objTimeTableSlot = { ...objTimeTableSlot, strStartAtHour: "0" + parseInt(arrTimeTableSlots[intCount].strStartAtHour) };
            }
            if (parseInt(arrTimeTableSlots[intCount].strStartAtMinutes) > -1 && parseInt(arrTimeTableSlots[intCount].strStartAtMinutes) < 10) {
                objTimeTableSlot = { ...objTimeTableSlot, strStartAtMinutes: "0" + parseInt(arrTimeTableSlots[intCount].strStartAtMinutes) };
            }
            if (parseInt(arrTimeTableSlots[intCount].strEndAtHour) > -1 && parseInt(arrTimeTableSlots[intCount].strEndAtHour) < 10) {
                objTimeTableSlot = { ...objTimeTableSlot, strEndAtHour: "0" + parseInt(arrTimeTableSlots[intCount].strEndAtHour) };
            }
            if (parseInt(arrTimeTableSlots[intCount].strEndAtMinutes) > -1 && parseInt(arrTimeTableSlots[intCount].strEndAtMinutes) < 10) {
                objTimeTableSlot = { ...objTimeTableSlot, strEndAtMinutes: "0" + parseInt(arrTimeTableSlots[intCount].strEndAtMinutes) };
            }
            let objAddData = {
                "uClassTimeId": objTimeTableSlot.strClassTimeId,
                "vClassTimeFrom": objTimeTableSlot.strStartAtHour + ":" + objTimeTableSlot.strStartAtMinutes,
                "vClassTimeTo": objTimeTableSlot.strEndAtHour + ":" + objTimeTableSlot.strEndAtMinutes,
                "iDisplayOrder": objTimeTableSlot.intDisplayOrder,
                "uUserId": objContext.TimeTableClassTime_ModuleProcessor.GetUserId(objContext.props),
                "cIsBreak": objTimeTableSlot.strLessonType.toLowerCase() === "lesson" ? "N" : "Y",
                "cIsDeleted": objTimeTableSlot.blnIsDeleted ? "Y" : "N"
            };
            arrTimeTableSlotsToSave.push(objAddData);
        }
        return arrTimeTableSlotsToSave;
    }

    /**
    * @name CleanUpAndSaveData
    * @param {object} objContext Context object
    * @param {Array} arrTimeTableSlots TimeTableSlots
    * @summary Requests 'CleanData' method and sets the retuned data to redux store. This method is invoked by the 'TimeTable' component.
    */
    CleanUpAndSaveData(objContext, arrTimeTableSlots) {
        let arrSlots = objContext.TimeTableClassTime_ModuleProcessor.FormatData(objContext, arrTimeTableSlots);
        let objCallParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.TimeTableClassTime_ModuleProcessor.GetUserId(objContext.props)
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "vEditData": [...arrSlots]
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Object_Extranet_School_TimeTableClassTime.EditData(objCallParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "blnIsSaved": true, "blnReset": true
                }
            });
        });
    }

    /**
    * @name IsHoursValid
    * @param {String} strHours Hours string
    * @summary Checks if there are valid hours.
    * @returns {boolean} if valid returns true else false
    */
    IsHoursValid(strHours) {
        if (parseInt(strHours) >= 0 && parseInt(strHours) < 24) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
    * @name IsMinutesValid
    * @param {String} strMinutes Minutes string
    * @summary Checks if there are valid minutes.
    * @returns {boolean} true/false
    */
    IsMinutesValid(strMinutes) {
        if (parseInt(strMinutes) >= 0 && parseInt(strMinutes) <= 59) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
    * @name ValidateData
    * @param {object}objContext  Context object
    * @param {Array} arrTimeTableSlots Time table slots
    * @summary Validates the TimeTableSlot's details before saving it. Returns a JSON object. Called by 'HandleSave' method.
    * @returns {object} Result object
    */
    ValidateData(objContext, arrTimeTableSlots) {
        let arrResult = [];
        let objResult = {
            'blnIsDataValid': true,
            'arrErrors': []
        };
        for (let intCount = 0; intCount < arrTimeTableSlots.length; intCount++) {
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(arrTimeTableSlots[intCount].strStartAtHour)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'strErrorAtId': "strStartAtHour_" + (intCount + 1) }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(arrTimeTableSlots[intCount].strStartAtMinutes)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'strErrorAtId': "strStartAtMinutes_" + (intCount + 1) }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(arrTimeTableSlots[intCount].strEndAtHour)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'strErrorAtId': "strEndAtHour_" + (intCount + 1) }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(arrTimeTableSlots[intCount].strEndAtMinutes)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'strErrorAtId': "strEndAtMinutes_" + (intCount + 1) }];
                objResult.blnIsDataValid = false;
            }
        }
        objResult.arrErrors = arrResult;
        return objResult;
    }

    /**
   * @name ValidateData
   * @param {object}objContext  Context object
   * @param {Array} arrTimeTableSlots Time table slots
   * @summary Validates the TimeTableSlot's details before saving it. Returns a JSON object. Called by 'HandleSave' method.
   * @returns {object} Result object
   */
    ValidateDataRef(objContext, arrSavedTimeTableSlots, arrNewTimeTableSlots, viewStartHourRef, viewStartMinutesRef, viewEndHourRef, viewEndMinutesRef, addStartHourRef, addStartMinutesRef, addEndHourRef, addEndMinutesRef) {
        let arrResult = [];
        let objResult = {
            'blnIsDataValid': true,
            'arrErrors': []
        };
        for (let intCount = 0; intCount < arrSavedTimeTableSlots.length; intCount++) {
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(arrSavedTimeTableSlots[intCount].strStartAtHour)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': viewStartHourRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(arrSavedTimeTableSlots[intCount].strStartAtMinutes)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': viewStartMinutesRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(arrSavedTimeTableSlots[intCount].strEndAtHour)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': viewEndHourRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(arrSavedTimeTableSlots[intCount].strEndAtMinutes)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': viewEndMinutesRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
        }

        for (let intCount = 0; intCount < arrNewTimeTableSlots.length; intCount++) {
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(arrNewTimeTableSlots[intCount].strStartAtHour)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': addStartHourRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(arrNewTimeTableSlots[intCount].strStartAtMinutes)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': addStartMinutesRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(arrNewTimeTableSlots[intCount].strEndAtHour)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': addEndHourRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
            if (!objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(arrNewTimeTableSlots[intCount].strEndAtMinutes)) {
                arrResult = [...arrResult, { 'blnIsDataValid': false, 'objErrorAtId': addEndMinutesRef.current[intCount] }];
                objResult.blnIsDataValid = false;
            }
        }

        objResult.arrErrors = arrResult;
        return objResult;
    }


    /**
    * @name HandleReset
    * @param {object}objContext  Context object
    * @summary Resets the component to the last saved state by reseting the values in the state to their initial state.
    */
    HandleReset(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": objContext.TimeTableClassTime_ModuleProcessor.GetTimeTableClassTimeJson(objContext), "arrNewTimeTableSlots": [], blnReset: true } });
    }

    /**
    * @name objContext
    * @param {object} objContext Context object
    * @param {Integer} intId Id
    * @summary Deletes the saved time table slot from the state. Called by 'DELETE' button.
    */
    HandleRemoveSavedSlot(objContext, intId) {
        let arrFilteredSlots = objContext.state.arrSavedTimeTableSlots.map(objSlot => {
            if (objSlot["intId"] === intId) {
                return {
                    ...objSlot, ["blnIsDeleted"]: true
                };
            }
            else {
                return objSlot;
            }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrFilteredSlots } });
    }

    /**
    * @name HandleRemoveNewSlot
    * @param {object} objContext Context object
    * @param {integer} intId Id
    * @summary Deletes the new time table slot from the state. Called by 'DELETE' button.
    */
    HandleRemoveNewSlot(objContext, intId) {
        let arrFilteredSlots = objContext.state.arrNewTimeTableSlots.filter(objSlot => objSlot["intId"] !== intId);
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrFilteredSlots } });
    }

    /**
    * @name ChangeData
    * @param {object} objContext Context object
    * @param {String} strValue Value of the dropdown selected item
    * @param {String} strFieldName Field Name
    * @param {object} objTimeTableSlot Time table slot object
    * @summary Changes the data of the slot to the new values and returns the modified object
    * @returns {object} Change result object
    */
    ChangeData(objContext, strValue, strFieldName, objTimeTableSlot) {
        let objChangeResult = {
            objNewTimeTableSlot: {},
            strNextId: ""
        };
        switch (strFieldName) {
            case 'strLessonType':
                objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot, ["strLessonType"]: strValue };
                objChangeResult.strNextId = "strStartAtHour";
                break;
            case 'strStartAtHour':
                if (strValue === "" || (!isNaN(strValue) && objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(strValue))) {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot, ["strStartAtHour"]: strValue };
                    if (strValue.length === 2) {
                        objChangeResult.strNextId = "strStartAtMinutes";
                    }
                }
                else {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot };
                }
                break;
            case 'strStartAtMinutes':
                if (strValue === "" || (!isNaN(strValue) && objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(strValue))) {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot, ["strStartAtMinutes"]: strValue };
                    if (strValue.length === 2) {
                        objChangeResult.strNextId = "strEndAtHour";
                    }
                }
                else {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot };
                }
                break;
            case 'strEndAtHour':
                if (strValue === "" || (!isNaN(strValue) && objContext.TimeTableClassTime_ModuleProcessor.IsHoursValid(strValue))) {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot, ["strEndAtHour"]: strValue };
                    if (strValue.length === 2) {
                        objChangeResult.strNextId = "strEndAtMinutes";
                    }
                }
                else {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot };
                }
                break;
            case 'strEndAtMinutes':
                if (strValue === "" || (!isNaN(strValue) && objContext.TimeTableClassTime_ModuleProcessor.IsMinutesValid(strValue))) {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot, ["strEndAtMinutes"]: strValue };
                }
                else {
                    objChangeResult.objNewTimeTableSlot = { ...objTimeTableSlot };
                }
                break;
        }
        return objChangeResult;
    }

    /**
    * @name GetNextTextBoxIdToFocus
    * @param {String} strFieldName Field Name
    * @summary retruns the next html tag id to focus upon
    * @returns {string} Next Text box id name
    */
    GetNextTextBoxIdToFocus(strFieldName) {
        switch (strFieldName) {
            case 'strLessonType':
                return "strStartAtHour";
            case 'strStartAtHour':
                return "strStartAtMinutes";
            case 'strStartAtMinutes':
                return "strEndAtHour";
            case 'strEndAtHour':
                return "strEndAtMinutes";
            case 'strEndAtMinutes':
                return "";
        }
    }

    /**
    * @name DynamicValidations
    * @param {object} objContext Context object
    * @param {integer} intId Id
    * @param {String} strValue selected value from the dropdown
    * @param {string} strFieldName Field Name
    * @summary Check for valid entries in a check box
    * @returns {object} Validation object
    */
    DynamicValidations(objContext, intId, strValue, strFieldName, nextRef) {
        let blnFlag = false;
        let blnValueExceded = false;
        if (strFieldName === "strLessonType") {
            blnFlag = true;
        }
        else
            if (strValue.length > 2) {
                let strNextId = objContext.TimeTableClassTime_ModuleProcessor.GetNextTextBoxIdToFocus(strFieldName);
                if (strNextId !== "") {
                    strNextId = strNextId + '_' + intId;
                    //objContext.dispatch({ type: 'SET_STATE', payload: { "strInputTagIdToAutoFocus": strNextId } });
                    objContext.dispatch({ type: 'SET_STATE', payload: { "objInputTagIdToAutoFoucs": nextRef } });
                    blnValueExceded = true;
                }
            }
            else {
                strValue = strValue.substring(0, 2);
                if (!isNaN(strValue)) {
                    blnFlag = true;
                }
            }
        return { ValidationResult: blnFlag, IsValueExceded: blnValueExceded };
    }

    /**
    * @name HandleChangeSavedSlot
    * @param {object} objContext Context object
    * @param {integer} intId Id
    * @param {String} strValue selected value from the dropdown
    * @param {string} strFieldName Field Name
    * @summary   This method is triggerd whenever the select/input field in 'ViewTimeTableSlots' is changed. Calls 'ChangeData' to set the edited value to a object and then sets 'state.arrSavedTimeTableSlots' to the returned object.
    */
    HandleChangeSavedSlot(objContext, intId, strValue, strFieldName, ref, nextRef) {


        let objRefObjectValue = (ref !== null && ref !== undefined) ? ref.current : null;
        let objNextRefObjectValue = (nextRef !== null && nextRef !== undefined) ? nextRef.current : null;
        let arrTimeTableSlots = JSON.parse(JSON.stringify([...objContext.state.arrSavedTimeTableSlots]));
        let intIndex = arrTimeTableSlots.findIndex(slot => { return slot.intId === intId; });
        let objDynamicValidations = objContext.TimeTableClassTime_ModuleProcessor.DynamicValidations(objContext, intId, strValue, strFieldName);
        if (objDynamicValidations.ValidationResult) {
            let objChangedResult = {};
            if (strFieldName === "strLessonType") {
                objChangedResult = objContext.TimeTableClassTime_ModuleProcessor.ChangeData(objContext, strValue, strFieldName, arrTimeTableSlots[intIndex]);
            }
            else {
                objChangedResult = objContext.TimeTableClassTime_ModuleProcessor.ChangeData(objContext, strValue.substring(0, 2), strFieldName, arrTimeTableSlots[intIndex]);
            }
            arrTimeTableSlots[intIndex] = objChangedResult.objNewTimeTableSlot;
            if (objChangedResult.strNextId !== "") {
                if (strFieldName === "strLessonType") {
                    //objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrTimeTableSlots, "strInputTagIdToAutoFocus": objChangedResult.strNextId + '_' + intId, "strRemoveValidationBoxFromId": "", "strInvaidFieldId": "" } });
                    objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrTimeTableSlots, "objInputTagIdToAutoFoucs": objNextRefObjectValue, "objRemoveValidationBoxFromId": null, "objInvaidFieldId": null } });
                }
                else {
                    //objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrTimeTableSlots, "strInputTagIdToAutoFocus": objChangedResult.strNextId + '_' + intId, "strRemoveValidationBoxFromId": strFieldName + "_" + intId, "strInvaidFieldId": "" } });
                    objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrTimeTableSlots, "objInputTagIdToAutoFoucs": objNextRefObjectValue, "objRemoveValidationBoxFromId": objRefObjectValue, "objInvaidFieldId": null } });
                }
            }
            else {
                //objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrTimeTableSlots, "strInvaidFieldId": "", "strRemoveValidationBoxFromId": strFieldName + "_" + intId } });
                objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedTimeTableSlots": arrTimeTableSlots, "objInvaidFieldId": null, "objRemoveValidationBoxFromId": objRefObjectValue } });
            }
        }
        else {
            if (strFieldName !== "strLessonType" && !objDynamicValidations.IsValueExceded) {
                //objContext.dispatch({ type: 'SET_STATE', payload: { "strInvaidFieldId": strFieldName + "_" + intId, "strRemoveValidationBoxFromId": "" } });
                objContext.dispatch({ type: 'SET_STATE', payload: { "objInvaidFieldId": objRefObjectValue, "objRemoveValidationBoxFromId": null } });
            }
        }
    }

    /**
    * @name HandleChangeNewSlot
    * @param {object} objContext Context object
    * @param {integer} intId Id
    * @param {String} strValue selected value from the dropdown
    * @param {string} strFieldName Field Name
    * @summary This method is triggerd whenever the select/input field in 'AddTimeTableSlot' is changed. Sets 'state.arrNewTimeTableSlots' state to the changed values.
    */
    HandleChangeNewSlot(objContext, intId, strValue, strFieldName, ref, nextRef) {

        let objRefObjectValue = (ref !== null && ref !== undefined) ? ref.current : null;
        let objNextRefObjectValue = (nextRef !== null && nextRef !== undefined) ? nextRef.current : null;

        let arrTimeTableSlots = JSON.parse(JSON.stringify([...objContext.state.arrNewTimeTableSlots]));
        let intIndex = arrTimeTableSlots.findIndex(slot => { return slot.intId === intId; });
        let objDynamicValidations = objContext.TimeTableClassTime_ModuleProcessor.DynamicValidations(objContext, intId, strValue, strFieldName, nextRef);
        if (objDynamicValidations.ValidationResult) {
            let objChangedResult = {};
            if (strFieldName === 'strLessonType') {
                objChangedResult = objContext.TimeTableClassTime_ModuleProcessor.ChangeData(objContext, strValue, strFieldName, arrTimeTableSlots[intIndex]);
            }
            else {
                objChangedResult = objContext.TimeTableClassTime_ModuleProcessor.ChangeData(objContext, strValue.substring(0, 2), strFieldName, arrTimeTableSlots[intIndex]);
            }
            arrTimeTableSlots[intIndex] = objChangedResult.objNewTimeTableSlot;
            if (objChangedResult.strNextId !== "") {
                if (strFieldName === "strLessonType") {
                    //objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrTimeTableSlots, "strInputTagIdToAutoFocus": objChangedResult.strNextId + '_' + intId, "strRemoveValidationBoxFromId": "", "strInvaidFieldId": "" } });
                    objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrTimeTableSlots, "objInputTagIdToAutoFoucs": objNextRefObjectValue, "objRemoveValidationBoxFromId": null, "objInvaidFieldId": null } });
                }
                else {
                    //objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrTimeTableSlots, "strInputTagIdToAutoFocus": objChangedResult.strNextId + '_' + intId, "strRemoveValidationBoxFromId": strFieldName + "_" + intId, "strInvaidFieldId": "" } });
                    objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrTimeTableSlots, "objInputTagIdToAutoFoucs": objNextRefObjectValue, "objRemoveValidationBoxFromId": objRefObjectValue, "objInvaidFieldId": null } });
                }
            }
            else {
                //objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrTimeTableSlots, "strInvaidFieldId": "", "strRemoveValidationBoxFromId": strFieldName + "_" + intId } });
                objContext.dispatch({ type: 'SET_STATE', payload: { "arrNewTimeTableSlots": arrTimeTableSlots, "objInvaidFieldId": null, "objRemoveValidationBoxFromId": objRefObjectValue } });
            }
        }
        else {
            if (strFieldName !== "strLessonType" && !objDynamicValidations.IsValueExceded) {
                //objContext.dispatch({ type: 'SET_STATE', payload: { "strInvaidFieldId": strFieldName + "_" + intId, "strRemoveValidationBoxFromId": "" } });
                objContext.dispatch({ type: 'SET_STATE', payload: { "objInvaidFieldId": objRefObjectValue, "objRemoveValidationBoxFromId": null } });
            }
        }
    }

    /**
    * @name GetUserId
    * @param {object} props Props passed to the component
    * @summary gets userId  based on teacher or school by iApplicationTypeId
    * @returns {String} User Id
    */
    GetUserId(props) {
        let strUserId = props.ClientUserDetails.UserId;
        if (props.ClientUserDetails.ApplicationTypeId === "1") {
            strUserId = props.ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strUserId;
    }

    /**
     * @name GetMetaDataAddTimeTableSlotDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataAddTimeTableSlotDropdown() {
        return {
            DisplayColumn: "key",
            ValueColumn: "value"
        };
    }

    /**
     * @name GetResourceDataAddTimeTableSlotDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataAddTimeTableSlotDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataAddTimeTableSlotDropdown
    * @param {any} objContext objContext
    * @summary this function is clicked on click handler of the dropdown list items
    * @return {object} objEventBasics
    */
    GetEventsDataAddTimeTableSlotDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem, objEvent) => {
                objContext.TimeTableClassTime_ModuleProcessor.HandleChangeNewSlot(objContext, parseInt(objEvent.Id.split("_")[1]), objItem.value, "strLessonType");
            }
        };
    }

    /**
    * @name GetEventsDataViewTimeTableSlotDropdown
    * @param {any} objContext objContext
    * @summary this function is clicked on click handler of the dropdown list items
    * @return {object} objEventBasics
    */
    GetEventsDataViewTimeTableSlotDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem, objEvent) => {
                objContext.TimeTableClassTime_ModuleProcessor.HandleChangeSavedSlot(objContext, parseInt(objEvent.Id.split("_")[1]), objItem.value, "strLessonType", null, null);
            }
        };
    }

}

export default TimeTableClassTime_ModuleProcessor;