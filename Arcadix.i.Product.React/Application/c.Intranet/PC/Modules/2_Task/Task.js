//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
//import SplitPane from 'react-split-pane'

//Module related fies...
import * as Task_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task_Hook';
import Task_ModuleProcessor from "@shared/Application/c.Intranet/Modules/2_Task/Task_ModuleProcessor";
import PropertyDisplay from '@root/Application/c.Intranet/PC/Modules/2_Task/PropertyDisplay/PropertyDisplay';
import TaskSearch from '@root/Application/c.Intranet/PC/Modules/2_Task/TaskSearch/TaskSearch';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import PresentationImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Presentation.svg?inline';
import DemoImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Demo_32.svg?inline';
import LearningImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/TestLerntest_32.svg?inline';
import LowStakeImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/TestPruefung_32.svg?inline';
import HighStakeImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_32.svg?inline';
import HighStakeExampleImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_Example.svg?inline';
import HighStakeIntroImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_Intro.svg?inline';
import HighStakeBreakImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_Pause.svg?inline';
import HighStakeSurveyImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeSurvey.svg?inline';
import HighStakeSurveyListImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeSurveyList.svg?inline';
import HighStakeAdaptiveImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeAdaptive.svg?inline';
import SurveyImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Survey_32.svg?inline';
import SurveyListImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/SurveyPlaceHolder.svg?inline';
import BackToSearchViewImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/BackToSearchView.svg?inline';
import OpenEditorImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenEditor.svg?inline';
import CancelImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cancel_Large.svg?inline';
import PasteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Paste.svg?inline';
import CutImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cut.svg?inline';
import CopyImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Copy.svg?inline';

import FolderImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Folder.svg?inline';
import BaseImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Base.svg?inline';
import TaskImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Preview.svg?inline';
import SpacerImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/spacer.svg?inline';
import HighStakeIntroGridImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeIntro.svg?inline';
import HighStakeBreakGridImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeBreak.svg?inline';
import LowStakeGridImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/LowStake.svg?inline';
import SurveyListGridImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/SurveyList.svg?inline';
import LearningGridImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Learning.svg?inline';
import DemoGridImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Demo.svg?inline';
import LockOpenImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/LockOpen.svg?inline';
import LockOpenShortcutImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/LockOpen_Shortcut.svg?inline';
import Review3Image from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Review3.svg?inline';
import Review1Image from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Review1.svg?inline';
import IconDeleteSmallImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Icon_Delete_small.svg?inline';

/**
 * @name Task
 * @param {object} props props
 * @summary This component displays the Task data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Task details.
 */
