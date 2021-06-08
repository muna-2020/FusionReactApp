//Objects required for module.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_School_ClassLicense from '@shared/Object/d.Extranet/2_School/ClassLicense/ClassLicense';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

/**
* @name Licenses_ModuleProcessor
* @summary Class for License module display and manipulate.
*/
class Licenses_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Licenses",
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Extranet_School_ClassLicense",
            "Object_Extranet_Teacher_Teacher",
            "Object_Extranet_Teacher_Class",
            "Object_Intranet_Test_ExtranetTest"];
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
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/Licenses"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
                        {
                            "match": {
                                "cIsDeleted": "N"
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

        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //ClassLicense
        let objClassLicenseParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUserId": props.ClientUserDetails.UserId
                        }
                    }
                ]
            }
        };
        Object_Extranet_School_ClassLicense.Initialize(objClassLicenseParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_ClassLicense];

        //Teacher
        let objectTeacher = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vName": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_Teacher.Initialize(objectTeacher, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //Class
        let objClass = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uSchoolId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SearchQuery": {
                //"must": [
                //    {
                //        "match": {
                //            "cIsDeleted": "N"
                //        }
                //    }
                //]
            },
            "SortKeys": [
                {
                    "vClassName": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_Class.Initialize(objClass, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Test
        let strMainClientId = props.ClientUserDetails.MainClientId;
        let objTestId = { '115': ['3E911BDF-1049-41EF-A989-A1D6461E92A7', 'F67CB177-BD14-4B23-B064-3C8F540EEB9B', '0CA2608A-EA2E-4C23-BA2D-BD3985725147'], '97': [], '124': [], '114': [] };
        let arrTestId = objTestId[strMainClientId];

        if (arrTestId == undefined)
            arrTestId = [];


        let arrShould = [];
        arrTestId.map(strTestId => {
            let objShould = {
                "match": {
                    "uTestId": strTestId
                }
            };
            arrShould = [...arrShould, objShould];
        });

        let objTest = {
            "should": arrShould,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uCycleId": "9673B33F-F672-4E9F-B87B-023C1C226EF1"
                        }
                    }
                ]
            }
        };

        Object_Intranet_Test_ExtranetTest.Initialize(objTest, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];

        return arrDataRequest;
    }

    /**
     * @name GetDynamicStlyes
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Licenses/Licenses.css"
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
     * @name GetLicenseData
     * @param {object} objContext Passes Context Object
     * @summary check if test is selected
     * @returns {boolean} Selected boolean value
     */
    GetLicenseData(objContext) {
        let arrLicenseData = [];
        if (objContext.state.strSchoolYearPeriodId == undefined)
            arrLicenseData = DataRef(objContext.props.Object_Extranet_School_ClassLicense, "Object_Extranet_School_ClassLicense;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        else {
            let strKey = "Object_Extranet_School_ClassLicense;uSchoolYearPeriodId;" + objContext.state.strSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId;
            arrLicenseData = DataRef(objContext.props.Object_Extranet_School_ClassLicense, strKey)["Data"] ?
                DataRef(objContext.props.Object_Extranet_School_ClassLicense, strKey)["Data"] : DataRef(objContext.props.Object_Extranet_School_ClassLicense, "Object_Extranet_School_ClassLicense;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        }
        return arrLicenseData;
    }

    /**
     * @name IsTestSelected
     * @param {string} strTestId Passed TestId
     * @param {object} objLicenseData Passes LicenseData Object
     * @summary check if test is selected
     * @returns {boolean} Selected boolean value
     */
    IsTestSelected(strTestId, objLicenseData) {
        let blnSelected = false;
        if (objLicenseData && objLicenseData.vTestLicenseId) {
            let arrSelectedTestIds = objLicenseData.vTestLicenseId ? JSON.parse(objLicenseData.vTestLicenseId) : [];
            let objPresent = arrSelectedTestIds.find(x => x == strTestId);
            blnSelected = objPresent != undefined;
        }
        return blnSelected;
    }

    /**
    * @name GetDisplayElements
    * @param {object} objContext Passes Context object
    * @param {Array} arrClassTeacherData Passes ClassTeacherData array
    * @param {Array} arrLicenseData Passes LicenseData array
    * @param {Array} arrHeaderData Passes HeaderData array
    * @summary structuring the data
    */
    GetDisplayElements(objContext, arrClassTeacherData, arrLicenseData, arrHeaderData) {
        console.log("display elements is getting callled");
        let arrDisplayData = arrClassTeacherData.map(objClassTeacher => {
            let objLicense = arrLicenseData.find(objItem => objItem["uClassId"] == objClassTeacher["uClassId"]);
            let objData = {
                ...objClassTeacher,
                HasPackage: objLicense ? objLicense.cHasPackage == 'Y' : false,
                uClassLicenseId: objLicense ? objLicense["uClassLicenseId"] : '00000000-0000-0000-0000-000000000000',
                wrapperObject: {
                    ...objClassTeacher,
                    HasPackage: objLicense ? objLicense.cHasPackage == 'Y' : false
                },
                isChanged: false
            };
            if (arrHeaderData.length > 0) {
                for (let i = 0; i < arrHeaderData.length; i++) {
                    objData["Test" + (i + 1)] = {
                        isSelected: objContext.Licenses_ModuleProcessor.IsTestSelected(arrHeaderData[i].uTestId, objLicense),
                        uTestId: arrHeaderData[i].uTestId,
                        oldValue: objContext.Licenses_ModuleProcessor.IsTestSelected(arrHeaderData[i].uTestId, objLicense)
                    };
                }
            }
            return objData;
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { arrDisplayData: arrDisplayData, blnManipulatedDataLoaded: true } });
    }

    /**
    * @name UpdatePackageCheckBox
    * @param {object} objContext Passes Context object
    * @param {object} objClassTeacher Passes ClassTeacher object
    * @param {boolean} value Passes boolean value 
    * @summary to update the package checkbox
    */
    UpdatePackageCheckBox(objContext, objClassTeacher, value) {
        let arrDisplayData = objContext.state.arrDisplayData.map(objItem => {
            if (objItem["uClassId"] == objClassTeacher["uClassId"]) {
                return {
                    ...objItem,
                    HasPackage: value,
                    isChanged: value != objClassTeacher.wrapperObject.HasPackage
                };
            } else {
                return {
                    ...objItem
                };
            }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { arrDisplayData: arrDisplayData } });
    }

    /**
    * @name UpdateTestCheckBox
    * @param {object} objContext Passes Context object
    * @param {object} objLicense Passes License object
    * @param {string} testVariableName Passes test variable name
    * @param {boolean} value Passes boolean value
    * @summary to update the test checkbox
    */
    UpdateTestCheckBox(objContext, objLicense, testVariableName, value) {
        let arrDisplayData = objContext.state.arrDisplayData.map(objItem => {
            if (objItem["uClassId"] == objLicense["uClassId"]) {
                return {
                    ...objItem,
                    isChanged: objItem.isChanged || (value != objItem[testVariableName]["oldValue"]),
                    [testVariableName]: {
                        ...objItem[testVariableName],
                        isSelected: value
                    }
                };
            } else {
                return {
                    ...objItem
                };
            }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { arrDisplayData: arrDisplayData } });
    }

    /**
    * @name OnClickSave
    * @param {object} objContext Passes Context object
    * @param {string} strSchoolYearPeriodId Passes school year period id
    * @summary saves the license on click
    */
    OnClickSave(objContext, strSchoolYearPeriodId) {
        let arrEditedData = objContext.state.arrDisplayData;
        let GetTestLicenseId = (objLicenseData) => {
            let arrTestLicense = [];
            if (objLicenseData.Test1) {
                if (objLicenseData.Test1.isSelected)
                    arrTestLicense = [...arrTestLicense, objLicenseData.Test1.uTestId]
            }
            if (objLicenseData.Test2) {
                if (objLicenseData.Test2.isSelected)
                    arrTestLicense = [...arrTestLicense, objLicenseData.Test2.uTestId]
            }
            if (objLicenseData.Test3) {
                if (objLicenseData.Test3.isSelected)
                    arrTestLicense = [...arrTestLicense, objLicenseData.Test3.uTestId]
            }
            return arrTestLicense;
        };

        let vEditData = [];
        if (arrEditedData.length > 0) {
            if (arrEditedData.find(x => x["isChanged"] === true)) {
                for (let objLicense of arrEditedData) {
                    if (objLicense.isChanged === true) {
                        let objData = {
                            uClassLicenseId: objLicense["uClassLicenseId"],
                            uClassId: objLicense["uClassId"],
                            uSchoolYearPeriodId: strSchoolYearPeriodId,
                            cHasPackage: objLicense["HasPackage"] ? 'Y' : 'N',
                            vTestLicenseId: GetTestLicenseId(objLicense),
                            uUserId: objContext.props.ClientUserDetails.UserId
                        };
                        vEditData = [...vEditData, objData];
                    }
                }

                let objSaveParams = {
                    SearchQuery: {
                        must: [
                            {
                                match: {
                                    uSchoolYearPeriodId: objContext.state.strSchoolYearPeriodId
                                }
                            },
                            {
                                "match": {
                                    "uUserId": objContext.props.ClientUserDetails.UserId
                                }
                            }
                        ]
                    },
                    "vAddData": vEditData
                };

                ApplicationState.SetProperty("blnShowAnimation", true);
                objContext.props.Object_Extranet_School_ClassLicense.AddData(objSaveParams, (objResponse) => {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: 'SET_STATE', payload: { blnManipulatedDataLoaded: false } });
                });
            }
        }
    }

    /**
    * @name GetMetaDataSchoolYearPeriodDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataSchoolYearPeriodDropdown() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
    * @name GetDataSchoolYearPeriodDropdown
    * @param {object} objContext Passes Context object
    * @param {String} strSchoolYearPeriodId School Year Period ID.
    * @summary It returns the object data
    * @returns {object} Data
    */
    GetDataSchoolYearPeriodDropdown(objContext, strSchoolYearPeriodId) {
        let arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod) ? DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] : [];
        return {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: strSchoolYearPeriodId
        };
    }

    /**
    * @name GetResourceDataSchoolYearPeriodDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataSchoolYearPeriodDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataSchoolYearPeriodDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsDataSchoolYearPeriodDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Licenses_ModuleProcessor.OnChangeSchoolYearPeriod(objContext, objItem)
        };
    }

    /**
    * @name OnChangeSchoolYearPeriod
    * @param {object} objContext Passes Context object
    * @param {object} objItem Passes Item object
    * @summary set SchoolYearPeriodId on change of School year period dropdown
    */
    OnChangeSchoolYearPeriod(objContext, objItem) {
        //objContext.dispatch({ type: 'SET_STATE', payload: { strSchoolYearPeriodId: objItem["uSchoolYearPeriodId"] } });
        if (objContext.state.blnManipulatedDataLoaded) {
            let objClassLicenseParams = {
                "ForeignKeyFilter": {
                    "uSchoolYearPeriodId": objItem["uSchoolYearPeriodId"]
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uUserId": objContext.props.ClientUserDetails.UserId
                            }
                        }
                    ]
                }
            };
            objContext.props.Object_Extranet_School_ClassLicense.GetData(objClassLicenseParams, () => {
                objContext.dispatch({ type: 'SET_STATE', payload: { blnManipulatedDataLoaded: false, strSchoolYearPeriodId: objItem["uSchoolYearPeriodId"] } });
            });
        }
    }

    /**
    * @name GetMetaDataFillheightSchoolYearPeriod
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetMetaDataFillheightSchoolYearPeriod() {
        return {
            HeaderIds: ["Header", "outletBand", "ClassLicenseHeaderText", "ClassLicenseHeaderDropdown", "TopSpacing"],
            FooterIds: ["FooterClassLicense"]
        };
    }

    /**
     * @name GetLicense
     * @param {object} objContext Passes Context object
     * @summary Gets the license object
     * @returns {object} returns an object with keys as TeacherAndClassData and HeaderData
     */
    GetLicense(objContext) {
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.UserId + ";cIsDeleted;N")["Data"];
        let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        let arrHeaders = [
            { "uTestId": "3E911BDF-1049-41EF-A989-A1D6461E92A7", vHeaderName: "VV" },
            { "uTestId": "F67CB177-BD14-4B23-B064-3C8F540EEB9B", vHeaderName: "TLV" },
            { "uTestId": "0CA2608A-EA2E-4C23-BA2D-BD3985725147", vHeaderName: "PSM" }
        ];
        let arrTeacherAndClassData = [];

        let strMainClientId = objContext.props.ClientUserDetails.MainClientId;

        if (arrTeacherData !== undefined) {

            arrTeacherData.map((objTeacher) => {
                arrClassData.map((objClass) => {
                    let objClassTeacher = objClass["t_TestDrive_Member_Class_Teacher"].find(x => x["uTeacherId"] == objTeacher["uTeacherId"]);
                    if (objClassTeacher && objClassTeacher["cIsDeleted"] == "N" && objTeacher["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] == "N") {
                        if (objTeacher["uTeacherId"] == objClass["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"]) {
                            let objReturn = {
                                "uTeacherId": objTeacher["uTeacherId"],
                                "vTeacherName": objTeacher["vName"] + objTeacher["vFirstName"],
                                "vClassName": objClass["vClassName"],
                                "uClassId": objClass["uClassId"],
                                "uSchoolYearPeriodId": objClass["uSchoolYearPeriodId"],
                                "HasPackage": false
                            };
                            arrTeacherAndClassData = [...arrTeacherAndClassData, objReturn];
                        }
                    }
                });
            });
        }



        if (strMainClientId == '115') {
            //let objTestResult = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uCycleId;9673B33F-F672-4E9F-B87B-023C1C226EF1")["Data"] 
        }
        let objLicenceData = {
            "TeacherAndClassData": arrTeacherAndClassData,
            "HeaderData": arrHeaders
        };
        return objLicenceData;
    }

    AddClassLicenseDataToCache(objContext, strSchoolYearPeriodId) {
        let arrLicenseData = DataRef(objContext.props.Object_Extranet_School_ClassLicense, "Object_Extranet_School_ClassLicense;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        let strLicenseEnityKey = "Object_Extranet_School_ClassLicense;uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId;
        let objLicenseData = {
            Filter: strLicenseEnityKey,
            Value: {
                Data: arrLicenseData,
                TimeStamp: "",
                PrimaryKeyName: "uClassLicenseId",
                Count: arrLicenseData.length
            }
        };
        ArcadixCacheData.AddData("Object_Extranet_School_ClassLicense", objLicenseData, () => {
        });
    }

    /**
     * @name UpdateInformationPopupStatus
     * @summary updates the ShowInformation bar status
     * @param {any} objContext
     */
    UpdateInformationPopupStatus(objContext) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [
                {
                    vValue: objContext.state.blnShowInformationBar ? "N" : "Y", //changing status here
                    vKey: "ShowInformationBar_ClassLicense"
                }
            ]
        };
        let objUserPreferenceEditParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            ["vEditData"]: objNewUserPreference
        };
        Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams, (response) => {
            ApplicationState.SetProperty("UserPreferenceObject", response[0]);
            objContext.dispatch({ type: 'SET_STATE', payload: { blnShowInformationBar: !objContext.state.blnShowInformationBar } });
        })

    }

}

export default Licenses_ModuleProcessor;