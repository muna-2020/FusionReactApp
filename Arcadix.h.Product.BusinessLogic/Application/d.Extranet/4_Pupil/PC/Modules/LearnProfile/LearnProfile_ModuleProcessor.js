//Module object imports.
import Extranet_Pupil_LearnProfile_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/LearnProfile/LearnProfile_Module';

//component related files
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";

/**
* @name LearnProfile_ModuleProcessor
* @summary Class for LearnProfile_ModuleProcessor module display and manipulate.
*/
class LearnProfile_ModuleProcessor extends ExtranetBase_ModuleProcessor {

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
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/LearnProfile",
            "Extranet_Pupil_LearnProfile_Module"
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
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/4_Pupil/Modules/LearnProfile"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //LearnProfile
        let objLearnProfile = {
            "uPupilId": ClientUserDetails.UserId,
            "uClassId": this.GetClassId(),
            "uTeacherId": this.GetTeacherId(), //Get from ClientUserDetails
            "uSchoolId": this.GetSchoolId(),
            "iStateId": this.GetStateId(),
            "iCycleTypeId": this.strCycleTypeId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    }
                ]
            }
        };
        Extranet_Pupil_LearnProfile_Module.Initialize(objLearnProfile);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_LearnProfile_Module];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/LernProfil/LernProfil.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
        ];
    }

    /**
    * @name GetClassId 
    * @summary returns the pupil class id.
    * @returns {String} class id
    */
    GetClassId() {
        //let strClassId = ApplicationState.GetProperty("SelectedClassId");
        //let objClass = ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["uClassId"] == strClassId);
        //return objClass["uClassId"];
        return ApplicationState.GetProperty("SelectedClassId");
    }

    /**
    * @name GetClassId 
    * @summary returns the pupil class id.
    * @returns {String} class id
    */
    GetTeacherId() {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objClass = ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["uClassId"] == strClassId);
        return objClass["uTeacherId"];
    }

    /**
    * @name GetSchoolId
    * @summary returns the school class id.
    * @returns {String} school id
    */
    GetSchoolId() {
        return ApplicationState.GetProperty("SelectedSchoolId");
        //let objClass = ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil.find(cls => cls["cIsDeleted"] == "N");
        //return objClass["uSchoolId"];
    }

    /**
    * @name GetStateId
    * @summary returns the pupil state id.
    * @returns {String} state id
    */
    GetStateId() {
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        let objSchool = ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil.find(cls => cls["uSchoolId"] == strSchoolId);
        return objSchool["iStateId"];
    }

    /**
    * @name OnChangeWeekDisplay
    * @param {object} objContext Passes Context object
    * @param {object} objItem Item returned on change of week display.
    * @summary Executes when week display is changed
    */
    OnChangeWeekDisplay(objContext, objItem) {

        if (objContext.state.blnMakeCall) {
            let arrDataRequest = [];
            let objLearnProfile = {
                "uPupilId": ClientUserDetails.UserId,
                "uClassId": this.GetClassId(),
                "uTeacherId": this.GetTeacherId(), //Get from ClientUserDetails
                "uSchoolId": this.GetSchoolId(),
                "iStateId": this.GetStateId(),
                "iCycleTypeId": this.strCycleTypeId,
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                            }
                        }
                    ]
                }
            };

            Extranet_Pupil_LearnProfile_Module.Initialize(objLearnProfile)
            arrDataRequest = [...arrDataRequest, Extranet_Pupil_LearnProfile_Module];
            ApplicationState.SetProperty("blnShowAnimation", true);
            (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { objSchoolYearPeriod: objItem, blnMakeCall: true } });
    }

    /**
    * @name FormLines
    * @param {object} objContext Context object
    * @param {Array} arrSubjectData SubjectData
    * @summary calculates and Form the lines array. And also modifies the array with the calculated x and y values for the line.
    * @returns {Array} Modified subject data
    */
    FormLines(objContext) {
        let intSubSubjectPadding = 20;
        let intTestLabelHeight = 25;

        let arrModifiedSubjectData = [];
        let arrTemp = [];
        let arrSubjectData = [];
        if (DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module, "Extranet_Pupil_LearnProfile_Module;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)) {
            arrSubjectData = DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module, "Extranet_Pupil_LearnProfile_Module;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        } else {
            if (DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module, "Extranet_Pupil_LearnProfile_Module;uSchoolYearPeriodId;"))
                arrSubjectData = DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module, "Extranet_Pupil_LearnProfile_Module;uSchoolYearPeriodId;")["Data"];
        }

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

                //intInitialHeight += intSubSubjectPadding;
                let arrResultTemp = [];
                if (arrResults.length > 0) {
                    arrResults.forEach(objTest => {

                        let strXforTestResult = objContext.LearnProfile_ModuleProcessor.CalculateXForResultTemp(objTest['strTestPoints'], objTest["Competency"]).toString();
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
    * @name CalculateXForResult
    * @param {Integer} intResult Result data
    * @param {Integer} intCompetency Competency data
    * @summary Calculates the X for result
    * @returns {Integer} Returns the X value.
    */
    CalculateXForResultTemp(intResult, intCompetency) {
        let intCompetencyInterval = 140;
        let intReturn = 285 + (intCompetency * intCompetencyInterval); //+ (intResult * intCompetencyInterval);
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
    * @name GetCircleRectDimensions
    * @param {object} objContext Context object
    *  @param {Integer} intSubSubjectIndex Sub subject index
    * @param {object} objTest Result
    * @param {Integer} intTestIndex Result index
    * @param {boolean} blnRctTestResult If calculation for the Rectangle's dimension is needed, then it must be set as true.
    * @summary Calculates the Circle and Rectangle dimensions
    * @returns {object} Returns the Circle and Rectangle dimensions.
    */
    GetCircleRectDimensions(objContext, intSubSubjectIndex, objTest, intTestIndex, blnRctTestResult = false) {
        let intSubSubjectPadding = 20;
        let intTestLabelHeight = 25;
        let intInitialHeight = 30;
        intInitialHeight = (intInitialHeight * (intSubSubjectIndex + 1)) + intSubSubjectPadding;// (intTestLabelHeight * (intTestIndex + 1));
        intInitialHeight = (intInitialHeight * (intTestIndex + 1)) + intTestLabelHeight;
        let strXforTestResult = objContext.LearnProfile_ModuleProcessor.CalculateXForResultTemp(objTest['strTestPoints'], objTest["Competency"]).toString();
        let strYforTest = (intInitialHeight + (intTestLabelHeight / 2)).toString();
        let cx = "67.5", cy = "110", r = "9", x = "828.9", y = "1", height = "20", width = "20";

        cx = strXforTestResult;
        cy = strYforTest;
        if (blnRctTestResult) {
            x = (parseFloat(strXforTestResult) - 9).toString();
            y = (parseFloat(strYforTest) - 9).toString();
        }
        if (intTestIndex == 0) {
            r = 13;
            if (blnRctTestResult) {
                x = (parseFloat(strXforTestResult) - 15).toString();
                y = (parseFloat(strYforTest) - 15).toString();
                height = 30;
                width = 30;
            }
        }

        return { cx, cy, r, x, y, height, width };
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
            "Components": ["Dropdown"],
            "Files": []
        }
    }
}

export default LearnProfile_ModuleProcessor;