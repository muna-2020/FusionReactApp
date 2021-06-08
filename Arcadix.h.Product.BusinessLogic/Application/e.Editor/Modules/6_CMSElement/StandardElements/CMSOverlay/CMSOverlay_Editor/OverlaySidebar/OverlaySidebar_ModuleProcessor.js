//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name OverlaySidebar_ModuleProcessor
 * @summary Contains the OverlaySidebar's editor version module specific methods.
 * */
class OverlaySidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.OverlaySidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name IsNumericValue
     * @param {string} strValue value to be checked
     * @summary Checks if a value is numerical or decimal point value.
     * @returns {boolean} true/false
     */
    IsNumericValue(strValue) {
        let regex = /^[0-9]{1,3}$/;
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name OnChangeFixWidthCheckbox
     * @param {object} objContext {state, props, dispatch}
     * @summary Invoked when the set fixed width check box is checked/unchecked
     */
    async OnChangeFixWidthCheckbox(objContext) {
        let objTextElementJson = await objContext.state.ElementJson["vElementJson"]["TextElements"][0]["Ref"].current.GetElementJson(false);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsFixedWidth"]: objContext.state.ElementJson["vElementJson"]["cIsFixedWidth"] === "Y" ? "N" : "Y",
                        ["TextElements"]: [
                            {
                                ...objContext.state.ElementJson["vElementJson"]["TextElements"][0],
                                ["vElementJson"]: {
                                    ...objContext.state.ElementJson["vElementJson"]["TextElements"][0]["vElementJson"],
                                    ["vText"]: objTextElementJson["vElementJson"]["vText"].trim()
                                }
                            }
                        ]
                    }
                }
            }
        });
    }

    /**
     * @name OnChangeFixWidthInput
     * @param {object} objContext {state, props, dispatch}
     * @param {string} strValue value given by user
     * @summary Trigerred when the fixed width value field is changed.
     */
    async OnChangeFixWidthInput(objContext, strValue) {
        if (strValue !== "" && strValue[0] === "0") {
            strValue = strValue.substr(1, strValue.length);
        }
        if (strValue === "" || objContext.OverlaySidebar_ModuleProcessor.IsNumericValue(strValue)) {
            if (strValue === "") {
                strValue = "0";
            }
            let objTextElementJson = await objContext.state.ElementJson["vElementJson"]["TextElements"][0]["Ref"].current.GetElementJson(false);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["iWidth"]: parseInt(strValue),
                            ["TextElements"]: [
                                {
                                    ...objContext.state.ElementJson["vElementJson"]["TextElements"][0],
                                    ["vElementJson"]: {
                                        ...objContext.state.ElementJson["vElementJson"]["TextElements"][0]["vElementJson"],
                                        ["vText"]: objTextElementJson["vElementJson"]["vText"].trim()
                                    }
                                }
                            ]
                        }
                    }
                }
            });
        }
    }

    /**
     * @name OnClickSaveButton
     * @param {object} objContext {state, props, dispatch}
     * @summary Trigerred when the Add button is clicked. Checks for errors and if values are error free then updates the element json.
     */
    async OnClickSaveButton(objContext) {
        let objElementJson = { ...objContext.state.ElementJson };
        if (objContext.state.ElementJson["cIsFirstLoad"] && objContext.state.ElementJson["cIsFirstLoad"] === "Y") {
            let { cIsFirstLoad, ...objTempElementJson } = objContext.state.ElementJson;
            objElementJson = { ...objTempElementJson };
        }
        let objTextElementJson = await objElementJson["vElementJson"]["TextElements"][0]["Ref"].current.GetElementJson();
        objElementJson = {
            ...objElementJson,
            ["vElementJson"]: {
                ...objElementJson["vElementJson"],
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
        objContext.props.PassedEvents.UpdateElementJson(objElementJson);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSOverlay/OverlaySidebar/OverlaySidebarStyles.css"
        ];
    }
}

export default OverlaySidebar_ModuleProcessor;
