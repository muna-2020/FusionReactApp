//React Imports
import React, { useReducer, useRef, forwardRef } from 'react';
import { connect } from 'react-redux';

//BaseClasses 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import * as CMSPageContent_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_TestApplication/CMSPageContent_TestApplication_Hooks';
import CMSPageContent_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_TestApplication/CMSPageContent_TestApplication_ModuleProcessor';

//Container Template Controller
import ContainerTemplateController from "@root/Application/e.Editor/PC/Controller/ContainerTemplateController/ContainerTemplateController";

//import Editor's Component Controller
import ComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";

//Element Controller
import ElementController_TestApplication from "@root/Application/e.Editor/PC/Controller/ElementController/TestApplication/ElementController_TestApplication";

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name CMSPageContent_TestApplication
 * @param {any} props Component Props.
 * @summary Loads the page content for a Task.
 * @returns {any} CMSPageContent_TestApplication
 */
const CMSPageContent_TestApplication = (props) => {

    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSPageContent_TestApplication_Hooks.GetInitialState(props));

    const PageJsonRef = useRef({});

    //var ContainerRef = useRef(null);
    let objContext = {
        state,
        props,
        dispatch,
        "Ref": PageJsonRef,
        "StyleArray": useRef([]),
        "ModuleName": "CMSPageContent_TestApplication_" + props.PageJson["iPageId"],
        "ComponentRef": props.PageContentRef,
        "CMSPageContent_TestApplication_ModuleProcessor": new CMSPageContent_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSPageContent_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSPageContent_TestApplication_ModuleProcessor);


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSPageContent_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSPageContent_TestApplication_ModuleProcessor);

    /**
     * @name CMSPageContent_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSPageContent_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSPageContent_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary contains Container JSX
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objControllers = {
            "GetComponent": (strComponentName) => {
                return ComponentController.GetComponent(strComponentName);
            },
            "GetContainerTemplate": (intContainerTemplateId) => {
                return ContainerTemplateController.GetTemplate(intContainerTemplateId)
            },
            "GetElement": function (strComponentName) {
                return ElementController_TestApplication.GetComponent(strComponentName);
            }
        };
        let CMSContainer = objControllers.GetComponent("CMSContainer_TestApplication");
        return (
            <div className="workarea-relative" id={'activeworkarea_' + props.Mode + '_' + props.PageId}>
                {
                    state.PageJson && state.PageJson.Containers.length > 0 ?
                        state.PageJson.Containers.map(objContainerJson => {
                            let objContainerJsonWithAnswer, arrUserResponse, arrContainerEvaluationResult;
                            if (props.PageJsonWithAnswer && props.PageJsonWithAnswer !== null) {
                                objContainerJsonWithAnswer = props.PageJsonWithAnswer["Containers"].find(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"]);
                            }
                            if (props.UserAnswerJson && props.UserAnswerJson !== null && props.UserAnswerJson.length > 0 && props.UserAnswerJson.find(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"])) {
                                arrUserResponse = props.UserAnswerJson.find(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"])["Elements"];
                            }
                            if (props.TaskEvaluationResult) {
                                arrContainerEvaluationResult = props.TaskEvaluationResult.filter(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"]);
                            }
                            let objSubject;
                            if (props.SubjectForMainClient && props.SubjectForMainClient !== null && props.PageProperties && props.PageProperties !== null) {
                                objSubject = props.SubjectForMainClient.find(objTempData => objTempData["iSubjectId"] === props.PageProperties["iSubjectId"]);
                            }
                            return (
                                <div key={objContainerJson["iContainerId"]}>
                                    <PerformanceProfiler ComponentName={"CMSContainer_TestApplication_" + objContainerJson["iContainerId"]} JConfiguration={props.JConfiguration}>
                                        <CMSContainer
                                            {...(props.IsForServerRenderHtml ? props : {})}
                                            ContainerJson={objContainerJson}
                                            ContainerJsonWithAnswer={objContainerJsonWithAnswer}
                                            UserAnswerJson={arrUserResponse}
                                            ContainerEvaluationResult={arrContainerEvaluationResult}
                                            PageProperties={props.PageProperties}
                                            SubjectDetails={objSubject}
                                            ref={objContainerJson.Ref}
                                            ComponentController={objControllers}
                                            FolderID={props.FolderID}
                                            PageId={props.PageId}
                                            ContainerId={objContainerJson["iContainerId"]}
                                            Mode={props.Mode}
                                            JConfiguration={props.JConfiguration}>
                                        </CMSContainer>
                                    </PerformanceProfiler>
                                </div>
                            );
                        })
                        : <div />
                }
            </div>
        );
    };

    return GetContent();
};

/**
 * @name ConectedPageContent
 * @summary this map store properties to component props.
 */
let ConectedPageContent = connect(Base_Hook.MapStoreToProps(CMSPageContent_TestApplication_ModuleProcessor.StoreMapList()))(CMSPageContent_TestApplication);

export default ConectedPageContent;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSPageContent_TestApplication_ModuleProcessor; 