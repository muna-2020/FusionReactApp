//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @param {object} objData Data
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let objDataCopy = { ...props.Data.objData };//JSON.parse(JSON.stringify(objData));
    let objChooseTeacherMsg = {
        vFirstName: "Choose one",
        uTeacherId: '00000000-0000-0000-0000-000000000000'
    };
    let objChooseSubjectMsg = {
        t_TestDrive_Subject_Data: [{
            vSubjectName: "Choose one",
            iLanguageId: 3
        }],
        iSubjectId: -1
    };
    objDataCopy.arrTeacher = [objChooseTeacherMsg, ...objDataCopy.arrTeacher()];
    objDataCopy.arrSubjectData = [objChooseSubjectMsg, ...objDataCopy.arrSubjectData()];
    return {
        arrTeacher: objDataCopy.arrTeacher,
        arrColor: objDataCopy.arrColorData(),
        arrSubject: objDataCopy.arrSubjectData,
        arrDay: objDataCopy.arrDayData(),
        arrTimeTable: objDataCopy.arrTimeTableData(),
        arrClassGroup: objDataCopy.arrClassGroupData(),
        arrClassTime: objDataCopy.arrTimeData(),
        selColor: objDataCopy.arrColorData()[0],
        arrSegmentData: objDataCopy.arrSegmentData(),
        selSubject: objChooseSubjectMsg,
        selTeacher: objChooseTeacherMsg,
        selSchoolYearPeriod: objDataCopy.selSchoolYearPeriod,
        selClass: objDataCopy.selClass,
        selTimeForEdit: objDataCopy.selTimeForEdit,
        selDayForEdit: objDataCopy.selDayForEdit,
        blnShowColorPicker: false,
        blnInitialLoadComplete: false,
        arrTimeTableForDisplay: [],
        blnClickedSegment: false, // to remove cell border
        objTextResource: props.Resource.Text //objDataCopy.objTextResource
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/** 
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TimeTableSchedulePopUp_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}