//Module object imports.
import Extranet_Pupil_LearnProfile_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/LearnProfile/LearnProfile_Module';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Extranet_Teacher_ProgressReport from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_Module';

//component related files
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name PupilLearnProfile_ModuleProcessor
* @summary Class for PupilLearnProfile_ModuleProcessor module display and manipulate.
*/
class PupilLearnProfile_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * strCycleTypeId holds the cycle type id value. based cycle type id server cycle object will be used.
    */
    constructor() {
        super();
        this.strCycleTypeId = 1;
    }

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            "Extranet_Pupil_LearnProfile_Module", "Object_Extranet_Teacher_SchoolYearPeriod", "Extranet_Teacher_ProgressReport"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStyles
    * @summary Required for css
    * @returns {Array} arrStyles
    */
    GetDynamicStyles(props){
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/ProgressReport/ProgressBarChart/ProgressBarChart.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //LearnProfile
        let objLearnProfile = {
            //"uPupilId": ClientUserDetails.UserId,
            //"uClassId": this.GetClassId(),
            //"uTeacherId": this.GetTeacherId(), //Get from ClientUserDetails
            //"uSchoolId": this.GetSchoolId(),
            //"iStateId": this.GetStateId(),
            //"iCycleTypeId": this.strCycleTypeId
            "uPupilId": "2C277384-0D11-4CF0-A4AF-B01D9FABB148",
            "uClassId": "1E7935A6-2139-4126-88CE-C5A72523A38F",
            "uTeacherId": "4D8E8FEE-5D62-4422-810E-9072FB82689B",
            "uSchoolId": "6EA7B18B-09F8-4C1B-BFD5-2290F9933934",
            "iStateId": 437,
            "iCycleTypeId": "1"
        };
        Extranet_Pupil_LearnProfile_Module.Initialize(objLearnProfile);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_LearnProfile_Module];

        //SchoolYearPeriod
        let objSchoolYearPeriod = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriod);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        return arrDataRequest;
    }

    GetLearningTestStatistics(objContext) {
        let objTestStastic = {
            "iCycleTypeId": "3",
            "uPupilId": "C6319463-D682-4890-9675-D3D1110C498C",
            "uClassId": "27B44354-52E1-47E0-9990-B5DBF7F9AD95",
            "uSchoolYearPeriodId": "E6B3BB96-7D5C-4804-A9AF-E3F2FFB9B71D"
        };
        Extranet_Teacher_ProgressReport.GetLearningTestStatistics(objTestStastic, objResponse => {
            objContext.dispatch({ type: 'SET_STATE', payload: { arrTestStastics: objResponse.Extranet_Teacher_ProgressReport_Module["Data"] } });
            console.log("objResponse", objResponse.Extranet_Teacher_ProgressReport["Data"]);
        });
    }

    /**
    * @name GetClassId 
    * @param {object} props Props
    * @summary returns the pupil class id.
    * @returns {String} class id
    */
    GetClassId(props) {
        let objClass = props.Data.objSelectedClass;
        return objClass["uClassId"];
    }

    /**
    * @name GetClassId 
    * @summary returns the pupil class id.
    * @returns {String} class id
    */
    GetTeacherId() {
        let strTeacherId = ClientUserDetails.UserId;
        return strTeacherId;
    }

    /**
    * @name GetSchoolId
    * @summary returns the school class id.
    * @returns {String} school id
    */
    GetSchoolId() {
        let objSchool = ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School.find(cls => cls["cIsDeleted"] == "N");
        return objSchool["uSchoolId"];
    }

    /**
    * @name GetStateId
    * @summary returns the pupil state id.
    * @returns {String} state id
    */
    GetStateId() {
        let objClass = ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School.find(cls => cls["cIsDeleted"] == "N");
        return GetStateIdBasedOnSchool(objClass["uSchoolId"]);
    }

    /**
    * @name FormLines
    * @param {object} objContext Context object
    * @param {Array} arrSubjectData SubjectData
    * @summary Calculates and Form the lines array. And also modifies the array with the calculated x and y values for the line.
    * @returns {Array} Modified subject data
    */
    FormLines(objContext, arrSubjectData) {
        let intSubSubjectPadding = 20;
        let intTestLabelHeight = 25;
        let arrModifiedSubjectData = [];
        let arrTemp = [];

        arrSubjectData.map(objSubjectData => {
            let arrSubSubjects = [];
            objSubjectData["SubSubjects"].map(objSubSubjectData => {
                let arrResults = objSubSubjectData["Results"];
                let arrLines = [];
                for (var i = 1; i < arrResults.length; i++) {
                    arrLines.push({
                        'uLineId': GetUniqueId(),
                        'uTestTokenId1': arrResults[i - 1]["uTestTokenId"],
                        'uTestTokenId2': arrResults[i]["uTestTokenId"]
                    });
                }
                arrSubSubjects = [...arrSubSubjects, { ...objSubSubjectData, "Lines": arrLines }];
            });
            arrModifiedSubjectData = [...arrModifiedSubjectData, { ...objSubjectData, "SubSubjects": arrSubSubjects }];
        });

        arrModifiedSubjectData.forEach(objSubject => {
            let intInitialHeight = 30;
            let arrSubSubjectsTemp = [];
            objSubject["SubSubjects"].forEach(objSubSubject => {
                let arrResults = objSubSubject["Results"];
                intInitialHeight = intInitialHeight + intSubSubjectPadding;

                let arrResultTemp = [];
                if (arrResults.length > 0) {
                    arrResults.forEach(objTest => {

                        let strXforTestResult = objContext.PupilLearnProfilePopup_ModuleProcessor.CalculateXForResult(objTest['strTestPoints'], objTest["Competency"]).toString();
                        let strYforTest = (intInitialHeight + (intTestLabelHeight / 2)).toString();

                        let x = strXforTestResult;
                        let y = strYforTest;

                        objTest["x"] = strXforTestResult;
                        objTest["y"] = strYforTest;
                        intInitialHeight = intInitialHeight + intTestLabelHeight;
                        arrResultTemp = [...arrResultTemp, { ...objTest, x, y }];
                    });
                }
                else {
                    intInitialHeight = intInitialHeight + intTestLabelHeight;
                }
                intInitialHeight = intInitialHeight + intSubSubjectPadding;
                arrSubSubjectsTemp = [...arrSubSubjectsTemp, { ...objSubSubject, "Results": arrResultTemp }];
            });
            arrTemp = [...arrTemp, { ...objSubject, "SubSubjects": arrSubSubjectsTemp }];
        });

        return arrTemp;
    }

    /**
    * @name GetTestCount
    * @param {object} objSubject Subject
    * @summary calculates the test count
    * @returns {String} Test count
    */
    GetTestCount(objSubject) {
        let intCount = 0;
        objSubject["SubSubjects"].map(objSubSubject => {
            intCount = intCount + objSubSubject["Results"].length;
        });

        return intCount.toString();
    }

    /**
    * @name GetCurrentDate
    * @summary Formats the current date in dd.mm.yyyy
    * @returns {String} current formated date
    */
    GetCurrentDate() {
        let objDay = new Date();
        let strDay = objDay.getDate();
        let strMonth = objDay.getMonth() + 1; //January is 0!
        let strYear = objDay.getFullYear();

        strDay = strDay < 10 ? '0' + strDay : strDay;
        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;

        return strDay + '.' + strMonth + '.' + strYear;
    }

    /**
    * @name GetFormattedDate
    * @param {String} strDate Date
    * @summary Formats the passed date in dd.mm.yyyy
    * @returns {String} current formated date
    */
    GetFormattedDate(strDate) {
        let objDay = new Date(strDate);
        let strDay = objDay.getDate();
        let strMonth = objDay.getMonth() + 1; //January is 0!
        let strYear = objDay.getFullYear();

        strDay = strDay < 10 ? '0' + strDay : strDay;
        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;

        return strDate ? strDay + '.' + strMonth + '.' + strYear : "";
    }

    /**
    * @name GetFormattedDate
    * @param {String} strDate Date
    * @summary Formats the passed date in dd.mm.yyyy
    * @returns {String} current formated date
    */
    GetFormattedDateBySlash(strDate) {
        let objDay = new Date(strDate);
        let strDay = objDay.getDate();
        let strMonth = objDay.getMonth() + 1; //January is 0!
        let strYear = objDay.getFullYear();

        strDay = strDay < 10 ? '0' + strDay : strDay;
        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;

        return strDate ? strDay + '/' + strMonth + '/' + strYear : "";
    }

    /**
    * @name GetSchoolYear
    * @param {object} objContext Context object
    * @summary Gets the school year using the selected class
    * @returns {String} School year
    */
    GetSchoolYear(objContext) {
        let arrSchoolYearPeriod = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let objSelectedClass = objContext.props.Data.objSelectedClass;
        let arrSchoolYearPeriodData = arrSchoolYearPeriod.find(objSchoolYearPeriod => objSchoolYearPeriod["uSchoolYearPeriodId"] == objSelectedClass["uSchoolYearPeriodId"])["t_TestDrive_Member_Class_SchoolYearPeriod_Data"];
        return arrSchoolYearPeriodData.find(objSchoolYearPeriodData => objSchoolYearPeriodData["iLanguageId"].toString() == JConfiguration.InterfaceLanguageId)["vSchoolYearName"];
    }

    /**
    * @name GetIntervalsForSubjects
    * @param {object} objParentSubject ParentSubject Test statistics
    * @summary Calculates the intervals for each subjects
    * @returns {Array} returns the intervals
    */
    GetIntervalsForSubjects(objParentSubject) {
        let intMaxTaskCount = 0;

        objParentSubject["SubSubjectDetails"].forEach(objParentSubject => {
            objParentSubject["SubSubjectRepetionRoundList"].forEach(objRound => {
                let intCurrentTaskCount = objRound['NotAttemptedTasks'] + objRound['WrongTasks'] + objRound['PartiallyCorrectTasks'] + objRound['CorrectTasks'];
                if (intMaxTaskCount < intCurrentTaskCount) {
                    intMaxTaskCount = intCurrentTaskCount;
                }
            });
        });

        let intInterval = 1;
        if (intMaxTaskCount > 0 && intMaxTaskCount <= 10) {
            intInterval = 0.1;
        }
        else if (intMaxTaskCount > 10 && intMaxTaskCount <= 20) {
            intInterval = 0.2;
        }
        else if (intMaxTaskCount > 20 && intMaxTaskCount <= 50) {
            intInterval = 0.5;
        }
        else if (intMaxTaskCount > 50 && intMaxTaskCount <= 500) {
            intInterval = Math.ceil(intMaxTaskCount / 50) * 0.5;
        }
        else if (intMaxTaskCount > 500) {
            intInterval = Math.ceil(intMaxTaskCount / 100);
        }

        let arrInterval = [];
        for (var i = 1; i <= 11; i++) {
            arrInterval = [...arrInterval, Math.round(i * intInterval * 10)];
        }

        return arrInterval;
    }

    /**
    * @name GetCircleRectDimensions
    * @param {object} objContext Context object
    * @param {object} objResult Result
    * @param {Integer} intResultIndex Result index
    * @param {Integer} intSubSubjectIndex Sub subject index
    * @param {boolean} blnRctTestResult If calculation for the Rectangle's dimension is needed, then it must be set as true.
    * @summary Calculates the Circle and Rectangle dimensions
    * @returns {object} Returns the Circle and Rectangle dimensions.
    */
    GetCircleRectDimensions(objContext, objResult, intResultIndex, intSubSubjectIndex, blnRctTestResult = false) {
        let intSubSubjectPadding = 20;
        let intTestLabelHeight = 25;
        let intInitialHeight = 30;
        intInitialHeight = (intInitialHeight * (intSubSubjectIndex + 1)) + intSubSubjectPadding;
        intInitialHeight = (intInitialHeight * (intResultIndex + 1)) + intTestLabelHeight;

        let strXforTestResult = objContext.PupilLearnProfilePopup_ModuleProcessor.CalculateXForResult(objResult['strTestPoints'], objResult["Competency"]).toString();
        let strYforTest = (intInitialHeight + (intTestLabelHeight / 2)).toString();
        let cx = "67.5", cy = "110", x = "828.9", r = "9", y = "1", height = "20", width = "20";

        cx = strXforTestResult;
        cy = strYforTest;
        if (blnRctTestResult) {
            x = (parseFloat(strXforTestResult) - 9).toString();
            y = (parseFloat(strYforTest) - 9).toString();
        }
        if (intResultIndex == 0) {
            r = "13";
            if (blnRctTestResult) {
                x = (parseFloat(strXforTestResult) - 15).toString();
                y = (parseFloat(strYforTest) - 15).toString();
                height = "30";
                width = "30";
            }
        }

        return { cx, cy, x, r, y, height, width };
    }

    /**
    * @name CalculateXForResult
    * @param {Integer} intResult Result data
    * @param {Integer} intCompetency Competency data
    * @summary Calculates the X for result
    * @returns {Integer} Returns the X value.
    */
    CalculateXForResult(intResult, intCompetency) {
        let intCompetencyInterval = 140;
        let intReturn = 300 + (intCompetency * intCompetencyInterval); //+ (intResult * intCompetencyInterval);
        return intReturn.toString();
    }

    /**
    * @name GetLineDimensions
    * @param {object} objLine Line 
    * @param {Array} arrResults Result data
    * @summary Gets the dimensions for the lines.
    * @returns {object} Returns an object with keys having value for x1, y1 and x2, y2
    */
    GetLineDimensions(objLine, arrResults) {
        let objFirstTest = arrResults.filter(x => x["uTestTokenId"] == objLine["uTestTokenId1"])[0];
        let objSecondTest = arrResults.filter(x => x["uTestTokenId"] == objLine["uTestTokenId2"])[0];
        let x1 = "67.5", y1 = "110", x2 = "67.5", y2 = "82";
        x1 = objFirstTest["x"];
        x2 = objSecondTest["x"];
        y1 = objFirstTest["y"];
        y2 = objSecondTest["y"];
        return { x1, y1, x2, y2 };
    }

    /**
    * @name GetTableHeight
    * @param {object} objSubject Subject
    * @summary Calculates the heights for Table and svg
    * @returns {String} Returns the hrights for Table and svg
    */
    GetTableHeight(objSubject) {
        let intSubSubjectPadding = 20;
        let intTestLabelHeight = 25;

        let intIntialHeight = 30;
        objSubject["SubSubjects"].forEach(objSubSubject => {
            let arrResults = objSubSubject["Results"];
            intIntialHeight = intIntialHeight + intSubSubjectPadding;

            if (arrResults.length > 0) {
                arrResults.forEach(objTest => {
                    intIntialHeight = intIntialHeight + intTestLabelHeight;
                });
            } else {
                intIntialHeight = intIntialHeight + intTestLabelHeight;
            }
            intIntialHeight = intIntialHeight + intSubSubjectPadding;
        });
        return intIntialHeight.toString();
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default PupilLearnProfile_ModuleProcessor;