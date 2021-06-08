// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as AdminInterpretation_Hook from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AdminInterpretation_Hook';
import AdminInterpretation_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/AdminInterpretation/AdminInterpretation_ModuleProcessor";

//In-line Image imports...
import OpenEditorImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenEditor.svg?inline';
import PreviewNewWindowImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/PreviewNewWindow.svg?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';

/**
 * @name AdminInterpretation
 * @param {object} props props
 * @summary This component displays the Topic data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Topic details.
 */
const AdminInterpretation = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AdminInterpretation_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "AdminInterpretation", ["AdminInterpretation_ModuleProcessor"]: new AdminInterpretation_ModuleProcessor(), ["ImageMeta"]: GetImageMeta()};

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.AdminInterpretation_ModuleProcessor.Initialize(objContext, objContext.AdminInterpretation_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AdminInterpretation_Hook, that contains all the custom hooks.
     * @returns null
     */
    AdminInterpretation_Hook.Initialize(objContext);

    /**
     * @name GetSubjectDropdown
     * @param {object} objTextResource Text Resource object
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetSubjectDropdown = (objTextResource) => {
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data ?? [];
        let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 }) ?? [];
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iSubjectId"
                Data={{
                    DropdownData: arrSubjects,
                    SelectedValue: state.intSubjectId
                }}
                Meta={{
                    DisplayColumn: "vSubjectName",
                    ValueColumn: "iSubjectId",
                    DependingTableName: "t_TestDrive_Subject_Data",
                    IsLanguageDependent: "Y",
                    //DefaultOptionValue: -1,
                    //ShowDefaultOption: true
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AdminInterpretation_ModuleProcessor.OnSubjectDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.AdminInterpretation_ModuleProcessor.CheckDeletedDropDownDataEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    };

    /**
     * @name GetSubSubjectDropdown
     * @param {object} objTextResource Text Resource object
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetSubSubjectDropdown = (objTextResource) => {
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data ?? [];
        let arrSubSubject = arrAllSubjects.filter(objSubject => objSubject.iParentSubjectId == objContext.state.intSubjectId) ?? [];
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iSubSubjectId"
                Data={{
                    DropdownData: arrSubSubject,
                    SelectedValue: state.intSubSubjectId
                }}
                Meta={{
                    DisplayColumn: "vSubjectName",
                    ValueColumn: "iSubjectId",
                    DependingTableName: "t_TestDrive_Subject_Data",
                    IsLanguageDependent: "Y",
                    //DefaultOptionValue: -1,
                    //ShowDefaultOption: true
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseSelect")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AdminInterpretation_ModuleProcessor.OnSubSubjectDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.AdminInterpretation_ModuleProcessor.CheckDeletedDropDownDataEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    };

    /**
     * @name GetThresholdDropdown
     * @param {object} objTextResource Text Resource object
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetThresholdDropdown = (objTextResource) => {
        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + objContext.state.intSubSubjectId).Data ?? [];
        var intThresholdId = arrFeedbackThreshold.length > 0 ? objContext.state.intThresholdId:-1
        arrFeedbackThreshold = arrFeedbackThreshold.length > 0 ? arrFeedbackThreshold : [{
            "uSubjectFeedbackThresholdId": "-1",
            "t_testDrive_Subject_FeedbackThreshold_Data": [{
                "uSubjectFeedbackThresholdDataId":-1,
                "uSubjectFeedbackThresholdId": -1,
                "vThresholdText": "Please Select",
                "iLanguageId":3
            }]
        }]
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uSubjectFeedbackThresholdId"
                Data={{
                    DropdownData: arrFeedbackThreshold,
                    SelectedValue: intThresholdId//objContext.state.intThresholdId//arrFeedbackThreshold.length > 0 && (!objContext.state.intThresholdId || objContext.state.intThresholdId == -1) ? arrFeedbackThreshold[0].uSubjectFeedbackThresholdId : objContext.state.intThresholdId
                }}
                Meta={{
                    DisplayColumn: "vThresholdText",
                    ValueColumn: "uSubjectFeedbackThresholdId",
                    DependingTableName: "t_testDrive_Subject_FeedbackThreshold_Data",
                    IsLanguageDependent: "Y",
                    //DefaultOptionValue: -1,
                    //ShowDefaultOption: true
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{}}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AdminInterpretation_ModuleProcessor.OnThresholdDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.AdminInterpretation_ModuleProcessor.CheckDeletedDropDownDataEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    };

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        //let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", props) ?? {};
        //let arrTopic = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + state.intSubSubjectId)["Data"] ?? [];

        //let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + state.intSubSubjectId).Data ?? [];
        //let intThresholdId = state.intThresholdId == -1 ?
        //    arrFeedbackThreshold && arrFeedbackThreshold.length > 0 ? arrFeedbackThreshold[0].uSubjectFeedbackThresholdId : state.intThresholdId
        //    : state.intThresholdId;

        //let arrFilteredTopic = arrTopic ? arrTopic.filter(objTopic => objTopic["cIsDeleted"] == "N" && objTopic["uSubjectFeedbackThresholdId"] == intThresholdId) : [];

        //let arrTopicDescription = DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + state.intSubSubjectId)["Data"];
        //let arrFilteredTopicDescription = arrTopicDescription ? arrTopicDescription.filter(objTopic => objTopic["cIsDeleted"] == "N") : [];

        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data ?? [];
        //let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
        let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 }) ?? [];
        let strSubjectId = arrSubjects.length > 0 ?
            objContext.state.intSubjectId != -1 ? objContext.state.intSubjectId : arrSubjects[0]?.iSubjectId
            : -1;
        let arrSubSubject = arrAllSubjects.filter(objSubject => objSubject.iParentSubjectId == strSubjectId) ?? [];
        let strSubSubjectId = state.intSubSubjectId != -1 ? state.intSubSubjectId
            : arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : -1;

        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", props) ?? {};
        let arrTopic = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + strSubSubjectId)["Data"] ?? [];

        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + strSubSubjectId).Data ?? [];
        let intThresholdId = state.intThresholdId == -1 ?
            arrFeedbackThreshold && arrFeedbackThreshold.length > 0 ? arrFeedbackThreshold[0].uSubjectFeedbackThresholdId : state.intThresholdId
            : state.intThresholdId;

        let arrFilteredTopic = arrTopic ? arrTopic.filter(objTopic => objTopic["cIsDeleted"] == "N" && objTopic["uSubjectFeedbackThresholdId"] == intThresholdId) : [];

        let arrTopicDescription = DataRef(props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + strSubSubjectId)["Data"];
        let arrFilteredTopicDescription = arrTopicDescription ? arrTopicDescription.filter(objTopic => objTopic["cIsDeleted"] == "N") : [];

        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectSubject")}</span>
                        {GetSubjectDropdown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectSubSubject")}</span>
                        {GetSubSubjectDropdown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectThreshold")}</span>
                        {GetThresholdDropdown(objTextResource)}
                    </div>
                </div>
                <FillHeight
                    Id="FillHeightAdminInterpretation"
                    Meta={{
                        HeaderIds: ["MasterHeader", "filterHeader", "BreadCrumb"],
                        FooterIds: ["chatBoxFooter", "bottomSpacing", "OfflineExecution"]
                    }}
                    ParentProps={{ ...props }}
                >
                    <div className="interpretation-admin">

                        {arrFilteredTopic.map((objTopic, intIndex) => {
                            //let blnIsChecked = state.arrCheckedIndices.includes(intIndex);
                            let blnIsChecked = false;
                            if (state.arrCheckedTopics.filter(objCheckedTopic => objCheckedTopic["uFeedbackThresholdTopicId"] == objTopic["uFeedbackThresholdTopicId"]).length > 0) {
                                blnIsChecked = true;
                            }
                            let intDescriptionSerialNumber = 0;
                            return (
                                <React.Fragment>
                                    <div className="admin-wrapper">
                                        <div class="admin-header">
                                            <div className="ad-left">
                                                <input type="checkbox" checked={blnIsChecked} onChange={(event) => objContext.AdminInterpretation_ModuleProcessor.HandleCheck(objContext, event.target.checked, objTopic, arrFilteredTopic)} onClick={event => event.stopPropagation()} />
                                                <h4 class="d-inline-block">
                                                    {objTopic.t_testDrive_Subject_FeedbackThreshold_Topic_Data.find(objTopicData => objTopicData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vFeedbackThresholdTopic"]}
                                                </h4>
                                            </div>
                                            <button onClick={() => { objContext.AdminInterpretation_ModuleProcessor.AddDescription(objContext, objTopic); }}>
                                                Add Description
                                            </button>
                                        </div><div className="admin-content">
                                            {arrFilteredTopicDescription.map((objTopicDescription, intTopicDescriptionIndex) => {
                                                if (objTopic["uFeedbackThresholdTopicId"] == objTopicDescription["uFeedbackThresholdTopicId"]) {
                                                    intDescriptionSerialNumber = intDescriptionSerialNumber + 1;
                                                    return (
                                                        <div className="content-row">
                                                            <span>{intDescriptionSerialNumber}.</span>
                                                            <div className="cell-flex" onClick={() => { objContext.AdminInterpretation_ModuleProcessor.EditDescription(objContext, objTopicDescription); }}>
                                                                <WrapperComponent
                                                                    ComponentName={"Image"}
                                                                    Data={{
                                                                        Image: EditImage,
                                                                    }}
                                                                    ParentProps={props.ParentProps}
                                                                />
                                                                <span>Edit Description</span>
                                                            </div>
                                                            <div className="cell-flex" onClick={() => { objContext.AdminInterpretation_ModuleProcessor.PreviewDescription(objContext, objTopicDescription); }}>
                                                                <WrapperComponent
                                                                    ComponentName={"Image"}
                                                                    Data={{
                                                                        Image: PreviewNewWindowImage,
                                                                    }}
                                                                    ParentProps={props.ParentProps}
                                                                />
                                                                <span>Preview Description</span>
                                                            </div>
                                                            <button onClick={() => { objContext.AdminInterpretation_ModuleProcessor.OpenAddTaskPopup(objContext, objTopicDescription) }}>
                                                                Add Task
                                                            </button>
                                                        </div>

                                                    );
                                                } else {
                                                    return <React.Fragment />;
                                                }
                                            })}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}

                    </div>

                </FillHeight>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name GetImageMeta
 * @summary forms the default images for in-line import.
 * */
const GetImageMeta = () => {
    return {
        OpenEditorImage: OpenEditorImage,
        PreviewNewWindowImage: PreviewNewWindowImage
    }
}

export default connect(CockpitBase_Hook.MapStoreToProps(AdminInterpretation_ModuleProcessor.StoreMapList()))(AdminInterpretation);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AdminInterpretation_ModuleProcessor; 