//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name AnimationWrapperSidebar_ModuleProcessor
 * @summary Contains the AnimationWrapperSidebar's editor version module specific methods.
 * */
class AnimationWrapperSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(objContext.AnimationWrapperSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name GetTextResource
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @summary Extracts Text resource from props.
     * @returns {object} Text resource.
     */
    GetTextResource(props) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar", props);
        return objTextResource;
    }

    /**
     * @name IsNumericValue
     * @param {string} strValue value to be checked
     * @param {string} strOperationType TYPING/ADD
     * @summary Checks if a value is numerical value.
     * @returns {boolean} true/false
     */
    IsNumericValue(strValue, strOperationType) {
        // let regex = /^[-]?[0-9]+([.][0]*[1-9]+)?([,][-]?[0-9]+([.][0]*[1-9]+)?)*$/;
        let regex;
        switch (strOperationType.toUpperCase()) {
            case "TYPING":
                regex = /^[0-9]+$/;
                break;
            case "ADD":
                regex = /^[1-9]+$/;
                break;
        }
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name UpdateElementJsonForInitialAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @param {string} strKey key in InitialAttributeValue/AnswerAttributeValue.
     * @param {string} Value Value of the key
     * @param {number} intFocusId iAttributeId at which focus has to be given.
     * @summary Updates the ElementJson.
     */
    UpdateElementJsonForInitialAttribute(objContext, strKey, Value) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["InitialAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"],
                            [strKey]: Value
                        }
                    }
                }
            }
        });
    }

    /**
     * @name UpdateElementJsonForInitialAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @param {string} strKey key in InitialAttributeValue/AnswerAttributeValue.
     * @param {string} Value Value of the key
     * @param {number} intFocusId iAttributeId at which focus has to be given.
     * @summary Updates the ElementJson.
     */
    UpdateElementJsonForResourceAttribute(objContext, strKey, Value) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["ResourceAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"],
                            [strKey]: Value
                        }
                    }
                }
            }
        });
    }

    /**
     * @name UpdateElementJsonForAnswerAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @param {string} strKey key in InitialAttributeValue/AnswerAttributeValue
     * @param {string} strRestultValueKey Min/Max
     * @param {string} Value  Value of the key
     * @param {number} intFocusId iAttributeId at which focus has to be given.
     * @summary Updates the ElementJson.
     */
    UpdateElementJsonForAnswerAttribute(objContext, strKey, strRestultValueKey, Value) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["AnswerAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"],
                            [strKey]: {
                                ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey],
                                [strRestultValueKey]: Value
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * @name OnInitialAttributeInputChange
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @param {string} strKey key in InitialAttributeValue/AnswerAttributeValue.
     * @param {string} strValueType number/text/array/image/html image.
     * @param {string} strValue value entered in the field.
     * @param {object} objAttributeJson Attribute json.
     * @summary Check type of input, process it and calls method for update.
     */
    OnInitialAttributeInputChange(objContext, strKey, strValueType, strValue, objAttributeJson, intElementIndex) {
        let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
        switch (strValueType.toLowerCase()) {
            case "number":
                if (strValue === "" || !isNaN(Number(strValue))) {
                    if ((!objAnimationAttribute["MaxLength"]) || (objAnimationAttribute["MaxLength"] && strValue.length <= objAnimationAttribute["MaxLength"])) {
                        let objValue = {
                            ...objAttributeJson,
                            ["vValue"]: strValue
                        };
                        objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForInitialAttribute(objContext, strKey, objValue);
                    }
                }
                break;
            case "character":
                if (strValueType === "" || strValueType.length === 1) {
                    let objValue = {
                        ...objAttributeJson,
                        ["vValue"]: strValue
                    };
                    objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForInitialAttribute(objContext, strKey, objValue);
                }
                break;
            case "array":
                switch (objAttributeJson["vType"].toLowerCase()) {
                    case "number":
                        if (!(strValue === "" || !isNaN(Number(strValue)))) {
                            strValue = objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].find((objTempData, intIndex) => intIndex === intElementIndex)["vValue"];
                        }
                        break;
                    case "character":
                        if (strValue.length > 1) {
                            strValue = strValue[0];
                        }
                        break;
                    default:
                        strValue = strValue;
                }
                let arrData = objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                    if (intIndex === intElementIndex) {
                        return {
                            ...objTempData,
                            ["vValue"]: strValue
                        };
                    }
                    else {
                        return objTempData;
                    }
                });
                objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForInitialAttribute(objContext, strKey, arrData);
                break;
            default:
                if ((!objAnimationAttribute["MaxLength"]) || (objAnimationAttribute["MaxLength"] && strValue.length <= objAnimationAttribute)) {
                    let objValue = {
                        ...objAttributeJson,
                        ["vValue"]: strValue
                    };
                    objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForInitialAttribute(objContext, strKey, objValue);
                }
                break;
        }
    }

    /**
     * @name OnResourceAttributeInputChange
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @param {string} strKey key in InitialAttributeValue/AnswerAttributeValue.
     * @param {string} strValueType number/text/array/image/html image.
     * @param {string} strValue value entered in the field.
     * @param {object} objAttributeJson Attribute json.
     * @summary Check type of input, process it and calls method for update.
     */
    OnResourceAttributeInputChange(objContext, strKey, strValueType, strValue, objAttributeJson, intElementIndex) {
        let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
        switch (strValueType.toLowerCase()) {
            case "number":
                if (strValue === "" || !isNaN(Number(strValue))) {
                    if ((!objAnimationAttribute["MaxLength"]) || (objAnimationAttribute["MaxLength"] && strValue.length <= objAnimationAttribute["MaxLength"])) {
                        let objValue = {
                            ...objAttributeJson,
                            ["vValue"]: strValue
                        };
                        objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForResourceAttribute(objContext, strKey, objValue);
                    }
                }
                break;
            case "character":
                if (strValueType === "" || strValueType.length === 1) {
                    let objValue = {
                        ...objAttributeJson,
                        ["vValue"]: strValue
                    };
                    objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForResourceAttribute(objContext, strKey, objValue);
                }
                break;
            case "array":
                switch (objAttributeJson["vType"].toLowerCase()) {
                    case "number":
                        if (!(strValue === "" || !isNaN(Number(strValue)))) {
                            strValue = objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].find((objTempData, intIndex) => intIndex === intElementIndex)["vValue"];
                        }
                        break;
                    case "character":
                        if (strValue.length > 1) {
                            strValue = strValue[0];
                        }
                        break;
                }
                let arrData = objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                    if (intIndex === intElementIndex) {
                        return {
                            ...objTempData,
                            ["vValue"]: strValue
                        };
                    }
                    else {
                        return objTempData;
                    }
                });
                objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForResourceAttribute(objContext, strKey, arrData);
                break;
            default:
                if ((!objAnimationAttribute["MaxLength"]) || (objAnimationAttribute["MaxLength"] && strValue.length <= objAnimationAttribute)) {
                    let objValue = {
                        ...objAttributeJson,
                        ["vValue"]: strValue
                    };
                    objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForResourceAttribute(objContext, strKey, objValue);
                }
                break;
        }
    }

    /**
     * @name OnAnswerAttributeInputChange
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @param {string} strElementJsonKey InitialAttributeValue/AnswerAttributeValue.
     * @param {string} strValueKey key in InitialAttributeValue/AnswerAttributeValue.
     * @param {string} strValueType number/text/array.
     * @param {string} strRestultValueKey Min/Max/Both.
     * @param {string} strValue value entered in the field.
     * @summary Check what type of input is required and calls that input specific method.
     */
    OnAnswerAttributeInputChange(objContext, strKey, strValueType, strRestultValueKey, strValue, objAttributeJson, intElementIndex) {
        let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
        switch (strValueType.toLowerCase()) {
            case "number":
                if (strValue === "" || !isNaN(Number(strValue))) {
                    if ((!objAnimationAttribute["MaxLength"]) || (objAnimationAttribute["MaxLength"] && strValue.length <= objAnimationAttribute["MaxLength"])) {
                        let objValue = {
                            ...objAttributeJson,
                            ["vValue"]: strValue
                        };
                        objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForAnswerAttribute(objContext, strKey, strRestultValueKey, objValue);
                    }
                }
                break;
            case "array":
                if (objAttributeJson["vType"].toLowerCase() === "number") {
                    if (!(strValue === "" || !isNaN(Number(strValue)))) {
                        strValue = objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey][strRestultValueKey].find((objTempData, intIndex) => intIndex === intElementIndex)["vValue"];
                    }
                }
                let arrData = objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey][strRestultValueKey].map((objTempData, intIndex) => {
                    if (intIndex === intElementIndex) {
                        return {
                            ...objTempData,
                            ["vValue"]: strValue
                        };
                    }
                    else {
                        return objTempData;
                    }
                });
                objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForAnswerAttribute(objContext, strKey, strRestultValueKey, arrData);
                break;
            default:
                if ((!objAnimationAttribute["MaxLength"]) || (objAnimationAttribute["MaxLength"] && strValue.length <= objAnimationAttribute)) {
                    let objValue = {
                        ...objAttributeJson,
                        ["vValue"]: strValue
                    };
                    objContext.AnimationWrapperSidebar_ModuleProcessor.UpdateElementJsonForAnswerAttribute(objContext, strKey, strRestultValueKey, objValue);
                }
                break;
        }
    }

    /**
     * @name OnRadioChange
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strRadioType radio type.
     * @param {string} strAttributeType initial/resource/answer
     * @summary Trigerred when the radio selection changes.
     */
    OnRadioChange(objContext, strRadioType, strAttributeType) {
        if (strAttributeType === "initial") {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "InitialAttributeAvailableFieldType": objContext.state.InitialAttributeAvailableFieldType.map(objTempData => {
                        if (objTempData["vRadioType"] === strRadioType) {
                            return {
                                ...objTempData,
                                ["cIsSelected"]: "Y"
                            };
                        }
                        else {
                            return {
                                ...objTempData,
                                ["cIsSelected"]: "N"
                            };
                        }
                    })
                }
            });
        }
        else if (strAttributeType === "resource") {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ResourceAttributeAvailableFieldType": objContext.state.ResourceAttributeAvailableFieldType.map(objTempData => {
                        if (objTempData["vRadioType"] === strRadioType) {
                            return {
                                ...objTempData,
                                ["cIsSelected"]: "Y"
                            };
                        }
                        else {
                            return {
                                ...objTempData,
                                ["cIsSelected"]: "N"
                            };
                        }
                    })
                }
            });
        }
        else if (strAttributeType === "answer") {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "AnswerAttributeAvailableFieldType": objContext.state.AnswerAttributeAvailableFieldType.map(objTempData => {
                        if (objTempData["vRadioType"] === strRadioType) {
                            return {
                                ...objTempData,
                                ["cIsSelected"]: "Y"
                            };
                        }
                        else {
                            return {
                                ...objTempData,
                                ["cIsSelected"]: "N"
                            };
                        }
                    })
                }
            });
        }
    }

    /**
     * @name OnAddNewRowForInitialAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strKey key in initial attribute.
     * @summary Adds a new roe in initial attribute.
     */
    OnAddNewRowForInitialAttribute(objContext, strKey) {
        let strElementType = objContext.state.InitialAttributeAvailableFieldType.find(objTempData => objTempData["cIsSelected"] === "Y")["vRadioType"];
        let objNewRow = {
            "vType": strElementType,
            "vValue": strElementType.toLowerCase() !== "image" && strElementType.toLowerCase() !== "htmlimage" ? "" : null
        };
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["InitialAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"],
                            [strKey]: [
                                ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey],
                                objNewRow
                            ]
                        }
                    }
                }
            }
        });
    }

    /**
     * @name OnAddNewRowForResourceAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strKey key in initial attribute.
     * @summary Adds a new roe in resource attribute.
     */
    OnAddNewRowForResourceAttribute(objContext, strKey) {
        let strElementType = objContext.state.ResourceAttributeAvailableFieldType.find(objTempData => objTempData["cIsSelected"] === "Y")["vRadioType"];
        let objNewRow = {
            "vType": strElementType,
            "vValue": strElementType.toLowerCase() !== "image" && strElementType.toLowerCase() !== "htmlimage" ? "" : null
        };
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["ResourceAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"],
                            [strKey]: [
                                ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey],
                                objNewRow
                            ]
                        }
                    }
                }
            }
        });
    }

    /**
     * @name OnAddNewRowForAnswerAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strKey key in answer attribute.
     * @summary Adds a new roe in resource attribute.
     */
    OnAddNewRowForAnswerAttribute(objContext, strKey) {
        let objNewRow = {
            "Min": {
                "vType": objContext.state.AnswerAttributeAvailableFieldType.find(objTempData => objTempData["cIsSelected"] === "Y")["vRadioType"],
                "vValue": ""
            },
            "Max": {
                "vType": objContext.state.AnswerAttributeAvailableFieldType.find(objTempData => objTempData["cIsSelected"] === "Y")["vRadioType"],
                "vValue": ""
            },
            "Tolerance": {
                "vType": "Number",
                "vValue": 0
            }
        };
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["AnswerAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"],
                            [strKey]: {
                                ["Min"]: [
                                    ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"],
                                    objNewRow["Min"]
                                ],
                                ["Max"]: [
                                    ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Max"],
                                    objNewRow["Max"]
                                ],
                                ["Tolerance"]: [
                                    ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Tolerance"],
                                    objNewRow["Tolerance"]
                                ]
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * @name RemoveRowForInitialAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strKey key in answer attribute.
     * @param {number} intElementIndex array index of the element.
     * @summary Removes the row from initial attribute.
     */
    RemoveRowForInitialAttribute(objContext, strKey, intElementIndex = null) {
        if (intElementIndex === null) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["InitialAttributeValue"]: {
                                ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"],
                                [strKey]: {
                                    ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey],
                                    ["vValue"]: null
                                }
                            }
                        }
                    }
                }
            });
        }
        else {
            let arrData = objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].filter((objTempData, intIndex) => intIndex !== intElementIndex);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["InitialAttributeValue"]: {
                                ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"],
                                [strKey]: [
                                    ...arrData
                                ]
                            }
                        }
                    }
                }
            });
        }
    }

    /**
     * @name RemoveRowForResourceAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strKey key in answer attribute.
     * @param {number} intElementIndex array index of the element.
     * @summary Removes the row from resource attribute.
     */
    RemoveRowForResourceAttribute(objContext, strKey, intElementIndex = null) {
        if (intElementIndex === null) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["ResourceAttributeValue"]: {
                                ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"],
                                [strKey]: {
                                    ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey],
                                    ["vValue"]: null
                                }
                            }
                        }
                    }
                }
            });
        }
        else {
            let arrData = objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].filter((objTempData, intIndex) => intIndex !== intElementIndex);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["ResourceAttributeValue"]: {
                                ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"],
                                [strKey]: [
                                    ...arrData
                                ]
                            }
                        }
                    }
                }
            });
        }
    }

    /**
     * @name RemoveRowForAnswerAttribute
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strKey key in answer attribute.
     * @param {number} intElementIndex array index of the element.
     * @summary Removes the row from answer attribute.
     */
    RemoveRowForAnswerAttribute(objContext, strKey, intElementIndex = null) {
        let arrMinData = objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].filter((objTempData, intIndex) => intIndex !== intElementIndex);
        let arrMaxData = objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Max"].filter((objTempData, intIndex) => intIndex !== intElementIndex);
        let arrToleranceData = objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Tolerance"].filter((objTempData, intIndex) => intIndex !== intElementIndex);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["AnswerAttributeValue"]: {
                            ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"],
                            [strKey]: {
                                "Min": arrMinData,
                                "Max": arrMaxData,
                                "Tolerance": arrToleranceData
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * @name HandleChangeTab
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}/null
     * @param {string} strChangeTabTo Change tab to initial/resource/answer
     * @summary Changes state to change tab.
     */
    HandleChangeTab(objContext, strChangeTabTo) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ShowTab": strChangeTabTo
            }
        });
    }

    /**
     * @name OnClickSaveForDefaultSidebar
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @summary Forms InitialAttributeValue key and invokes the 'UpdateElementJson' method of parent.
     */
    OnClickSaveForDefaultSidebar(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["cIsFirstLoad"]: "N"
        };
        console.log("Save frrom sidebar", objElementJson);
        objContext.props.PassedEvents.UpdateElementJson(objElementJson);
    }

    /**
     * @name GetDataFromCustomSidebar
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @summary Gets data from custom sidebar and forms it.
     * @returns {obejct} Element Json
     */
    GetDataFromCustomSidebar(objContext) {
        let objSidebarData = objContext.iFrameRef.current.contentWindow.GetSideBarData();
        console.log("SidebarData", objSidebarData);
        let blnHasResourceValues = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasResourceValues"] === "Y" ? true : false;
        let objInitialAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"] };
        let objResourceAttributeValue = blnHasResourceValues ? { ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"] } : null;
        let objAnswerAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"] };
        Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
            objInitialAttributeValue[strKey] = objSidebarData[strKey];
        });
        if (blnHasResourceValues) {
            Object.keys(objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                objResourceAttributeValue[strKey] = objSidebarData[strKey];
            });
        }
        Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
            objAnswerAttributeValue[strKey] = objSidebarData[strKey];
        });
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["InitialAttributeValue"]: objInitialAttributeValue,
                ["ResourceAttributeValue"]: objResourceAttributeValue,
                ["AnswerAttributeValue"]: objAnswerAttributeValue
            }
        };
        return objElementJson;
    }

    /**
     * @name OnClickSaveForCustomSidebar
     * @param {object} objContext {state, props, dispatch, AnimationWrapperSidebar_ModuleProcessor}
     * @summary Gathers data from the custom sidebar, forms InitialAttributeValue and AnswerAttributeValue keys and invokes the 'UpdateElementJson' method of parent.
     */
    OnClickSaveForCustomSidebar(objContext) {
        let objElementJson = objContext.AnimationWrapperSidebar_ModuleProcessor.GetDataFromCustomSidebar(objContext);
        objElementJson = {
            ...objElementJson,
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar/AnimationWrapperSidebarStyles.css"
        ];
    }
}

export default AnimationWrapperSidebar_ModuleProcessor;
