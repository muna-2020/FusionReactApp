//Module realted fies.
import CMSTextMark_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_Editor/CMSTextMark_Editor_ContextMenu";

//Application State class/methods.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Editor State class/methods.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//overlay import
import * as CMSOverlay_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor_MetaData";

/**
 * @name CMSTextMark_Editor_ModuleProcessor
 * @summary Contains the textmark's editor version module specific methods.
 * */
class CMSTextMark_Editor_ModuleProcessor extends CMSTextMark_Editor_ContextMenu {

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @returns {object} objPoint {Points : [], isNACommon : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"] ? objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"] : 0,
            "isSinglePoint": false
        };
        objPoint.Points = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                "CA": objTempValue.dCorrectPoint ? objTempValue.dCorrectPoint : 0,
                "WA": objTempValue.dWrongPoint ? objTempValue.dWrongPoint : 0,
                "ValueId": objTempValue.iElementTextMarkValueId,
                "iDisplayOrder": objTempValue.iDisplayOrder
            };
        });
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @param {any} objPoints points for the element {Points : [], isNACommon : true/false}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "Y",
                "dNotAnsweredPoint": objPoints.NA,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp["ValueId"] === objTempValue["iElementTextMarkValueId"]);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA
                    }
                })
            }
        };
        objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary  removes point override.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objValue => {
                    return {
                        ...objValue,
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0
                    }
                })
            }
        };
        objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name AddOverlayToSelectedText
     * @param {object} objParams {objContext: {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}}
     * @summary Adds a overlay element json for the selected text.
     */
    AddOverlayToSelectedText(objParams) {
        let { objContext } = objParams;
        let objTextMarkRef = EditorState.GetReference("ActiveTextMark");
        let strSelectedText = Selection.GetSelectedContentText(objTextMarkRef);
        let objSubElementJson = CMSOverlay_Editor_MetaData.GetDefaultElementJson(true, strSelectedText);
        objTextMarkRef.current.AddSubElement(objSubElementJson);
    }

    /**
     * @name AddWikiToSelectedText
     * @param {object} objParams {objContext: {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}}
     * @summary Adds a wiki element json for the selected text.
     */
    AddWikiToSelectedText(objParams) {
        let { objContext } = objParams;
        let objTextMarkRef = EditorState.GetReference("ActiveTextMark");
        let strSelectedText = Selection.GetSelectedContentText(objTextMarkRef);
        const CloseSidebar = () => {
            const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
            fnHideSidebar();
        };
        CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Mode": "edit",
            "ContainerId": objContext.props.ContainerId,
            "FolderID": objContext.props.FolderID,
            "WikiKeyword": strSelectedText,
            "PassedEvents": {
                UpdateElementJson: (objNewElementJson) => {
                    if (strSelectedText === objNewElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] && objTextMarkRef.current !== null) {
                        objTextMarkRef.current.AddSubElement(objNewElementJson);
                    }
                    CloseSidebar();
                },
                CloseSidebar: () => {
                    CloseSidebar();
                }
            },
            "ComponentController": objContext.props.ComponentController,
            "SidebarProps": {
                "SidebarName": "WikiSidebar",
                "Header": "Wiki",
                "Title": "Wiki",
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name ToggleFrame
     * @param {object} objParams {objContext: {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}}
     * @summary Show or remove frame.
     */
    ToggleFrame(objParams) {
        let { objContext } = objParams;
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsShowFrame"]: objContext.state.ElementJson["vElementJson"]["cIsShowFrame"] === "N" ? "Y" : "N"
                    }
                }
            }
        });
    }

    /**
     * @name ToggleCollapse
     * @param {object} objParams {objContext: {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}}
     * @summary Add or remove collapse.
     */
    ToggleCollapse(objParams) {
        let { objContext } = objParams;
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsCollapsable"]: objContext.state.ElementJson["vElementJson"]["cIsCollapsable"] === "N" ? "Y" : "N"
                    }
                }
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSTextMark/CMSTextMarkStyles.css"
        ];
    }
}

export default CMSTextMark_Editor_ModuleProcessor;