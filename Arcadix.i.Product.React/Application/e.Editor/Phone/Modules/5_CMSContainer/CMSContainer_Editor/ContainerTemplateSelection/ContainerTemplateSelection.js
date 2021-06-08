// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module realted fies.
import * as ContainerTemplateSelection_Hook from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection_BusinessLogic/ContainerTemplateSelection_Hooks';
import ContainerTemplateSelection_ModuleProcessor from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection_BusinessLogic/ContainerTemplateSelection_ModuleProcessor";
import * as ContainerTemplateSelection_MetaData from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection_BusinessLogic/ContainerTemplateSelection_MetaData";

/**
 * @name ContainerTemplateSelection
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary Container template selection popup.
 * @returns {any} template JSX
 */
const ContainerTemplateSelection = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ContainerTemplateSelection_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "ModuleName":"ContainerTemplateSelection", ["ContainerTemplateSelection_ModuleProcessor"]: new ContainerTemplateSelection_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in ContainerTemplateSelection_Hook, that contains all the custom hooks.
    * @returns null
    */
    ContainerTemplateSelection_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ContainerTemplateSelection_ModuleProcessor.Initialize(objContext, objContext.ContainerTemplateSelection_ModuleProcessor);

    /**
     * @name SelectContainer
     * @param {object} objContext {props, state, dispatch} 
     * @param {int} intTemplateId selected template id
     * @summary update the active container on selecting container
     */
    const SelectContainer = async (objContext, intTemplateId) => {
        await ContainerTemplateSelection_MetaData.GetContainerWithDefaultElements(intTemplateId, (objContainerJson) => {
            objContext.dispatch({
                type : "SET_STATE",
                payload : {
                "activeContainer": objContainerJson
                }
            });
        });
    }

    /**
     * @name HandleSelectedTabItem
     * @summary this handle the selected container item. 
     */
    const HandleSelectedTabItem = async (objContext, intTabIndex) => {
        var intContainerTemplateId = objContext.state.arrTabInfo[intTabIndex]["TabContent"].length > 0 ? objContext.state.arrTabInfo[intTabIndex]["TabContent"][0]["iContainerTemplateId"] : "";
        objContext.dispatch({ "type": "SET_STATE", "payload": { "intSelectedTabIndex": intTabIndex, "intSelectedTemplateId": intContainerTemplateId } });
        await SelectContainer(objContext, intContainerTemplateId);
    }

    /**
     * @name GetTemplateImageAndDescription
     * @param {object} objTextResource text resource object 
     * @summary filters template list based on the selected tab index.
     * @returns {any} JSX of the template list.
     */
    const GetTemplateImageAndDescription = (objTextResource) => {
        var arrContainerTemplate = [];
        var arrContainerDescription = [];
        if (objContext.state.arrTabInfo != undefined) {
            objContext.state.arrTabInfo[objContext.state.intSelectedTabIndex].TabContent.map((objTemplate) => {
                arrContainerTemplate = [...arrContainerTemplate,
                <div key={"_container" + objTemplate["iContainerTemplateId"]} class="image-block" onClick={() => { objContext.ContainerTemplateSelection_ModuleProcessor.HandleContainerSelectedItem(objContext, objTemplate["iContainerTemplateId"]) }}>
                    <img className={objContext.state.intSelectedTemplateId === objTemplate["iContainerTemplateId"] ? "active" : ""}
                        onClick={async () => { 
                          await SelectContainer(objContext, objTemplate["iContainerTemplateId"]); 
                        }}
                        src={props.JConfiguration.EditorSkinPath + "/Images/Common/ContainerTemplate_" + objTemplate["iContainerTemplateId"] + ".gif"}
                        alt={objTextResource[`ContainerTemplateName_${objTemplate["iContainerTemplateId"]}`]} />
                </div>
                ];

                arrContainerDescription = [...arrContainerDescription,
                <div key={"_template" + objTemplate["iContainerTemplateId"]} style={objContext.state.intSelectedTemplateId === objTemplate["iContainerTemplateId"] ? { "display": "block" } : { "display": "none" }} >
                    <h3>
                        {objTextResource[`ContainerTemplateName_${objTemplate["iContainerTemplateId"]}`]}
                    </h3>
                    <p>
                        {objTextResource[`ContainerTemplateDescription_${objTemplate["iContainerTemplateId"]}`]}
                    </p>
                </div>
                ];
            });
        }
        return (
            <div class="cts-flex">
                <div class="cts-left">
                    {arrContainerTemplate}
                </div>
                <div class="cts-right">
                    {arrContainerDescription}
                </div>
            </div>
        );
    };

    /**
     * @name GetContent
     * @summary forms tab and template details.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        //let objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection"].Data[0]["ContainerTemplateSelection"];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection", objContext.props);
        return (
            <React.Fragment>
                <div class="ContainerTemplateSelection">
                    <div class="container-template-selection">                        
                        <div class="cts-navigation">
                            <ul>
                                {objContext.state.arrTabInfo != undefined?
                                    objContext.state.arrTabInfo.map((objTab, index) => {
                                    return (
                                        <li key={"_tab" + parseInt(objTab["TabIndex"])} id={`tab_${index}`} className={objContext.state.intSelectedTabIndex === index ? "active" : ""}
                                            onClick={async () => { await HandleSelectedTabItem(objContext, index) }}>
                                            <span>
                                                {
                                                    Localization.TextFormatter(objTextResource, `TabTitle_${index}`)
                                                }
                                            </span>
                                            <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/closeWindow.png"} alt="" />
                                        </li>
                                        );
                                    }) : <React.Fragment/>}
                            </ul>
                        </div>
                        {objTextResource != undefined && objTextResource!=null ? GetTemplateImageAndDescription(objTextResource) : <React.Fragment />}
                    </div>
                </div>

                <div class="ContainerTemplateSelection-footer">
                    <div class="button btn" onClick={() => { objContext.ContainerTemplateSelection_ModuleProcessor.handleOnClick(objContext); }}>
                        {Localization.TextFormatter(objTextResource, "OkButtonText")}
                    </div>
                    <div class="button btn" onClick={(event) => { objContext.ContainerTemplateSelection_ModuleProcessor.RemovePopUp(objContext, event); }}>
                        {Localization.TextFormatter(objTextResource, "CloseButtonText")}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return (props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment>);
};

export default connect(CockpitBase_Hook.MapStoreToProps(ContainerTemplateSelection_ModuleProcessor.StoreMapList()))(ContainerTemplateSelection);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ContainerTemplateSelection_ModuleProcessor; 