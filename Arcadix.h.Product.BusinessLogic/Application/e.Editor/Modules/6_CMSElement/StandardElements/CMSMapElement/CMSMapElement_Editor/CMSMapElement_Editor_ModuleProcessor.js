//Module related fies.
import CMSMapElement_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Editor/CMSMapElement_Editor_ContextMenu";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSMapElement_Editor_ModuleProcessor
 * @summary Contains the MapElement's editor version module specific methods.
 * */
class CMSMapElement_Editor_ModuleProcessor extends CMSMapElement_Editor_ContextMenu {

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name PreserveTextState
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objState state to be preserved.
     * @summary Preserving text state for undo-redo purpose.
     */
    PreserveTextState(objContext, objState) {
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [objState.ElementJson.iElementId]: { ...objState }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
    }

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @returns {object} objPoint {Points : [], isNACommon : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "isSinglePoint": false
        };
        objPoint.Points = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                "CA": objTempValue["dCorrectPoint"],
                "WA": objTempValue["dWrongPoint"],
                "ValueId": objTempValue["iElementMapElementValueId"],
                "iDisplayOrder": objTempValue["iDisplayOrder"]
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
                    let objPoint = objPoints.Points.find(objPointTemp => objPointTemp.ValueId === objTempValue.iElementMapElementValueId);
                    return {
                        ...objTempValue,
                        "dCorrectPoint": objPoint.CA,
                        "dWrongPoint": objPoint.WA
                    }
                })
            }
        };
        objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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
        objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ShowPropertiesSidebar
     * @param {object} objParams {objContext}
     * @summary Opens the sidebar for setting the tolerance
     */
    ShowPropertiesSidebar(objParams) {
        let { objContext } = objParams;
        objContext.CMSMapElement_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "FolderID": objContext.props.FolderID,
            "ContainerId": objContext.props.ContainerId,
            "ElementJson": { ...objContext.state.ElementJson },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    objContext.CMSMapElement_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "MapElementSidebar",
                "Header": objContext.CMSMapElement_Editor_ModuleProcessor.TextFormatter(objTextResource, "MapElement_SidebarHeader"),
                "Title": objContext.CMSMapElement_Editor_ModuleProcessor.TextFormatter(objTextResource, "MapElement_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name SetInitialValues
     * @param {object} objParams {objContext, Value}
     * @summary Set then intial value for the pen
     */
    SetInitialValues(objParams) {
        let { objContext, Value } = objParams;
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(x => {
                    if (x["UseAs"].toLowerCase() === "pen") {
                        return {
                            ...x,
                            "X": Value.MarkerPosition.X,
                            "Y": Value.MarkerPosition.Y
                        };
                    }
                    else {
                        return x;
                    }
                })
            }
        };
        objContext.CMSMapElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMapElement/CMSMapElementStyles.css"
        ];
    }
}

export default CMSMapElement_Editor_ModuleProcessor;
