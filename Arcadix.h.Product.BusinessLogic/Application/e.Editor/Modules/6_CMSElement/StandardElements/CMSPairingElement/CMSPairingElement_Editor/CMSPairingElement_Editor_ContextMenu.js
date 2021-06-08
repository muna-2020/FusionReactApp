//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSPairingElement_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSPairingElement
 */
class CMSPairingElement_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @summary Forms an array with the ContextMenuOptions for the Pairing element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [];
        if (objParams) {
            if (objParams["type"] && !/(circle|line)/.test(objParams["type"].toLowerCase())) {
                arrContextMenuOptions = [
                    ...arrContextMenuOptions,
                    {
                        ResourceKey: "SetBackground",
                        ClickEvent: objContext.CMSPairingElement_Editor_ModuleProcessor.SetElementPosition,
                        params: { objContext, "ElementDetails": objParams, "cIsSetAsBackground": "Y" },
                        Image: objParams["additionalproperties"]["cIsSetAsBackground"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                    },
                    {
                        ResourceKey: "BringFront",
                        ClickEvent: objContext.CMSPairingElement_Editor_ModuleProcessor.SetElementPosition,
                        params: { objContext, "ElementDetails": objParams, "cIsSetAsBackground": "N" },
                        Image: objParams["additionalproperties"]["cIsSetAsBackground"] === "Y" ? "/Images/editor/Icon_No.gif" : "/Images/editor/Icon_Yes.gif"
                    },
                    {
                        Type: "Separator"
                    }
                ]
            }
            if (objParams["type"] && objParams["type"].toLowerCase() === "image") {
                arrContextMenuOptions = [
                    ...arrContextMenuOptions,
                    {
                        ResourceKey: "DeleteImage",
                        ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]) },
                        params: {}
                    },
                    {
                        Type: "Separator"
                    }
                ]
            }
        }
        arrContextMenuOptions = [...arrContextMenuOptions,
        {
            ResourceKey: "Edit",
            ClickEvent: objContext.CMSPairingElement_Editor_ModuleProcessor.HandleElementEdit,
            params: { objContext },
            Image: objContext.state["cIsEditEnabled"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
        },
        {
            ResourceKey: "Delete_Interaction_Type",
            ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
            params: {}
        },
        {
            ResourceKey: "Comment",
            ClickEvent: () => { },
            params: {}
        },
        {
            ResourceKey: "Show_Header_Text",
            ClickEvent: objContext.CMSPairingElement_Editor_ModuleProcessor.ShowHeaderText,
            params: { objContext },
            Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
        }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSPairingElement",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSPairingElement"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSPairingElement Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSPairingElement_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSPairingElement_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSPairingElement_Editor_ContextMenu;
