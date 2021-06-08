//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Editor_TaskContent_CMSWiki from '@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSWiki';
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name WikiSidebar_ModuleProcessor
 * @summary Contains the WikiSidebar's editor version module specific methods.
 * */
class WikiSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Editor_TaskContent_CMSWiki",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(objContext.WikiSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Wiki object
        Object_Editor_TaskContent_CMSWiki.Initialize(
            {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iLanguageId": props.JConfiguration.InterfaceLanguageId
                            }
                        }
                    ]
                },
                "SortKeys": {
                    "vElementJson.Values.vWikiKeyword": {
                        "order": "asc"
                    }
                }
            }
        );
        arrDataRequest = [Object_Editor_TaskContent_CMSWiki];

        //Text resources
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [
            ...arrDataRequest,
            Object_Framework_Services_TextResource
        ];
        return arrDataRequest;
    }

    /**
     * @name OnClickSaveButton
     * @param {object} objContext {state, props, dispatch}
     * @param {any} objEvent onclick event
     * @summary Trigerred when the Save button is clicked. Checks for errors and if values are error free then updates the element json.
     */
    async OnClickSaveButton(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objTextElementJson = await objContext.state.ElementJson["vElementJson"]["TextElements"][0]["Ref"].current.GetElementJson();
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["TextElements"]: [
                    {
                        ...objTextElementJson,
                        ["vElementJson"]: {
                            ...objTextElementJson["vElementJson"],
                            ["vText"]: objTextElementJson["vElementJson"]["vText"].trim()
                        }
                    }
                ]
            }
        };
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId
                        }
                    }
                ]
            }
        };
        let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
        if (objElementJson["cIsFirstLoad"]) {
            objParams = {
                ...objParams,
                "uUserId": objClientUserDetails["UserId"],
                "cIsFusionVersion": "N",
                "vAddData": objElementJson
            };
            objContext.props.Object_Editor_TaskContent_CMSWiki.AddData(objParams, (arrReturn) => {
                console.log("arrReturn", arrReturn);
                if (arrReturn && arrReturn.length > 0) {
                    objContext.strOperationTypeRef.current = "ADD";
                }
            });
        }
        else {
            objParams = {
                ...objParams,
                "uUserId": objClientUserDetails["UserId"],
                "cIsFusionVersion": "N",
                "vEditData": objElementJson
            };
            objContext.props.Object_Editor_TaskContent_CMSWiki.EditData(objParams, (arrReturn) => {
                console.log("arrReturn", arrReturn);
                if (arrReturn && arrReturn.length > 0) {
                    objContext.strOperationTypeRef.current = "EDIT";
                }
            });
        }
    }

    /**
     * @name SetWikiToElementJson
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objWikiJson Element json
     */
    SetWikiToElementJson(objContext, objWikiJson) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objWikiJson
                },
                "blnShowWikiTab": true
            }
        });
    }

    /**
     * @name ChangeTab
     * @param {object} objContext {state, props, dispatch}
     * @param {boolean} blnTabChanged true/false
     * @summary Changes the Tabs
     */
    ChangeTab(objContext, blnTabChanged) {
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "blnShowWikiTab": blnTabChanged
            }
        });
    }

    /**
     * @name RemoveWiki
     * @param {object} objContext {state, props, dispatch}
     * @param {number} objWikiJson Wiki Element json
     * @summary Removes the wiki.
     * @returns {boolean} true/false
     */
    RemoveWiki(objContext, objWikiJson) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId
                        }
                    }
                ]
            },
            "vDeleteData": objWikiJson
        };
        objContext.props.Object_Editor_TaskContent_CMSWiki.DeleteData(objParams, (arrReturn) => {
            objContext.strOperationTypeRef.current = "DELETE";
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSWiki/WikiSidebar/WikiSidebarStyles.css",
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSWiki/CMSWikiStyles.css"
        ];
    }
}

export default WikiSidebar_ModuleProcessor;
