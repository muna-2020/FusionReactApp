//React imports
import React from 'react';

//Editor Processor
import Editor from '@root/Application/e.Editor/PC/Editor';

//Component Controller.
import ComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

// css loader service
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

//global imports
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

global.IntranetBase_Hook = IntranetBase_Hook;
global.IntranetBase_ModuleProcessor = IntranetBase_ModuleProcessor;

/**
 * @name EditorWrapper
 * @param {object} props component props
 * @summary Opens the editor directly bypassing the intranet
 * @returns {Component} EditorWrapper
 */
const EditorWrapper = (props) => {

    /**
     * @name RenderEditor
     * @summary Renders the editor.
     * */
    const RenderEditor = async () => {
        let objEditor = new Editor();
        let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails");
        let intPageId = parseInt(QueryString.GetQueryStringValue("PageId"));
        let intLangaugeId = parseInt(QueryString.GetQueryStringValue("LanguageId"));
        let strPageIds = "252497,252536";
        props.JConfiguration["IsSSREnabled"] = true;
        let objParams = {
            "Data": {
                "PageId": intPageId,
                "LanguageId":"3",
                "SubjectForMainClient": null,
                "TaskProperties": null,
                "LanguageData": null,
                "IsFirstTask": true,
                "IsLastTask": true,
                "ContentUsageGroupId": null,
                "MultiMediaUsageGroupId": null,
                "LoadEditorFor": "editor_wrapper"
            },
            "CallBacks": {
                "OpenTaskEditPopup": (objTaskData) => {
                    return -1;
                },
                "EditorCloseCallback": (objPageJson) => {
                    console.log("objSavedPageJson", objPageJson);
                }
            },
            "ParentProps": {
                "JConfiguration": props.JConfiguration,
                "ClientUserDetails": objClientUserDetails,
            }
        };
        objEditor.OpenEditor(objParams);
    };

    /**
     * @name GetComponent   
     * @sumamry Checks if the Component Controller contains an entry for editor frame. If yes then loads editor else render's empty div.
     * @returns {any} JSX
     * */
    const GetComponent = () => {
        let EditorFrameComponent = ComponentController.GetComponent("EditorFrame");

        if (typeof EditorFrameComponent.load !== "undefined") {
            EditorFrameComponent.load()
                .then((loadedComponent) => {
                    if (loadedComponent.default.DynamicStyles && typeof document !== "undefined") {
                        loadedComponent.default.DynamicStyles(props).map((objItem) => {
                            LoadDynamicStyles(objItem);
                        });
                    }
                });
        }
        else {
            if (EditorFrameComponent.DynamicStyles && typeof document !== "undefined") {
                EditorFrameComponent.DynamicStyles(props).map((objItem) => {
                    LoadDynamicStyles(objItem);
                });
            }
        }

        if (EditorFrameComponent) {
            RenderEditor();
        }

        return (
            <div />
        );
    };

    /**
     * @summary Calls the GetComponent()
     */
    return GetComponent();
};

export default EditorWrapper;