//Objects required for module.
import Object_Intranet_Setting_PathFinder_JobSkillValue from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobSkillValue/JobSkillValue';
import Object_Intranet_Setting_PathFinder_JobSubjectTemplate from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Intranet_Setting_PathFinder_JobField from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobField/JobField';
import Object_Intranet_Setting_PathFinder_Job from '@shared/Object/c.Intranet/8_Setting/PathFinder/Job/Job';
import Object_Intranet_Setting_PathFinder_JobLevel from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobLevel/JobLevel';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as JobSkillValue_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue/JobSkillValue_OfficeRibbon';

/**
 * @name JobSkillValue_ModuleProcessor
 * @param NA
 * @summary Class for JobSkillValue module display.
 * @return NA
 */
class JobSkillValue_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_PathFinder_JobSubjectTemplate",
            "Object_Extranet_State_State",
            "Object_Intranet_Setting_PathFinder_JobField",
            "Object_Intranet_Setting_PathFinder_Job",
            "Object_Intranet_Setting_PathFinder_JobLevel",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        //this.OnSearchClick(objContext)
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let objJobSkillValueParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ]
        }
        let objStateParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }              

        //JobSubjectTemplate
        Object_Intranet_Setting_PathFinder_JobSubjectTemplate.Initialize(objJobSkillValueParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobSubjectTemplate];

        //State
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        //JobField
        Object_Intranet_Setting_PathFinder_JobField.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobField];

        //Job
        Object_Intranet_Setting_PathFinder_Job.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_Job];

        //JobLevel
        Object_Intranet_Setting_PathFinder_JobLevel.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobLevel];

        //Subject
        Object_Intranet_Taxonomy_Subject.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name HandleDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary Handles change in JobField DropDown filter
     */
    HandleDropDownChange(strAttributeName, objChangeData, objContext) {
        let objFilters = { ...objContext.state.objFilters };
        switch (strAttributeName) {
            case "iStateId":
                objFilters = { ...objFilters, "iStateId": objChangeData["iStateId"], "uJobFieldId": "00000000-0000-0000-0000-000000000000", "uJobId": "00000000-0000-0000-0000-000000000000", "uJobLevelId": "00000000-0000-0000-0000-000000000000" };
                break;
            case "uJobFieldId":
                objFilters = { ...objFilters, "uJobFieldId": objChangeData["uJobFieldId"], "uJobId": "00000000-0000-0000-0000-000000000000", "uJobLevelId": "00000000-0000-0000-0000-000000000000" }
                break;
            case "uJobId":
                objFilters = { ...objFilters, "uJobId": objChangeData["uJobId"] };
                break;
            case "uJobLevelId":
                objFilters = { ...objFilters, "uJobLevelId": objChangeData["uJobLevelId"] };
                break;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "objFilters": objFilters } });
    }

    /**
     * @name HandleChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary Handles change in JobSkillValue inputs
     */
    HandleChange(strColumnName, strValue, strSubjectId, objContext) {
        let objNewJobSkillValue = objContext.state.arrJobSkillValueData.find((objSkill) => objSkill["iSubjectId"] == strSubjectId);
        let arrNewJobSkillValue = [];
        if (objNewJobSkillValue) {
            objNewJobSkillValue = { ...objNewJobSkillValue, [strColumnName]: strValue };
            arrNewJobSkillValue = [...objContext.state.arrJobSkillValueData.filter((objSkill) => objSkill["iSubjectId"] != strSubjectId), objNewJobSkillValue];
        }
        else {
            objNewJobSkillValue = {
                [strColumnName]: strValue,
                ["iSubjectId"]: strSubjectId,
                ["iStateId"]: objContext.state.objFilters.iStateId,
                ["uJobFieldId"]: objContext.state.objFilters.uJobFieldId,
                ["uJobId"]: objContext.state.objFilters.uJobId,
                ["uJobLevelId"]: objContext.state.objFilters.uJobLevelId
            };
            arrNewJobSkillValue = [...objContext.state.arrJobSkillValueData, objNewJobSkillValue];
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrJobSkillValueData": arrNewJobSkillValue } });
    }

    /**
     * @name OnSearchClick
     * @param {*} objContext objChangeData
     * @summary Handles Search button click event, Gets SkillValue data for the search filters
     */
    OnSearchClick(objContext) {
        if (objContext.state.objFilters.uJobFieldId != "00000000-0000-0000-0000-000000000000" && objContext.state.objFilters.uJobLevelId != "00000000-0000-0000-0000-000000000000") {
            let objSkillValueParams = {
                "SearchQuery": {
                    "must": [
                        {
                            match: {
                                "iStateId": objContext.state.objFilters.iStateId
                            }
                        },
                        {
                            match: {
                                "uJobFieldId": objContext.state.objFilters.uJobFieldId
                            }
                        },
                        {
                            match: {
                                "uJobId": objContext.state.objFilters.uJobId
                            }
                        },
                        {
                            match: {
                                "uJobLevelId": objContext.state.objFilters.uJobLevelId
                            }
                        }
                    ]
                }
            }
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Setting_PathFinder_JobSkillValue.GetData(objSkillValueParams, (objReturn) => {
                let arrJobSkillValueData = objReturn[Object.keys(objReturn)[0]].Data;
                let arrSubjectTemplateData = this.GetSubjectTemplateData(objContext);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrJobSkillValueData": arrJobSkillValueData ? arrJobSkillValueData : [], "arrSubjectTemplateData": arrSubjectTemplateData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }, true);
        }
        else {
            var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue", objContext.props);
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "SearchErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
        
    }

    /**
     * @name GetSubjectTemplateData
     * @param {any} objContext
     * @summary Return SubjectTemplate Data for selected JobField
     * @returns {array} SubjectTemplate data
     */
    GetSubjectTemplateData(objContext) {
        let arrSubjectTemplateData = DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobSubjectTemplate)["Data"]
            .filter(objSubjectTemplate => objSubjectTemplate["uJobFieldId"] === objContext.state.objFilters.uJobFieldId && objSubjectTemplate["cIsDeleted"] == "N")
            .map(objSubjectTemplateData => {
                let objSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSub => objSub["iSubjectId"] === objSubjectTemplateData["iSubjectId"]);
                if (objSubject) {
                    let objSubjectData = objSubject.t_TestDrive_Subject_Data.find(objSubjectData => objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId);
                    return {
                        ...objSubjectTemplateData,
                        ["SubjectName"]: objSubjectData ? objSubjectData["vSubjectName"] : ""
                    }
                }
            });
        return arrSubjectTemplateData;
    }

    /**
     * @name GetJobSkillValueData
     * @param {any} objContext
     * @summary Return SubjectTemplate Data for selected JobField
     * @returns {array} SubjectTemplate data
     */
    GetJobSkillValueData(strSubjectId, objContext) {
        let objJobSkillValueData = objContext.state.arrJobSkillValueData.find((objSkillValue) => objSkillValue["iSubjectId"] == strSubjectId);
        return objJobSkillValueData ? objJobSkillValueData : {}
    }

    /**
     * @name SaveData
     * @param {object} objContext passes Context object
     * @summary Saves the JobSkillValue data
     * @return null
     */
    SaveData(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue", objContext.props);
        let blnShowErrorPopup = false;
        if (objContext.state.arrSubjectTemplateData.length == 0) {
            blnShowErrorPopup = true;
        }
        if (!blnShowErrorPopup) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "vEditData": [...objContext.state.arrJobSkillValueData],
                "uUserId": objContext.props.ClientUserDetails.UserId
            }
            Object_Intranet_Setting_PathFinder_JobSkillValue.EditData(objParams, (objReturn) => {
                let arrJobSkillValueData = objReturn;
                objContext.dispatch({ type: "SET_STATE", payload: { "arrJobSkillValueData": arrJobSkillValueData ? arrJobSkillValueData : [] } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }, true);
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveData": () => objContext.JobSkillValue_ModuleProcessor.SaveData(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", JobSkillValue_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/8_Setting/PathFinder/JobSkillValue/JobSkillValue.css"
        ];
    }
}

export default JobSkillValue_ModuleProcessor;