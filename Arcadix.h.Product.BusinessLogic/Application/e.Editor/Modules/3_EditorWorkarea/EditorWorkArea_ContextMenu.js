//contextmenu base class.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name EditorWorkArea_ContextMenu
 * @summary Contains the context menu related methods of the EditorWorkArea
 * */
class EditorWorkArea_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Forms an array with the ContextMenuOptions for the EditorWorkArea.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objPageProperties, intActivePageLanguageId) {
        objContext = objContext.EditorWorkArea_HandlerRef.current.GetLatestContext();
        let arrContextMenuOptionsForCopyTask = [];
        objPageProperties["t_CMS_Page_Language"].map(objTempData => {
            let objLanguageDetails = objContext.props.LanguageData.find(objTempLang => objTempLang["iFrameworkLanguageId"] === objTempData["iLanguageId"])["t_Framework_Language_Data"].find(objTempLang => objTempLang["iLanguageId"] === objTempData["iLanguageId"]);
            arrContextMenuOptionsForCopyTask = [
                ...arrContextMenuOptionsForCopyTask,
                {
                    "Text": objLanguageDetails["vLanguageName"],
                    "Disable": objTempData["iLanguageId"] === intActivePageLanguageId ? true : false,
                    "ClickEvent": objContext.EditorWorkArea_ModuleProcessor.CopyTaskInNewLanguage,
                    "params": {
                        "objContext": objContext,
                        "intNewLanguageId": objLanguageDetails["iFrameworkLanguageId"]
                    }
                }
            ];
        });
        let arrContextMenuOptions = [
            {
                ResourceKey: "CopyTaskInNewLanguage",
                SubMenuModule: "CopyTaskSubMenu"
            }
        ];
        return [
            {
                Module: "CopyTaskSubMenu",
                MenuList: arrContextMenuOptionsForCopyTask,
                Visible: true
            },
            {
                Module: "EditorWorkArea",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/3_EditorWorkArea/EditorWorkArea"
            }
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intClientX X-axis coordinates of clicked event.
     * @param {number} intClientY Y-axis coordinates of clicked event.
     * @summary add a context menu to the DOM and display various context menu operation
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        let objPageProperties = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageProperties"];
        let intActivePageLanguageId = objContext.EditorWorkArea_ModuleProcessor.GetActivePageLanguage(objContext);
        if (intActivePageLanguageId !== -1 && objPageProperties && objPageProperties !== null && objPageProperties["t_CMS_Page_Language"] && objPageProperties["t_CMS_Page_Language"] !== null)
            objContext.EditorWorkArea_ModuleProcessor.ShowContextMenu({
                objContext,
                objClientXY: { clientX: intClientX, clientY: intClientY },
                arrContextMenuDetail: objContext.EditorWorkArea_ModuleProcessor.GetContextMenuOptions(objContext, objPageProperties, intActivePageLanguageId)
            });
    }
}

export default EditorWorkArea_ContextMenu;
