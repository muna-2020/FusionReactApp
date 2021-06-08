//Objects required for module.
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';

/**
 * @name Pupil_ModuleProcessor
 * @summary Class for Pupil_ModuleProcessor module display and manipulate.
 */
class Pupil_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of store objects used in the module
    * @returns {Array} Array of object list
    */
    static StoreMapList() {
        return [
            "Object_Extranet_Pupil_Pupil",
            "Object_Extranet_Pupil_Gender",
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_Teacher_ClassGroup",
            { "StoreKey": "ApplicationState", "DataKey": "ClassAndPupil" },
            { "StoreKey": "ApplicationState", "DataKey": "ImportedPupil" }
        ];
    }

    /**
   * @name GetPrefetchFiles
   * @param {object} props props
   * @returns {object} PrefetchFiles
   */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown", "Grid"],
            "Files": []
        }
    }


    /**
     * @name IsAdminTeacher
     * @param {any} objContext objContext
     * @summay Checks if its Teacher
     * @returns {*} returns boolean value
     */
    IsAdminTeacher(objContext) {
        let blnAdminTeacher = false;
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            if (objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
                blnAdminTeacher = true;
            }
        }
        return blnAdminTeacher;
    }

    /**
     * @name CheckDataLoadedForSchoolPupil
     * @param {any} objContext objContext
     * @summay Checks if the pupil data loaded for school
     * @returns {*} returns boolean value
     */
    CheckDataLoadedForSchoolPupil(objContext) {
        let isDataLoaded = false;
        if (this.IsAdminTeacher(objContext)) {
            let strStateId = this.GetStateIdByApplicationType(objContext);
            let strSchoolId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
            if (DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_School_Pupil.uSchoolId;" + strSchoolId + ";iStateId;" + strStateId)) {
                isDataLoaded = true;
            }
        } else {
            isDataLoaded = true;
        }
        return isDataLoaded;
    }

    /**
     * @name GetClassDataFromApplicationState
     * @param {*} objContext objContext
     * @summary Returns the Selected class data from application state.
     * @returns {*} returns objData object
     */
    GetClassDataFromApplicationState() {
        let objData = ApplicationState.GetProperty("ClassAndPupil");
        if (objData) {
            return objData["SelectedClassData"];
        }
        return null;
    }

    /**
     * @name GetPupil
     * @param {*} objContext objContext
     * @param {*} intStatusToggle intStatusToggle
     * @summary Get the pupil data
     * @returns {*} returns an array of pupil data
     */
    GetPupil(objContext, intStatusToggle = -1) {
        let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        let strStateId = this.GetStateIdByApplicationType(objContext);
        let arrTempPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objClassData["uClassId"] + ";iStateId;" + strStateId).Data;
        let arrPupil = [];
        if (intStatusToggle === 1) {
            arrPupil = arrTempPupil.map(objTempPupil => {
                return {
                    ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                        .filter(objTempClassPupil => { return objTempClassPupil["cIsDeleted"] === "N" && objTempClassPupil["cIsArchive"] === "N" && objTempClassPupil["uClassId"] === objClassData["uClassId"]; })
                };
            })
                .filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
        }
        else if (intStatusToggle === 2) {
            arrPupil = arrTempPupil.map(objTempPupil => {
                return {
                    ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                        .filter(objTempClassPupil => { return objTempClassPupil["cIsDeleted"] === "Y" && objTempClassPupil["cIsArchive"] === "N" && objTempClassPupil["uClassId"] === objClassData["uClassId"]; })
                };
            })
                .filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
        }
        else {
            arrPupil = arrTempPupil.map(objTempPupil => {
                return {
                    ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                        .filter(objTempClassPupil => { return objTempClassPupil["uClassId"] === objClassData["uClassId"] && objTempClassPupil["cIsArchive"] === "N"; })
                };
            }).filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
        }
        return arrPupil;
    }

    /**
     * @name SavePupil
     * @param {*} objContext objContext
     * @param {*} objPupilData objPupilData
     * @param {*} GridCallBack GridCallBack
     * @summary Save the new Pupil
     */
    SavePupil(objContext, objPupilData, GridCallBack) {
        let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        let strStateId = this.GetStateIdByApplicationType(objContext);
        let objNewPupilData = {
            ...objPupilData,
            ["t_TestDrive_Member_Class_Pupil"]: [{
                ...objPupilData["t_TestDrive_Member_Class_Pupil"][0],
                "uClassId": objClassData["uClassId"],
                "dtLearncoacherLoggedInDate": null,
                "cIsArchive": "N",
                "dtPackageActivatedOn": null
            }],
            ["t_TestDrive_Member_School_Pupil"]: [{
                "uSchoolId": objClassData["t_TestDrive_Member_Class_Teacher"][0]["uSchoolId"],
                "cIsAdmin": "N"
            }]
        };
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": objClassData["uClassId"],
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": strStateId
                        }
                    }
                ]
            },
            "vAddData": objNewPupilData,
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        Object_Extranet_Pupil_Pupil.AddData(objPupilParams, () => {
            this.UpdatePupilCount(objContext, [objClassData["uClassId"]])
            GridCallBack();
        });
        ApplicationState.SetProperty("blnShowAnimation", true);
    }

    /**
     * @name EditPupil
     * @param {*} objContext objContext
     * @param {*} arrPupilData arrPupilData
     * @param {*} GridCallBack GridCallBack
     * @summary Activate and Edit pupil
     */
    EditPupil(objContext, arrPupilData, GridCallBack) {
        let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        let arrFormattedPupilData = objContext.Pupil_ModuleProcessor.GetFormattedDatePupilData(arrPupilData);
        let strStateId = this.GetStateIdByApplicationType(objContext);
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": objClassData["uClassId"],
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": strStateId
                        }
                    }
                ]
            },
            "vEditData": arrFormattedPupilData,
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        Object_Extranet_Pupil_Pupil.EditData(objPupilParams, () => {
            this.UpdatePupilCount(objContext, [objClassData["uClassId"]])
            GridCallBack();
        });
        ApplicationState.SetProperty("blnShowAnimation", true);
    }

    /**
     * @name GetFormattedDatePupilData
     * @param {*} arrPupilData arrPupilData
     * @return {Array} array of pupil data with formatted birth dates if any
     * @summary Activate and Edit pupil
     */
    GetFormattedDatePupilData(arrPupilData) {
        let arrFormattedPupilData = [];
        arrPupilData.map(objPupilData => {
            if (objPupilData.vBirthdate) {
                let arrDate = objPupilData.vBirthdate.split(".");
                let strFormattedDate = "";
                if (arrDate.length > 0) {
                    let strDay = arrDate[0];
                    let strMonth = arrDate[1]; //January is 0!
                    strDay = parseInt(strDay) < 10 && strDay.length == 1 ? '0' + strDay : strDay;
                    strMonth = parseInt(strMonth) < 10 && strMonth.length == 1 ? '0' + strMonth : strMonth;
                    //strFormattedDate = strDay + '.' + strMonth + '.' + arrDate[2];
                    strFormattedDate = arrDate[2] + '.' + strMonth + '.' + strDay;
                }
                arrFormattedPupilData = [...arrFormattedPupilData, { ...objPupilData, vBirthdate: strFormattedDate }];
            } else {
                arrFormattedPupilData = [...arrFormattedPupilData, { ...objPupilData }];
            }
        });
        return arrFormattedPupilData;
    }

    /**
     * @name DeletePupil
     * @param {*} objContext objContext
     * @param {*} arrPupilData arrPupilData
     * @summary De-Activate Pupil
     */
    DeletePupil(objContext, arrPupilData, GridCallBack) {
        let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        let strStateId = this.GetStateIdByApplicationType(objContext);
        let objPupilParams =
        {
            "ForeignKeyFilter":
            {
                "t_TestDrive_Member_Class_Pupil.uClassId": objClassData["uClassId"],
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": strStateId
                        }
                    }
                ]
            },
            "vDeleteData": arrPupilData
        };
        Object_Extranet_Pupil_Pupil.DeleteData(objPupilParams, () => { this.UpdatePupilCount(objContext, [objClassData["uClassId"]]), GridCallBack(); });
        ApplicationState.SetProperty("blnShowAnimation", true);
    }

    /**
     * @name GetActivationStatusToggleData
     * @param {*} objContext objContext
     * @summary Returns an array for Activation Status Toggle dropdown
     * @returns {*} arrActivationStatusToggleData is returned
     */
    GetActivationStatusToggleData(objContext) {
        let objTextResource = objContext.props.TextResource;
        let arrActivationStatusToggleData = [
            { key: Localization.TextFormatter(objTextResource, 'PupilDropdownAllItem'), value: -1 },
            { key: Localization.TextFormatter(objTextResource, 'PupilDropdownActiveItem'), value: 1 },
            { key: Localization.TextFormatter(objTextResource, 'PupilDropdownInactiveItem'), value: 2 }
        ];
        return arrActivationStatusToggleData;
    }

    /**
     * @name GetColumns
     * @param {*} objContext objContext
     * @summary Get Coulmns Headers for the grid which are passed to the grid.
     * @returns {*} array
     */
    GetColumns(objContext) {
        let arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"];
        if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
            if (objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
                arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"].filter(itm => itm["vColumnName"] != "Edit" && itm["vColumnName"] != "vBirthdate");
            }
        }
        return arrGridColumns;
    }

    /**
     * @name GetDropdownData
     * @param {*} objContext objContext
     * @summary Gives dropdown data to be displayed in the grid which are passed to the grid.
     * @returns {*} returns object
     */
    GetDropdownData(objContext) {
        let objDropdownData = {};
        let arrGroupData = [
            {
                "uClassGroupId": "00000000-0000-0000-0000-000000000000",
                "iMainClientId": 97,
                "uClassId": "00000000-0000-0000-0000-000000000000",
                "cIsDeleted": "N",
                "dtCreatedOn": "2017-08-14T13:44:07.157",
                "dtModifiedOn": "2017-08-14T13:44:07.157",
                "uUserId": null,
                "iDisplayOrder": 1,
                "t_TestDrive_Member_Class_Group_Data": [
                    {
                        "iLanguageId": 3,
                        "vGroupName": "",
                        "iDisplayOrder": 1
                    }
                ]
            },
            ...DataRef(objContext.props.Object_Extranet_Teacher_ClassGroup, "Object_Extranet_Teacher_ClassGroup;cIsDeleted;N").Data
        ];
        objDropdownData = {
            iGenderId:
            {
                "IsLanguageDependent": "Y",
                "ValueColumn": "iGenderId",
                "DisplayColumn": "vGenderName",
                "DependingTableName": "t_TestDrive_Member_Gender_Data",
                "Data": DataRef(objContext.props.Object_Extranet_Pupil_Gender).Data
            },
            "t_TestDrive_Member_Class_Pupil.uClassGroupId": {
                "IsLanguageDependent": "Y",
                "ValueColumn": "uClassGroupId",
                "DisplayColumn": "vGroupName",
                "DependingTableName": "t_TestDrive_Member_Class_Group_Data",
                "Data": arrGroupData
            }
        };
        return objDropdownData;
    }

    /**
     * @name GetHeaderButtons
     * @param {*} objContext objContext
     * @summary Gives Buttons on the top of the grid which are passed to the grid.
     * @returns {*} returns array
     */
    GetHeaderButtons(objContext) {
        if (objContext.state.intActivationStatusTogglValue === 2) {
            return [];
        }
        else {
            let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
            let objTextResource = objContext.props.TextResource;
            let arrHeaderButonData = [];
            let blnShowHeaderButtons = true;
            if (objContext.props.JConfiguration.ApplicationTypeId === "1" && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember === "Y") {
                blnShowHeaderButtons = (objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin === "Y") ? true : false;///////&& objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "N"
            }

            if (objContext.state.intActivationStatusTogglValue !== 2 && objClassData["uClassId"] !== "00000000-0000-0000-0000-000000000000" && objClassData["t_TestDrive_Member_Class_Teacher"][0]["cIsDeleted"] === "N" && blnShowHeaderButtons) {
                let objAddHeaderButonData = {
                    "Key": "Add",
                    "Type": objContext.Pupil_ModuleProcessor.IsAdminTeacher(objContext) ? "ModuleAdd" : "Add",
                    "Text": (objContext.Pupil_ModuleProcessor.IsAdminTeacher(objContext)) ? Localization.TextFormatter(objTextResource, 'ExternalAddButtonText') : Localization.TextFormatter(objTextResource, 'AddButtonText'),
                    "ImageType": "HeaderButtonImage_PlusWhite",
                    "Action": () => {
                        if (objContext.Pupil_ModuleProcessor.IsAdminTeacher(objContext)) {
                            Popup.ShowPopup({
                                Data: {},
                                Meta: {
                                    PopupName: 'AddPupilPopUp',
                                    ShowHeader: false,
                                    ShowCloseIcon: false,
                                    Height: '98%',
                                    Width: '98%'
                                },
                                Resource: {
                                    Text: objContext.props.TextResource,
                                    SkinPath: objContext.props.JConfiguration.ExtranetSkinPath
                                },
                                Events: {},
                                CallBacks: {}
                            });
                        }
                    }
                };
                let objMovePupilHeaderButonData = {};
                let arrDeActivaedPupil = objContext.state.arrPupilGridData.filter(objTempDetails => { return objTempDetails["t_TestDrive_Member_Class_Pupil"][0]["cIsDeleted"] === "N" });
                if (objContext.state.arrPupilGridData.length > 0 && arrDeActivaedPupil.length > 0) {
                    objMovePupilHeaderButonData = {
                        "Key": "MovePupil",
                        "Type": "Type",
                        "Text": Localization.TextFormatter(objTextResource, 'MovePupilButtonText'),
                        "ClassName": "grey-button",
                        "ImageType": "HeaderButtonImage_MovePupil",
                        "Action": () => {
                            ApplicationState.SetProperty("blnShowAnimation", true);

                            Popup.ShowPopup({
                                Data: {
                                    PupilData: objContext.state.arrPupilGridData,
                                    PresentClass: objClassData
                                },
                                Meta: {
                                    PopupName: 'MovePupilPopUp',
                                    ShowHeader: false,
                                    ShowCloseIcon: false,
                                    Height: '98%',
                                    Width: '98%',
                                    "CssClassName": "move-pupil-popup-parent",
                                },
                                Resource: {
                                    Text: objContext.props.TextResource,
                                    SkinPath: objContext.props.JConfiguration.ExtranetSkinPath
                                },
                                Events: {},
                                CallBacks: {}
                            });
                        }
                    };
                }
                else {
                    objMovePupilHeaderButonData = {
                        "Key": "MovePupil",
                        "Type": "Type",
                        "Text": Localization.TextFormatter(objTextResource, 'MovePupilButtonText'),
                        "ClassName": "grey-button",
                        "ImageType": "HeaderButtonImage_MovePupil",
                        "Action": () => {
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
                                    TextResourcesKey: "PupilErrorPopup"
                                },
                                Events: {},
                                CallBacks: {}
                            });
                        }
                    };
                }
                arrHeaderButonData = [objAddHeaderButonData, objMovePupilHeaderButonData];
            }
            return arrHeaderButonData;
        }
    }

    /**
     * @name GetActionButtons
     * @param {*} objContext objContext
     * @summary Returns ACTIVATE AND DEACTIVATE buttons which are passed to the grid.
     * @returns {*} returns object
     */
    GetActionButtons(objContext) {
        let objTextResource = objContext.props.TextResource;
        return [
            {
                "Key": "Activate",
                "Type": "Activate",
                "Text": Localization.TextFormatter(objTextResource, 'ActivateButtonText'),
                "ImagePath": "/Images/Common/Icons/GridDelete.svg",
                "Action": (ActionObject, GridCallBack) => {
                    let arrPupilDataToEdit = [{
                        "uPupilId": ActionObject["uPupilId"],
                        "t_TestDrive_Member_Class_Pupil": [{
                            ["cIsDeleted"]: "N",
                            ["uClassId"]: ActionObject["t_TestDrive_Member_Class_Pupil"][0]["uClassId"]
                        }]
                    }];
                    objContext.Pupil_ModuleProcessor.EditPupil(objContext, arrPupilDataToEdit, GridCallBack);
                }
            },
            {
                "Key": "Deactivate",
                "Type": "Deactivate",
                "Text": Localization.TextFormatter(objTextResource, 'DeactivateButtonText'),
                "ImagePath": "/Images/Common/Icons/GridDelete.svg",
                "Action": (ActionObject, GridCallBack) => {
                    let arrPupilDataToDelete = [{
                        "uPupilId": ActionObject["uPupilId"],
                        "uClassId": ActionObject["t_TestDrive_Member_Class_Pupil"][0]["uClassId"]
                    }];
                    objContext.Pupil_ModuleProcessor.DeletePupil(objContext, arrPupilDataToDelete, GridCallBack);
                }
            }
        ];
    }

    /**
     * @name SaveMethod
     * @param {*} objContext objContext
     * @param {*} objSaveData objSaveData
     * @param {*} GridCallBack GridCallBack
     * @summary Toggle objSaveData for new/edited pupil and calls EditClass or SaveClass.
     */
    SaveMethod(objContext, objSaveData, GridCallBack) {
        if (!objSaveData["IsNewRow"]) {
            objContext.Pupil_ModuleProcessor.EditPupil(objContext, [objSaveData], GridCallBack);
        }
        else {
            objContext.Pupil_ModuleProcessor.SavePupil(objContext, objSaveData, GridCallBack);
        }
    }

    /**
     * @name DeleteEmptyRow
     * @param {*} objContext objContext
     * @summary Delete the newly added pupil.
     */
    DeleteEmptyRow(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilGridData": objContext.Pupil_ModuleProcessor.GetPupil(objContext, objContext.state.intActivationStatusTogglValue), "isNewRowAdded": false } });
    }

    /**
     * @name HandleStatusToggle
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Fired when the dropdown data of activation status dropdown chamges.Toggle between All, Active and Inactive pupil.
     */
    HandleStatusToggle(objContext, objItem) {
        let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        if (objClassData)
            objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilGridData": objContext.Pupil_ModuleProcessor.GetPupil(objContext, objItem.value), "intActivationStatusTogglValue": objItem.value, "isNewRowAdded": false } });
    }

    /**
     * @name OnBeforeRowRender
     * @param {any} objRowData objRowData
     * @param {any} JConfiguration JConfiguration
     * @param {any} objContext objContext
     * @summary Add ActiveImageIcon property to the object
     * @return {*} retruns object
    */
    OnBeforeRowRender(objRowData, JConfiguration, objContext) {
        if (objRowData.IsNewRow) {
            return {
                ...objRowData,
                "ActivationStatus": "ActiveImageIcon_Check_Green"
            };
        } else {
            let objSelectedClass = this.GetClassDataFromApplicationState(objContext);
            let objRowTemp = {};
            if (objContext.state.intActivationStatusTogglValue == -1)
                objRowTemp = objRowData.t_TestDrive_Member_Class_Pupil.filter(objNewData => objNewData["uClassId"] == objSelectedClass["uClassId"])[0];
            else if (objContext.state.intActivationStatusTogglValue == 1)
                objRowTemp = objRowData.t_TestDrive_Member_Class_Pupil.filter(objNewData => objNewData["cIsDeleted"] != "Y" && objNewData["uClassId"] == objSelectedClass["uClassId"])[0];
            else if (objContext.state.intActivationStatusTogglValue == 2)
                objRowTemp = objRowData.t_TestDrive_Member_Class_Pupil.filter(objNewData => objNewData["cIsDeleted"] == "Y" && objNewData["uClassId"] == objSelectedClass["uClassId"])[0];

            if (objRowTemp) {
                var strStatusImage = objRowTemp["cIsDeleted"] === "N" ? "ActiveImageIcon_Check_Green" : "ActiveImageIcon_ErrorDeactive";
                return {
                    ...objRowData,
                    ["ActivationStatus"]: strStatusImage
                };
            }
            else {
                return null; //if objRowTemp value is null
            }
        }
    }

    /**
    * @name OnBeforeEditRow
    * @param {any} objContext objContext
    * @param {any} objEditRowData objEditRowData
    * @summary Filtering the row basesd on cIsDeleted
    * @returns {*} retruns object
    */
    OnBeforeEditRow(objContext, objEditRowData) {
        let objSelectedClass = this.GetClassDataFromApplicationState(objContext);
        let objRowTemp = {};
        if (objContext.state.intActivationStatusTogglValue == -1)
            objRowTemp = objEditRowData.t_TestDrive_Member_Class_Pupil.filter(objNewData => objNewData["uClassId"] == objSelectedClass["uClassId"])[0];
        else if (objContext.state.intActivationStatusTogglValue == 1)
            objRowTemp = objEditRowData.t_TestDrive_Member_Class_Pupil.filter(objNewData => objNewData["cIsDeleted"] != "Y" && objNewData["uClassId"] == objSelectedClass["uClassId"])[0];
        else if (objContext.state.intActivationStatusTogglValue == 2)
            objRowTemp = objEditRowData.t_TestDrive_Member_Class_Pupil.filter(objNewData => objNewData["cIsDeleted"] == "Y" && objNewData["uClassId"] == objSelectedClass["uClassId"])[0];

        if (objRowTemp && objRowTemp["cIsDeleted"] === "N") {
            return { "AllowEdit": true, "ButtonKeys": ["Deactivate"] };
        } else {
            return { "AllowEdit": false, "ButtonKeys": ["Activate"] };
        }
    }

    /**
     * @name GetCallBacks
     * @param {object} objContext Context object
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} returns objCallBasics
     */
    GetCallBacks(objContext) {
        return {
            GridActionButtons: objContext.Pupil_ModuleProcessor.GetHeaderButtons(objContext),
            SaveMethod: (objSaveData, GridCallBack) => { objContext.Pupil_ModuleProcessor.SaveMethod(objContext, objSaveData, GridCallBack); },
            OnBeforeGridRowRender: (objRowData) => objContext.Pupil_ModuleProcessor.OnBeforeRowRender(objRowData, objContext.props.JConfiguration, objContext),
            OnBeforeEditRow: (objEditRowData) => { return objContext.Pupil_ModuleProcessor.OnBeforeEditRow(objContext, objEditRowData); }
        };
    }

    /**
    * @name GetMetaDataStatusToggleDropDown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataStatusToggleDropDown() {
        return {
            "DisplayColumn": "key",
            "ValueColumn": "value"
        };
    }

    /**
    * @name GetEventsStatusToggleDropDown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsStatusToggleDropDown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Pupil_ModuleProcessor.HandleStatusToggle(objContext, objItem)
        };
    }

    /**
     * @name GetResourceDataStatusToggleDropDown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataStatusToggleDropDown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
     * @name GetMetaData
     * @param {*} objContext objContext
     * @summary it returns the array of metadatas
     * @returns {array} MetaData
     */
    GetMetaData(objContext) {
        let objMeta = {
            HeaderData: objContext.Pupil_ModuleProcessor.GetColumns(objContext),
            Filter: null,
            EditableGrid: objContext.props.blnIsGridEditable,
            RowActionButtons: objContext.Pupil_ModuleProcessor.GetActionButtons(objContext),
            blnClearApplicationStateOfGrid: true
        };
        return objMeta;
    }

    /**
     * @name UpdatePupilCount
     * @summary updates the pupil count to store
     * @param {any} objContext
     * @param {any} arrClass
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
                strEnityKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);

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
     * @param {any} objContext
     */
    GetStateIdByApplicationType(objContext) {
        if (objContext.props.JConfiguration.ApplicationTypeId == "1") {
            return objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["iStateId"]
        } else {
            return objContext.props.ClientUserDetails.SchoolDetails["iStateId"]
        }
    }
}

export default Pupil_ModuleProcessor;