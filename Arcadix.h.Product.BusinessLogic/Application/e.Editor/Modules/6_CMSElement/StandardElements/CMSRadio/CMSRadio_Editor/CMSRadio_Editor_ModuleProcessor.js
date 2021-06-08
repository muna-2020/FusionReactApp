//React imports
import React from 'react';

//Module related fies.
import CMSRadio_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/CMSRadio_Editor_ContextMenu";
import * as CMSRadio_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/CMSRadio_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSRadio_Editor_ModuleProcessor
 * @summary Contains the Radio's editor version module specific methods.
 * */
class CMSRadio_Editor_ModuleProcessor extends CMSRadio_Editor_ContextMenu {

    /**
     * @name ChangeSelection
     * @param {object} objContext {props, state, dispatch, CMSRadio_Editor_ModuleProcessor}
     * @param {object} objValue Radio Value
     * @summary This method will be called when selection is changed.
     */
    ChangeSelection(objContext, objValue) {
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementRadioValueId"] === objValue["iElementRadioValueId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "Y"
                };
            }
            else {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"
                };
            }
        })];
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                }
            }
        });
    }

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary this collect the points from Element json and return.
     * @ruturns {object} objPoint {CA, WA, NA, isNACommon}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "CA": objContext.state.ElementJson["vElementJson"]["dCorrectPoint"],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "SidebarName": "RadioPointOverrideSidebar"
        };
        objPoint.Points = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue.cIsCorrectValue !== "Y").map(objTempValue => {
            return {
                "iDisplayOrder": objTempValue["iDisplayOrder"],
                "ValueId": objTempValue["iElementRadioValueId"],
                "WA": objTempValue["dWrongPoint"] ? objTempValue["dWrongPoint"] : 0
            }
        });
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objPoints points for the element {CA, WA, NA, isNACommon}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "Y",
                "dCorrectPoint": objPoints.CA,
                "dNotAnsweredPoint": objPoints.NA,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objValue => {
                    return {
                        ...objValue,
                        "dWrongPoint": objPoints.Points.find(objTempPoint => objValue["iElementRadioValueId"] === objTempPoint["ValueId"])["WA"]
                    };
                })
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch}.
     * @summary Removes overriden points.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "N",
                "dCorrectPoint": 0,
                "dNotAnsweredPoint": 0,
                "Values": objContext.state.ElementJson["vElementJson"]["Values"].map(objValue => {
                    return {
                        ...objValue,
                        "dWrongPoint": 0
                    }
                })
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ChangeOrientation
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, strValue: "Y"or"N"}
     * @summary Changes the orientation(Horizontal/Vertical).
     */
    ChangeOrientation(objParams) {
        let { objContext, strValue } = objParams;
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsHorizontal"]: strValue
                    }
                }
            }
        });
    }

    /**
     * @name InsertAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary add a new row. objRadioValue is activeRadio
     */
    InsertAbove(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let iElementTextId = UniqueId.GetUniqueId();
        let objDefaultRadioValueObject = CMSRadio_Editor_MetaData.GetDefaultRadioValueObject(objContext, iElementTextId);
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intInsertIndex = arrValues.findIndex(objTempValue => objTempValue['iElementRadioValueId'] === objValue['iElementRadioValueId']) - 1;
        let arrNewValues = [...arrValues.slice(0, intInsertIndex + 1), { ...objDefaultRadioValueObject }, ...arrValues.slice(intInsertIndex + 1, arrValues.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["vElementJson"]: {
                    ...objTextElementJson["vElementJson"],
                    ["vText"]: objTextResource["Default_Text"]
                },
                ["Ref"]: React.createRef()
            }
        ];
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                ["TextElements"]: arrNewTextElements
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name InsertBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary add a new row below the active row. objValue is activeRadio
     */
    InsertBelow(objParams) {
        let { objContext, objValue, objTextResource } = objParams;
        let iElementTextId = UniqueId.GetUniqueId();
        let objDefaultRadioValueObject = CMSRadio_Editor_MetaData.GetDefaultRadioValueObject(objContext, iElementTextId);
        let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"];
        let intInsertIndex = arrValues.findIndex(objTempValue => objTempValue['iElementRadioValueId'] === objValue['iElementRadioValueId']);
        let arrNewValues = [...arrValues.slice(0, intInsertIndex + 1), { ...objDefaultRadioValueObject }, ...arrValues.slice(intInsertIndex + 1, arrValues.length)];
        let arrNewTextElements = [
            ...objContext.state.ElementJson["vElementJson"]["TextElements"],
            {
                ...objTextElementJson,
                ["vElementJson"]: {
                    ...objTextElementJson["vElementJson"],
                    ["vText"]: objTextResource["Default_Text"]
                },
                ["Ref"]: React.createRef()
            }
        ];
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                ["TextElements"]: arrNewTextElements
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name Remove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary remove active obj from the Values. objValue is activeRadio.
     */
    Remove(objParams) {
        let { objContext, objValue } = objParams;
        let arrNewValues = [...objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementRadioValueId"] !== objValue["iElementRadioValueId"])];
        let arrNewTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempElement => objTempElement["iElementId"] !== objValue["iElementTextId"])];
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrNewValues),
                ["TextElements"]: arrNewTextElements
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
    * @name MoveUp
    * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, objValue: checkbox value object}
    * @summary move the Radio value up
    */
    MoveUp(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveObjIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue['iElementRadioValueId'] === objValue['iElementRadioValueId']);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intActiveObjIndex, intActiveObjIndex - 1))
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name MoveDown
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary move the Radio value down
     */
    MoveDown(objParams) {
        let { objContext, objValue } = objParams;
        let intActiveObjIndex = objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue['iElementRadioValueId'] === objValue['iElementRadioValueId']);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: BaseCMSElement.UpdateDisplayOrder(BaseCMSElement.ImmutableSwap(objContext.state.ElementJson["vElementJson"]["Values"], intActiveObjIndex, intActiveObjIndex + 1))
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name AlignValue
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}, objValue: checkbox value object}
     * @summary Change the alignment of the radio value.
     */
    AlignValue(objParams) {
        let { objContext, objValue, Align } = objParams;
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].map((objTempValue) => {
            if (objTempValue["iElementRadioValueId"] === objValue["iElementRadioValueId"]) {
                return {
                    ...objTempValue,
                    ["vVerticalAlign"]: Align
                };
            }
            else {
                return {
                    ...objTempValue
                };
            }
        });
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: arrNewValues
            }
        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RandomDisplay
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}}
     * @summary Sets the random display for test application version.
     */
    RandomDisplay(objParams) {
        let { objContext } = objParams;
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cIsRandomDisplay"]: objContext.state.ElementJson["vElementJson"]["cIsRandomDisplay"] === "N" ? "Y" : "N"
            }

        };
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name LookAndFeel
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    LookAndFeel(objParams) {
        let { objContext } = objParams;
        objContext.CMSRadio_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Data": {
                "ElementJson": { ...objContext.state.ElementJson },
                "Skins": CMSRadio_Editor_MetaData.GetSkins()
            },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                    objContext.CMSRadio_Editor_ModuleProcessor.CloseSidebar();
                },
                "Preview": (objNewElementJson) => {
                    objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objNewElementJson } });
                },
                "CloseSidebar": (objData) => {
                    objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objData.ElementJson } });
                    objContext.CMSRadio_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "LookAndFeelSidebar",
                "Header": objContext.CMSRadio_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarHeader"),
                "Title": objContext.CMSRadio_Editor_ModuleProcessor.TextFormatter(objTextResource, "LookNFeel_SidebarTitle"),
                "Status": 1,
                "AutoHide": true
            }
        });
    }

    /**
     * @name Likert
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    Likert(objParams) {
        let { objContext, objTextResource } = objParams;
        let objElementJson;
        if (objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "N") {
            let intElementTextId_Header = UniqueId.GetUniqueId();
            let intElementTextId_Footer = UniqueId.GetUniqueId();
            let objHeaderTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Header, objTextResource["DefaultLikertHeaderText"]);
            let objFooterTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Footer, objTextResource["DefaultLikertFooterText"]);
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                        if (x["vHeaderType"] === "TextLeft") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Header
                            };
                        }
                        else if (x["vHeaderType"] === "TextRight") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Footer
                            };
                        }
                        else {
                            return {
                                ...x
                            };
                        }
                    }),
                    ["cIsHorizontal"]: "Y",
                    ["cIsLikert"]: "Y",
                    ["cShowHeaderFooter"]: "Y",
                    ["TextElements"]: [
                        ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                        {
                            ...objHeaderTextElementJson,
                            ["Ref"]: React.createRef()
                        },
                        {
                            ...objFooterTextElementJson,
                            ["Ref"]: React.createRef()
                        }
                    ]
                }
            };
        }
        else {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrHeaderValues = objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                if (x["vHeaderType"] === "TextLeft" || x["vHeaderType"] === "TextRight") {
                    arrTextElements = arrTextElements.filter(y => y["iElementId"] !== x["iElementTextId"]);
                    return {
                        ...x,
                        ["iElementTextId"]: null
                    };
                }
                else {
                    return {
                        ...x
                    };
                }
            });
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["cIsHorizontal"]: "N",
                    ["cIsLikert"]: "N",
                    ["cShowHeaderFooter"]: "N",
                    ["TextElements"]: arrTextElements
                }
            };
        }
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ShowHeaderFooter
     * @param {object} objParams {objContext: {state, props, dispatch, CMSRadio_Editor_ModuleProcessor}}
     * @summary Opens the LookAndFeel sidebar.
     */
    ShowHeaderFooter(objParams) {
        let { objContext, objTextResource } = objParams;
        let objElementJson;
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "N") {
            let intElementTextId_Header = UniqueId.GetUniqueId();
            let intElementTextId_Footer = UniqueId.GetUniqueId();
            let objHeaderTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Header, objTextResource["DefaultLikertHeaderText"]);
            let objFooterTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId_Footer, objTextResource["DefaultLikertFooterText"]);
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                        if (x["vHeaderType"] === "TextLeft") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Header
                            };
                        }
                        else if (x["vHeaderType"] === "TextRight") {
                            return {
                                ...x,
                                ["iElementTextId"]: intElementTextId_Footer
                            };
                        }
                        else {
                            return {
                                ...x
                            };
                        }
                    }),
                    ["cShowHeaderFooter"]: "Y",
                    ["TextElements"]: [
                        ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                        {
                            ...objHeaderTextElementJson,
                            ["Ref"]: React.createRef()
                        },
                        {
                            ...objFooterTextElementJson,
                            ["Ref"]: React.createRef()
                        }
                    ]
                }
            };
        }
        else {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrHeaderValues = objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(x => {
                if (x["vHeaderType"] === "TextLeft" || x["vHeaderType"] === "TextRight") {
                    arrTextElements = arrTextElements.filter(y => y["iElementId"] !== x["iElementTextId"]);
                    return {
                        ...x,
                        ["iElementTextId"]: null
                    };
                }
                else {
                    return {
                        ...x
                    };
                }
            });
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["cShowHeaderFooter"]: "N",
                    ["TextElements"]: arrTextElements
                }
            };
        }
        objContext.CMSRadio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSRadio/CMSRadioStyles.css"
        ];
    }
}

export default CMSRadio_Editor_ModuleProcessor;