//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_CategoryCompetency from '@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency';
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Intranet_Test_TestProgressDisplay from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/TestProgressDisplay/TestProgressDisplay';
import Object_Intranet_Test_TestAlgorithm from '@shared/Object/c.Intranet/3_Test/Test/TestAlgorithm/TestAlgorithm';
import Object_TestApplication_TestResultAttributes from '@shared/Object/f.TestApplication/ResultCalculation/ResultAttributes/TestResultAttributes';
import Object_Intranet_Setting_Certificate from '@shared/Object/c.Intranet/8_Setting/Certificate/Certificate';
import Object_Intranet_Test_SeparationAndCalibrationGroup from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/SeparationAndCalibrationGroup/SeparationAndCalibrationGroup'


/**
* @name TestPropertyDetails_ModuleProcessor
* @summary Class for TestPropertyDisplay module.
*/
class TestPropertyDetails_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",          ,
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_Category",
            "Object_Intranet_Taxonomy_CategoryCompetency",            
            "Object_Intranet_Member_IntranetAdministrator",     
            "Object_Cockpit_Skin",           
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Intranet_Test_TestProgressDisplay",
            "Object_Intranet_Test_TestAlgorithm",
            "Object_TestApplication_TestResultAttributes",
            "Object_Intranet_Setting_Certificate",
            "Object_Intranet_Test_SeparationAndCalibrationGroup",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];        

        let objSubjectParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objCategoryParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objCategoryCompetencyParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objTestAlgorithmParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objTestProgressDisplayParams = {
            "SortKeys": [
                {
                    "iTestProgressDisplayId": {
                        "order": "asc"
                    }
                }
            ]
        };

        //Subject
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //Category
        Object_Intranet_Taxonomy_Category.Initialize(objCategoryParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Category];

        //CategoryCompetency
        Object_Intranet_Taxonomy_CategoryCompetency.Initialize(objCategoryCompetencyParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CategoryCompetency];

        //TestProgressDisplay
        Object_Intranet_Test_TestProgressDisplay.Initialize(objTestProgressDisplayParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestProgressDisplay];

        //TestAlgorithm
        Object_Intranet_Test_TestAlgorithm.Initialize(objTestAlgorithmParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestAlgorithm];        

        //IntranetAdministrator
        Object_Intranet_Member_IntranetAdministrator.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_IntranetAdministrator];

        //SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        //Skin
        Object_Cockpit_Skin.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Skin];
              
        //Test Result Attribute
        Object_TestApplication_TestResultAttributes.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestResultAttributes];

        //Test ResultCertificate
        Object_Intranet_Setting_Certificate.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_Certificate];

        //SeparationAndCalibrationGroup
        Object_Intranet_Test_SeparationAndCalibrationGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationGroup];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/3_Test/Test"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
         * @name GetTestDetails
         * @param {object} objContext objContext
         * @param {object} objSelectedRow objSelectedRow
         * @summary generates Data for TestPropertyDisplay
         * @returns {object} Data for TestPropertyDisplay
         */
    GetTestDetails(objSelectedRow, objContext) {
        var strSubject = "", strSkinName = "", strCategoryName = "", strCategoryCompetencyName = "", strTesttype = "", strTestUsage = "",
            strOwner = "", strEditedBy = "", strAlgorithm = "", strProgressDisplay = "", strResultPageTextCertificate = "", strResultCertificateType = "", strTestResultAttribute ="";
        //var objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestGrid"] ? ApplicationState.GetProperty("SelectedRows")["TestGrid"][0] : {};

        //Getting subject Names
        let objSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]?.find(objSub => {
            return objSub["iSubjectId"] == objSelectedRow["iSubjectId"]
        });
        if (objSubject) {
            let objSubjectData = objSubject.t_TestDrive_Subject_Data?.find(objSubjectData => { return objSubjectData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strSubject = objSubjectData ? objSubjectData["vSubjectName"] : "";
        }

        //Getting Category Name
        if (objSelectedRow["t_TestDrive_Test_Category"].length > 0) {
            let objCategory = DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"]?.find(objCat => {
                return objCat["iCategoryId"] == objSelectedRow["t_TestDrive_Test_Category"][0]["iCategoryId"]
            });
            if (objCategory) {
                let objCategoryData = objCategory.t_TestDrive_Category_Data?.find(objCatData => { return objCatData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
                strCategoryName = objCategoryData ? objCategoryData["vCategoryName"] : "";
            }
        }

        //Getting CategoryCompetency Name
        if (objSelectedRow["t_TestDrive_Test_Competency"].length > 0) {
            let objCategoryCompetency = DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"]?.find(objComp => {
                return objComp["iCategoryCompetencyId"] == objSelectedRow["t_TestDrive_Test_Competency"][0]["iCategoryCompetencyId"]
            });
            if (objCategoryCompetency) {
                let objCategoryCompetencyData = objCategoryCompetency.t_TestDrive_Category_Competency_Data?.find(objCompData => { return objCompData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
                strCategoryCompetencyName = objCategoryCompetencyData ? objCategoryCompetencyData["tCompetencyText"] : "";
            }
        }

        //Getting Skin Name
        let objSkin = DataRef(objContext.props.Object_Cockpit_Skin)["Data"]?.find(objSkin => {
            return objSkin["uSkinId"] == objSelectedRow["uSkinId"]
        });
        if (objSkin) {
            let objSkinData = objCategory.t_TestDrive_Skin_Data?.find(objSkinData => { return objSkinData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strSkinName = objSkinData ? objSkinData["vSkinTitle"] : "";
        }

        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Language details
        let objLanguages = {};
        let objLanguageCultureInfos = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"]?.forEach(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
            objLanguageCultureInfos = { ...objLanguageCultureInfos, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageCultureInfo}
        });
        let arrSelectedLanguages = objSelectedRow.t_TestDrive_Test_Language.sort((obj1, obj2) => obj1["iLanguageId"] - obj2["iLanguageId"]);
        let objMainClientLanguage = arrSelectedLanguages?.find(objLang => objLang["iLanguageId"] == JConfiguration.InterfaceLanguageId);
        if (objMainClientLanguage) {
            arrSelectedLanguages = [objMainClientLanguage, ...arrSelectedLanguages.filter(objLang => objLang["iLanguageId"] != JConfiguration.InterfaceLanguageId)];
        }

        let arrLanguageDetails = arrSelectedLanguages.map(objLanguage => { return { "Language": objLanguages[objLanguage["iLanguageId"]], "ActiveForTest": objLanguage.cIsActivatedForTest } });

        //Algorithm details
        let objAlgorithm = DataRef(objContext.props.Object_Intranet_Test_TestAlgorithm)["Data"]?.find(objAlgo => {
            return objAlgo["iAlgorithmId"] == objSelectedRow["iAlgorithmId"]
        });
        if (objAlgorithm) {
            let objAlgorithmData = objAlgorithm.t_TestDrive_Test_Algorithm_Data?.find(objAlgo => {
                return objAlgo["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
            })
            strAlgorithm = objAlgorithmData ? objAlgorithmData["vAlgorithmName"] : "";
        }

        //ProgressDisplay Options
        let objProgressDisplay = DataRef(objContext.props.Object_Intranet_Test_TestProgressDisplay)["Data"]?.find(objProgress => {
            return objProgress["iTestProgressDisplayId"] == objSelectedRow["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"]
        });
        if (objProgressDisplay) {
            let objProgressDisplayData = objProgressDisplay.t_TestDrive_Test_TestProgressDisplay_Data?.find(objProgress => {
                return objProgress["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
            })
            strProgressDisplay = objProgressDisplayData ? objProgressDisplayData["vTestProgressDisplay"] : "";
        }
        if (objSelectedRow["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"] == -1) {
            strProgressDisplay = "Do Not Show";
        }

        //Page data
        let objTestData = objSelectedRow.t_TestDrive_Test_Data ? objSelectedRow.t_TestDrive_Test_Data?.find(objData => {
            return objData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
        }) : {}

        //SchoolYear details
        let arrSchoolYearDetails = [];
        if (objSelectedRow.t_TestDrive_Test_AssignedSchoolYear.length > 0) {
            let objSchoolYears = {};
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"].map(objSchoolYear => {

                objSchoolYear.t_TestDrive_Member_Class_SchoolYear_Data.map(objSchoolYearData => {
                    if (objSchoolYearData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                        objSchoolYears = { ...objSchoolYears, [objSchoolYear.iSchoolYearId]: objSchoolYearData.vSchoolYearName }
                })
            })

            arrSchoolYearDetails = objSelectedRow.t_TestDrive_Test_AssignedSchoolYear.map(objAssignedSchoolYear => {
                return { "SchoolYear": objSchoolYears[objAssignedSchoolYear["iSchoolYearId"]] }
            })

        }

        //TestType
        if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objSelectedRow.iProviderId == 1)
            strTestUsage = "HighStake";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'Y' && objSelectedRow.iProviderId == 1)
            strTestUsage = "HighStakeAdaptive";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objSelectedRow.iProviderId == 3)
            strTestUsage = "Wrapper";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 6)
            strTestUsage = "Presentation";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 3)
            strTestUsage = "Learning";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 8)
            strTestUsage = "External";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 4)
            strTestUsage = "Survey";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 7)
            strTestUsage = "Demo";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 2)
            strTestUsage = "LowStake";

        //ResultPageText - Certificate details        
        if (objSelectedRow.cHasResultPageText == "Y" && objSelectedRow.cHasResultPageCertificate == "N") {
            strResultPageTextCertificate = Localization.TextFormatter(objContext.props.TextResource, "OnlyTest");
        }
        else if (objSelectedRow.cHasResultPageCertificate == "Y" && objSelectedRow.cHasResultPageText == "N") {
            strResultPageTextCertificate = Localization.TextFormatter(objContext.props.TextResource, "Certificate");
        }
        else if (objSelectedRow.cHasResultPageCertificate == "Y" && objSelectedRow.cHasResultPageText == "Y") {
            strResultPageTextCertificate = Localization.TextFormatter(objContext.props.TextResource, "TextAndCertificate");
        }

        //ResultPageCertificate details
        let objResultCertificate = DataRef(objContext.props.Object_Intranet_Setting_Certificate)["Data"]?.find(objData => {
            return objData["uCertificateId"] == objSelectedRow["uCertificateId"]
        });
        if (objResultCertificate) {
            let objResultCertificateData = objResultCertificate.t_Fusion_Certificate_Data?.find(objData => {
                return objData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
            })
            strResultCertificateType = objResultCertificateData ? objResultCertificateData["vResultPageCertificateText"] : "";
        }

        //TestResultAttributes details
        let objTestResultAttribute = DataRef(objContext.props.Object_TestApplication_TestResultAttributes)["Data"]?.find(objResultAttribute => {
            return objResultAttribute["uResultAttributeId"] == objSelectedRow["t_TestDrive_Test_TestProperty"][0]["uResultAttributeId"]
        });
        if (objTestResultAttribute) {
            let objTestResultAttributeData = objTestResultAttribute.t_TestDrive_Test_ResultAttribute_Data?.find(objData => {
                return objData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
            })
            strTestResultAttribute = objTestResultAttributeData ? objTestResultAttributeData["vAttributeName"] : "";
        }

        //AdaptiveTaskSubSubjectSequence details
        let arrSubjects = [];
        let arrSubSubjects = [];
        let arrSubSubjectIds = [];
        let arrSubjectIds = [];
        let arrt_TestDrive_Test_SubjectProperty = [];
        if ((objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'Y' && objSelectedRow.iProviderId == 1)) {
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].filter(objSubject => objSubject["iParentSubjectId"] == objSelectedRow["iSubjectId"] && objSubject["cIsDeleted"] == "N").map((objSubSubject) => { //
                let objSubSubjectData = objSubSubject.t_TestDrive_Subject_Data?.find(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId);
                arrSubSubjects = [...arrSubSubjects, objSubSubjectData["vSubjectName"]];
                arrSubSubjectIds = [...arrSubSubjectIds, objSubSubject["iSubjectId"]];
            });                

            //check
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].filter(objSubject => (objSubject["iSubjectId"] == objSelectedRow["iSubjectId"] || objSubject["iParentSubjectId"] == objSelectedRow["iSubjectId"]) && objSubject["cIsDeleted"] == "N" ).map((objSubject) => {
                let objSubjectData = objSubject.t_TestDrive_Subject_Data?.find(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId);
                arrSubjects = [...arrSubjects, objSubjectData["vSubjectName"]];           
                arrSubjectIds = [...arrSubjectIds, objSubject["iSubjectId"]];
            });

            if (objSelectedRow.t_TestDrive_Test_SubjectProperty.length > 0) {
                arrt_TestDrive_Test_SubjectProperty = objSelectedRow.t_TestDrive_Test_SubjectProperty.filter(objData => arrSubjectIds.includes(objData["iSubjectId"]))
            }
        }

        //ResultPageText details
        let objResultPageText = [];
        if (objSelectedRow.cUseResultTextByRange == "Y" && objSelectedRow.t_TestDrive_Test_ResultPageText?.length > 0) {
            objResultPageText = objSelectedRow.t_TestDrive_Test_ResultPageText.sort((obj1, obj2) => obj1["dResultValueFrom"] - obj2["dResultValueFrom"]).reduce((acc, cur) => {
                cur.t_TestDrive_Test_ResultPageText_Data?.forEach(objResultTextData => {
                    if (acc[objLanguageCultureInfos[objResultTextData["iLanguageId"]]])
                        acc[objLanguageCultureInfos[objResultTextData["iLanguageId"]]] = [...acc[objLanguageCultureInfos[objResultTextData["iLanguageId"]]], {
                            ...cur,
                            ...objResultTextData
                        }]
                    else
                        acc[objLanguageCultureInfos[objResultTextData["iLanguageId"]]] = [{
                            ...cur,
                            ...objResultTextData
                        }]
                })
                return acc;
            }, {})
        }
        console.log(objResultPageText);
        
        


        let objTestDetails = {
            ...objSelectedRow,
            strTesttype: strTesttype,
            strTestUsage: strTestUsage,
            strSubject: strSubject,
            strSkinName: strSkinName,
            strCategoryName: strCategoryName,
            strCategoryCompetencyName: strCategoryCompetencyName,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
            strAlgorithm: strAlgorithm,
            strProgressDisplay: strProgressDisplay,
            strResultPageTextCertificate: strResultPageTextCertificate,
            strResultCertificateType: strResultCertificateType,
            strTestResultAttribute: strTestResultAttribute,
            objTestData: { ...objTestData },
            arrSchoolYearDetails: arrSchoolYearDetails,
            arrSubjects: arrSubjects,
            arrSubSubjects: arrSubSubjects,
            arrt_TestDrive_Test_SubjectProperty: arrt_TestDrive_Test_SubjectProperty,
            arrSubSubjectIds: arrSubSubjectIds,
            objResultPageText: { ...objResultPageText }
        };

        return objTestDetails;
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId uUserId
     * @param {object} objContext objContext
     * @summary Gets the administrator name for the UserId
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"];
        var objIntranetadministrator = arrIntranetadministrators?.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/IntranetTest/AddEditTest/AddEditTest.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/IntranetTest/TestPropertyDetails/TestPropertyDetails.css",
        ];
    }
}

export default TestPropertyDetails_ModuleProcessor;