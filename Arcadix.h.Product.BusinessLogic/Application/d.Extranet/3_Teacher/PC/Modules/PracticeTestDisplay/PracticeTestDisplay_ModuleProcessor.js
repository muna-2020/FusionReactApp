//Objects required for module.
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';

//Module Objects
import Extranet_Teacher_PracticeTestDisplay_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PractiseTestDisplay_Module';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name PracticeTestDisplay_ModuleProcessor
 * @summary Class for PracticeTestDisplay module display and manipulate.
 */
class PracticeTestDisplay_ModuleProcessor extends ExtranetBase_ModuleProcessor {
    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PracticeTestDisplay",
            "Object_Extranet_Pupil_Pupil",
            "Extranet_Teacher_PracticeTestDisplay_Module"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PracticeTestDisplay/PracticeTestDisplay.css"
        ];
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") === "Y";
        var strPupilId = "-1";
        var strClassId = "";

        if (blnIsPupil) {
            strPupilId = props.ClientUserDetails.UserId;
            let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClass => objClass["cIsDeleted"] === "N");
            strClassId = objClass.uClassId;
           
            let objPracticeTestParams = {
                "uClassId": strClassId,
                "iCycleTypeId": this.GetCycleTypeId(),
                "uPupilId": strPupilId,
                SearchQuery: {
                    must: [
                        {
                            match: {
                                "uPupilId": strPupilId
                            }
                        }
                    ]
                }
            };
            Extranet_Teacher_PracticeTestDisplay_Module.Initialize(objPracticeTestParams);
            arrDataRequest = [...arrDataRequest, Extranet_Teacher_PracticeTestDisplay_Module];
        }
        else {
            strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
            let objClassParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                    "Type": "nested"
                }
            };
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iStateId": iStateId
                            }
                        }
                    ]
                }
            };
            Object_Extranet_Teacher_Class.Initialize(objClassParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];
            Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];
        }

        //TextResource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/PracticeTestDisplay"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetPupilData 
     * @param {any} objContext objContext
     * @summary Gets Non Deleted Pupil Records from store for selected Class
     * @returns {Array} Returns filtered pupildata
     */
    GetPupilData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        let arrFilteredPupilData = arrPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] == strClassId && objTempClassPupil["cIsDeleted"] == "N").length > 0);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                ["strSelectedPupilId"]: "-1"
            }
        });
        return arrFilteredPupilData;
    }

    /**
     * @name GetClassDropDownData
     * @param {*} objContext objContext
     * @summary returns an array of classes to load in the drop down
     * @returns {*} array
     */
    GetClassDropDownData(objContext) {
        var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") == "Y";
        if (blnIsPupil) {
            return [];
        } else {
            let strTeacherId = global.ClientUserDetails.UserId;
            let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PracticeTestDisplay", objContext.props);
            let arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data
                .map((objClass) => {
                    return {
                        ...objClass,
                        ["t_TestDrive_Member_Class_Teacher"]:
                            objClass.t_TestDrive_Member_Class_Teacher
                                .filter(objClassTeacher =>
                                    objClassTeacher.cIsDeleted == "N")
                    }
                });
            let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
            arrTempClass.forEach((objClass) => {
                let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
                if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                    arrMainClassData = [...arrMainClassData, objTempClassData];
                }
                objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y") };
                if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                    arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
                }
                objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsSubjectExpert === "Y") };
                if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                    arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
                }
            }
            );
            let arrFinalClassData = [
                {
                    "Title": objTextResource["ClassDropDownMainClassTitle"],
                    "Data": arrMainClassData
                },
                {
                    "Title": objTextResource["ClassDropDownCoTeacherTitle"],
                    "Data": arrCoTeacherClassData
                },
                {
                    "Title": objTextResource["ClassDropDownSubjectExpertTitle"],
                    "Data": arrSubjectExpertClassData
                }
            ];
            return arrFinalClassData;
        }
    }

    /**
     * @name HandleOnChangeClassDropDown
     * @param {*} objContext objContext
     * @summary Triggers when the class dropdown selection changes
     */
    HandleOnChangeClassDropDown(objContext) {
        objContext.dispatch({
            type: "SET_STATE", payload: {
                ["blnClassChangedInDropdown"]: !objContext.state.blnClassChangedInDropdown,
                ["arrPracticeTestData"]: []
            }
        });
    }

    /**
     * @name HandleOnChangePupilDropDown
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Triggers when the pupil dropdown selection changes
     * 
     */
    HandleOnChangePupilDropDown(objContext, objItem) {
        objContext.dispatch({
            type: "SET_STATE", payload: {
                ["strSelectedPupilId"]: objItem.uPupilId
            }
        });
    }

    /**
     * @name GetCycleTypeId
     * @summary {*} String value of cycletypeid
     * @returns {*} returns a string 
     * */
    GetCycleTypeId() {
        return "4";
    }

    /**
    * @name GetPupilMetaData
    * @summary Gets the meta data for Pupil
    * @returns {object} Meta data objects for Pupil dropdown
    */
    GetPupliDropdownMetaData() {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uPupilId",
            IsLanguageDependent: "N"
        };
    }

    /**
    * @name GetPupilDropdownData
    * @param {Array} arrSchoolYearPeriodData Pupil
    * @summary Gets the data for Pupil
    * @returns {object} Meta objects for Pupil dropdown
    */
    GetPupilDropdownData(objContext) {
        return {
            DropdownData: objContext.state.arrPupilData,
            SelectedValue: objContext.state.strSelectedPupilId
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name GetPupilDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Pupil dropdown.
    * @returns {object} objEventBasics
    */
    GetPupilDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.HandleOnChangePupilDropDown(objContext, objItem)
        };
    }

    /**
   * @name GetFillHeightMetaData
   * @summary it returns the object of metadatas
   * @returns {array} MetaData
   */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "PupilHeader"],
            FooterIds: ["bottomSpacing", "bgFooter"]
        };
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

export default PracticeTestDisplay_ModuleProcessor;