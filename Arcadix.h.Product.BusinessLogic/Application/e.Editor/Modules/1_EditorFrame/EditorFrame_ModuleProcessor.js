//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Object_Editor_TaskContent_CMSPagePreview from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPagePreview/CMSPagePreview';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

// //Text action related import.
// import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name EditorFrame_ModuleProcessor
 * @summary Module object for EditorFrame component.
 * */
class EditorFrame_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/1_EditorFrame/EditorFrame",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/1_EditorFrame/Common",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary Calls the Queue and Execute method.
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props.
     * @summary Get initial request params for the component.
     * @returns {Array } return arrDataRequest.
     */
    InitialDataParams(props) {
        EditorState.SetProperty("ActiveMode", "edit");
        let arrResourceParams = [
            "/e.Editor/Modules/1_EditorFrame/EditorFrame",
            "/e.Editor/Modules/1_EditorFrame/Common",
            "/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon"
        ];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name EditorStateCleanup
     * @summary clear required fields stored in EditorState.
     * */
    EditorStateCleanup() {
        EditorState.SetProperty("Cursor", {
            FormulaEditorPlaceholderId: "",
            FormulaSelectedNodeId: "",
            FormulaEditorCursorPosition: "",
            FormulaSelectedDomNode: ""
        });
        if (EditorState.GetProperty("AddSubFormula")) {
            EditorState.RemoveProperty("AddSubFormula");
        }
    }

    /**
     * @name OpenPreview
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @summary This method is responsible for opening the preview popup.
     */
    async OpenPreview(objContext, strContentUsageGroupId) {
        let strPreviewType = !strContentUsageGroupId || strContentUsageGroupId == null ? "TaskPreview" : "TaskContentPreview"
        let objPageJson = await objContext.EditorWorkAreaRef.current.GetUpdatedPageJson("preview");
        objContext.EditorFrame_ModuleProcessor.EditorStateCleanup();
        editorPopup.ShowPopup({
            "Data": {
                "PageJson": objPageJson,
                "Object_Intranet_Task_Task": objContext.EditorWorkAreaRef.current.GetPagePropertiesForPageId(objPageJson.iPageId),
                "Object_Intranet_Taxonomy_Subject": objContext.EditorWorkAreaRef.current.GetSubjectsForMainClient(),
                "PreviewType": strPreviewType
            },
            "Meta": {
                "PopupName": "TaskPreviewWrapper",
                "Height": 'auto',
                "Width": 'auto',
                "ShowHeader": false,
                "ShowCloseIcon": false,
                "ShowToggleMaximizeIcon": false,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        });
    }

    /**
     * @name OpenPreviewInNewTab
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary This method is responsible for opening the preview in new tab.
     */
    async OpenPreviewInNewTab(objContext) {
        let objPageJson = await objContext.EditorWorkAreaRef.current.GetUpdatedPageJson();
        objContext.EditorFrame_ModuleProcessor.EditorStateCleanup();
        let objParams = {
            "vAddData": objPageJson
        };
        let objReturn = await Object_Editor_TaskContent_CMSPagePreview.AddData(objParams);
        if (objReturn !== null) {
            let objTaskPreviewParams = {
                PreviewKey: objReturn["vPreviewKey"],
                ControllerName: "TaskPreview",
                LanguageId: JConfiguration.InterfaceLanguageId
            };
            let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'TaskPreview?PreviewKey=' + objReturn["vPreviewKey"] + '&LanguageId=' + JConfiguration.InterfaceLanguageId;
            //let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication/EditorPreview?Params=' + JSON.stringify(objTaskPreviewParams);
            window.open(strHostUrl, '_blank');
        }
    }

    /**
     * @name OpenPreviewInNewTab
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary This method is responsible for opening the mobile preview.
     */
    async OpenMobilePreviewInNewTab(objContext) {
        let objPageJson = await objContext.EditorWorkAreaRef.current.GetUpdatedPageJson();
        objContext.EditorFrame_ModuleProcessor.EditorStateCleanup();
        let objParams = {
            "vAddData": objPageJson
        };
        let objReturn = await Object_Editor_TaskContent_CMSPagePreview.AddData(objParams);
        if (objReturn !== null) {
            let objTaskPreviewParams = {
                PreviewKey: objReturn["vPreviewKey"],
                ControllerName: "TaskPreview",
                LanguageId: JConfiguration.InterfaceLanguageId
            };
            let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'TaskPreview?PreviewKey=' + objReturn["vPreviewKey"] + '&LanguageId=' + JConfiguration.InterfaceLanguageId + '&DeviceType=Phone' ;
            //let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication/EditorPreview?Params=' + JSON.stringify(objTaskPreviewParams);
            window.open(strHostUrl, '_blank');
        }
    }

    /**
     * @name SaveTask
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary Saves the Task.
     */
    SaveTask(objContext) {
        objContext.EditorWorkAreaRef.current.SaveTask();
    }

    /**
     * @name OpenAdditionalInformationSidebar
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @param {string} strSidebarType TaskHint/AdditionalInformation.
     * @summary Opens up AdditionalInformationSidebar.
     */
    OpenAdditionalInformationSidebar(objContext, strSidebarType) {
        objContext.EditorWorkAreaRef.current.OpenAdditionalInformationSidebar(strSidebarType);
    }

    /**
     * @name OpenAuditPopup
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary Opens up Audit popup.
     */
    OpenAuditPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
                ...objContext.props,
                ["EditorWorkAreaRef"]: objContext.EditorWorkAreaRef
            },
            "Meta": {
                "PopupName": "AuditPopup",
                "Height": '634px',
                "Width": '1001px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        });
    }

    /**
     * @name OpenAuditPopup
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary Opens up Source View popup.
     */
    OpenSourceViewPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
            },
            "Meta": {
                "PopupName": "SourceViewPopup",
                "Height": '634px',
                "Width": '1001px',
                "HeaderTitle": "",
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": false,
            },
            "Resource": {
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        });
    }

    // /**
    //  * @name SpellCheck
    //  * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
    //  * @summary check the spelling of each text elements and mark the wrong word.
    //  * */
    // SpellCheck() {
    //     TextActions.SpellCheck.SpellCheckPage();
    // }

    /**
     * @name GetIContentUsageGroupId
     * @summary this get and returns the iContentUsageGroupId value from the ActivePageContent.
     * @returns {number} Container Usage Group Id
     * */
    GetIContentUsageGroupId() {
        let intContainerUsageGroupId, ActivePageContentRef = EditorState.GetReference("ActivePageContent");
        if (ActivePageContentRef && ActivePageContentRef.GetIContentUsageGroupId) {
            intContainerUsageGroupId = ActivePageContentRef.GetIContentUsageGroupId();
        }
        return intContainerUsageGroupId;
    }

    /**
     * @name GetActivePageLanguage
     * @param {object} objContext { state, dispatch, props, EditorFrame_ModuleProcessor }.
     * @summary Gets active page language id.
     * @returns {number} Active Page language id.
     */
    GetActivePageLanguage(objContext) {
        let intLanguageId = -1;
        if (objContext.EditorWorkAreaRef.current !== null) {
            intLanguageId = objContext.EditorWorkAreaRef.current.GetActivePageLanguage();
        }
        return intLanguageId;
    }

    /**
     * @name GetPageJsonForLanguage
     * @param {object} objContext { state, dispatch, props, EditorFrame_ModuleProcessor }.
     * @summary Gets active page properties from editor work area.
     * @returns {object} Page properties.
     */
    GetActivePageProperties(objContext) {
        let objPageProperties;
        if (objContext.EditorWorkAreaRef.current !== null) {
            objPageProperties = objContext.EditorWorkAreaRef.current.GetActivePageProperties();
        }
        return objPageProperties;
    }

    /**
     * @name GetPageJsonForLanguage
     * @param {object} objContext { state, dispatch, props, EditorFrame_ModuleProcessor }.
     * @param {number} intLangugeId New language id
     * @summary Triggers GetPageJsonForLanguage.
     */
    OnLanguageChange(objContext, intLangugeId) {
        if (objContext.EditorWorkAreaRef.current !== null) {
            objContext.EditorWorkAreaRef.current.GetPageJsonForLanguage(intLangugeId);
        }
    }

    /**
     * @name GetPageJsonForLanguage
     * @param {object} objContext { state, dispatch, props, EditorFrame_ModuleProcessor }.
     * @summary Open Task add edit popup.
     */
    OpenTaskAddEditPopup(objContext) {
        if (objContext.EditorWorkAreaRef.current !== null) {
            let objPageProperties = objContext.EditorWorkAreaRef.current.GetPagePropertiesForPageId();
            if (objPageProperties && objContext.props.OpenTaskAddEditPopup) {
                objContext.props.OpenTaskAddEditPopup(objPageProperties, (objReturnData) => {
                    objContext.EditorWorkAreaRef.current.UpdatePageProperties(objReturnData);
                });
            }
        }
    }
    
    /**
     * @name GenerateTaskPdf
     * @param {object} objContext { state, dispatch, props, EditorFrame_ModuleProcessor }.
     * @summary To Generate Page content and Task Details in PDF.
     */
    async GenerateTaskPdf(objContext) {
        if (objContext.EditorWorkAreaRef.current !== null) {
            let fnGenerateTaskPdf = ApplicationState.GetProperty("EditorCallback")?.["GenerateTaskPdf"];
            let objPageProperties = objContext.EditorWorkAreaRef.current.GetPagePropertiesForPageId();
            let objPageJson = await objContext.EditorWorkAreaRef.current.GetUpdatedPageJson("preview");
            if (objPageProperties && objPageJson && fnGenerateTaskPdf) {
                fnGenerateTaskPdf(objPageProperties, objPageJson)
            }
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/1_EditorFrame/EditorStyles.css",
            props.JConfiguration.EditorSkinPath + "/Css/Common/ReactJs/PC/Font.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/1_EditorFrame/TaskPreview/TaskPreview.css"
        ];
    }
}

export default EditorFrame_ModuleProcessor;