const Task = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Task_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Task", ["Task_ModuleProcessor"]: new Task_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Task_ModuleProcessor.Initialize(objContext, objContext.Task_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Task_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        let objSelectedRow = {};
        if (objContext.props.IsForServerRenderHtml) {
            objSelectedRow= {
                ["TaskGrid"]: [objContext.Task_ModuleProcessor.GetTaskGridData(objContext)?.["RowData"]?.[0]] ?? []
            };
        }
        return <div className="file-explorer-container">
            <PerformanceProfiler ComponentName="TaskSearch" JConfiguration={JConfiguration}>
                <TaskSearch
                    Id="TaskSearch"
                    Data={{
                        ActiveWorkFlowStatuses: state.arrActiveWorkFlowStatuses ?? []
                    }}
                    Resource={{
                        Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props) ?? {}
                    }}
                    CallBacks={{
                    }}
                    Events={{
                        Search: (objSearchDetails) => objContext.Task_ModuleProcessor.Search(objContext, objSearchDetails),
                        SearchCancel: () => objContext.Task_ModuleProcessor.SearchCancel(objContext)
                    }}
                    ParentProps={props}
                />
            </PerformanceProfiler>

            <div className="file-explorer-flex">
                <SplitPane Meta={{ SplitDirection: "vertical", MinSize: 600, MaxSize: 1200, DefaultSize: "70%" }}> 
                    <PerformanceProfiler ComponentName="TaskGrid" JConfiguration={JConfiguration}>
                        <Grid
                            Id="TaskGrid"
                            Meta={objContext.Task_ModuleProcessor.GetTaskMetaData(objContext)}
                            Data={objContext.Task_ModuleProcessor.GetTaskGridData(objContext)}
                            Resource={objContext.Task_ModuleProcessor.GetResourceData(objContext)}
                            Events={objContext.Task_ModuleProcessor.GetTaskGridEvents(objContext)}
                            CallBacks={objContext.Task_ModuleProcessor.GetTaskGridCallBacks(objContext)}
                            ParentProps={{ ...props }}
                            ImageMeta={GetImageMeta()}
                        />
                    </PerformanceProfiler>
                    <PerformanceProfiler ComponentName="TaskPropertyDisplay" JConfiguration={JConfiguration}>
                        <PropertyDisplay
                            {...props}
                            Id="TaskPropertyDisplay"
                            Data={{
                                Object_Cockpit_MainClient_MainClientLanguage: props.Object_Cockpit_MainClient_MainClientLanguage,
                                Object_Cockpit_Language: props.Object_Cockpit_Language,
                                Object_Intranet_Task_TaskDifficultyLevel: props.Object_Intranet_Task_TaskDifficultyLevel,
                                Object_Cockpit_Workflow_WorkflowType: props.Object_Cockpit_Workflow_WorkflowType,
                                Object_Cockpit_Workflow_Workflow: props.Object_Cockpit_Workflow_Workflow,
                                Object_Cockpit_Workflow_WorkflowStatus: props.Object_Cockpit_Workflow_WorkflowStatus
                            }}
                            SelectedRows={objSelectedRow}
                            Resource={{
                                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props) ?? {}
                            }}
                            CallBacks={{
                                GetTaskDisplayData: (objSelectedRow) => objContext.Task_ModuleProcessor.GetTaskDetails(objContext, objSelectedRow),
                                GetTaskFolderDisplayData: (objSelectedRow) => objContext.Task_ModuleProcessor.GetTaskFolderDetails(objContext, objSelectedRow)
                            }}
                            ParentProps={props}
                        />
                    </PerformanceProfiler>
                </SplitPane>
            </div>
        </div>;
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        PresentationImage: PresentationImage,
        DemoImage: DemoImage,
        LearningImage: LearningImage,
        LowStakeImage: LowStakeImage,
        HighStakeImage: HighStakeImage,
        HighStakeExampleImage: HighStakeExampleImage,
        HighStakeIntroImage: HighStakeIntroImage,
        HighStakeBreakImage: HighStakeBreakImage,
        HighStakeSurveyImage: HighStakeSurveyImage,
        HighStakeSurveyListImage: HighStakeSurveyListImage,
        HighStakeAdaptiveImage: HighStakeAdaptiveImage,
        SurveyImage: SurveyImage,
        SurveyListImage: SurveyListImage,
        BackToSearchViewImage: BackToSearchViewImage,
        OpenEditorImage: OpenEditorImage,
        CancelImage: CancelImage,
        PasteImage: PasteImage,
        CutImage: CutImage,
        CopyImage: CopyImage,
        FolderImage: FolderImage,
        BaseImage: BaseImage,
        TaskImage: TaskImage,
        SpacerImage: SpacerImage,
        HighStakeIntroGridImage: HighStakeIntroGridImage,
        HighStakeBreakGridImage: HighStakeBreakGridImage,
        LowStakeGridImage: LowStakeGridImage,
        SurveyListGridImage: SurveyListGridImage,
        LearningGridImage: LearningGridImage,
        DemoGridImage: DemoGridImage,
        LockOpenImage: LockOpenImage,
        LockOpenShortcutImage: LockOpenShortcutImage,
        Review3Image: Review3Image,
        Review1Image: Review1Image,
        IconDeleteSmallImage: IconDeleteSmallImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Task_ModuleProcessor.StoreMapList()))(Task);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Task_ModuleProcessor; 