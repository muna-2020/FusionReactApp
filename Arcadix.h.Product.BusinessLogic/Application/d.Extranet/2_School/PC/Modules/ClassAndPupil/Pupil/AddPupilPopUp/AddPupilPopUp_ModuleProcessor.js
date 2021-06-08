//Objects required for module.
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';

/**
 * @name Pupil_ModuleProcessor
 * @summary Class for Pupil_ModuleProcessor module display and manipulate.
 */
class AddPupilPopUp_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of store objects used in the module
    * @returns {Array} Array of object list
    */
    static StoreMapList() {
        return [ "Object_Extranet_Pupil_Pupil",
                 "Object_Extranet_Teacher_Class",
                 "Object_Extranet_Teacher_ClassGroup",
                 { "StoreKey": "ApplicationState", "DataKey": "ClassAndPupil" }
        ];
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
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/AddPupilPopUp.css"
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
    * @name GetPupilDisplayData
    * @param {any} objContext objContext
    * @summary This function will update the states for pupil data and sorted pupil data
    */
    GetPupilDisplayData(objContext) {
        let strSchoolId = ClientUserDetails.TeacherDetails.uSchoolId;
        let strClassId = "";
        if (!objContext.state.isClassChanged && objContext.props.ClassAndPupil) {
            let objData = objContext.props.ClassAndPupil["SelectedClassData"];
            strClassId = objData["uClassId"];
        } else {
            strClassId = objContext.state.objSelClass.uClassId;
        }

        let arrSchoolPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_School_Pupil.uSchoolId;" + strSchoolId)["Data"];

        let arrClassPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
        let arrFilteredPupil = [];

        if (arrClassPupil) {
            for (let objSchoolPupil of arrSchoolPupil) {
                let objClassPupil = arrClassPupil.find(objClassPupilData => objClassPupilData["uPupilId"] == objSchoolPupil["uPupilId"]);
                if (objClassPupil == undefined) {
                    arrFilteredPupil = [...arrFilteredPupil, { ...objSchoolPupil, isSelected: false, selectedClassGroup: undefined }];
                }
            }
            let arrSorted = arrFilteredPupil.sort((a, b) => {
                if (a["vName"] < b["vName"]) {
                    return -1; //first item is placed in the previous position
                } else if (a["vName"] > b["vName"]) {
                    return 1; //Second item is placed in the previous position
                } else {
                    return 0; // order is unchanged
                }
            });

            objContext.dispatch({
                type: 'SET_STATE', payload: {
                    arrPupilDisplayData: arrSorted,
                    isInitialLoadComplete: true,
                    isFirstNameAscending: true,
                    isNameAscending: true,
                    arrAllPupilDisplayData: arrSorted
                }
            });
        }
    }

    /**
    * @name GetClassDropDownData
    * @param {any} objContext objContext
    * @summary This function returns the array for dropdown data
    * @returns {*} array
    */
    GetClassDropDownData(objContext) {
        let strSchoolId = ClientUserDetails.TeacherDetails.uSchoolId; 
        let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + strSchoolId).Data;
        let arrMainClassData = [];
        arrClassData.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
        }
        );       
        return arrMainClassData;
    }

    /**
    * @name MarkAll
    * @param {any} objContext objContext
    * @param {any} value value
    * @summary This function is called when the main checkbox is clicked
    */
    MarkAll(objContext, value) {
        let arrPupilDisplayData = objContext.state.arrPupilDisplayData.map(objPupilData => {
            return { ...objPupilData, isSelected: value };
        });
        let strName = objContext.AddPupilPopUp_ModuleProcessor.GetSelectedPupilNameString(arrPupilDisplayData);
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                arrPupilDisplayData: arrPupilDisplayData,
                strSelectedAllPupilName: strName,
                showValidationMessage: false
            }
        });
    }

    /**
    * @name OnChangeClassGroup
    * @param {any} objContext objContext
    * @param {any} objGroup objGroup
    * @param {any} objPupil objPupil
    * @summary This function is called on change of class group dropdown 
    */
    OnChangeClassGroup(objContext, objGroup, objPupil) {
        let arrPupilDisplayData = objContext.state.arrPupilDisplayData.map(objPupilDisplayData => {
            if (objPupil["uPupilId"] == objPupilDisplayData["uPupilId"]) {
                return { ...objPupilDisplayData, selectedClassGroup: objGroup };
            } else {
                return { ...objPupilDisplayData };
            }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { arrPupilDisplayData: arrPupilDisplayData } });
    }

    /**
    * @name Sort
    * @param {any} objContext objContext
    * @param {any} strSortBy strSortBy
    * @param {any} strSortStateVariable strSortStateVariable
    * @summary This function is used to  sort the pupil row data
    */
    Sort(objContext, strSortBy, strSortStateVariable) {
        let isAscending = !objContext.state[strSortStateVariable];
        let arrPupilDisplayData = [];
        if (isAscending) {
            arrPupilDisplayData = objContext.state.arrPupilDisplayData.sort((a, b) => {
                if (a[strSortBy] < b[strSortBy]) {
                    return -1;
                } else if (a[strSortBy] > b[strSortBy]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            arrPupilDisplayData = objContext.state.arrPupilDisplayData.sort((a, b) => {
                if (b[strSortBy] < a[strSortBy]) {
                    return -1;
                } else if (b[strSortBy] > a[strSortBy]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { arrPupilDisplayData: arrPupilDisplayData, [strSortStateVariable]: isAscending } });
    }

    /**
    * @name OnChangeSearchBox
    * @param {any} objContext objContext
    * @param {any} event event
    * @summary This function is used to update the state value
    */
    OnChangeSearchBox(objContext, event) {
        let { name, value } = event.target;
        objContext.dispatch({ type: 'SET_STATE', payload: { [name]: value } });
    }

    /**
    * @name Search
    * @param {any} objContext objContext
    * @param {any} strSearchKey strSearchKey
    * @param {any} strSearchValue strSearchValue
    * @param {any} showIconVariableName showIconVariableName
    * @summary This function is used to search any string entered in the input tag
    */
    Search(objContext, strSearchKey, strSearchValue, showIconVariableName) {
        if (strSearchValue != '') {
            let arrPupilDisplayData = objContext.state.arrPupilDisplayData.filter(ppl => ppl[strSearchKey].includes(strSearchValue));
            objContext.dispatch({ type: 'SET_STATE', payload: { arrPupilDisplayData: arrPupilDisplayData, [showIconVariableName]: false } });
        }
    }

    /**
    * @name Close
    * @param {any} objContext objContext
    * @summary This function is used to update the state when the popup closes
    */
    Close(objContext) {
        let arrPupil = objContext.state.arrAllPupilDisplayData.map(ppl => { return { ...ppl }; });
        objContext.dispatch({ type: 'SET_STATE', payload: { arrPupilDisplayData: arrPupil, showNameSearchIcon: true, showFirstNameSearchIcon: true, strSearchName: '', strSearchFirstName: '' } });
    }

    /**
    * @name GetSelectedPupilNameString
    * @param {any} arrPupilData arrPupilData
    * @summary This function filters the pupil on bases of "isSelected" value and gets the selected pupil name
    * @returns {*} Returns the string
    */
    GetSelectedPupilNameString(arrPupilData) {
        let arrFilteredData = arrPupilData.filter(ppl => ppl["isSelected"] == true);
        let strSelectedAllPupilName = '';
        let x = 1;
        for (let ppl of arrFilteredData) {
            strSelectedAllPupilName += ppl["vName"];
            if (arrFilteredData.length > 1 && arrFilteredData.length != x) {
                strSelectedAllPupilName += ', ';
            }
            x++;
        }
        return strSelectedAllPupilName;
    }

    /**
    * @param {any} objContext objContext
    * @param {any} isClose isClose
    * @summary Save method is called to save the newly added pupil 
    */
    Save(objContext, isClose = false) {
        let arrSelectedData = objContext.state.arrPupilDisplayData.filter(ppl => ppl["isSelected"] == true);
        if (arrSelectedData && arrSelectedData.length > 0) {
            let strClassId = '';
            if (!objContext.state.isClassChanged && objContext.props.ClassAndPupil) {
                let objData = objContext.props.ClassAndPupil["SelectedClassData"];
                strClassId = objData["uClassId"];
            } else {
                strClassId = objContext.state.objSelClass.uClassId;
            }
            let arrSaveData = arrSelectedData.map(ppl => {
                return {
                    uPupilId: ppl["uPupilId"],
                    t_TestDrive_Member_Class_Pupil: [{
                        uClassId: strClassId,
                        cIsArchive: 'N',
                        uClassGroupId: ppl["selectedClassGroup"] ? ppl["selectedClassGroup"]["uClassGroupId"] : undefined
                    }]
                };
            });
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                },
                "vEditData": arrSaveData,
                "uUserId": ClientUserDetails.UserId
            };
            
            Object_Extranet_Pupil_Pupil.EditData(objPupilParams, function (objReturn) {
                objContext.dispatch({ type: 'SET_STATE', payload: { isInitialLoadComplete: false } });
            });

            if (isClose) {
                objContext.props.ClosePopup(objContext.props.ObjModal);
            }
        }
        else {
            objContext.dispatch({ type: 'SET_STATE', payload: { showValidationMessage: true } });
        }
    }

    /**
    * @name GetMetaDataFillheightAddPupilPopUp
    * @param {object} objContext objContext
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetMetaDataFillheightAddPupilPopUp(objContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objContext.props.PopupUniqueId}`, "AddPupilHeader", "SearchList"],
            FooterIds: ["AddPupilFooter"],
            ParentReference: `EditorPopupParent${objContext.props.PopupUniqueId}`
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
            ValueColumn: "uClassId"
        };
    }

    /**
    * @name GetMetaDataClassGroupDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataClassGroupDropdown() {
        return {
            DisplayColumn: "vGroupName",
            ValueColumn: "uClassGroupId",
            DependingTableName: "t_TestDrive_Member_Class_Group_Data",
            IsLanguageDependent: "Y"
        };
    }

    /**
    * @name GetEventsDataClassGroupDropdown
    * @param {object} objContext objContext
    * @param {object} ppl Pupil object
    * @summary Calls the event when class group dropdown selection is changed
    * @returns {object} MetaData
    */
    GetEventsDataClassGroupDropdown(objContext,ppl) {
        return {
            OnChangeEventHandler: (objItem) => objContext.AddPupilPopUp_ModuleProcessor.OnChangeClassGroup(objContext, objItem, ppl)
        };
    }

    /**
    * @name GetResourceDataClassDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataClassDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }
}

export default AddPupilPopUp_ModuleProcessor;