//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name MapElementSidebar_ModuleProcessor
 * @summary Contains the MapElementSidebar's editor version module specific methods.
 */
class MapElementSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSMapElement/MapElementSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.MapElementSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSMapElement/MapElementSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name OnInputChange
     * @param {obejct} objContext {state, props, dispatch}
     * @param {string} strValue Value
     */
    OnInputChange(objContext, strValue, strKey) {
        if (strValue === "" || !isNaN(strValue)) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        "vElementJson": {
                            ...objContext.state.ElementJson["vElementJson"],
                            [strKey]: Number(strValue)
                        }
                    }
                }
            });
        }
    }

    /**
     * @name OnTaskTypeChange
     * @param {obejct} objContext {state, props, dispatch}
     */
    OnTaskTypeChange(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson["vElementJson"],
                        "cIsTaskType": objContext.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y" ? "N" : "Y"
                    }
                }
            }
        });
    }

    /**
     * @name OnImageSelection
     * @param {obejct} objContext {state, props, dispatch}
     * @param {string} strValue Value
     */
    OnImageSelection(objContext, strUseAs) {
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "Image"
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '602px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objImageElementJson) => {
                    objContext.dispatch({
                        "type": "SET_STATE",
                        "payload": {
                            "ElementJson": {
                                ...objContext.state.ElementJson,
                                "vElementJson": {
                                    ...objContext.state.ElementJson["vElementJson"],
                                    "Values": [
                                        ...objContext.state.ElementJson["vElementJson"]["Values"],
                                        {
                                            "iElementImageId": objImageElementJson["iElementId"],
                                            "vElementTypeName": "Image",
                                            "UseAs": strUseAs,
                                            "X": 0,
                                            "Y": 0
                                        }
                                    ]
                                },
                                "MappedElements": [
                                    ...objContext.state.ElementJson["MappedElements"],
                                    objImageElementJson
                                ]
                            }
                        }
                    });
                }
            }
        });
    }

    /**
     * @name OnImageRemoval
     * @param {obejct} objContext {state, props, dispatch}
     * @param {string} objValue Value
     */
    OnImageRemoval(objContext, objValue) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson["vElementJson"],
                        "Values": objContext.state.ElementJson["vElementJson"]["Values"].filter(x => x["iElementImageId"] !== objValue["iElementImageId"])
                    },
                    "MappedElements": objContext.state.ElementJson["MappedElements"].filter(x => x["iElementId"] !== objValue["iElementImageId"])
                }
            }
        });
    }

    /**
     * @name UpdateToCMSInput
     * @param {object} objContext {state, props, dispatch}
     * @summary Calls the 'UpdateElementJson' method of the CMSInput element to update the element json.
     */
    OnClickSave(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "cIsFirstLoad": "N"
        };
        objContext.props.PassedEvents.UpdateElementJson(objElementJson);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMapElement/MapElementSidebar/MapElementSidebarStyles.css"
        ];
    }
}

export default MapElementSidebar_ModuleProcessor;
