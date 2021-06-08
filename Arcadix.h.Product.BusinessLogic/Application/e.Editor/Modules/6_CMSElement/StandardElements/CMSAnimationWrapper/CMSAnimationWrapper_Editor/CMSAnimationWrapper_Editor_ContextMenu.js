//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSAnimationWrapper_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSAnimationWrapper
 * */
class CMSAnimationWrapper_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuDataFromAnimation
     * @param {string} objAnimationSpecificContextMenu context menu options from animation.
     * @summary Retuens the context menu options according to fusion.
     * @returns {array} Context menu options.
     */
    GetContextMenuDataFromAnimation(objContext, objAnimationSpecificContextMenu) {
        let objIframeDoc;
        let objAnimationInstance = objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetIframelessAnimationInstance(objContext, "Editor");
        if (objContext.state.cIsIframelessAnimation.toLowerCase() === "y") {
            if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                objIframeDoc = objAnimationInstance.GetStage().children[0];
            }
            else {
                objIframeDoc = objAnimationInstance;
            }
        } else {
            if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                objIframeDoc = objContext.iFrameRef.current.contentWindow.stage.children[0];
            }
            else {
                objIframeDoc = objContext.iFrameRef.current.contentWindow;
            }
        }
        eval("window.arrTempContextMenuOption = [" + objAnimationSpecificContextMenu["ContextMenuOptions"] + "];")
        let arrContextMenuOptions = [];
        window.arrTempContextMenuOption.map(objTempData => {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    "Text": objTempData["ContextMenuText"],
                    "ClickEvent": () => {
                        if (objIframeDoc.InvokeMethod) {
                            objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            objIframeDoc.InvokeMethod(objTempData["ContextMenuText"], objAnimationSpecificContextMenu["Target"]);
                        }
                        else if (objIframeDoc.InvokeContextMenuAction) {
                            objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                            objIframeDoc.InvokeContextMenuAction(objTempData["ContextMenuText"], objAnimationSpecificContextMenu["Target"]);
                        }
                    },
                    "params": { objContext },
                    "Image": null
                }
            ];
        });
        return arrContextMenuOptions;
    }

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @param {string} objAnimationSpecificContextMenu Animation specific context menu
     * @summary Forms an array with the ContextMenuOptions for the AnimationWrapper element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objAnimationSpecificContextMenu = null) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let blnIsFusionVersion = false;
        if (objContext.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] && objContext.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y") {
            blnIsFusionVersion = true;
        }
        let blnIsInlineEditable = objContext.props.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y" ? true : false;
        let blnShowCharactesticMenuOption = false;
        if ((objContext.props.ElementJson["vElementJson"]["InitialAttributeValue"] && objContext.props.ElementJson["vElementJson"]["InitialAttributeValue"] !== null && Object.keys(objContext.props.ElementJson["vElementJson"]["InitialAttributeValue"]).length > 0)
            || (objContext.props.ElementJson["vElementJson"]["ResourceAttributeValue"] && objContext.props.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null && Object.keys(objContext.props.ElementJson["vElementJson"]["ResourceAttributeValue"]).length > 0)
            || !blnIsInlineEditable) {
            blnShowCharactesticMenuOption = true;
        }
        if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInternalAnimation"] && objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInternalAnimation"] === "Y") {
            blnShowCharactesticMenuOption = false;
        }
        let arrContextMenuOptions = [];
        if (objAnimationSpecificContextMenu && objAnimationSpecificContextMenu !== null && objAnimationSpecificContextMenu["ContextMenuOptions"]) {
            arrContextMenuOptions = objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetContextMenuDataFromAnimation(objContext, objAnimationSpecificContextMenu);
            if (arrContextMenuOptions.length > 0) {
                arrContextMenuOptions = [
                    ...arrContextMenuOptions,
                    {
                        Type: "Separator"
                    }
                ];
            }
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Load_Animation",
                ClickEvent: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.LoadAnimation,
                params: { objContext }
            },
            {
                ResourceKey: "Characterstrics",
                Disable: !blnShowCharactesticMenuOption,
                ClickEvent: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.OpenSidebar,
                params: { objContext }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "LoadInitialView",
                Disable: objContext.state.LoadViewType.toLowerCase() === "initial" ? true : false,
                ClickEvent: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.LoadView,
                params: { objContext, "View": "Initial" },
                Image: objContext.state.LoadViewType.toLowerCase() === "initial" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "LoadSolutionView",
                Disable: objContext.state.LoadViewType.toLowerCase() === "solution" ? true : false,
                ClickEvent: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.LoadView,
                params: { objContext, "View": "Solution" },
                Image: objContext.state.LoadViewType.toLowerCase() === "solution" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                Type: "Separator"
            },
        ];
        if (blnIsFusionVersion) {
            if (blnIsPointOverride) {
                arrContextMenuOptions = [
                    ...arrContextMenuOptions,
                    {
                        ResourceKey: "Point_Override",
                        ClickEvent: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                        params: { objContext },
                        Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                    }
                ];
            }
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            }
        ];
        if (blnIsFusionVersion) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Show_Header_Text",
                    ClickEvent: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.ShowHeaderText,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSAnimationWrapper",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {string} strContextMenuOptions Animation specific context menu
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, strContextMenuOptions = null) {
        objContext.CMSAnimationWrapper_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetContextMenuOptions(objContext, strContextMenuOptions)
        });
    }
}

export default CMSAnimationWrapper_Editor_ContextMenu;
