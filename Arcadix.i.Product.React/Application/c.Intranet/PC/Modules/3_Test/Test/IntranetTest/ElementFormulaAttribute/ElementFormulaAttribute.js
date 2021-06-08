//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as ElementFormulaAttribute_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute_Hook';
import ElementFormulaAttribute_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute_ModuleProcessor';

/**
 * @name ElementFormulaAttribute
 * @param {object} props props
 * @summary This component displays the ElementFormulaAttribute data in Table.
 * @returns {object} React.Fragement that encapsulated the display Table with ElementFormulaAttribute details.
 */
const ElementFormulaAttribute = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ElementFormulaAttribute_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ElementFormulaAttribute_ModuleProcessor"]: new ElementFormulaAttribute_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ElementFormulaAttribute_ModuleProcessor.Initialize(objContext, objContext.ElementFormulaAttribute_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ElementFormulaAttribute_Hook, that contains all the custom hooks.
     * @returns null
     */
    ElementFormulaAttribute_Hook.Initialize(objContext);

    /**
     * @name GetTemplate
     * @param {object} objContext context object
     * @summary Initialize method call in ElementFormulaAttribute_Hook, that contains all the custom hooks.
     * @returns null
     */
    function GetTemplate(objTextResource) {
        let arrElementAttrbutefilterData = state.arrElementAttributeData.filter(obj => obj["cIsForWholeTask"] == "Y")//&& obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClient
        let arrDefaultElementAttributeData = arrElementAttrbutefilterData.filter(obj => obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId && obj["cIsDefault"] == "Y")
        let arrElementAttrbutePartialEvalutionData = state.arrElementAttributeData.filter(obj => obj["cIsForWholeTask"] == "N")//&& obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClient
        let arrDefaultPartialElementAttributeData = arrElementAttrbutePartialEvalutionData.filter(obj => obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId && obj["cIsDefault"] == "Y")
        let arrFullElementAttributeData = new Array;
        let arrPartialElementAttributeData = new Array;
        if (arrDefaultElementAttributeData.length != 0) {
            arrFullElementAttributeData = arrDefaultElementAttributeData
            arrElementAttrbutefilterData.map((objElementAttrbutefilterData) => {
                if (objElementAttrbutefilterData["uElementFormulaAttributeTemplateId"] != arrDefaultElementAttributeData[0]["uElementFormulaAttributeTemplateId"] && objElementAttrbutefilterData["cIsDeleted"] == "N") {
                    arrFullElementAttributeData.push(objElementAttrbutefilterData);
                }
            })
        }
        else {
            arrFullElementAttributeData = arrElementAttrbutefilterData;
        }
        if (arrDefaultPartialElementAttributeData.length != 0) {
            arrPartialElementAttributeData = arrDefaultPartialElementAttributeData
            arrElementAttrbutePartialEvalutionData.map((objElementAttrbutefilterData) => {
                if (objElementAttrbutefilterData["uElementFormulaAttributeTemplateId"] != arrDefaultPartialElementAttributeData[0]["uElementFormulaAttributeTemplateId"] && objElementAttrbutefilterData["cIsDeleted"] == "N") {
                    arrPartialElementAttributeData.push(objElementAttrbutefilterData);
                }
            })
        }
        else {
            arrPartialElementAttributeData = arrElementAttrbutePartialEvalutionData;
        }


        return (
            <div className="radio-row-block">
                <div className="radio-row">
                    <span>{Localization.TextFormatter(objTextResource, "Full Evalution")}</span>
                    {
                        arrFullElementAttributeData.map((objElementAttribute) => {
                            if (objElementAttribute["cIsForWholeTask"] == "Y" && objElementAttribute["iMainClientId"] == 0 && arrDefaultElementAttributeData["length"] == 0) {
                                return (
                                    <span>
                                        <span className="data-cell">
                                            <input id={"FullEvalution"}
                                                type="radio"
                                                onChange={() => { objContext.ElementFormulaAttribute_ModuleProcessor.CheckBoxClickHandler("Y", objElementAttribute, objContext) }}
                                                checked={objContext.state.objselectedElementAttribute["uElementFormulaAttributeTemplateId"] == objElementAttribute["uElementFormulaAttributeTemplateId"] && state.strcIsForWholeTask == "Y"} />
                                        </span>
                                        <span>{Localization.TextFormatter(objTextResource, "Default")}</span>
                                    </span>
                                )
                            }
                            else if (objElementAttribute["cIsForWholeTask"] == "Y" && objElementAttribute["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId) {
                                return (
                                    <span>
                                        <span className="data-cell">
                                            <input id={"FullEvalution"}
                                                type="radio"
                                                onChange={() => { objContext.ElementFormulaAttribute_ModuleProcessor.CheckBoxClickHandler("Y", objElementAttribute, objContext) }}
                                                checked={objContext.state.objselectedElementAttribute["uElementFormulaAttributeTemplateId"] == objElementAttribute["uElementFormulaAttributeTemplateId"] && state.strcIsForWholeTask == "Y"} />
                                        </span>
                                        <span>{
                                            objElementAttribute["cIsDefault"] == "Y" ? Localization.TextFormatter(objTextResource, "Default") :
                                                objElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"].map((objTemplateData) => {
                                                    return objTemplateData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId ? objTemplateData["vTemplateName"] : ""
                                                })
                                        }</span>
                                        <span>{
                                            objElementAttribute["cIsDefault"] == "Y" ? "" : <img src={objContext.props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Icon_Close.png"} onClick={() => objContext.ElementFormulaAttribute_ModuleProcessor.OpenDeletePopup(objContext, objElementAttribute)}></img>
                                        }
                                        </span>
                                    </span>
                                )
                            }
                        })
                    }
                </div>
                <div className="radio-row">
                    <span>{Localization.TextFormatter(objTextResource, "Partial Evalution")}</span>
                    {
                        //arrElementAttrbutePartialEvalutionData != undefined ?
                        arrPartialElementAttributeData.map((objElementAttribute) => {
                            if (objElementAttribute["cIsForWholeTask"] == "N" && objElementAttribute["iMainClientId"] == 0 && arrDefaultPartialElementAttributeData["length"] == 0) {
                                return (
                                    <div>
                                        <span className="data-cell">
                                            <input id={"FullEvalution"}
                                                type="radio"
                                                onChange={() => { objContext.ElementFormulaAttribute_ModuleProcessor.CheckBoxClickHandler("N", objElementAttribute, objContext) }}
                                                checked={objContext.state.objselectedElementAttribute["uElementFormulaAttributeTemplateId"] == objElementAttribute["uElementFormulaAttributeTemplateId"] && state.strcIsForWholeTask == "N"} />
                                        </span>
                                        <span>{Localization.TextFormatter(objTextResource, "Default")}</span>
                                    </div>
                                )
                            }
                            else if (objElementAttribute["cIsForWholeTask"] == "N" && objElementAttribute["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId) {
                                return (
                                    <div>
                                        <span className="data-cell">
                                            <input id={"FullEvalution"}
                                                type="radio"
                                                onChange={() => { objContext.ElementFormulaAttribute_ModuleProcessor.CheckBoxClickHandler("N", objElementAttribute, objContext) }}
                                                checked={objContext.state.objselectedElementAttribute["uElementFormulaAttributeTemplateId"] == objElementAttribute["uElementFormulaAttributeTemplateId"] && state.strcIsForWholeTask == "N"} />
                                        </span>
                                        <span>{
                                            objElementAttribute["cIsDefault"] == "Y" ? Localization.TextFormatter(objTextResource, "Default") :
                                                objElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"].map((objTemplateData) => {
                                                    return objTemplateData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId ? objTemplateData["vTemplateName"] : ""
                                                })
                                        }</span>
                                        <span>{
                                            objElementAttribute["cIsDefault"] == "Y" ? "" : <img src={objContext.props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Icon_Close.png"} onClick={() => objContext.ElementFormulaAttribute_ModuleProcessor.OpenDeletePopup(objContext, objElementAttribute)}></img>
                                        }
                                        </span>
                                    </div>
                                )
                            }
                        })
                    }

                </div>
            </div>
        )
    }

    /**
     * @name GetRuleDescription
     * @param {object} objContext context object
     * @summary Initialize method call in ElementFormulaAttribute_Hook, that contains all the custom hooks.
     * @returns null
     */
    function GetRuleDescription(objTextResource) {
        return (
            <table className="efa-rules-table">
                {
                    state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementRule"].map((objResultAttribute) => {
                        return (
                            Localization.TextFormatter(objTextResource, "Element_Type").map((objElementType) => {
                                if (objResultAttribute["iElementTypeId"] == objElementType["iElementTypeId"]) {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{objElementType["vElementTypeName"]}</td>
                                                <td>
                                                    <div className="radio-button-flex">
                                                        <input id={"Option1"}
                                                            type="radio"
                                                            onChange={() => { objContext.ElementFormulaAttribute_ModuleProcessor.OnRuleDescriptionClick(1, objResultAttribute, objContext) }}
                                                            checked={objResultAttribute["iElementRuleId"] == 1} />
                                                        <span>{Localization.TextFormatter(objTextResource, "Element_Rule")[0]["vElement_Rule"]}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="radio-button-flex">
                                                        <input id={"Option2"}
                                                            type="radio"
                                                            onChange={() => { objContext.ElementFormulaAttribute_ModuleProcessor.OnRuleDescriptionClick(2, objResultAttribute, objContext) }}
                                                            checked={objResultAttribute["iElementRuleId"] == 2} />
                                                        <span>{Localization.TextFormatter(objTextResource, "Element_Rule")[1]["vElement_Rule"]}</span>
                                                    </div>
                                                </td>

                                            </tr>
                                        </tbody>
                                    )
                                }
                            }))
                    })
                }
            </table>
        )
    }

    /**
     * @name GetTable
     * @param {object} objContext context object
     * @summary Initialize method call in ElementFormulaAttribute_Hook, that contains all the custom hooks.
     * @returns null
     */
    function GetTable(objTextResource) {
        return (
            <FillHeight
                id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: ["MasterHeader", "BreadCrumb", "ElementAttributeContent"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <table className="efa-formula-table">
                    <thead>
                        <tr>
                            {state.strcIsForWholeTask == "N" ? <td className="data-cell">{Localization.TextFormatter(objTextResource, "Elementtype")}</td> : ""}
                            <td>{Localization.TextFormatter(objTextResource, "ElementObjectsCorrect")}</td>
                            <td>{Localization.TextFormatter(objTextResource, "ElementObjectsWrong")}</td>
                            <td>{Localization.TextFormatter(objTextResource, "ElementNotAnswered")}</td>
                            {state.strcIsForWholeTask == "N" ? <td className="data-cell">{Localization.TextFormatter(objTextResource, "Elementtype")}</td> : ""}
                            {state.strcIsForWholeTask == "N" ? <td className="data-cell">{Localization.TextFormatter(objTextResource, "Elementtype")}</td> : ""}
                        </tr>
                    </thead>
                    {
                        <tbody>
                            {
                                state.strcIsForWholeTask == "N" ?
                                    Localization.TextFormatter(objTextResource,"Element_Type")?.map((objElementType) => {
                                        return (
                                            state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute"].map((objFormulatAttribute) => {
                                                if (objFormulatAttribute["iElementTypeId"] == objElementType["iElementTypeId"]) {
                                                    return (
                                                        <tr>
                                                            <td>{objElementType["vElementTypeName"]}</td>
                                                            <td>
                                                                <input
                                                                    id="dElementObjectsCorrect"
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        objContext.ElementFormulaAttribute_ModuleProcessor.HandleChange("dElementObjectsCorrect", objFormulatAttribute, e.target.value, objContext);
                                                                    }}
                                                                    value={objFormulatAttribute["dElementObjectsCorrect"]}
                                                                />

                                                            </td>
                                                            <td> <input
                                                                id="dElementObjectsWrong"
                                                                type="text"
                                                                onChange={(e) => {
                                                                    objContext.ElementFormulaAttribute_ModuleProcessor.HandleChange("dElementObjectsWrong", objFormulatAttribute, e.target.value, objContext);
                                                                }}
                                                                value={objFormulatAttribute["dElementObjectsWrong"]}
                                                            />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    id="dElementObjectsNotAnswered"
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        objContext.ElementFormulaAttribute_ModuleProcessor.HandleChange("dElementObjectsNotAnswered", objFormulatAttribute, e.target.value, objContext);
                                                                    }}
                                                                    value={objFormulatAttribute["dElementObjectsNotAnswered"]}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    id="dUpperBoundValue"
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        objContext.ElementFormulaAttribute_ModuleProcessor.HandleChange("dUpperBoundValue", objFormulatAttribute, e.target.value, objContext);
                                                                    }}
                                                                    value={objFormulatAttribute["dUpperBoundValue"]}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    id="dLowerBoundValue"
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        objContext.ElementFormulaAttribute_ModuleProcessor.HandleChange("dLowerBoundValue", objFormulatAttribute, e.target.value, objContext);
                                                                    }}
                                                                    value={objFormulatAttribute["dLowerBoundValue"]}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            }))
                                    }) :
                                    <tr>
                                        <td style={{ backgroundColor: 'white' }}>
                                            <input
                                                id="dTaskCorrectPoints"
                                                type="text"
                                                onChange={(e) => {
                                                    objContext.ElementFormulaAttribute_ModuleProcessor.FullEvalutionHandleChange("dTaskCorrectPoints", state.objselectedElementAttribute, e.target.value, objContext);
                                                }}
                                                value={state.objselectedElementAttribute["dTaskCorrectPoints"]}
                                            />

                                        </td>
                                        <td > <input
                                            id="dTasksWrongPoints"
                                            type="text"
                                            onChange={(e) => {
                                                objContext.ElementFormulaAttribute_ModuleProcessor.FullEvalutionHandleChange("dTasksWrongPoints", state.objselectedElementAttribute, e.target.value, objContext);
                                            }}
                                            value={state.objselectedElementAttribute["dTasksWrongPoints"]}
                                        />
                                        </td>
                                        <td>
                                            <input
                                                id="dTaskNotAnsweredPoints"
                                                type="text"
                                                onChange={(e) => {
                                                    objContext.ElementFormulaAttribute_ModuleProcessor.FullEvalutionHandleChange("dTaskNotAnsweredPoints", state.objselectedElementAttribute, e.target.value, objContext);
                                                }}
                                                value={state.objselectedElementAttribute["dTaskNotAnsweredPoints"]}
                                            />
                                        </td>
                                    </tr>
                            }
                        </tbody>

                    }
                </table>
            </FillHeight>
        )
    }

    /**
     * JSX for ElementFormulaAttribute
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", objContext.props) ?? {};
        return (
            <div className="element-formula-attribute">
                <div id="ElementAttributeContent">
                    {GetTemplate(objTextResource)}
                    <div className="efa-title">
                        Element Rules Description
                 </div>
                    {GetRuleDescription(objTextResource)}
                    <div className="efa-title">
                        Element Formula Description
                </div>
                </div>
                <div>{GetTable(objTextResource)}</div>

            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(ElementFormulaAttribute_ModuleProcessor.StoreMapList()))(ElementFormulaAttribute);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ElementFormulaAttribute_ModuleProcessor;