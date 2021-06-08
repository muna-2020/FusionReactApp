//Module specific imports
import MovePupilPopUp_Module from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_Module';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';

class MovePupilPopUp_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of store objects used in the module
    * @returns {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Extranet_Teacher_Teacher", "Object_Extranet_School_School", "Object_Extranet_Pupil_Pupil", "Object_Extranet_School_School", "Object_Extranet_State_State"];
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
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        if (JConfiguration.ApplicationTypeId === "6") {
            let objSchoolParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iMainClientId": ClientUserDetails.MainClientId
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "vFirstName": {
                            "order": "asc"
                        }
                    }
                ],
                "OutputColumns": ["vName", "vFirstName", "uSchoolId", "vTown", "dtModifiedOn"]
            };

            Object_Extranet_School_School.Initialize(objSchoolParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

            let objStateParams = {
                "SearchQuery": {
                    "must": [
                        {
                            match: {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "vFirstName": {
                            "order": "asc"
                        }
                    }
                ],
                "OutputColumns": ["iStateId", "vName", "vFirstName", "dtModifiedOn"]
            };

            Object_Extranet_State_State.Initialize(objStateParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];
        }
        return arrDataRequest;
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/MovePupilPopUp.css"
        ];
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
     * @name SchoolDataLoaded
     * @param {any} objContext objContext
     * @summary Loads school data
     * @returns {*} returns boolean value
     */
    SchoolAndStateDataLoaded(objContext) {
        let blnDataLoaded = false;
        if (JConfiguration.ApplicationTypeId === "6") {
            if (DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;iMainClientId;" + ClientUserDetails.MainClientId + ";cIsDeleted;N") &&
                DataRef(objContext.props.Object_Extranet_State_State, "Object_Extranet_State_State;cIsDeleted;N")
            ) {
                blnDataLoaded = true;
            }
        } else {
            blnDataLoaded = true;
        }
        return blnDataLoaded;
    }

    /**
     * @name GetTeachers
     * @param {*} objContext objContext
     * @summary Returns an array of teachers. 
     * @returns {*} array
     */
    GetTeachers(objContext) {
        let strSchoolId = objContext.state.objSelectedSchool ? objContext.state.objSelectedSchool["uSchoolId"] : ClientUserDetails.UserId;
        //let arrTempTeachers = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId).Data;
        let arrTempTeachers = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId + ";t_TestDrive_Member_Teacher_School.cIsDeleted;N").Data;

        let arrTeachers = [];
        if (arrTempTeachers) {
            arrTeachers = arrTempTeachers.map(objTempTeacher => {
                return {
                    ...objTempTeacher, ["t_TestDrive_Member_Teacher_School"]: objTempTeacher["t_TestDrive_Member_Teacher_School"]
                        .filter(objTempTeacherSchool => objTempTeacherSchool.cIsDeleted === 'N')
                };
            }).filter(objTempTeacher => objTempTeacher["t_TestDrive_Member_Teacher_School"].length > 0);
        }
        return arrTeachers;
    }

    /**
     * @name GetSchools
     * @param {any} objContext objContext
     * @summary Gets array of school
     * @returns {*} returns a list of schools
     */
    GetSchools(objContext) {
        return DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;iMainClientId;" + ClientUserDetails.MainClientId + ";cIsDeleted;N")["Data"];
    }

    /**
     * @name OnChangeSchoolDropDown 
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     * @summary updating state with selected school
     */
    OnChangeSchoolDropDown(objContext, objItem) {
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                "objSelectedSchool": objItem, "SelectedTeacherId": -1, "SelectedClassId": -1
            }
        });
    }

    /**
     * @name GetFilteredClass
     * @param {*} objContext objContext
     * @param {*} arrClassTeacher arrClassTeacher
     * @summary Returns the classes filtered on the basis of Main teacher and active teachers.
     * @returns {*} returns an array
     */
    GetFilteredClass(objContext, arrClassTeacher) {
        let arrTempClassTeacher = arrClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "N" });
        let arrClassTeachers = [];
        if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
            let arrTempTeachers = objContext.MovePupilPopUp_ModuleProcessor.GetTeachers(objContext);
            arrTempClassTeacher.forEach(objTempClassTeacher => {
                if (arrTempTeachers.filter(objTeacher => { return objTeacher.uTeacherId === objTempClassTeacher.uTeacherId; }).length > 0) {
                    arrClassTeachers = [...arrClassTeachers, objTempClassTeacher];
                }
            });
        }
        else
            if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
                arrClassTeachers = arrTempClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher["uTeacherId"] === ClientUserDetails.UserId; });
            }
        return arrClassTeachers;
    }

    /**
     * @name GetClasses
     * @param {*} objContext objContext
     * @param {*} strExcludeClassId strExcludeClassId
     * @param {*} uTeacherId uTeacherId
     * @summary Returns array of classes for school and teacher
     * @returns {*} returns an array
     */
    GetClasses(objContext, strExcludeClassId, uTeacherId) {
        let arrClasses = [];
        if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
            let strSchoolId = objContext.state.objSelectedSchool ? objContext.state.objSelectedSchool["uSchoolId"] : ClientUserDetails.UserId;
            let arrTempClasses = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + strSchoolId).Data;
            arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objContext.MovePupilPopUp_ModuleProcessor.GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"]) }; })
                .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0).filter(objTempClass => { return objTempClass.uClassId !== strExcludeClassId && objTempClass["t_TestDrive_Member_Class_Teacher"][0].uTeacherId === uTeacherId; });
        }
        else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            let arrTempClasses = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + ClientUserDetails.UserId).Data;
            arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objContext.MovePupilPopUp_ModuleProcessor.GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"]) }; })
                .filter(objTempClass => { return objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0 && objTempClass.uClassId !== strExcludeClassId && objTempClass["t_TestDrive_Member_Class_Teacher"][0].uTeacherId === ClientUserDetails.UserId; });
        }
        return arrClasses;
    }

    /**
     * @name HandleOnCheckBoxItemChange
     * @param {*} objContext objContext
     * @param {*} strValue strValue
     * @param {*} isChecked isChecked
     * @summary Triggers when the check box selection changes
     */
    HandleOnCheckBoxItemChange(objContext, strValue, isChecked) {
        if (strValue === "AllPupil" && isChecked) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": true, "arrSelectedPupil": [], "strValidationMessage": "" } })
        }
        else if (strValue === "AllPupil" && !isChecked) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": false, "arrSelectedPupil": [], "strValidationMessage": "" } })
        }
        else if (strValue !== "AllPupil" && isChecked) {
            let arrTempSelectedPupil = [strValue, ...objContext.state.arrSelectedPupil];
            let isAllSelected = arrTempSelectedPupil.length == objContext.state.arrPupilData.length;
            objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": isAllSelected, "arrSelectedPupil": arrTempSelectedPupil, "strValidationMessage": "" } })
        }
        else if (strValue !== "AllPupil" && !isChecked) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": false, "arrSelectedPupil": objContext.state.arrSelectedPupil.filter(pupil => { return pupil !== strValue }), "strValidationMessage": "" } })
        }
        if (objContext.state.objValidationResult["ValidatedField"] === "pupilSelection") {
            let objValidationResult = {
                "IsValid": true,
                "ValidatedField": "",
                "ValidationMessage": ""
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationResult": objValidationResult } });
        }
    }

    /**
     * @name HandleOnChangeTeacherDropDown
     * @param {*} objContext objContext
     * @param {*} objTeacherData objTeacherData
     * @summary Triggers when the teacher dropdown selection changes
     */
    HandleOnChangeTeacherDropDown(objContext, objTeacherData) {
        let arrClasses = objContext.MovePupilPopUp_ModuleProcessor.GetClasses(objContext, objContext.props.Data.PresentClass.uClassId, objTeacherData.uTeacherId);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrClassData": arrClasses, "SelectedTeacherId": objTeacherData.uTeacherId, "SelectedClassId": -1 } });
    }

    /**
     * @name HandleOnChangeClassDropDown
     * @param {*} objContext objContext
     * @param {*} objClassData objClassData
     * @summary Triggers when the class dropdown selection changes
     */
    HandleOnChangeClassDropDown(objContext, objClassData) {
        if (objContext.state.objValidationResult["ValidatedField"] === "div_classDropdown") {
            let objValidationResult = {
                "IsValid": true,
                "ValidatedField": "",
                "ValidationMessage": ""
            };
            objContext.dispatch({ type: "SET_STATE", payload: { "SelectedClassId": objClassData.uClassId, "objValidationResult": objValidationResult } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "SelectedClassId": objClassData.uClassId } });
        }
    }

    /**
     * @name CheckIdAllConditionsAreSatisfiedForMovingPupil
     * @param {*} objContext objContext
     * @summary Checks if all the conditions are staisfied for moving the pupil
     * @returns {*} returns json object.
     */
    CheckIdAllConditionsAreSatisfiedForMovingPupil(objContext) {
        let objTextResource = objContext.props.Resource.Text;
        if (objContext.state.SelectedClassId !== -1) {
            if (objContext.state.arrSelectedPupil.length > 0) {
                return {
                    "IsValid": true,
                    "ValidatedField": "",
                    "ValidationMessage": ""
                };
            }
            else {
                return {
                    "IsValid": false,
                    "ValidatedField": "pupilSelection",
                    "ValidationMessage": Localization.TextFormatter(objTextResource, 'MovePupilPopUpNoPupilSelectedErrorText')
                };
            }
        }
        else {
            return {
                "IsValid": false,
                "ValidatedField": "div_classDropdown",
                "ValidationMessage": Localization.TextFormatter(objTextResource, 'NoStudentsMarked')
            };
        }
    }

    /**
    * @name GetTargetSchoolId
    * @param {any} objContext objContext
    * @summary Get the selected School id based on applicationtype id
    * @returns {*} returns a string
    */
    GetTargetSchoolId(objContext) {
        let strSchoolId = "";
        if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
            strSchoolId = objContext.state.objSelectedSchool ? objContext.state.objSelectedSchool.uSchoolId : ClientUserDetails.UserId;
        } else {
            strSchoolId = ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strSchoolId;
    }

    /**
     * @name GetSchoolIdByApplicationType
     * @param {any} props props
     * @summary Get the selected School id based on applicationtype id
     * @returns {*} returns a string
     */
    GetSchoolIdByApplicationType(props) {
        let strUserId = ClientUserDetails.UserId;
        if (ClientUserDetails.ApplicationTypeId === "1") {
            strUserId = ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strUserId;
    }

    /**
     * @name GetTargetTeacherId
     * @param {any} objContext objContext
     * @summary Get the selected teacher id based on applicationtype id
     * @returns {*} returns a string
     */
    GetTargetTeacherId(objContext) {
        let { props } = objContext;
        let strUserId = ClientUserDetails.UserId;
        if (ClientUserDetails.ApplicationTypeId === "6") {
            strUserId = objContext.state.SelectedTeacherId;
        }
        return strUserId;
    }

    /**
     * @name MovePupil
     * @param {*} objContext objContext
     * @summary Creates call parameters to Move pupil and calls the API.
     */
    MovePupil(objContext) {
        let objValidationResult = objContext.MovePupilPopUp_ModuleProcessor.CheckIdAllConditionsAreSatisfiedForMovingPupil(objContext);
        if (objValidationResult["IsValid"]) {
            let arrPupilId = objContext.state.arrSelectedPupil.map(ppl => {
                return {
                    uPupilId: ppl
                };
            });

            let objPupilParams = {
                "SourceClassId": objContext.props.Data.PresentClass.t_TestDrive_Member_Class_Teacher[0].uClassId,
                "TargetClassId": objContext.state.SelectedClassId,
                "PupilJson": arrPupilId, //array of pupil id's           
                "AddDuplicatePupil": objContext.state.blnDuplicatePupilPresent ? "Y" : "N",
                "blnMoveSchool": objContext.props.JConfiguration.ApplicationTypeId === "6",
                "SourceSchoolId": objContext.MovePupilPopUp_ModuleProcessor.GetSchoolIdByApplicationType(objContext.props),
                "TargetSchoolId": objContext.MovePupilPopUp_ModuleProcessor.GetTargetSchoolId(objContext),
                "TargetTeacherId": objContext.MovePupilPopUp_ModuleProcessor.GetTargetTeacherId(objContext)
            };

            ApplicationState.SetProperty("blnShowAnimation", true);

            MovePupilPopUp_Module.MovePupil(objPupilParams, (res) => {
                if (objPupilParams["SourceSchoolId"] == objPupilParams["TargetSchoolId"])
                    this.UpdatePupilCount(objContext, [objContext.props.Data.PresentClass.t_TestDrive_Member_Class_Teacher[0].uClassId, objContext.state.SelectedClassId]);
                else
                    this.UpdatePupilCount(objContext, [objContext.props.Data.PresentClass.t_TestDrive_Member_Class_Teacher[0].uClassId]);
                ApplicationState.SetProperty("blnShowAnimation", false);
                let arrPupilData = res["movepupil"] ? ["Data"][0]["SourcePupil"] : [];
                let arrSamePupilList = res["movepupil"] ? res["movepupil"]["Data"][0]["SamePupilList"] : [];
                let strClassId = objContext.props.Data.PresentClass.t_TestDrive_Member_Class_Teacher[0].uClassId;
                let strStateId = this.GetStateIdByApplicationType(objContext);
                //let strFilter = "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId.toLowerCase();
                let strFilter = "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + strStateId;
                let objPupilData = {
                    Filter: strFilter,
                    Value: {
                        Data: arrPupilData,
                        TimeStamp: "",
                        PrimaryKeyName: "uPupilId",
                        Count: arrPupilData.length
                    }
                };
                let arrFilteredPupilData = arrPupilData.filter(x => x["t_TestDrive_Member_Class_Pupil"].find(y => y["cIsDeleted"] == "N" && y["cIsArchive"] == "N" && y["uClassId"] == strClassId))
                if (arrSamePupilList && arrSamePupilList.length > 0) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilData": arrFilteredPupilData, blnDuplicatePupilPresent: true } });
                } else {
                    objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilData": arrFilteredPupilData } });
                }
                MovePupilPopUp_Module.EditData("Object_Extranet_Pupil_Pupil", objPupilData, (objResponse) => {
                    if (objResponse) {
                        Popup.ClosePopup(objContext.props.Id)
                    }
                });
                Popup.ClosePopup(objContext.props.Id);
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsMovePupilAttempted": true } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationResult": objValidationResult } });
        }
    }


    /**
     * @name GetMetaDataSchoolDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataSchoolDropdown() {
        return {
            DisplayColumn: "DisplayColumn",
            ValueColumn: "uSchoolId"
        };
    }

    /**
    * @name GetEventsDataSchoolDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
   */
    GetEventsDataSchoolDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.MovePupilPopUp_ModuleProcessor.OnChangeSchoolDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetResourceDataSchoolDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataSchoolDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
     * @name GetMetaDataTeacherDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataTeacherDropdown() {
        return {
            DisplayColumn: "vFirstName,vName",
            ValueColumn: "uTeacherId"
        };
    }

    /**
      * @name GetEventsDataTeacherDropdown
      * @param {object} objContext Context object
      * @summary Returns object that contains all the Event methods.
      * @return {object} objEventBasics
     */
    GetEventsDataTeacherDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.MovePupilPopUp_ModuleProcessor.HandleOnChangeTeacherDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetMetaDataClassDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataClassDropdown() {
        return {
            DisplayColumn: "vClassName",
            ValueColumn: "uClassId",
            DefaultOptionValue: -1,
            ShowDefaultOption: true,
            DefaultOptionTextKey: "DefaultOptionTextKey_Text"
        };
    }

    /**
    * @name GetResourceDataClasssDropdown
    * @param {*} objTextResource objTextResource
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataClassDropdown(objTextResource) {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        let Text = {
            "DefaultOptionTextKey_Text": Localization.TextFormatter(objTextResource, 'ClassDropDownItem1')
        };
        return {
            SkinPath,
            Text
        };
    }

    /**
      * @name GetEventsDataClassDropdown
      * @param {object} objContext Context object
      * @summary Returns object that contains all the Event methods.
      * @return {object} objEventBasics
     */
    GetEventsDataClassDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.MovePupilPopUp_ModuleProcessor.HandleOnChangeClassDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetMetaDataFillheightMovePupilPopUp
     * @param {object} objContext objContext
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
    */
    GetMetaDataFillheightMovePupilPopUp(objContext) {
        return {
            HeaderIds: [`Popup_Header_Id${objContext.props.Id}`, "MovePupilHeader", "SearchList"],
            FooterIds: ["MovePupilFooter"],
            ParentReference: [`PopupParent${objContext.props.Id}`]
        };
    }

    /**
     * @name UpdatePupilCount
     * @summary updates the pupil count to store
     * @param {any} objContext
     * @param {any} objResponse
     */
    UpdatePupilCount(objContext, arrClass) {
        let objParams = {
            ClassList: arrClass
        }
        Object_Extranet_Teacher_Class.UpdatePupilCount(objParams, (objResponse) => {
            let arrClassData = DataRef(objResponse, "Object_Extranet_Teacher_Class")["Data"];
            let strEnityKey = '';
            if (objContext.props.JConfiguration.ApplicationTypeId === "1")
                strEnityKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + ClientUserDetails.UserId;
            else
                strEnityKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + this.GetSchoolIdByApplicationType(objContext.props);

            let objClassData = {
                Filter: strEnityKey,
                Value: {
                    Data: arrClassData,
                    TimeStamp: "",
                    PrimaryKeyName: "uClassId",
                    Count: arrClassData.length
                }
            };
            ArcadixCacheData.EditData("Object_Extranet_Teacher_Class", objClassData, () => {
            });
        })
    }

    /**
    * @name GetStateIdByApplicationType
    * @summary returns the stateid based on Applicationtype.
    * @param {any} objContext
    */
    GetStateIdByApplicationType(objContext) {
        if (JConfiguration.ApplicationTypeId == "1") {
            return ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["iStateId"]
        } else {
            return ClientUserDetails.SchoolDetails["iStateId"]
        }
    }

    /**
     * @name GetMetaDataStateDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataStateDropdown() {
        return {
            DisplayColumn: "vName,vFirstName",
            ValueColumn: "iStateId"
        };
    }

    /**
    * @name GetEventsDataStatelDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
   */
    GetEventsDataStateDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.MovePupilPopUp_ModuleProcessor.OnChangeStateDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetResourceDataStateDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataStateDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
     * @name OnChangeStateDropDown
     * @summary updates the state object to application state
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeStateDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "SelectedState": objItem } });
    }

    /**
     * @name GetStateDataForDropdown
     * @param {any} objContext
     * @summary return data for state dropdown
     */
    GetSchoolDataForDropdown(objContext) {
        let arrTemp = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;iMainClientId;" + ClientUserDetails.MainClientId + ";cIsDeleted;N")["Data"];
        let arrSchool = [];
        for (let item of arrTemp) {
            if (item["vName"] && item["vFirstName"]) {
                let objSchool = {
                    ...item,
                    DisplayColumn: item["vName"] + " " + item["vFirstName"] + " ( " + item["vTown"] + " )"
                }
                arrSchool = [...arrSchool, objSchool];
            }
        }

        return arrSchool;
    }
}

export default MovePupilPopUp_ModuleProcessor;
