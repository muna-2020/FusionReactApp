//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';


//Module related fies.
import * as Interpretation_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_Hook';
import Interpretation_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_ModuleProcessor";

//Components used in module.
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import AngleUpImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_up.svg?inline';


/**
 * @name Interpretation
 * @param {object} props props
 * @summary This component is the summary of the pupil to check under which category they belong.
 * @returns {object} React.Fragement that encapsulated Interpretation divs.
 */
const Interpretation = (props) => {

    const accordionContentRefs = useRef([]);

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Interpretation_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used
     **/
    let objContext = { state, props, dispatch, ["ModuleName"]: "Interpretation", ["Interpretation_ModuleProcessor"]: new Interpretation_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Interpretation_ModuleProcessor.Initialize(objContext, objContext.Interpretation_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     **/
    Interpretation_Hook.Initialize(objContext);


    /**
     * @name GetContent
     * @param {any} props
     * @summary Returns the required jsx for component
     * @return {*} jsx
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/Interpretation", props);
        let arrSubjects = [];
        let arrSubSubject = [];
        if (DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            arrSubjects = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y" });
        }
        if (DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            arrSubSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === state.intSelectedSubjectId });
        }

        let iSubSubjectId = state.intSelectedSubSubjectId ? state.intSelectedSubSubjectId : arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : -1;
        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + iSubSubjectId).Data;
        //let arrFeedbackThresholdTopic = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + iSubSubjectId).Data;
        //let arrFeedbackThresholdTopicDescription = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + iSubSubjectId).Data;

        return (
            <div className="Interpretation" id="InterpretationComponent">
                <div className="top-head-padd" id="InterpretationHeader">
                    <div className="top-head">
                        <div className="top-head-left">
                            <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}:</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"Interpretation_Subject"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"Interpretation_Subject"}
                                        Meta={objContext.Interpretation_ModuleProcessor.GetSubjectDropdownMetaData()}
                                        Data={objContext.Interpretation_ModuleProcessor.GetSubjectDropdownData(objContext, arrSubjects)}
                                        Resource={objContext.Interpretation_ModuleProcessor.GetResourceData()}
                                        Events={objContext.Interpretation_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'SubSubject')}: </span>
                            <div className="content-dropdown competence-dropdown">
                                <PerformanceProfiler ComponentName={"Interpretation_SubSubject"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"Interpretation_SubSubject"}
                                        Meta={objContext.Interpretation_ModuleProcessor.GetSubSubjectDropdownMetaData()}
                                        Data={objContext.Interpretation_ModuleProcessor.GetSubSubjectDropdownData(objContext, arrSubSubject)}
                                        Resource={objContext.Interpretation_ModuleProcessor.GetResourceData()}
                                        Events={objContext.Interpretation_ModuleProcessor.GetSubSubjectDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="interpretation-content">
                    <span className="head" id="ContentHead">
                        {Localization.TextFormatter(objTextResource, 'SubSubject')}:
                    </span>

                    <div className="interpretation-content-img" id="InterpretationImg">
                        <svg enableBackground="new 0 0 475 130" height="130px" id="Layer_1" version="1.1" viewBox="0 0 475 130" width="475px" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                            <rect fill="#F28A9B" height="56" stroke="#41719C" stroke-miterlimit="10" width="450" x="12.5" y="34.5" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="12.5" x2="12.5" y1="91" y2="111" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="462" x2="13" y1="94.5" y2="94.5" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="87.5" x2="87.5" y1="91" y2="111" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="162.5" x2="162.5" y1="91" y2="111" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="237.5" x2="237.5" y1="91" y2="111" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="312.5" x2="312.5" y1="91" y2="111" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="387.5" x2="387.5" y1="91" y2="111" />
                            <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="462.5" x2="462.5" y1="91" y2="111" />

                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 2.6763 128.125)">200</text>
                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 77.6758 128.125)">300</text>
                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 152.6758 128.125)">400</text>
                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 227.6758 128.125)">500</text>
                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 302.6758 128.125)">600</text>
                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 377.6758 128.125)">700</text>
                            <text fontFamily="KarminaSans" fontSize="12" transform="matrix(1 0 0 1 452.6758 128.125)">800</text>
                            {arrFeedbackThreshold ? GetSvgArrow(arrFeedbackThreshold) : ''}
                            {arrFeedbackThreshold ? GetSvgText(arrFeedbackThreshold) : ''}
                        </svg>
                        {arrFeedbackThreshold ? GetSvg(arrFeedbackThreshold) : ''}
                    </div>

                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="Interpretation" Meta={objContext.Interpretation_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                        <div className="interpretation-accordion">
                            {GetDetailedElements()}
                            {/*{GetDetailedElements(objContext.Interpretation_ModuleProcessor.GetDetailedData(arrFeedbackThreshold, arrFeedbackThresholdTopic, arrFeedbackThresholdTopicDescription))} */}
                        </div>
                    </WrapperComponent>
                </div>
            </div>
        );
    }

    const arrowGrpRefs = useRef([]);
    const cirGrpRefs = useRef([]);

    function GetSvgArrow(arrData) {
        let id = 0;
        let arrFilteredData = arrData ? arrData.filter(d => d.iThresholdToValue != 800) : [];
        arrowGrpRefs.current = arrFilteredData.map(
            (ref, index) => arrowGrpRefs.current[index] = React.createRef()
        )
        var arrSvgElements = arrFilteredData.map((d, index) => {
            let ids = "arrowGrp" + (++id).toString();
            let arrGrpRef = arrowGrpRefs.current[index];
            return <g id={ids} ref={arrGrpRef} className="ng-star-inserted" transform="translate(109.5, 0)">
                <line fill="none" stroke="#41719C" stroke-miterlimit="10" x1="12.5" x2="12.5" y1="35" y2="90" />
                <line fill="none" stroke="#5B9BD5" stroke-miterlimit="10" x1="12.5" x2="12.5" y1="18" y2="31" />
                <polygon fill="#5B9BD5" points="10.313,30 15.313,30 12.813,34  " />
                <text fontFamily="Calibri" fontSize="12" id="arrow1" transform="matrix(1 0 0 1 3.4888 10.0273)">{d.iThresholdToValue}</text>
            </g>
        }
        )
        return arrSvgElements;
    }

    function GetSvgText(arrData) {
        let id = 0;
        let arrFilteredData = arrData ? arrData.filter((d, index) => index != 0) : [];
        cirGrpRefs.current = arrFilteredData.map(
            (ref, index) => cirGrpRefs.current[index] = React.createRef()
        )
        var arrSvgElements = arrFilteredData.map((d, index) => {
            let ids = "cirGrp" + (++id).toString();
            let cirGrpRef = cirGrpRefs.current[index];
            return <g transform="translate(427.875,0)" id={ids} ref={cirGrpRef} className="ng-star-inserted">
                <circle cx="12.611" cy="62.25" fill="#FFFFFF" r="12" />
                <text fill="#1D1D1B" fontFamily="Karminaregular" fontSize="14" textAnchor="middle" transform="matrix(1 0 0 1 12.5 67.0625)">
                    {d.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdHeading}
                </text>
            </g>
        }
        )
        return arrSvgElements;
    }

    function GetSvg(arrData) {
        setTimeout(() => {
            for (let i = 0; i < arrData.length; i++) {
                let toValue = arrData[i]["iThresholdToValue"];
                let x = arrowGrpRefs.current[i]; //document.getElementById("arrowGrp" + (i + 1));
                if (x) {
                    //to move 100 we are moving 75 (- 200 because scale starts from 200);
                    let moveLength = ((toValue - 200) / 100) * 75;
                    x.current.setAttribute("transform", "translate(" + moveLength + ",0)");
                }

                let fromValue = arrData[i]["iThresholdFromValue"];
                x = cirGrpRefs.current[i]; //document.getElementById("cirGrp" + (i + 1))
                if (x) {
                    let margin = (toValue + fromValue) / 2;
                    let moveLength = ((margin - 200) / 100) * 75;
                    x.current.setAttribute("transform", "translate(" + moveLength + ",0)");
                }
            }
        }, 0)
    }

    const accordionHeaderRef = useRef(null)

    function GetDetailedElements() {
        let strLanguageId = props.JConfiguration.InterfaceLanguageId;
        let arrSubSubject = [];
        if (DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            arrSubSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === state.intSelectedSubjectId; });
        }
        let intSubSubjectId = state.intSelectedSubSubjectId ?
            state.intSelectedSubSubjectId : arrSubSubject.length > 0 ?
                arrSubSubject[0].iSubjectId : "";//state.intSelectedSubSubjectId;
        let arrThreshold = [];
        if (DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + intSubSubjectId)) {
            arrThreshold = DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + intSubSubjectId).Data;
        }

        let arrTopic = [];
        if (DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + intSubSubjectId)) {
            arrTopic = DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + intSubSubjectId)["Data"];
        }

        let arrFilteredTopic = arrTopic ? arrTopic.filter(objTopic => objTopic["cIsDeleted"] == "N") : [];
        let arrTopicDescription = [];
        if (DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + intSubSubjectId)) {
            arrTopicDescription = DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + intSubSubjectId)["Data"];
        }

        let arrFilteredTopicDescription = arrTopicDescription ? arrTopicDescription.filter(objTopic => objTopic["cIsDeleted"] == "N") : [];

        if (arrThreshold) {
            accordionContentRefs.current = arrThreshold.map(
                (ref, index) => accordionContentRefs.current[index] = React.createRef()
            )

            return (
                <React.Fragment>
                    {
                        arrThreshold.map((objThreshold, index) => {
                            let strThresholdId = objThreshold["uSubjectFeedbackThresholdId"];
                            let refCurrentAccordionContent = accordionContentRefs.current[index]
                            if (index !== 0) {
                                return (
                                    <React.Fragment>
                                        <h3 className="accordion-header" id="accordionHeader" ref={accordionHeaderRef}
                                            onClick={() => {
                                                //document.getElementById("accordionContent" + index.toString()).classList.toggle("show");
                                                refCurrentAccordionContent.current.classList.toggle("show");
                                                //document.getElementById("accordionHeader").classList.toggle("active");
                                                accordionHeaderRef.current.classList.toggle("active");
                                                if (!state.blnOpenIndex.includes(index)) {
                                                    objContext.Interpretation_ModuleProcessor.GetAllPageJsonForCompetency(objContext, arrSubSubject, objThreshold, strThresholdId, arrFilteredTopic, arrFilteredTopicDescription);
                                                    dispatch({ type: "SET_STATE", payload: { "blnOpenIndex": [...state.blnOpenIndex, index] } });
                                                } else {
                                                    dispatch({ type: "SET_STATE", payload: { "blnOpenIndex": [...state.blnOpenIndex.filter(intIndex => intIndex != index)] } });
                                                }
                                            }}
                                        >
                                            <span>Kompetenzniveau {objThreshold.t_testDrive_Subject_FeedbackThreshold_Data.find(obj => obj.iLanguageId == strLanguageId).vThresholdHeading}</span>
                                            <img src={state.blnOpenIndex.includes(index) ? AngleUpImage : AngleDownImage} />
                                        </h3 >
                                        <div id={"accordionContent" + index.toString()} ref={refCurrentAccordionContent}>
                                            {
                                                arrFilteredTopic
                                                    .filter(objTopic => state.blnOpenIndex.includes(index) && objTopic["uSubjectFeedbackThresholdId"] == strThresholdId)
                                                    .map(objTopic => {
                                                        return (
                                                            <div className="accordion-content show">
                                                                <b>{objTopic.t_testDrive_Subject_FeedbackThreshold_Topic_Data.find(objTopicData => objTopicData["iLanguageId"] == strLanguageId)["vFeedbackThresholdTopic"]}</b>
                                                                {
                                                                    arrFilteredTopicDescription.map(objDescription => {
                                                                        if (objTopic["uFeedbackThresholdTopicId"] == objDescription["uFeedbackThresholdTopicId"]) {
                                                                            let objPageJsonForDescription = objContext.Interpretation_ModuleProcessor.GetPageJsonForPageId(objContext, objThreshold, objDescription["iPageId"], arrSubSubject);
                                                                            //let objPropsDescription = { ...props, TaskDetails: { 'iPageId': objDescription["iPageId"], 'iLanguageId': strLanguageId,  } };

                                                                            return (
                                                                                <React.Fragment>
                                                                                    {objDescription["iPageId"] != null && objPageJsonForDescription && <TaskContentPreview PageJson={objPageJsonForDescription} JConfiguration={{ ...JConfiguration }} />}
                                                                                    {
                                                                                        objDescription.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks.map(objTask => {
                                                                                            // let objPropsTask = { ...props, TaskDetails: { 'iPageId': objTask["iTaskId"], 'iLanguageId': strLanguageId } };
                                                                                            let objPageJsonForTask = objContext.Interpretation_ModuleProcessor.GetPageJsonForPageId(objContext, objThreshold, objTask["iTaskId"], arrSubSubject);
                                                                                            return (
                                                                                                <React.Fragment>
                                                                                                    <span>{objTask["vTaskName"]}</span>
                                                                                                    {objTask["iTaskId"] != null && objPageJsonForTask &&
                                                                                                        <TaskContentPreview PageJson={objPageJsonForTask} JConfiguration={{ ...JConfiguration }} />}
                                                                                                </React.Fragment>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </React.Fragment>
                                                                            );
                                                                        } else {
                                                                            <React.Fragment />;
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        );
                                                    })
                                            }
                                        </div>
                                    </React.Fragment>
                                );
                            } else {
                                return <React.Fragment />;
                            }
                        })
                    }

                </React.Fragment>
            );
        } else {
            <React.Fragment />;
        }

    }
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default connect(ExtranetBase_Hook.MapStoreToProps(Interpretation_ModuleProcessor.StoreMapList()))(Interpretation);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Interpretation_ModuleProcessor; 