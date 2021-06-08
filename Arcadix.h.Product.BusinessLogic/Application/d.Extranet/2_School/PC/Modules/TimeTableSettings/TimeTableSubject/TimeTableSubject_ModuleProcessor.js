/**
* @name TimeTableSubject_ModuleProcessor
* @summary Class for TimeTableSubject module display and manipulate.
*/
class TimeTableSubject_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_School_SchoolSubject"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this,objContext.props);
    }

    /**
    * @name GetSchoolSubjectJson
    * @param {object} objContext Context object
    * @summary  Gets the data from entity reducer and returns array with school subject data.
    * @returns {Array} Formatted Subjects
    */
    GetSchoolSubjectJson(objContext) {
        let arrDefaultSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N").Data;
        let arrSchoolSubjects = DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + objContext.TimeTableSubject_ModuleProcessor.GetUserId(objContext.props) + ";cIsDeleted;N").Data;
        
        arrSchoolSubjects = arrSchoolSubjects.filter(subject => { return subject.cIsDeleted === "N"; });
        let arrSubjects = [];
        let arrFilteredSubjects = arrDefaultSubjects.filter(x => x["cIsTestedAtThisTime"] == "Y");
        if (arrFilteredSubjects.length > 0) {
            arrSubjects = [...arrFilteredSubjects];
        }
        if (arrSchoolSubjects.length > 0) {
            if (arrSubjects.length > 0) {
                arrSubjects = [...arrSubjects, ...arrSchoolSubjects];
            }
            else {
                arrSubjects = [...arrSchoolSubjects];
            }
        }
        let arrFormattedSubjects = [...objContext.TimeTableSubject_ModuleProcessor.GetRequiredJsonFromRawData(objContext, [...arrSubjects])];
        return [...arrFormattedSubjects];
    }

    /**
    * @name GetRequiredJsonFromRawData
    * @param {object} objContext Context object
    * @param {Array} arrData Data
    * @summary Creates Json data according to the component to display
    * @returns {Array} Subject Data
    */
    GetRequiredJsonFromRawData(objContext, arrData) {
        let arrSubjectData = [];
        for (let intCount = 0; intCount < arrData.length; intCount++) {
            let objSubjectDataTemp = arrData[intCount]["t_TestDrive_Subject_Data"].filter(objSubjectData => { return objSubjectData.iLanguageId === parseInt(objContext.props.JConfiguration.InterfaceLanguageId); })[0];
            arrSubjectData[intCount] = {
                "intId": intCount + 1,
                "intSubjectId": arrData[intCount].iSubjectId,
                "intDisplayOrder": arrData[intCount].iDisplayOrder === null ? intCount : arrData[intCount].iDisplayOrder,
                "blnIsDeleted": arrData[intCount].cIsDeleted === "Y" ? true : false,
                "blnIsSchoolSubject": arrData[intCount].cIsSchoolSubject === "Y" ? true : false,
                "intLanguageId": objSubjectDataTemp.iLanguageId,
                "strSubjectName": objSubjectDataTemp.vSubjectName,
                "strSubjectAbbreviation": objSubjectDataTemp.vSubjectShortName,
                "blnIsEdited": false
            };
        }
        return arrSubjectData;
    }

    /**
    * @name HandleAddRow
    * @param {object} objContext Context object
    * @summary Adds a new subject adding tray to th UI. Calls 'InitializeTempNewSubject' to get initial subject details and generates a new ID for the subject to be added. Sets the states accordingly.Invoked by the 'ADD' button.
    */
    HandleAddRow(objContext) {
        if (!objContext.state.blnAddRow) {
            let objTempNewSubject = {
                'intId': 1,
                "intSubjectId": null,
                "intDisplayOrder": 1,
                "blnIsDeleted": false,
                "blnIsSchoolSubject": true,
                "intLanguageId": parseInt(objContext.props.JConfiguration.InterfaceLanguageId),
                "strSubjectName": "",
                "strSubjectAbbreviation": "",
                "blnIsEdited": false
            };
            if (objContext.state.arrSavedSubjects !== undefined && objContext.state.arrSavedSubjects.length > 0) {
                objTempNewSubject.intId = objContext.state.arrSavedSubjects[objContext.state.arrSavedSubjects.length - 1].intId + 1;
                objTempNewSubject.intDisplayOrder = objContext.state.arrSavedSubjects[objContext.state.arrSavedSubjects.length - 1].intDisplayOrder + 1;
            }
            objContext.dispatch({ type: 'SET_STATE', payload: { "objNewSubject": objTempNewSubject, "objSubjectToEdit": {}, "strOperation": "save", "blnAddRow": true, "blnEditRow": false } });
        }
    }

    /**
    * @name HandleReset
    * @param {object} objContext Context object
    * @summary Resets the component to the last saved state by reseting the values in the state to their initial state.
    */
    HandleReset(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrSavedSubjects": objContext.TimeTableSubject_ModuleProcessor.GetSchoolSubjectJson(objContext), "objNewSubject": {}, "objSubjectToEdit": {}, "strOperation": "", "blnAddRow": false, "blnEditRow": false, "blnReset": true } });
    }

    /**
    * @name HandleEdit
    * @param {object} objContext Context object
    * @param {Integer} intId Id
    * @summary   Initialize 'objSubjectToEdit' with the subject details to be editted and 'intSubjectIdToEdit' with the id of the subject and sets other states accordingly.
    */
    HandleEdit(objContext, intId) {
        if (!objContext.state.blnAddRow) {
            let objTempSubject = Object.assign({}, objContext.state.arrSavedSubjects.filter(subject => { return subject.intId === intId; })[0]);
            objTempSubject.blnIsEdited = true;
            objContext.dispatch({ type: 'SET_STATE', payload: { "objSubjectToEdit": objTempSubject, "strOperation": "edit", "blnEditRow": true } });
        }
    }

    /**
    * @name HandleDelete
    * @param {object} objContext Context object
    * @param {Integer} intId Id
    * @summary Delete's the subject from the store and set states accordingly. Called by 'DELETE' button.
    */
    HandleDelete(objContext, intId) {
        let intIndex = objContext.state.arrSavedSubjects.findIndex(slot => { return slot.intId === intId; });
        let objFilteredSubject = Object.assign({}, objContext.state.arrSavedSubjects[intIndex]);
        objFilteredSubject.blnIsDeleted = true;
        objContext.TimeTableSubject_ModuleProcessor.CleanUpAndSaveData(objContext, objFilteredSubject);
    }

    /**
    * @name FormatData
    * @param {object} objContext Context object
    * @param {object} objSubject Subject
    * @summary Delete's the subject from the store and set states accordingly. Called by 'DELETE' button.
    * @returns {object} SubjectToSave
    */
    FormatData(objContext, objSubject) {
        let objSubjectToSave = {
            "iSubjectId": objSubject.intSubjectId,
            "iDisplayOrder": objSubject.intDisplayOrder,
            "cIsDeleted": objSubject.blnIsDeleted ? "Y" : "N",
            "cIsSchoolSubject": objSubject.blnIsSchoolSubject ? "Y" : "N",
            "uUserId": objContext.TimeTableSubject_ModuleProcessor.GetUserId(objContext.props),
            "uSchoolId": objContext.TimeTableSubject_ModuleProcessor.GetUserId(objContext.props),
            "t_TestDrive_Subject_Data": [{
                "iLanguageId": objSubject.intLanguageId,
                "vSubjectName": objSubject.strSubjectName,
                "vSubjectShortName": objSubject.strSubjectAbbreviation
            }]
        };
        return objSubjectToSave;
    }

    /**
    * @name CleanUpAndSaveData
    * @param {object} objContext Context object
    * @param {object} objSubject Subject
    * @summary Requests 'CleanData' method and sets the retuned data to redux store. This method is invoked by the 'Subject' component.
    */
    CleanUpAndSaveData(objContext, objSubject) {
        let objFormattedSubject = objContext.TimeTableSubject_ModuleProcessor.FormatData(objContext, objSubject);
        let objCallParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.TimeTableSubject_ModuleProcessor.GetUserId(objContext.props)
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objSubject.blnIsEdited) {
            objCallParams = { ...objCallParams, ["vEditData"]: objFormattedSubject };
            objContext.props.Object_Extranet_School_SchoolSubject.EditData(objCallParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        else if (objSubject.blnIsDeleted) {
            objCallParams = { ...objCallParams, ["vDeleteData"]: objFormattedSubject };
            objContext.props.Object_Extranet_School_SchoolSubject.DeleteData(objCallParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        else {
            objCallParams = { ...objCallParams, ["vAddData"]: objFormattedSubject };
            objContext.props.Object_Extranet_School_SchoolSubject.AddData(objCallParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    }

    /**
    * @name ValidateData
    * @param {Integer} intToggle Toggle value
    * @param {object} objSubject Subject
    * @summary Validates the subject details before saving it. Returns a JSON object. Called by 'HandleSave' method.
    * @returns {object} ValidateResult object
    */
    ValidateData(intToggle, objSubject, arrSavedSubjects, nameRef, abbreviationRef) {
        let arrResult = [];
        let intSavedSubjectIndex = null;
        let objValidateResult = {
            'blnIsDataValid': true,
            'arrErrors': []
        };

        if (intToggle === 1) {
            arrSavedSubjects.map((objSubject, index) => {
                if (objSubject["intSubjectId"] === objSubject["intSubjectId"])
                    intSavedSubjectIndex = index;
            })
        }

        if (objSubject.strSubjectName === "") {
            if (intToggle === 1) {
                arrResult = [...arrResult, { 'strErrorAtId': "e_subName", 'objErrorAtId': nameRef.current[intSavedSubjectIndex] }];
                objValidateResult.blnIsDataValid = false;
            }
            else {
                arrResult = [...arrResult, { 'strErrorAtId': "subjectName", 'objErrorAtId': nameRef }];
                objValidateResult.blnIsDataValid = false;
            }
        }
        if (objSubject.strSubjectAbbreviation === "") {
            if (intToggle === 1) {
                arrResult = [...arrResult, { 'strErrorAtId': "e_subAbbreviation", 'objErrorAtId': abbreviationRef.current[intSavedSubjectIndex] }];
                objValidateResult.blnIsDataValid = false;
            }
            else {
                arrResult = [...arrResult, { 'strErrorAtId': "subjectAbbreviation", 'objErrorAtId': abbreviationRef  }];
                objValidateResult.blnIsDataValid = false;
            }
        }
        objValidateResult.arrErrors = arrResult;
        return objValidateResult;
    }

    /**
    * @name GetUserId
    * @param {object} props Passed props
    * @summary gets userId  based on teacher or school by iApplicationTypeId
    * @returns {String} UserId
    */
    GetUserId(props) {
        let strUserId = props.ClientUserDetails.UserId;
        if (props.ClientUserDetails.ApplicationTypeId == "1") {
            strUserId = props.ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strUserId;
    }
}

export default TimeTableSubject_ModuleProcessor;