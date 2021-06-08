//Module realted fies.
import CMSTextArea_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Editor/CMSTextArea_Editor_ContextMenu";

//ApplicationState State classses.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name CMSTextArea_Editor_ModuleProcessor
 * @summary Contains the TextArea's editor version module specific methods.
 * */
class CMSTextArea_Editor_ModuleProcessor extends CMSTextArea_Editor_ContextMenu {

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @summary this collect the points from Element json and return.
     * @ruturns {object} objPoint {Points : [], isSinglePoint : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"] ? objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"] : 0,
            "CA": objContext.state.ElementJson["vElementJson"]["dCorrectPoint"] ? objContext.state.ElementJson["vElementJson"]["dCorrectPoint"] : 0,
            "WA": objContext.state.ElementJson["vElementJson"]["dWrongPoint"] ? objContext.state.ElementJson["vElementJson"]["dWrongPoint"] : 0,
            "isSinglePoint": true
        };
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @param {object} objPoints points for the element {Points : [], isSinglePoint : true/false}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson.vElementJson,
                "cIsPointOverride": "Y",
                "dNotAnsweredPoint": objPoints.NA,
                "dCorrectPoint": objPoints.CA,
                "dWrongPoint": objPoints.WA
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        objContext.CMSTextArea_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
     * @summary Removes overriden points.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson.vElementJson,
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "dCorrectPoint": 0,
                "dWrongPoint": 0
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        objContext.CMSTextArea_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name HandleTextAreaOnChange
     * @param {objContext} objContext {props, state, dispatch}
     * @param {string} strDictationValue Value
     * @summary This method will be called when textarea is changed.
     */
    HandleTextAreaOnChange(objContext, strDictationValue) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: { ...objContext.state.ElementJson.vElementJson, ["tDictationValue"]: strDictationValue }
                }
            }
        });
        objContext.CMSTextArea_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name ShowImageSidebar
     * @param {object} objParams { objContext }
     * @summary Opens up the side bar.
     */
    ShowTextAreaSidebar(objParams) {
        let { objContext, objTextResource } = objParams;
        objContext.CMSTextArea_Editor_ModuleProcessor.CloseTextAreaSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            ...objContext.props,
            "ElementJson": objContext.state.ElementJson,
            "PassedEvents": {
                UpdateElementJson: (objElementJson) => { objContext.CMSTextArea_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson); }
            },
            "SidebarProps": {
                "SidebarName": "TextAreaSideBar",
                "Header": objTextResource["Title"],
                "Title": objTextResource["Sub_Title"],
                "Status": 1,
                "AutoHide": false
            }
        });
        objContext.CMSTextArea_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name CloseImageSidebar
     * @summary Closes the side bar.
     */
    CloseTextAreaSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name UpdateElementJson
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objElementJson updated element JSON
     * @summary   Send the updates of the CMSTextArea to the parent component.
     */
    UpdateElementJson(objContext, objElementJson) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": { ...objElementJson }
            }
        });
        objContext.CMSTextArea_Editor_ModuleProcessor.CloseTextAreaSidebar();
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSTextArea/TextAreaSidebar/TextAreaSidebar.css"
        ];
    }
}

export default CMSTextArea_Editor_ModuleProcessor;