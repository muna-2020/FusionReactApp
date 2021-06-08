//Objects required for module.
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';

//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
import * as BasicProperty_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/BasicProperty/BasicProperty_MetaData';
import * as Extras_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/Extras/Extras_MetaData';
import * as TimeKeepingExtras_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/TimeKeepingExtras/TimeKeepingExtras_MetaData';
import * as WelcomePage_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/WelcomePage/WelcomePage_MetaData';
import * as TestPage_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/TestPage/TestPage_MetaData';
import * as FinalPage_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/FinalPage/FinalPage_MetaData';
import * as ResultPage_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/ResultPage/ResultPage_MetaData';

//Common helper file.
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Base_AddEditTestMaster_ModuleProcessor
 * @param NA
 * @summary Class for Add/Edit Language module.
 */
class Base_AddEditTestMaster_ModuleProcessor extends IntranetBase_ModuleProcessor {

       // /**
    // * @name StoreMapList   
    // * @param NA
    // * @summary Returns list of objects used in the module
    // * @return {Array} Array of object list
    // */
    // static StoreMapList() {
    //     return [
    //         { "StoreKey": "ApplicationState", "DataKey": "SubjectId" },
    //     ];
    // }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name HandleChangeSubTable
     * @param {string} strTableName consists of the subtable
     * @param {object} objData consists of value of the input
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in subtable 
     */
    HandleChangeSubTable(strTableName, objData, objContext) {
        let objTableData = objContext.state.objData[strTableName] ? objContext.state.objData[strTableName][0] : {};
        objTableData = { ...objTableData, ...objData };
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, [strTableName]: [objTableData] } } });
    }

    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit api after validation succeeds
     */
    SaveData(objContext, blnClose = false) {
        //useRef Approach
        let objt_TestDrive_Test_TestProperty = this.GetTestPropertyTableData(objContext);
        let arrt_TestDrive_Test_Data = this.GetTestDataTable(objContext);
        let objData = {
            ...objContext.state.objData,
            ...objContext.state.objComponentRefs.BasicPropertyRef.current.GetSaveData(),
            ...objContext.state.objComponentRefs.DescriptionRef.current.GetSaveData(),
            ...objContext.state.objComponentRefs.ExtrasRef ? objContext.state.objComponentRefs.ExtrasRef.current.GetSaveData() : {},
            ...objContext.state.objComponentRefs.LanguageRef.current.GetSaveData(),
            ...objContext.state.objComponentRefs.AlgorithmRef ? objContext.state.objComponentRefs.AlgorithmRef.current.GetSaveData() : {},
            ...objContext.state.objComponentRefs.AdaptiveAlgorithmRef ? objContext.state.objComponentRefs.AdaptiveAlgorithmRef.current.GetSaveData() : {},
            ...objContext.state.objComponentRefs.AdaptiveRef ? objContext.state.objComponentRefs.AdaptiveRef.current.GetSaveData() : {},
            ...objContext.state.objComponentRefs.SchoolYearRef ? objContext.state.objComponentRefs.SchoolYearRef.current.GetSaveData() : {},
            ...objContext.state.objComponentRefs.FinalPageRef ? objContext.state.objComponentRefs.FinalPageRef.current.GetSaveData() : {},
            ...objContext.state.objComponentRefs.TestPageRef ? objContext.state.objComponentRefs.TestPageRef.current.GetSaveData() : {},
            "t_TestDrive_Test_TestProperty": [objt_TestDrive_Test_TestProperty],
            "t_TestDrive_Test_Data": arrt_TestDrive_Test_Data
        };

        let objValidationObject = this.Validate(objContext, objData);
        if (!objValidationObject) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objQuery = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iFolderId": ApplicationState.GetProperty("FolderId")
                            }
                        },
                    ]
                },
            };
            if (objContext.state.objData["uTestId"] && objContext.state.objData["uTestId"] != "") {
                let objParams = {
                    ...objQuery,
                    "vEditData": [objData],
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                }
                Object_Intranet_Test_IntranetTest.EditData(objParams, (objReturn, blnEdited) => {
                    if (blnEdited) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": [{ ...objReturn[0], "Id": objReturn[0]["uTestId"] }] });
                        objContext.props.CallBacks.OnAddEditComplete(objReturn[0]);
                        this.UpdateTestData(objReturn[0], objContext, false);
                        if (blnClose)
                            Popup.ClosePopup(objContext.props.Id);
                    }
                });
            }
            else {
                let objParams = {
                    ...objQuery,
                    "vAddData": objData,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                }
                Object_Intranet_Test_IntranetTest.AddData(objParams, (objReturn, blnAdded) => {
                    if (blnAdded) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": null });
                        objContext.props.CallBacks.OnAddEditComplete(objReturn[0]);
                        this.UpdateTestData(objReturn[0], objContext, true);
                        if (blnClose)
                            Popup.ClosePopup(objContext.props.Id);

                    }
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveClicked": true } });
            //objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        }
    }

    /**
   * @name UpdateTestData
   * @param {object} objContext takes objContext
   * @param {boolean} blnAdded sends true when Data is Add 
   * @summary 
   */
    UpdateTestData(objParams, objContext, blnAdded) {
        if (DataRef(objContext.props.Data.Object_Intranet_Test_IntranetTest)["Data"]) {
            let objParamValue = {
                "Count": null,
                "Data": [objParams],
                "PrimaryKeyName": "uTestId",
                "TimeStamp": DataRef(objContext.props.Data.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iFolderId;" + ApplicationState.GetProperty("FolderId")).TimeStamp
            }
            var strEntity = "Object_Intranet_Test_IntranetTest"
            blnAdded ? ArcadixCacheData.AddData(strEntity, { Value: objParamValue }) : ArcadixCacheData.EditData(strEntity, { Value: objParamValue });
        }
    }

    /**
     * @name GetTestPropertyTableData
     * @param {object} objContext takes objContext
     * @summary Gets the values from all ref components for t_TestDrive_Test_TestProperty subtable
     */
    GetTestPropertyTableData(objContext) {
        return {
            ...objContext.state.objData.t_TestDrive_Test_TestProperty[0],
            ...objContext.state.objComponentRefs.BasicPropertyRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0],
            ...objContext.state.objComponentRefs.FilterRef ? objContext.state.objComponentRefs.FilterRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.SecurityRef ? objContext.state.objComponentRefs.SecurityRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.AlgorithmRef ? objContext.state.objComponentRefs.AlgorithmRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.AdaptiveRef ? objContext.state.objComponentRefs.AdaptiveRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.DisplayOptionsRef ? objContext.state.objComponentRefs.DisplayOptionsRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.TimeKeepingExtrasRef ? objContext.state.objComponentRefs.TimeKeepingExtrasRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.PreLoginRef ? objContext.state.objComponentRefs.PreLoginRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.WelcomePageRef ? objContext.state.objComponentRefs.WelcomePageRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.TestPageRef ? objContext.state.objComponentRefs.TestPageRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.FinalPageRef ? objContext.state.objComponentRefs.FinalPageRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.ResultPageRef ? objContext.state.objComponentRefs.ResultPageRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {},
            ...objContext.state.objComponentRefs.ExternalRef ? objContext.state.objComponentRefs.ExternalRef.current.GetSaveData().t_TestDrive_Test_TestProperty[0] : {}
        };
    }

    /**
     * @name GetTestDataTable
     * @param {object} objContext takes objContext
     * @summary Gets the values from all ref components for t_TestDrive_Test_Data subtable
     */
    GetTestDataTable(objContext) {
        let arrt_TestDrive_Test_Data = objContext.props.Data.MultiLanguageData.map(objMultiLang => {
            return {
                ...objContext.state.objComponentRefs.WelcomePageRef ? objContext.state.objComponentRefs.WelcomePageRef.current.GetSaveData().t_TestDrive_Test_Data.find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {},
                ...objContext.state.objComponentRefs.TestPageRef ? objContext.state.objComponentRefs.TestPageRef.current.GetSaveData().t_TestDrive_Test_Data.find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {},
                ...objContext.state.objComponentRefs.FinalPageRef ? objContext.state.objComponentRefs.FinalPageRef.current.GetSaveData().t_TestDrive_Test_Data.find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {},
                ...objContext.state.objComponentRefs.ExternalRef ? objContext.state.objComponentRefs.ExternalRef.current.GetSaveData().t_TestDrive_Test_Data.find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {},
                "iLanguageId": objMultiLang["iLanguageId"]
            }
        });
        return arrt_TestDrive_Test_Data;
    }

    /**
     * @name Validate
     * @param {object} objContext takes objContext
     * @param {object} objData takes objData
     * @param {strColumnName} strColumnName strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
     */
    Validate(objContext, objData, strColumnName) {
        let arrMetaData = [...BasicProperty_MetaData.GetBasicPropertyMetaData(),
        ...Extras_MetaData.GetExtrasMetaData(),
        ...TimeKeepingExtras_MetaData.GetTimeKeepingExtrasMetaData(),
        ...WelcomePage_MetaData.GetWelcomePageMetaData(),
        ...TestPage_MetaData.GetTestPageMetaData(),
        ...FinalPage_MetaData.GetFinalPageMetaData(),
        ...ResultPage_MetaData.GetResultPageMetaData()
        ];

        var objNewValidationObject = FieldValidator.ValidateClientSide(arrMetaData, objContext.props.Resource.Text, objData, strColumnName, true, "", "", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
     * @name ValidateFocus
     * @param {domValidationMessage} domValidationMessage takes domValidationMessage
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit api after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

    /**
     * @name ValidateOnBlur
     * @param {object} objContext takes objContext
     * @param {string} strColumnName strColumnName
     * @summary Validates onBlur event of field after click of Save
     */
    ValidateOnBlur(strColumnName, arrMetaData, objContext) {
        if (objContext.props.Data.IsSaveClicked) {
            FieldValidator.ValidateClientSide(arrMetaData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, false, "", "", true)
        }
    }

    /**
     * @name HandleLanguageCheckBoxClick
     * @param {string} strLanguageId consists of value of the LangaugeId
     * @param {boolean} blnIsForLanguageActive if for ActiveLanguage or not
     * @param {boolean} blnIsLanguageActive if ActiveLanguage is checked or not
     * @param {object} objContext takes objContext
     * @summary Handels checkbox click of Langauge component.
     */
    HandleLanguageCheckBoxClick(strLanguageId, blnIsForLanguageActive, blnIsLanguageActive, objContext) {
        let arrt_TestDrive_Test_Language = objContext.state.objData.t_TestDrive_Test_Language;
        if (!blnIsForLanguageActive) {
            let blnLanguageAdded = arrt_TestDrive_Test_Language.filter(objt_TestDrive_Test_Language => { return objt_TestDrive_Test_Language.iLanguageId == strLanguageId }).length > 0;
            var arr_New_t_TestDrive_Test_Language;
            if (blnLanguageAdded && objContext.state.objData.t_TestDrive_Test_Language.length > 1) {
                arr_New_t_TestDrive_Test_Language = arrt_TestDrive_Test_Language.filter(objt_TestDrive_Test_Language => { return objt_TestDrive_Test_Language.iLanguageId != strLanguageId })
            }
            else if (!blnLanguageAdded) {
                arr_New_t_TestDrive_Test_Language = [...arrt_TestDrive_Test_Language, { ["iLanguageId"]: strLanguageId, ["cIsActivatedForTest"]: "N" }]
            }
            if (arr_New_t_TestDrive_Test_Language) {
                let objNewData = { ...objContext.state.objData, ["t_TestDrive_Test_Language"]: arr_New_t_TestDrive_Test_Language };
                objContext.dispatch({ type: "SET_STATE", payload: { objData: objNewData } });
            }
        }
        else {
            var arr_New_t_TestDrive_Test_Language = [];
            arrt_TestDrive_Test_Language.map(objTestLanguage => {
                if (objTestLanguage["iLanguageId"] == strLanguageId) {
                    if (blnIsLanguageActive) {
                        arr_New_t_TestDrive_Test_Language = [...arrt_TestDrive_Test_Language.filter(objt_TestDrive_Test_Language => { return objt_TestDrive_Test_Language.iLanguageId != strLanguageId }), { ["iLanguageId"]: strLanguageId, ["cIsActivatedForTest"]: "Y" }]
                    }
                    else {
                        arr_New_t_TestDrive_Test_Language = [...arrt_TestDrive_Test_Language.filter(objt_TestDrive_Test_Language => { return objt_TestDrive_Test_Language.iLanguageId != strLanguageId }), { ["iLanguageId"]: strLanguageId, ["cIsActivatedForTest"]: "N" }]
                    }
                }
            })
            if (arr_New_t_TestDrive_Test_Language) {
                let objNewData = { ...objContext.state.objData, ["t_TestDrive_Test_Language"]: arr_New_t_TestDrive_Test_Language };
                objContext.dispatch({ type: "SET_STATE", payload: { objData: objNewData } });
            }
        }
    }

    /**
     * @name IsLanguageAdded
     * @param {string} strLanguageId consists of value of the LangaugeId
     * @param {object} objContext takes objContext
     * @summary Checks if Langauge is present for checkbox.
     */
    IsLanguageAdded(strLanguageId, blnIsForLanguageActive, objContext) {
        let arrt_TestDrive_Test_Language = objContext.state.objData.t_TestDrive_Test_Language;
        if (!blnIsForLanguageActive) {
            let blnLanguageAdded = arrt_TestDrive_Test_Language.filter(objt_TestDrive_Test_Language => { return objt_TestDrive_Test_Language.iLanguageId == strLanguageId }).length > 0;
            return blnLanguageAdded;
        }
        else {
            let blnLanguageAdded = arrt_TestDrive_Test_Language.filter(objt_TestDrive_Test_Language => { return (objt_TestDrive_Test_Language.iLanguageId == strLanguageId && objt_TestDrive_Test_Language.cIsActivatedForTest == "Y") }).length > 0;
            return blnLanguageAdded;
        }
    }

    /**
     * @name IsShowLanguageDiv
     * @param {object} objContext takes objContext
     * @summary Checks whether to display Language component or not.
     */
    IsShowLanguageDiv(objContext) {
        if (objContext.props.Data.MainClientLanguageData.filter(objMainClientLanguage => objMainClientLanguage["cIsDeleted"] == 'N' && objMainClientLanguage["iApplicationTypeId"] == 2).length > 1)
            return true;
        else
            return false;
    }

    /**
     * @name HandleTestPropertySubTableChange
     * @param {string} strColumnName takes the ColumnName   
     * @param {object} objContext takes objContext
     * @summary Handels Radio button changes for Progressdisplay.
     */
    HandleTestPropertySubTableChange(strColumnName, strValue, objContext) {
        let objt_TestDrive_Test_TestProperty = { ...objContext.state.objData.t_TestDrive_Test_TestProperty[0], [strColumnName]: strValue };
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, ["t_TestDrive_Test_TestProperty"]: [objt_TestDrive_Test_TestProperty] } } });
    }

    /**
     * @name IsSchoolYearChecked
     * @param {string} strSchoolYear takes the schoolyearid
     * @param {object} objContext takes objContext
     * @summary Checkbox functionality of school year
     */
    IsSchoolYearChecked(strSchoolYear, objContext) {
        let blnIsChecked = objContext.state.objData.t_TestDrive_Test_AssignedSchoolYear.filter(objSchoolYear => { return objSchoolYear["iSchoolYearId"] == strSchoolYear }).length > 0
        return blnIsChecked;
    }

    /**
     * @name HandleSchoolYearChange
     * @param {string} strSchoolYear takes the schoolyearid
     * @param {object} objContext takes objContext
     * @summary Handles change in SchoolYear chackboxes
     */
    HandleSchoolYearChange(strSchoolYearId, objContext) {
        let arrt_TestDrive_Test_AssignedSchoolYear = objContext.state.objData.t_TestDrive_Test_AssignedSchoolYear;
        let arrNewt_TestDrive_Test_AssignedSchoolYear = [];
        if (objContext.state.objData.t_TestDrive_Test_AssignedSchoolYear.find(obj => { return (obj["iSchoolYearId"] == strSchoolYearId) })) {
            arrNewt_TestDrive_Test_AssignedSchoolYear = objContext.state.objData.t_TestDrive_Test_AssignedSchoolYear.filter(obj => { return (obj["iSchoolYearId"] != strSchoolYearId) });
        }
        else {
            arrNewt_TestDrive_Test_AssignedSchoolYear = [...arrt_TestDrive_Test_AssignedSchoolYear, { "iSchoolYearId": strSchoolYearId }];
        }

        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, ["t_TestDrive_Test_AssignedSchoolYear"]: arrNewt_TestDrive_Test_AssignedSchoolYear } } });
    }

    /**
     * @name OnDropdownChangeHandler
     * @param {string} strType takes the type of dropdown
     * @param {object} objChangeData takes objChangeData
     * @param {object} objContext takes objContext
     * @summary Handles changes in dropdowns
     */
    OnDropdownChangeHandler(strType, objChangeData, objContext) {
        let strValue = "", strId = "";
        if (strType == "subject") {
            let objt_TestDrive_Test_Category = { ...objContext.state.objData.t_TestDrive_Test_Category[0], "iCategoryId": -1 }
            let objt_TestDrive_Test_Competency = { ...objContext.state.objData.t_TestDrive_Test_Competency[0], "iCategoryCompetencyId": -1 }
            let objNewData = { ...objContext.state.objData, "iSubjectId": objChangeData.iSubjectId, ["t_TestDrive_Test_Category"]: [objt_TestDrive_Test_Category], ["t_TestDrive_Test_Competency"]: [objt_TestDrive_Test_Competency] }
            objContext.dispatch({ type: "SET_STATE", payload: { objData: objNewData } })
            ApplicationState.SetProperty("SubjectId", objChangeData.iSubjectId)
            strValue = objChangeData.iSubjectId;
            strId = "iSubjectId";
        }
        else if (strType == "category") {
            let objt_TestDrive_Test_Category = { ...objContext.state.objData.t_TestDrive_Test_Category[0], "iCategoryId": objChangeData.iCategoryId }
            let objt_TestDrive_Test_Competency = { ...objContext.state.objData.t_TestDrive_Test_Competency[0], "iCategoryCompetencyId": -1 }
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, ["t_TestDrive_Test_Category"]: [objt_TestDrive_Test_Category], ["t_TestDrive_Test_Competency"]: [objt_TestDrive_Test_Competency] } } })
            strValue = objChangeData.iCategoryId;
            strId = "iCategoryId";
        }
        else if (strType == "competency") {
            let objt_TestDrive_Test_Competency = { ...objContext.state.objData.t_TestDrive_Test_Competency[0], "iCategoryCompetencyId": objChangeData.iCategoryCompetencyId }
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, ["t_TestDrive_Test_Competency"]: [objt_TestDrive_Test_Competency] } } })
            strValue = objChangeData.iCategoryCompetencyId;
            strId = "iCategoryCompetencyId";
        }
        //validation 
        if (objContext.props.Data.IsSaveClicked) {
            FieldValidator.ValidateClientSide(BasicProperty_MetaData.GetBasicPropertyMetaData(), objContext.props.Resource.Text, { [strId]: strValue }, strId, false, "", "", true)
        }
    }

    /**
     * @name HandleAdaptivePropertyChange
     * @param {string} strKey takes strKey 
     * @param {string} strValue takes strValue
     * @param {object} objContext takes objContext
     * @summary Handles changes in AdaptiveProperty component
     */
    HandleAdaptivePropertyChange(strKey, strValue, objContext) {
        if (strKey == "vModel") {
            if (strValue == "Polytomous") {
                let arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.filter(objAdaptiveData => objAdaptiveData["vAttributeKey"] != strKey && objAdaptiveData["vAttributeKey"] != "vModelName");
                let arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration = [...arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration, { "vAttributeKey": strKey, "vValue": strValue }, { "vAttributeKey": "vModelName", "vValue": "GRM" }]
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration } } })
            }
            if (strValue == "Dichotomous") {
                let arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.filter(objAdaptiveData => objAdaptiveData["vAttributeKey"] != strKey && objAdaptiveData["vAttributeKey"] != "vModelName");
                let arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration = [...arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration, { "vAttributeKey": strKey, "vValue": strValue }, { "vAttributeKey": "vModelName", "vValue": "1PL" }]
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration } } })
            }
        }
        else {
            let arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.filter(objAdaptiveData => objAdaptiveData["vAttributeKey"] != strKey);
            let arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration = [...arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration, { "vAttributeKey": strKey, "vValue": strValue }]
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration } } })
        }
    }

    /**
     * @name IsPropertyChecked
     * @param {string} strKey takes strKey
     * @param {string} strValue takes strValue
     * @param {object} objContext takes objContext
     * @summary Check functionality of checkboxes in Adaptive component
     */
    IsPropertyChecked(strKey, strValue, objContext) {

        let objAdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.find(objAdaptiveData => objAdaptiveData["vAttributeKey"] == strKey);
        if (objAdaptiveAlgorithmConfiguration) {
            if (objAdaptiveAlgorithmConfiguration.vValue == strValue)
                return true;
            else
                return false;
        }
        return false;
    }

    /**
     * @name GetAdaptivePropertyValue
     * @param {string} strKey takes strKey
     * @param {object} objContext takes objContext
     * @summary Gets value of the Adaptive property
     */
    GetAdaptivePropertyValue(strKey, objContext) {
        let objAdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.find(objAdaptiveData => objAdaptiveData["vAttributeKey"] == strKey);
        if (objAdaptiveAlgorithmConfiguration) {
            return objAdaptiveAlgorithmConfiguration.vValue;
        }
        return "";
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId takes userid 
     * @param {object} objContext takes objContext
     * @summary Returns name of Administrator
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = objContext.props.Data.arrIntranetadministrator;
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }

    /**
     * @name AddTextResultRangeEntry
     * @param {object} objContext takes objContext
     * @summary Add new Row to TextResultRange table
     */
    AddTextResultRangeRow(objContext) {
        let objTextResultRange = objContext.state.objData.t_TestDrive_Test_ResultPageText.find((obj, index) => index == objContext.state.intSelectedRangeIndex);

        if (objTextResultRange && objTextResultRange["vAction"] != "Enable") {
            let arrNewt_TestDrive_Test_ResultPageText = [...objContext.state.objData.t_TestDrive_Test_ResultPageText, { dResultValueFrom: "", dResultValueTo: "", vAction: "Enable" }]
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_ResultPageText": arrNewt_TestDrive_Test_ResultPageText }, "intSelectedRangeIndex": (arrNewt_TestDrive_Test_ResultPageText.length - 1) } });  //objContext.state.intSelectedRangeIndex + 1
        }
        else {
            this.HandleEnableDisableTextResultRange(objContext.state.intSelectedRangeIndex, false, objContext);
        }
    }

    /**
     * @name HandleDeleteTextResultRange
     * @param {object} objContext takes objContext
     * @summary Handles delete row event of TextResultRange table
     */
    HandleDeleteTextResultRange(e, intIndex, objContext) {
        e.stopPropagation();
        if (objContext.state.objData.t_TestDrive_Test_ResultPageText.length > 1) {
            let arrNewt_TestDrive_Test_ResultPageText = objContext.state.objData.t_TestDrive_Test_ResultPageText.filter((obj, index) => index != intIndex);
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_ResultPageText": arrNewt_TestDrive_Test_ResultPageText }, "intSelectedRangeIndex": 0 } })
        }
    }

    /**
     * @name HandleEnableDisableTextResultRange
     * @param {object} objContext takes objContext
     * @summary Handles Enable or Disable Row event of TextResultRange table
     */
    HandleEnableDisableTextResultRange(intIndex, blnIsDisabled, objContext, event = null) {
        if (event) {
            event.stopPropagation();
        }
        let blnIsEnableRow = false;
        if (intIndex != objContext.state.intSelectedRangeIndex) {
            let objSelectedTextResultRange = objContext.state.objData.t_TestDrive_Test_ResultPageText.find((obj, index) => index == objContext.state.intSelectedRangeIndex);
            if (objSelectedTextResultRange && objSelectedTextResultRange["vAction"] == "Enable") {
                this.HandleEnableDisableTextResultRange(objContext.state.intSelectedRangeIndex, false, objContext);
            }
            else {
                blnIsEnableRow = true;
            }
        }
        if (blnIsEnableRow || intIndex == objContext.state.intSelectedRangeIndex) {
            let objTextResultRange = objContext.state.objData.t_TestDrive_Test_ResultPageText.find((obj, index) => index == intIndex);
            if (objTextResultRange && objTextResultRange["dResultValueFrom"] && objTextResultRange["dResultValueTo"] && Number(objTextResultRange["dResultValueTo"]) > Number(objTextResultRange["dResultValueFrom"])) {
                let arrNewt_TestDrive_Test_ResultPageText = objContext.state.objData.t_TestDrive_Test_ResultPageText.map((obj, index) => {
                    if (index == intIndex)
                        return { ...obj, ["vAction"]: blnIsDisabled ? "Enable" : "Disable" };
                    else
                        return obj;
                });
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_ResultPageText": arrNewt_TestDrive_Test_ResultPageText }, blnIsAddRowClicked: !blnIsDisabled, intSelectedRangeIndex: intIndex } })
            }
            else {
                this.ValidateResultRange(objTextResultRange, intIndex);
                objContext.dispatch({ type: "SET_STATE", payload: { blnIsAddRowClicked: !blnIsDisabled } });
            }
        }
    }

    /**
     * @name ValidateResultRange
     * @param {object} objTextResultRange takes objTextResultRange
     * @param {int} intIndex takes intIndex
     * @summary Validation for contents of TextResultRange table
     */
    ValidateResultRange(objTextResultRange, intIndex) {
        if (objTextResultRange["dResultValueFrom"] == null || objTextResultRange["dResultValueFrom"] == "") {
            let domColumn = document.getElementById("dResultValueFrom" + intIndex);
            if (domColumn)
                domColumn.classList.add("error-field");
        }
        if (objTextResultRange["dResultValueTo"] == null || objTextResultRange["dResultValueTo"] == "") {
            let domColumn = document.getElementById("dResultValueTo" + intIndex);
            if (domColumn)
                domColumn.classList.add("error-field");
        }
        if (Number(objTextResultRange["dResultValueTo"]) <= Number(objTextResultRange["dResultValueFrom"])) {
            let domColumn = document.getElementById("dResultValueTo" + intIndex);
            if (domColumn)
                domColumn.classList.add("error-field");
        }
    }

    /**
     * @name ValidateResultRangeOnBlur
     * @param {string} strColumnName takes strColumnName
     * @param {int} intIndex takes intIndex
     * @param {object} objResultRange takes objResultRange
     * @param {object} objContext takes objContext
     * @summary OnBlur Validation for contents of TextResultRange table
     */
    ValidateResultRangeOnBlur(strColumnName, intIndex, objResultRange, objContext) {
        if (objContext.state.blnIsAddRowClicked) {
            if (strColumnName == "dResultValueFrom") {
                let domColumn = document.getElementById("dResultValueFrom" + intIndex);
                if (objResultRange["dResultValueFrom"] != null && objResultRange["dResultValueFrom"] != "") {
                    if (domColumn)
                        domColumn.classList.remove("error-field");
                }
                else {
                    if (domColumn)
                        domColumn.classList.add("error-field");
                }
            }
            else if (strColumnName == "dResultValueTo") {
                let domColumn = document.getElementById("dResultValueTo" + intIndex);
                if (objResultRange["dResultValueTo"] != null && objResultRange["dResultValueTo"] != "" && Number(objResultRange["dResultValueTo"]) > Number(objResultRange["dResultValueFrom"])) {
                    if (domColumn)
                        domColumn.classList.remove("error-field");
                }
                else {
                    if (domColumn)
                        domColumn.classList.add("error-field");
                }
            }
        }
    }

    /**
     * @name OnClickTextResultRangeRow
     * @param {object} objContext takes objContext
     * @summary Handles onClickRow event of TextResultRange table
     */
    OnClickTextResultRangeRow(intIndex, objContext) {
        let objTextResultRange = objContext.state.objData.t_TestDrive_Test_ResultPageText.find((obj, index) => index == objContext.state.intSelectedRangeIndex);

        if (objTextResultRange && objTextResultRange["vAction"] != "Enable") {
            objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedRangeIndex": intIndex } });
        }
    }

    /**
     * @name HandleResultPageRangeChange
     * @param {object} objContext takes objContext
     * @summary Handles changes in TextResultRange table
     */
    HandleResultPageRangeChange(strAttributeName, strValue, intIndex, objContext) {
        let objTextResultRange = objContext.state.objData.t_TestDrive_Test_ResultPageText.find((obj, index) => index == intIndex);
        if (objTextResultRange) {
            let arrNewt_TestDrive_Test_ResultPageText = objContext.state.objData.t_TestDrive_Test_ResultPageText.map((obj, index) => {
                if (index == intIndex)
                    return { ...obj, [strAttributeName]: strValue };
                else
                    return obj;
            });
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_ResultPageText": arrNewt_TestDrive_Test_ResultPageText } } })
        }
    }

    /**
     * @name HandleResultPageTextDataChange
     * @param {object} objContext takes objContext
     * @summary Handles changes in MultiLanguage TextResultRange 
     */
    HandleResultPageTextDataChange(strAttributeName, strValue, objContext, strLanguageId) {
        let arrNewt_TestDrive_Test_ResultPageText = objContext.state.objData.t_TestDrive_Test_ResultPageText.map((objResultPageText, index) => {
            if (index == objContext.state.intSelectedRangeIndex && objResultPageText["vAction"] == "Enable") {
                let arrLanguageData;
                if (!objResultPageText.t_TestDrive_Test_ResultPageText_Data) {
                    return { ...objResultPageText, ["t_TestDrive_Test_ResultPageText_Data"]: [{ "iLanguageId": strLanguageId, [strAttributeName]: strValue }] }
                }
                else if (objResultPageText.t_TestDrive_Test_ResultPageText_Data.filter(x => x["iLanguageId"] == strLanguageId).length == 0) {
                    arrLanguageData = [...objResultPageText.t_TestDrive_Test_ResultPageText_Data, { "iLanguageId": strLanguageId, [strAttributeName]: strValue }];
                    return { ...objResultPageText, ["t_TestDrive_Test_ResultPageText_Data"]: arrLanguageData };
                }
                else {
                    arrLanguageData = objResultPageText.t_TestDrive_Test_ResultPageText_Data.map((objItem) => {
                        return objItem["iLanguageId"] == strLanguageId ? { ...objItem, [strAttributeName]: strValue } : objItem;
                    });
                    return { ...objResultPageText, ["t_TestDrive_Test_ResultPageText_Data"]: [...arrLanguageData] };
                }
            }
            else
                return objResultPageText;
        });
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_ResultPageText": arrNewt_TestDrive_Test_ResultPageText } } })
    }

    /**
     * @name GetResultPageTextSaveData
     * @param {object} objContext takes objContext
     * @summary Gets save data for TextResultRange table
     */
    GetResultPageTextSaveData(objContext) {
        let arrt_TestDrive_Test_ResultPageText = [];
        if (objContext.state.objData.cUseResultTextByRange == "Y") {
            arrt_TestDrive_Test_ResultPageText = objContext.state.objData.t_TestDrive_Test_ResultPageText.filter(objText => objText["dResultValueFrom"] && objText["dResultValueTo"] && Number(objText["dResultValueTo"]) > Number(objText["dResultValueFrom"]));
            let arrNewt_TestDrive_Test_ResultPageText = arrt_TestDrive_Test_ResultPageText.map(objText => ({ ...objText, "vAction": "Disable" }))
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_ResultPageText": arrNewt_TestDrive_Test_ResultPageText.length > 0 ? arrNewt_TestDrive_Test_ResultPageText : objContext.state.objData.t_TestDrive_Test_ResultPageText, cUseResultTextByRange: arrNewt_TestDrive_Test_ResultPageText.length > 0 ? "Y" : "N" }, intSelectedRangeIndex: 0 } });
        }
        return arrt_TestDrive_Test_ResultPageText;
    }

    /**
     * @name HandleResultTextOrCertificateChange
     * @param {object} objContext takes objContext
     * @summary Handles changes in MultiLanguage TextResultRange 
     */
    HandleResultTextOrCertificateChange(strAttributeName, strValue, objContext) {
        let objNewData = objContext.state.objData;
        switch (strAttributeName) {
            case "cHasResultPageText":
                objNewData = { ...objContext.state.objData, "cHasResultPageText": strValue, "cHasResultPageCertificate": "N" }
                break;
            case "cHasResultPageCertificate":
                objNewData = { ...objContext.state.objData, "cHasResultPageCertificate": strValue, "cHasResultPageText": "N" }
                break;
            case "Both":
                objNewData = { ...objContext.state.objData, "cHasResultPageText": strValue, "cHasResultPageCertificate": strValue }
                break;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name SetAdaptiveTaskSubSubjectSequenceDataInState
     * @param {object} objContext takes objContext
     * @summary Sets AdaptiveTaskSubSubjectSequenceData in state on Subject change
     */
    SetAdaptiveTaskSubSubjectSequenceDataInState(objContext) {
        let arrSubSubjects = [];
        let arrSubSubjectIds = [];
        let intRound = 1;
        let strIsSequential = "Y";
        let intEnabledRowIndex = 1;
        let arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = objContext.props.Data.SubjectData.filter(objSubject => objSubject["iParentSubjectId"] == objContext.props.Data.SubjectId && objSubject["cIsDeleted"] == "N").map((objSubSubject, intIndex) => {
            let objSubSubjectData = objSubSubject.t_TestDrive_Subject_Data.find(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId);
            arrSubSubjects = [...arrSubSubjects, objSubSubjectData["vSubjectName"]];
            arrSubSubjectIds = [...arrSubSubjectIds, objSubSubject["iSubjectId"]];
            return {
                "iRound": 1,
                "iDisplayOrder": null,
                "iSubSubjectId": objSubSubject["iSubjectId"]
            }
        });
        if (objContext.props.Data.IsEdit && objContext.props.Data.SubjectId == objContext.props.Data.DisplayData.iSubjectId && objContext.props.Data.DisplayData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.length > 0) {
            arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = objContext.props.Data.DisplayData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.filter(objSeq => arrSubSubjectIds.includes(objSeq["iSubSubjectId"]));
            intRound = objContext.props.Data.DisplayData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.reduce((max, p) => p["iRound"] > max ? p["iRound"] : max, 0);
            strIsSequential = objContext.props.Data.DisplayData.cIsAdaptiveTaskSubSubjectChosenSequential;
            intEnabledRowIndex = null;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "cIsAdaptiveTaskSubSubjectChosenSequential": strIsSequential, "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence }, "arrSubSubjects": arrSubSubjects, "intRoundNumber": intRound, "intEnabledRowIndex": intEnabledRowIndex } })
    }

    /**
     * @name IsShowAdaptiveTaskSubSubjectSequenceDiv
     * @param {object} objContext takes objContext
     * @summary Check whether to show the AdaptiveTaskSubSubjectSequenceDiv based on selected subject
     */
    IsShowAdaptiveTaskSubSubjectSequenceDiv(objContext) {
        let blnIsShow = false;
        if (objContext.props.Data.SubjectId && objContext.props.Data.SubjectId != -1) {
            let objSelectedSubject = objContext.props.Data.SubjectData.find(objSubject => objSubject["iSubjectId"] == objContext.props.Data.SubjectId)
            blnIsShow = objSelectedSubject && objSelectedSubject["iParentSubjectId"] == 0;
        }
        return blnIsShow;
    }

    /**
     * @name HandleEnableDisableSubSubjectSequence
     * @param {object} objContext takes objContext
     * @summary Handles Enable/Disable row event in SubSubjectSequence table
     */
    HandleEnableDisableSubSubjectSequence(intRowIndex, blnIsDisabled, objContext) {
        //let blnIsValid = !blnIsDisabled ? this.ValidateSubSubjectSequence(intRowIndex, objContext) : !blnIsDisabled;
        let blnIsValid = false;
        if (!objContext.state.intEnabledRowIndex || intRowIndex == objContext.state.intEnabledRowIndex) {
            blnIsValid = blnIsDisabled ? !blnIsDisabled : this.ValidateSubSubjectSequence(intRowIndex, objContext);
            intRowIndex = blnIsValid ? null : intRowIndex;
        }
        else {
            blnIsValid = this.ValidateSubSubjectSequence(objContext.state.intEnabledRowIndex, objContext);
            intRowIndex = blnIsValid ? intRowIndex : objContext.state.intEnabledRowIndex;
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "intEnabledRowIndex": intRowIndex, "blnIsAddRowClicked": !blnIsDisabled } });
    }

    /**
     * @name HandleAddSubSubjectSequenceRow
     * @param {object} objContext takes objContext
     * @summary Handles Add row event in SubSubjectSequence table
     */
    HandleAddSubSubjectSequenceRow(objContext) {
        //let arrCurrentRowSequence = objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.filter((obj) => obj["iRound"] == objContext.state.intEnabledRowIndex);

        if (!objContext.state.intEnabledRowIndex) {
            let arrNewRound = objContext.props.Data.SubjectData.filter(objSubject => objSubject["iParentSubjectId"] == objContext.props.Data.SubjectId).map((objSubSubject, intIndex) => {
                //let objSubSubjectData = objSubSubject.t_TestDrive_Subject_Data.find(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId);
                //arrSubSubjects = [...arrSubSubjects, objSubSubjectData["vSubjectName"]];
                return {
                    "iRound": objContext.state.intRoundNumber + 1,
                    "iDisplayOrder": null,
                    "iSubSubjectId": objSubSubject["iSubjectId"]
                }
            });

            let arrNewt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = [...objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence, ...arrNewRound]
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": arrNewt_TestDrive_Test_AdaptiveTaskSubSubjectSequence }, "intRoundNumber": objContext.state.intRoundNumber + 1, "intEnabledRowIndex": objContext.state.intRoundNumber + 1 } })
        }
        else {
            this.HandleEnableDisableSubSubjectSequence(objContext.state.intEnabledRowIndex, false, objContext);
        }
    }

    /**
     * @name HandleDeleteSubSubjectSequenceRow
     * @param {object} objContext takes objContext
     * @summary Handles Delete row event in SubSubjectSequence table
     */
    HandleDeleteSubSubjectSequenceRow(e, intIndex, objContext) {
        //e.stopPropagation();
        if (objContext.state.intRoundNumber > 1) {
            let arrNewt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.filter((obj, index) => obj["iRound"] != intIndex);
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": arrNewt_TestDrive_Test_AdaptiveTaskSubSubjectSequence }, "intRoundNumber": objContext.state.intRoundNumber - 1, "intEnabledRowIndex": null } })
        }
    }

    /**
     * @name HandleSubSubjectSequenceChange
     * @param {object} objContext takes objContext
     * @summary Handles changes in SubSubjectSequence table
     */
    HandleSubSubjectSequenceChange(strAttributeName, strValue, strSubSubjectId, intIndex, objContext) {
        let arrNewt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.map((objSeq) => {
            if (objSeq["iRound"] == intIndex && objSeq["iSubSubjectId"] == strSubSubjectId)
                return { ...objSeq, [strAttributeName]: strValue };
            else
                return objSeq;
        });
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": arrNewt_TestDrive_Test_AdaptiveTaskSubSubjectSequence } } });
    }

    /**
     * @name ValidateSubSubjectSequence
     * @param {int} intRowIndex takes RowIndex
     * @param {object} objContext takes objContext
     * @summary Validates content of Subsubject sequence table
     */
    ValidateSubSubjectSequence(intRowIndex, objContext) {
        let intInvalidItems = 0;
        let arrSequenceRow = objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.filter(objSeq => objSeq["iRound"] == intRowIndex).forEach((objRound, intIndex) => {
            if (!objRound["iDisplayOrder"]) {
                intInvalidItems = intInvalidItems + 1;
                let domColumn = document.getElementById("iDisplayOrder_" + intRowIndex + "_" + intIndex);
                if (domColumn) {
                    domColumn.classList.add('error-field');
                }
            }
        });
        return intInvalidItems == 0 ? true : false;
    }

    /**
     * @name ValidateSubSubjectSequenceOnBlur
     * @param {string} strDomColumnName takes DomColumnName
     * @param {object} objSubSubjectSequence takes objSubSubjectSequence
     * @param {object} objContext takes objContext
     * @summary OnBlur Validation for fields of Subsubject sequence table
     */
    ValidateSubSubjectSequenceOnBlur(strDomColumnName, objSubSubjectSequence, objContext) {
        if (objContext.state.blnIsAddRowClicked) {
            let domColumn = document.getElementById(strDomColumnName);
            if (objSubSubjectSequence && objSubSubjectSequence["iDisplayOrder"]) {
                if (domColumn) {
                    domColumn.classList.remove('error-field');
                }
            }
            else {
                if (domColumn) {
                    domColumn.classList.add('error-field');
                }
            }
        }
    }

    /**
     * @name GetSubSubjectSequenceSaveData
     * @param {object} objContext takes objContext
     * @summary Gets value for t_TestDrive_Test_AdaptiveTaskSubSubjectSequence on Save
     */
    GetSubSubjectSequenceSaveData(objContext) {
        let arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = []
        if (objContext.state.objData.cIsAdaptiveTaskSubSubjectChosenSequential == "N") {
            if (objContext.state.intEnabledRowIndex) {
                let blnIsValid = this.ValidateSubSubjectSequence(objContext.state.intEnabledRowIndex, objContext);
                arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = blnIsValid ? objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence : objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.filter(objSeq => objSeq["iRound"] != objContext.state.intEnabledRowIndex);
                let intRound = arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence.reduce((max, p) => p["iRound"] > max ? p["iRound"] : max, 0);
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence }, "intEnabledRowIndex": null, "blnIsAddRowClicked": false, "intRoundNumber": intRound } });
            }
            else {
                arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence = objContext.state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence;
            }
        }
        return arrt_TestDrive_Test_AdaptiveTaskSubSubjectSequence;
    }

    /**
     * @name SetSubjectPropertyDataInState
     * @param {object} objContext takes objContext
     * @summary Sets SubjectProperty in state on Subject change
     */
    SetSubjectPropertyDataInState(objContext) {
        let arrSubjects = [];
        let arrSubjectIds = [];
        let blnIsMeanDisabled = false, blnIsCoVarianceDisabled = false;
        let arrt_TestDrive_Test_TestProperty = [{ "cOverrideConstanceAndVariance": "N" }];
        let arrt_TestDrive_Test_SubjectProperty = objContext.props.Data.SubjectData.filter(objSubject => (objSubject["iSubjectId"] == objContext.props.Data.SubjectId || objSubject["iParentSubjectId"] == objContext.props.Data.SubjectId) && objSubject["cIsDeleted"] == "N").map((objSubject, intIndex) => {
            let objSubjectData = objSubject.t_TestDrive_Subject_Data.find(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId);
            arrSubjects = [...arrSubjects, objSubjectData["vSubjectName"]];
            arrSubjectIds = [...arrSubjectIds, objSubject["iSubjectId"]];
            return {
                "iSubjectId": objSubject["iSubjectId"],
                "dConstance": null,
                "dVariance": null
            }
        });
        if (objContext.props.Data.IsEdit && objContext.props.Data.SubjectId == objContext.props.Data.DisplayData.iSubjectId && objContext.props.Data.DisplayData.t_TestDrive_Test_SubjectProperty.length > 0) {
            arrt_TestDrive_Test_SubjectProperty = objContext.props.Data.DisplayData.t_TestDrive_Test_SubjectProperty.filter(objData => arrSubjectIds.includes(objData["iSubjectId"]));
            arrt_TestDrive_Test_TestProperty = objContext.props.Data.DisplayData.t_TestDrive_Test_TestProperty;
            blnIsMeanDisabled = true;
            blnIsCoVarianceDisabled = true;
        }

        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_SubjectProperty": arrt_TestDrive_Test_SubjectProperty, "t_TestDrive_Test_TestProperty": arrt_TestDrive_Test_TestProperty }, "arrSubjects": arrSubjects, "blnIsMeanDisabled": blnIsMeanDisabled, "blnIsCoVarianceDisabled": blnIsCoVarianceDisabled, blnIsAddRowClicked: false } })
    }

    /**
     * @name HandleSubjectPropertyChange
     * @param {string} strAttributeName takes strAttributeName
     * @param {string} strValue takes strValue
     * @param {int} intIndex takes intIndex
     * @param {object} objContext takes objContext
     * @summary Handles change of SubjectProperty table
     */
    HandleSubjectPropertyChange(strAttributeName, strValue, intIndex, objContext) {
        let arrNewt_TestDrive_Test_SubjectProperty = objContext.state.objData.t_TestDrive_Test_SubjectProperty.map(((objSubjectProp, index) => {
            if (intIndex == index) {
                return { ...objSubjectProp, [strAttributeName]: strValue };
            }
            else {
                return objSubjectProp;
            }
        }));
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_SubjectProperty": arrNewt_TestDrive_Test_SubjectProperty } } });
    }

    /**
     * @name HandleEnableDisableSubjectProperty
     * @param {string} strColumnName takes strColumnName
     * @param {boolean} blnIsEnabled takes blnIsEnabled
     * @param {object} objContext takes objContext
     * @summary Handles Enable/Disable of SubjectProperty table row
     */
    HandleEnableDisableSubjectProperty(strColumnName, blnIsEnabled, objContext) {
        let blnIsDisabled = blnIsEnabled ? this.ValidateSubjectProperty(strColumnName, objContext) : blnIsEnabled;

        if (strColumnName == "dConstance") {
            objContext.dispatch({ type: "SET_STATE", payload: { blnIsMeanDisabled: blnIsDisabled, blnIsAddRowClicked: !blnIsDisabled } });
        }
        else if (strColumnName == "dVariance") {
            objContext.dispatch({ type: "SET_STATE", payload: { blnIsCoVarianceDisabled: blnIsDisabled, blnIsAddRowClicked: !blnIsDisabled } });
        }
    }

    /**
     * @name ValidateSubjectProperty
     * @param {string} strColumnName takes strColumnName
     * @param {object} objContext takes objContext
     * @summary Validates content of SubjectProperty table
     */
    ValidateSubjectProperty(strColumnName, objContext, blnHighLight = true) {
        let intInvalidItems = 0;
        objContext.state.objData.t_TestDrive_Test_SubjectProperty.map((objSubjectProp, intIndex) => {
            let domColumn = document.getElementById(strColumnName + intIndex);
            if (!objSubjectProp[strColumnName]) {
                intInvalidItems = intInvalidItems + 1;
                if (domColumn && blnHighLight) {
                    domColumn.classList.add('error-field');
                }
            }
        })
        return intInvalidItems == 0 ? true : false;
    }

    /**
     * @name ValidateOnBlurSubjectProperty
     * @param {object} objContext takes objContext
     * @summary On blur validation for SubjectProperty table
     */
    ValidateOnBlurSubjectProperty(strColumnName, intIndex, objContext) {
        if (objContext.state.blnIsAddRowClicked) {
            let domColumn = document.getElementById(strColumnName + intIndex);
            let objSubjectProp = objContext.state.objData.t_TestDrive_Test_SubjectProperty.find((obj, index) => index == intIndex);
            if (objSubjectProp && objSubjectProp[strColumnName]) {
                if (domColumn) {
                    domColumn.classList.remove('error-field');
                }
            }
            else {
                if (domColumn) {
                    domColumn.classList.add('error-field');
                }
            }
        }
    }

    GetSubjectPropertySaveData(objContext) {
        let arrt_TestDrive_Test_SubjectProperty = [];
        if (objContext.state.objData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance == "Y") {
            if (!objContext.state.blnIsMeanDisabled || !objContext.state.blnIsCoVarianceDisabled) {
                let blnIsConstanceValid = this.ValidateSubjectProperty("dConstance", objContext, false);
                let blnIsVarianceValid = this.ValidateSubjectProperty("dVariance", objContext, false);
                arrt_TestDrive_Test_SubjectProperty = blnIsConstanceValid && blnIsVarianceValid ? objContext.state.objData.t_TestDrive_Test_SubjectProperty : [];
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsMeanDisabled": blnIsConstanceValid, "blnIsCoVarianceDisabled": blnIsVarianceValid, "blnIsAddRowClicked": true } });
            }
            else {
                arrt_TestDrive_Test_SubjectProperty = objContext.state.objData.t_TestDrive_Test_SubjectProperty;
            }
        }

        return arrt_TestDrive_Test_SubjectProperty
    }
}

export default Base_AddEditTestMaster_ModuleProcessor;