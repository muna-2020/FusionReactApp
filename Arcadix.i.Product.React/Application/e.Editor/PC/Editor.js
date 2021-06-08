//React Imports.
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

//Application State Classes.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { Provider } from 'react-redux';

//Module Objects.
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Internal service class imports.
import Animation from '@root/Framework/Controls/Animation/Animation';

//Component Controller.
import ComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";

//Component Loader.
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Dragdrop Import
import Dragdrop from '@root/Framework/Controls/Dragdrop/Dragdrop';

/**
 * @name Editor
 * @summary This class is required for loading the editor into the DOM.
 * */
class Editor {

    /**
     * @name OpenEditor
     * @param {number} objParams params required to open editor.
     * @summary This function is responsible for opening the editor. It loads the EditorHolder Component into DOM then loads the editor inside it.
     */
    async OpenEditor(objParams) {
        // Performance.Reset();
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objParams["CallBacks"]) {
            ApplicationState.SetProperty("EditorCallback", objParams["CallBacks"]);
        }
        let arrSubjectDetails, arrLanguageDetails, arrPageProperties;
        let arrPageIds = [];
        let intLangaugeId = objParams["Data"]["LanguageId"];
        if (objParams["Data"]["PageIds"]) {
            arrPageIds = objParams["Data"]["PageIds"].map(intPageId => parseInt(intPageId));
        } else {
            arrPageIds = [parseInt(objParams["Data"]["PageId"])]
        }
        let objData = await this.GetDataForOpeningEditor(arrPageIds, objParams, objParams["Data"]["LoadEditorFor"]);
        arrPageProperties = objData["TaskProperties"];
        arrSubjectDetails = objData["SubjectForMainClient"];
        arrLanguageDetails = objData["LanguageData"];
        arrPageIds = objData["PageIds"];

