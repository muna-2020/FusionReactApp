//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name PropertiesSidebar_ModuleProcessor
 * @summary Contains the PropertiesSidebar's editor version module specific methods.
 */
class IFramePropertiesSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, IFramePropertiesSidebar_ModuleProcessor}
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.IFramePropertiesSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    OnUrlChange(objContext, strValue) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["vURL"]: strValue
                    }
                }
            }
        });
    }

    OnInputChange(objContext, strValue, strKey) {
        if (strValue === "" || !isNaN(parseInt(strValue))) {
            if (strValue) {
                strValue = parseInt(strValue);
            }
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            [strKey]: strValue
                        }
                    }
                }
            });
        }
    }

    OnScrollCheckChange(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsScroll"]: objContext.state.ElementJson["vElementJson"]["cIsScroll"] === "Y" ? "N" : "Y"
                    }
                }
            }
        });
    }

    OnSaveClick(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["cIsFirstLoad"]: "N"
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar/IFramePropertiesSidebarStyles.css"
        ];
    }
}

export default IFramePropertiesSidebar_ModuleProcessor;
