//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application State Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related classes/methods.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name AdditionalInformation_ModuleProcessor
 * @summary Module object for  AdditionalInformation component.
 * */
class AdditionalInformation_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name OpenOrCloseSidebar
     * @param {object} objSidebarProps sidebar props
     * @param {object} strOperationType open/close
     * @summary Opens a sidebar with with the passed sidebar props.
     */
    OpenOrCloseSidebar(objSidebarProps, strOperationType) {
        switch (strOperationType.toUpperCase()) {
            case "OPEN":
                this.OpenOrCloseSidebar({}, "CLOSE");
                let fnShowSidebar = ApplicationState.GetProperty("showSidebar");
                fnShowSidebar({ ...objSidebarProps });
                break;
            case "CLOSE":
                let fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
                fnHideSidebar();
                break;
            default: "";
        }
    }

    /**
     * @name GetTaskHintJson
     * @param {object} objAdditionalInformationProps {AdditionalInformation_ModeuleObject, Ref, SidebarType}
     * @param {object} objPageJson active task page json
     * @returns {object} Task Hint Json
     */
    GetTaskHintJson(objAdditionalInformationProps, objPageJson) {
        let objTaskHintElementJson;
        if (!objAdditionalInformationProps.Ref.current.TaskHint["blnTaskHintRemoved"]) {
            if (objAdditionalInformationProps.Ref.current.TaskHint.objTaskHint && objAdditionalInformationProps.Ref.current.TaskHint.objTaskHint !== null) {
                objTaskHintElementJson = {
                    ...objAdditionalInformationProps.Ref.current.TaskHint.objTaskHint
                };
            }
            else {
                if (objPageJson && objPageJson !== null && objPageJson["TaskHint"] && objPageJson["TaskHint"] !== null) {
                    objTaskHintElementJson = {
                        ...objPageJson["TaskHint"]
                    };
                }
                else {
                    let intElementTextId = UniqueId.GetUniqueId();
                    let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, "");
                    objTaskHintElementJson = {
                        "iPageDataId": "",
                        "iElementTextId": intElementTextId,
                        "TextElements": [
                            {
                                ...objTextElementJson
                            }
                        ]
                    };
                }
            }
        }
        else {
            let intElementTextId = UniqueId.GetUniqueId();
            let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, "");
            objTaskHintElementJson = {
                "iPageDataId": "",
                "iElementTextId": intElementTextId,
                "TextElements": [
                    {
                        ...objTextElementJson
                    }
                ]
            };
        }
        return objTaskHintElementJson;
    }

    /**
     * @name GetAdditionalInformationJson
     * @param {object} objAdditionalInformationProps {AdditionalInformation_ModeuleObject, Ref, SidebarType}
     * @param {object} objPageJson active task page json
     * @returns {object} Additional Information Json
     */
    GetAdditionalInformationJson(objAdditionalInformationProps, objPageJson) {
        let objAdditionalInformationElementJson;
        if (!objAdditionalInformationProps.Ref.current.AdditionalInformation["blnAdditionalInformationRemoved"]) {
            if (objAdditionalInformationProps.Ref.current.AdditionalInformation.objAdditionalInformation && objAdditionalInformationProps.Ref.current.AdditionalInformation.objAdditionalInformation !== null) {
                objAdditionalInformationElementJson = {
                    ...objAdditionalInformationProps.Ref.current.AdditionalInformation.objAdditionalInformation
                };
            }
            else {
                if (objPageJson && objPageJson !== null && objPageJson["AdditionalInformation"] && objPageJson["AdditionalInformation"] !== null && !objPageJson["AdditionalInformation"]["Value"]) {
                    objAdditionalInformationElementJson = {
                        ...objPageJson["AdditionalInformation"]
                    };
                }
                else {
                    let intElementTextId = UniqueId.GetUniqueId();
                    let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, "");
                    objAdditionalInformationElementJson = {
                        "iPageDataId": "",
                        "iElementTextId": intElementTextId,
                        "TextElements": [
                            {
                                ...objTextElementJson
                            }
                        ]
                    };
                }
            }
        }
        else {
            let intElementTextId = UniqueId.GetUniqueId();
            let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId, "");
            objAdditionalInformationElementJson = {
                "iPageDataId": "",
                "iElementTextId": intElementTextId,
                "TextElements": [
                    {
                        ...objTextElementJson
                    }
                ]
            };
        }
        return objAdditionalInformationElementJson;
    }

    /**
     * @name AddAdditionalInformation
     * @param {object} objAdditionalInformationProps {AdditionalInformation_ModeuleObject, Ref, SidebarType}
     * @summary Opens a AdditionalInformation sidebar.
     */
    AddAdditionalInformation(objAdditionalInformationProps) {
        let objAdditionalInformationElementJson = null;
        let strHeader = "", strTitle = "";
        let objTextResource = EditorState.GetReference("CommonTextResource");
        let objPageJson = objAdditionalInformationProps.ParentRef.current.GetCurrentPageJson();
        if (objAdditionalInformationProps.SidebarType === "TaskHint") {
            strHeader = objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.TextFormatter(objTextResource, "TaskHint_SidebarHeader");
            strTitle = objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.TextFormatter(objTextResource, "TaskHint_SidebarTitle");
            objAdditionalInformationElementJson = objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.GetTaskHintJson(objAdditionalInformationProps, objPageJson);
        }
        else if (objAdditionalInformationProps.SidebarType === "AdditionalInformation") {
            strHeader = objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.TextFormatter(objTextResource, "AdditionalInformation_SidebarHeader");
            strTitle = objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.TextFormatter(objTextResource, "AdditionalInformation_SidebarTitle");
            objAdditionalInformationElementJson = objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.GetAdditionalInformationJson(objAdditionalInformationProps, objPageJson);
        }
        if (objAdditionalInformationElementJson && objAdditionalInformationElementJson !== null) {
            let objSidebarProps = {
                "ElementJson": {
                    ...objAdditionalInformationElementJson
                },
                "PassedEvents": {
                    "SaveAdditionalInformation": (objElementJson) => {
                        objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.SaveAdditionalInformation(objAdditionalInformationProps, objElementJson);
                    },
                    "RemoveAdditionalInformation": () => {
                        objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.RemoveAdditionalInformation(objAdditionalInformationProps);
                    }
                },
                "PageId": objPageJson["iPageId"],
                "Mode": "edit",
                "JConfiguration": objAdditionalInformationProps.JConfiguration,
                "ComponentController": objAdditionalInformationProps.ComponentController,
                "SidebarProps": {
                    "SidebarName": "AdditionalInformationSidebar",
                    "Header": strHeader,
                    "Title": strTitle,
                    "Status": 1,
                    "AutoHide": false
                }
            };
            objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.OpenOrCloseSidebar(objSidebarProps, "OPEN");
        }
    }

    /**
     * @name SaveAdditionalInformation
     * @param {object} objAdditionalInformationProps {AdditionalInformation_ModeuleObject, Ref, SidebarType}
     * @param {object} objNewElementJson updated json
     * @summary Updates the page json and closes the sidebar.
     */
    SaveAdditionalInformation(objAdditionalInformationProps, objNewElementJson) {
        objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.OpenOrCloseSidebar({}, "CLOSE");
        if (objAdditionalInformationProps.SidebarType && objAdditionalInformationProps.SidebarType === "TaskHint") {
            objAdditionalInformationProps.Ref.current.TaskHint = {
                "objTaskHint": { ...objNewElementJson },
                "blnTaskHintRemoved": false
            };
        }
        else {
            objAdditionalInformationProps.Ref.current.AdditionalInformation = {
                "objAdditionalInformation": { ...objNewElementJson },
                "blnAdditionalInformationRemoved": false
            };
        }
        objAdditionalInformationProps.PageContent_TaskEditStatusRef.current = true;
    }

    /**
     * @name RemoveAdditionalInformation
     * @param {object} objAdditionalInformationProps {AdditionalInformation_ModeuleObject, Ref, SidebarType}
     * @summary Removes the task hint object from the page json.
     */
    RemoveAdditionalInformation(objAdditionalInformationProps) {
        objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.OpenOrCloseSidebar({}, "CLOSE");
        if (objAdditionalInformationProps.SidebarType && objAdditionalInformationProps.SidebarType === "TaskHint") {
            objAdditionalInformationProps.Ref.current.TaskHint = {
                "objTaskHint": null,
                "blnTaskHintRemoved": true
            };
        }
        else {
            objAdditionalInformationProps.Ref.current.AdditionalInformation = {
                "objAdditionalInformation": null,
                "blnAdditionalInformationRemoved": true
            };
        }
        objAdditionalInformationProps.PageContent_TaskEditStatusRef.current = true;
    }
}

export default AdditionalInformation_ModuleProcessor;
