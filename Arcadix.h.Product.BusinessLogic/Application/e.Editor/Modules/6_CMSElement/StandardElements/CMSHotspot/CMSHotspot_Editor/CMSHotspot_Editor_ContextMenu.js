//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSHotspot_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSImage
 * */
class CMSHotspot_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
    * @name GetContextMenuOptions
    * @param {object} objContext {props, state, dispatch}
    * @summary gets context menu list based on the slide element type
    * @returns {Array} slide context menu array
    */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let objImageElementJson = objContext.state.ElementJson["vImageElementJson"];
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let arrContextMenuOptions = [
            {
                ResourceKey: "InsertPicture",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.OpenAddPopup,
                params: objContext
            },
            {
                ResourceKey: "ClearImage",
                ClickEvent: () => {
                    objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
                },
                params: objContext
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "AlignUpwards",
                Image: objImageElementJson["vContainerElementProperties"]["vElementVerticalAlignment"] === "top" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "vertical", "AlignValue": "top" }
            },
            {
                ResourceKey: "AlignMiddle",
                Image: objImageElementJson["vContainerElementProperties"]["vElementVerticalAlignment"] === "middle" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "vertical", "AlignValue": "middle" }
            },
            {
                ResourceKey: "AlignDown",
                Image: objImageElementJson["vContainerElementProperties"]["vElementVerticalAlignment"] === "bottom" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "vertical", "AlignValue": "bottom" }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "AlignLeft",
                Image: objImageElementJson["vContainerElementProperties"]["vElementHorizontalAlignment"] === "left" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "horizontal", "AlignValue": "left" }
            },
            {
                ResourceKey: "AlignCenter",
                Image: objImageElementJson["vContainerElementProperties"]["vElementHorizontalAlignment"] === "center" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "horizontal", "AlignValue": "center" }
            },
            {
                ResourceKey: "AlignRight",
                Image: objImageElementJson["vContainerElementProperties"]["vElementHorizontalAlignment"] === "right" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "horizontal", "AlignValue": "right" }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.ShowImageSidebar,
                params: objContext
            }
        ];
        if (blnIsPointOverride) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "HotspotMarker",
                SubMenuModule: "HotspotMarker"
            },
            {
                ResourceKey: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "N" ? "Show_Header_Text" : "Remove_Header_Text",
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext }
            },
        ];
        let arrContextMarkerMenuOptions = [
            {
                ResourceKey: "Default",
                Image: JConfiguration.MainClientId === "97" ? `/Images/editor/JHotspotPointer.gif` : "/Images/editor/JHotspotHandPointer.gif",
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 0 }
            },
            {
                ResourceKey: "HotspotCircle",
                Image: `/Images/editor/HotspotCircle.png`,
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 1 }
            },
            {
                ResourceKey: "HotspotHand",
                Image: `/Images/editor/HotspotHand.png`,
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 2 }
            },
            {
                ResourceKey: "HotspotPoint",
                Image: `/Images/editor/HotspotPoint.png`,
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 3 }
            },
            {
                ResourceKey: "HotspotHandPointing",
                Image: `/Images/editor/HotspotHandPointing.png`,
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 4 }
            },
            {
                ResourceKey: "HotspotStar",
                Image: `/Images/editor/HotspotStar.png`,
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 5 }
            },
            {
                ResourceKey: "HotspotX",
                Image: `/Images/editor/HotspotX.png`,
                ClickEvent: objContext.CMSHotspot_Editor_ModuleProcessor.SetHotspotMarkerId,
                params: { objContext, "id": 6 }
            }
        ];
        if (!objContext.props.IsSubElement) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Delete_Interaction_Type",
                    ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                    params: {}
                }
            ];
        }
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSHotspot",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSHotspot"
            },
            {
                Module: "HotspotMarker",
                MenuList: arrContextMarkerMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSHotspot/HotspotMarker"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, ...}
     * @param {int} intClientX event.clientX
     * @param {int} intClientY event.clientY 
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSHotspot_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSHotspot_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSHotspot_Editor_ContextMenu;
