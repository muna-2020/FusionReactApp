//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_PupilSubjectClassType from '@shared/Object/d.Extranet/4_Pupil/PupilSubjectClassType/PupilSubjectClassType';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_Teacher_ClassType from '@shared/Object/d.Extranet/3_Teacher/ClassType/ClassType';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name AssignClassType_ModuleProcessor
 * @summary Class for AssignClassType module display and manipulate.
 */
class AssignClassType_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class",
            "Object_Extranet_Pupil_Pupil",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/AssignClassType",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Extranet_Teacher_ClassType",
            "Object_Extranet_Pupil_PupilSubjectClassType",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedClassId" }
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
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/AssignClassType/AssignClassType.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css"
        ];
    };

    /**
    * @name InitialDataParams
    * @param {object} props passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrDataRequest
    */
    InitialDataParams(props) {
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objGetClassesParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Teacher",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
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

        let objSubjectsParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "cIsHighStakeSubject": "Y"
                        }
                    },
                    {
                        "match": {
                            "iParentSubjectId": 0
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objClassTypeParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };

        let objAssignedClassTypeParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            }
        };

        let arrDataRequest = [];

        //Class
        Object_Extranet_Teacher_Class.Initialize(objGetClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Pupil
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams, () => { });
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //PupilSubjectClassType
        Object_Extranet_Pupil_PupilSubjectClassType.Initialize(objAssignedClassTypeParams, () => { });
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_PupilSubjectClassType];

        //TextResource Class and Pupil
        Object_Framework_Services_TextResource.Initialize(["/d.Extranet/3_Teacher/Modules/AssignClassType"]);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Subject
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectsParams, () => { });
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //ClassType
        Object_Extranet_Teacher_ClassType.Initialize(objClassTypeParams, () => { });
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ClassType];

        return arrDataRequest;
    }

    /**
     * @name OnchangeSubject
     * @param {any} objContext objContext
     * @param {any} objSubject objSubject
     * @summary 
     */
    OnchangeSubject(objContext, objSubject) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: 'SET_STATE', payload: { "blnDataLoaded": false, "objSelectedSubject": objSubject } });
    }

    /**
     * @name OnChangeClass
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     * @summary
     */
    OnChangeClass(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedClass": objItem } });
    }

    /**
     * @name FormAssignClassTypeData
     * @param {any} objContext objContext
     * @param {any} arrPupilData arrPupilData
     * @param {any} arrClassTypeData arrClassTypeData
     * @param {any} arrAssignedClassTypeData arrAssignedClassTypeData
     * @param {any} iSubjectId iSubjectId
     * @summary 
     * @returns {*} array
     */
    FormAssignClassTypeData(objContext, arrPupilData, arrClassTypeData, arrAssignedClassTypeData, iSubjectId) {
        let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        let arrManipulatedData = [];

        if (arrPupilData.length > 0) {

            arrManipulatedData = arrPupilData.map((objPupilData) => {
                let objAssignedType = arrAssignedClassTypeData.find((objAssignedClassTypeData,) => objAssignedClassTypeData["uPupilId"] == objPupilData["uPupilId"] && objAssignedClassTypeData["uClassId"] == strClassId && iSubjectId == objAssignedClassTypeData["iSubjectId"]);
                return {
                    uPupilId: objPupilData["uPupilId"],
                    vPupilName: objPupilData["vFirstName"],
                    uPupilSubjectClassTypeId: objAssignedType ? objAssignedType.uPupilSubjectClassTypeId : '00000000-0000-0000-0000-000000000000',
                    arrClassTypeData: arrClassTypeData.map((objClassType) => {
                        return {
                            iClassTypeId: objClassType["iClassTypeId"],
                            isSelected: arrAssignedClassTypeData.find((objAssignedClassTypeData) => objAssignedClassTypeData["uPupilId"] == objPupilData["uPupilId"] && objClassType["iClassTypeId"] == objAssignedClassTypeData["iClassTypeId"] && iSubjectId == objAssignedClassTypeData["iSubjectId"]) ? true : false
                        };
                    })
                };
            });
        }


        return arrManipulatedData;
    }

    /**
     * @name UpdateStateOnClickCheckBox
     * @param {any} objContext objContext
     * @param {any} value value
     * @param {any} objPupil objPupil
     * @param {any} objClassType objClassType
     * @param {any} iIndex iIndex
     * @summary On clicking the checkbox entire column is selected and if other checkbox is clicked then the previous checkbox is unselected
     */
    UpdateStateOnClickCheckBox(objContext, value, objPupil, objClassType, iIndex) {
        let intClassTypeSelectedCount = 1;
        let arrManipulatedData = objContext.state.arrManipulatedClassTypeData.map((objClassTypeData) => {
            if (objClassTypeData["uPupilId"] == objPupil["uPupilId"]) {
                return {
                    ...objClassTypeData,
                    arrClassTypeData: objClassTypeData.arrClassTypeData.map(objClassData => {
                        if (objClassData["iClassTypeId"] == objClassType["iClassTypeId"]) {
                            return {
                                ...objClassData,
                                isSelected: value
                            };
                        } else {
                            return {
                                ...objClassData,
                                isSelected: false
                            };
                        }
                    })
                };
            }
            else {
                let arrClassTypeSelected = objClassTypeData.arrClassTypeData.filter(objClassData => {
                    return objClassData["iClassTypeId"] === objClassType["iClassTypeId"] && objClassData["isSelected"];
                });

                if (arrClassTypeSelected.length > 0)
                    intClassTypeSelectedCount++;

                return {
                    ...objClassTypeData
                };
            }

        });

        if (intClassTypeSelectedCount === objContext.state.arrManipulatedClassTypeData.length) {
            let arrClassTypeData = objContext.state.arrClassTypeData.map((objClassData) => {
                if (objClassType["iClassTypeId"] === objClassData["iClassTypeId"]) {
                    return {
                        ...objClassData,
                        isSelected: value
                    };
                }
                else {
                    return {
                        ...objClassData,
                        isSelected: false
                    };
                }
            });
            objContext.dispatch({
                type: 'SET_STATE', payload: { "arrClassTypeData": arrClassTypeData }
            });
        }
        else {
            let arrClassTypeData = objContext.state.arrClassTypeData.map((objClassData) => {
                return {
                    ...objClassData,
                    isSelected: false
                };
            });
            objContext.dispatch({
                type: 'SET_STATE', payload: { "arrClassTypeData": arrClassTypeData }
            });
        }

        objContext.dispatch({
            type: 'SET_STATE', payload: { "arrManipulatedClassTypeData": arrManipulatedData }
        });
    }

    /**
     * @name ToggleAllPupil
     * @param {any} objContext objContext
     * @param {any} objClassType objClassType
     * @param {any} value value
     * @summary 
     */
    ToggleAllPupil(objContext, objClassType, value) {
        let arrManipulatedData = objContext.state.arrManipulatedClassTypeData.map((objClassTypeData) => {
            return {
                ...objClassTypeData,
                arrClassTypeData: objClassTypeData.arrClassTypeData.map((objClassData) => {
                    if (objClassType["iClassTypeId"] == objClassData["iClassTypeId"]) {
                        return {
                            ...objClassData,
                            isSelected: value
                        };
                    }
                    else {
                        return {
                            ...objClassData,
                            isSelected: false
                        };
                    }
                })
            };
        });

        let arrClassTypeData = objContext.state.arrClassTypeData.map((objClassData) => {
            if (objClassType["iClassTypeId"] == objClassData["iClassTypeId"]) {
                return {
                    ...objClassData,
                    isSelected: value
                };
            }
            else {
                return {
                    ...objClassData,
                    isSelected: false
                };
            }
        });

        objContext.dispatch({
            type: 'SET_STATE', payload: { "arrClassTypeData": arrClassTypeData, "arrManipulatedClassTypeData": arrManipulatedData }
        });
    }

    /**
    * @name GetModifiedClassTypeData
    * @param {any} arrClassTypeData arrClassTypeData
    * @param {any} arrPupilData arrPupilData
    * @param {any} arrAssignedClassTypeData arrAssignedClassTypeData
    * @param {any} iSubjectId iSubjectId
    * @summary 
    * @return {*} array
    */
    GetModifiedClassTypeData(arrClassTypeData, arrPupilData, arrAssignedClassTypeData, iSubjectId) {
        let arrModifiedClassTypeData = [];
        arrModifiedClassTypeData = arrClassTypeData.map(objClassData => {
            return {
                ...objClassData,
                isSelected: this.CheckIfSingleClassTypeSelectedForAllPupils(arrPupilData, arrAssignedClassTypeData, iSubjectId, objClassData["iClassTypeId"])
            };
        });
        return arrModifiedClassTypeData;
    }

    CheckIfSingleClassTypeSelectedForAllPupils(arrPupil, arrPupilClassType, intSubjectId, intClassTypeId) {
        let arrDataForClassType = arrPupilClassType.filter(x => {
            return x["iClassTypeId"] == intClassTypeId && x["iSubjectId"] == intSubjectId;
        });
        if (arrDataForClassType.length >= arrPupil.length)
            return true;
        else
            return false;
    }


    /**
     * @name SaveData
     * @param {*} objContext objContext
     * @param {*} objTextResource objTextResource
     * @summary Saves the classtype of the pupil for particular class and subject
     * */
    SaveData(objContext, objTextResource) {
        let blnInValidPupilPresent = false;
        if (objContext.state.arrManipulatedClassTypeData && objContext.state.arrManipulatedClassTypeData.length > 0) {
            for (let pupil of objContext.state.arrManipulatedClassTypeData) {
                let objValidClassTypeRow = pupil.arrClassTypeData.find(ct => ct.isSelected == true);
                if (objValidClassTypeRow == undefined) {
                    blnInValidPupilPresent = true;
                    break;
                }
            }
            if (blnInValidPupilPresent == true) {
                Popup.ShowErrorPopup({
                    Data: {},
                    Meta: {
                        "Width": "380px",
                        "Height": "auto",
                        "ShowHeader": true,
                    },
                    Resource: {
                        Text: objTextResource,
                        SkinPath: objContext.props.JConfiguration.ExtranetSkinPath,
                        TextResourcesKey: "AssignClassTypeErrorPopup"
                    },
                    Events: {},
                    CallBacks: {}
                });
            }
            else {
                let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
                let arrSelectedPupil = objContext.state.arrManipulatedClassTypeData.map((objClassTypeData) => {
                    return {
                        uPupilId: objClassTypeData.uPupilId,
                        uClassId: strClassId,
                        uPupilSubjectClassTypeId: objClassTypeData.uPupilSubjectClassTypeId,
                        iSubjectId: objContext.state.objSelectedSubject.iSubjectId,
                        iClassTypeId: objClassTypeData["arrClassTypeData"].find(ct => ct.isSelected == true).iClassTypeId
                    };
                });

                let objAssignedClassTypeParams = {
                    "ForeignKeyFilter": {
                        "uClassId": strClassId
                    },
                    "vEditData": arrSelectedPupil
                };
                ApplicationState.SetProperty("blnShowAnimation", true)
                Object_Extranet_Pupil_PupilSubjectClassType.EditData(objAssignedClassTypeParams, () => {
                    ApplicationState.SetProperty("blnShowAnimation", false)
                });
            }
        }
    }

    /**
   * @name GetClassDropDownData
   * @param {object} objContext Passes context object
   * @param {object} objTextResource objTextResource
   * @summary returns an array of classes to load in the drop down
   * @returns {Array} ClassDropDownData
   */
    GetClassDropDownData(objContext, objTextResource) {
        let arrTempClass = [];
        let strTeacherId = global.ClientUserDetails.UserId;
        objTextResource = objTextResource ? objTextResource : {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"].map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
            });
        }

        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        if (objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
            arrTempClass = arrTempClass.filter(cls => cls["iSchoolYear"] != "8")
        }
        arrTempClass.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        }
        );
        let arrFinalClassData = [
            {
                "Title": Localization.TextFormatter(objTextResource, 'ClassDropDownMainClassTitle'),
                "Data": arrMainClassData
            },
            {
                "Title": Localization.TextFormatter(objTextResource, 'ClassDropDownCoTeacherTitle'),
                "Data": arrCoTeacherClassData
            },
            {
                "Title": Localization.TextFormatter(objTextResource, 'ClassDropDownSubjectExpertTitle'),
                "Data": arrSubjectExpertClassData
            }
        ];
        return { arrFinalClassData: arrFinalClassData };
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "LegendsControls", "AssignClassTypeHeader"],
            FooterIds: ["FooterAssignClassType"]
        };
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
export default AssignClassType_ModuleProcessor;