        var blnSSREnabled_Frame = objParams["ParentProps"]["JConfiguration"]["SSR_Editor"]["Frame"] == "Y" ? true : false;
        let objProps = {
            "ComponentController": ComponentController,
            "LanguageId": intLangaugeId,
            "JConfiguration": { ...objParams["ParentProps"]["JConfiguration"], IsSSREnabled: blnSSREnabled_Frame, SSR_Components: objParams["ParentProps"]["JConfiguration"]["SSR_Editor"]["Components"] },
            "ClientUserDetails": objParams["ParentProps"]["ClientUserDetails"]
        };
        if (document && document.getElementById("DivEditorHolder") == null) {
            let objDiv = document.createElement("div");
            objDiv.id = "DivEditorHolder";
            objDiv.style.display = "none";
            if (document.getElementById("IntranetEditorHolder") === null) {
                document.body.appendChild(objDiv);
            }
            else {
                document.getElementById("IntranetEditorHolder").appendChild(objDiv);
            }
            ReactDOM.render(
                <EditorHolder
                    {...objProps}
                    PageIds={arrPageIds}
                    LanguageId={intLangaugeId}
                    SubjectForMainClient={arrSubjectDetails}
                    PageProperties={arrPageProperties}
                    LanguageData={arrLanguageDetails}
                    OpenTaskAddEditPopup={objParams["CallBacks"]["OpenTaskEditPopup"]}
                    IsFirstTask={objParams["Data"]["IsFirstTask"]}
                    IsLastTask={objParams["Data"]["IsLastTask"]}
                    ContentUsageGroupId={objParams["Data"]["ContentUsageGroupId"]}
                    MultiMediaUsageGroupId={objParams["Data"]["MultiMediaUsageGroupId"]}
                    DisplayCallback={() => {
                        objDiv.style.display = "block";
                    }}
                />, document.getElementById("DivEditorHolder")
            );
        }
        else {
            let EditorRef = EditorState.GetReference("EditorRef");
            if (EditorRef && EditorRef.current && EditorRef.current !== null) {
                Performance.GetTotalPerformanceData("EditorFrame");
                let objPreviousPageProperties = this.SwitchTask(arrPageIds[arrPageIds.length - 1], "PREVIOUS");
                let objNextPageProperties = this.SwitchTask(arrPageIds[arrPageIds.length - 1], "NEXT");
                await EditorRef.current.OpenTask(arrPageIds, objPreviousPageProperties ? false : true, objNextPageProperties ? false : true, false, false, arrPageProperties, intLangaugeId);
                let objDiv = document.getElementById("DivEditorHolder");
                objDiv.style.display = "block";
            }
        }
    }

    /**
     * @name CloseEditor
     * @summary This function closes the Editor.
     * */
    async CloseEditor() {
        let EditorRef = EditorState.GetReference("EditorRef");
        if (EditorRef && EditorRef.current && EditorRef.current.RemoveTasksFromState) {
            await EditorRef.current.RemoveTasksFromState(null, false);
            if (ApplicationState.GetProperty("EditorCallback")) {
                let objPageJson = EditorState.GetProperty("EditorClosePageJson");
                console.log("objPageJson", objPageJson);
                let EditorCallback = ApplicationState.GetProperty("EditorCallback");
                if (EditorCallback && EditorCallback.EditorCloseCallback) {
                    EditorCallback.EditorCloseCallback(objPageJson);
                }
                setTimeout(() => {
                    if ((EditorState.GetProperty("EditorClosePageJson"))) {
                        EditorState.RemoveProperty("EditorClosePageJson");
                    }
                }, 100)

            }
        }
        return true;
    }

    /**
     * @name MinimizeEditor
     * @summary This function minimizes the Editor.
     * */
    MinimizeEditor() {
        let objDiv = document.getElementById("DivEditorHolder");
        objDiv.style.display = "none";
    }

    /**
     * @name SwitchTask
     * @param {number} intPageId Page id whose previous or next is to be get.
     * @param {string} strTraverseDirection NEXT/PREVIOUS
     * @summary Gets the previous or next task from intranet.
     * @returns {object} new task with properties.
     */
    SwitchTask(intPageId, strTraverseDirection) {
        let objCallbacks = ApplicationState.GetProperty("EditorCallback");
        let objPageProperties;
        if (objCallbacks["GetAdjacentTask"]) {
            objPageProperties = objCallbacks["GetAdjacentTask"](intPageId, strTraverseDirection);
        }
        return objPageProperties;
    }

    /**
     * @name GetDataForOpeningEditor
     * @summary Gets the data required for opening teh editor.
     */
    async GetDataForOpeningEditor(arrPageIds, objParams, strLoadEditorFor = "") {
        let arrSubjectDetails = [], arrLanguageDetails, arrPageProperties;
        switch (strLoadEditorFor) {
            case "intranet":
                arrPageProperties = objParams["Data"]["TaskProperties"];
                arrSubjectDetails = objParams["Data"]["SubjectForMainClient"];
                arrLanguageDetails = objParams["Data"]["LanguageData"];
                break;
            case "editor_wrapper":
                arrPageProperties = EditorData["Task"]["Object_Intranet_Task_Task;iPageIds;" + EditorData["PageIds"]]["Data"];
                arrSubjectDetails = EditorData["Subject"]["Object_Intranet_Taxonomy_Subject"]["Data"];
                arrLanguageDetails = EditorData["Language"]["Object_Cockpit_Language"]["Data"];
                arrPageIds = EditorData["PageIds"].split(",").map(strPageId => parseInt(strPageId));
                break;
            default:
                arrPageProperties = objParams["Data"]["TaskProperties"];
                arrLanguageDetails = await Object_Cockpit_Language.GetData_Custom({});
                break;
        }
        return {
            "TaskProperties": arrPageProperties,
            "SubjectForMainClient": arrSubjectDetails,
            "LanguageData": arrLanguageDetails,
            "PageIds": arrPageIds
        };
    }
};

export default Editor;

/**
 * @name EditorHolder
 * @summary This component contains the div which holds the editor. This div is shown/hidden to open and close editor.
 * @param {any} props props passed to the component
 * @returns {JSX}  Component JSX
 */
const EditorHolder = (props) => {
    let blnIsDirectEditor = QueryString.GetQueryStringValue("PageId") !== "";
    let blnIsPerformance = QueryString.GetQueryStringValue("Performance") === "Y";
    let objStyles = {
        "position": blnIsDirectEditor ? "fixed" : "absolute",
        "left": blnIsDirectEditor && blnIsPerformance ? 48 : 0,
        "right": 0,
        "top": 0,
        "bottom": 0,
        "background": "#ffffff",
        "zIndex": 4050,
        "display": "block"
    };

    return (
        <BrowserRouter>
            <Provider store={store} >
                <Dragdrop ApplicationName="Editor">
                    <div className="Editor1">
                        <div id="EditorMainWrapper" className="editor-main-wrapper" style={objStyles}>
                            {
                                document && document.getElementById("SampleAnimationId") === null ?
                                    <Animation
                                        Id="SampleAnimationId"
                                        Meta={{ "ShowAnimationImage": true }}
                                        Resource={{ "ImagePath": props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
                                    />
                                    : ""
                            }
                            <PerformanceProfiler ComponentName={"EditorFrame"} JConfiguration={props.JConfiguration}>
                                <ComponentLoader
                                    {...props}
                                    ComponentController={props.ComponentController}
                                    IsEditor="Y"
                                    DivName={"EditorFrame_Div"}
                                    ComponentName={"EditorFrame"}
                                    Mode={"edit"}
                                    Id={"EditorFrame"}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </Dragdrop>
            </Provider>
        </BrowserRouter>
    );
};
