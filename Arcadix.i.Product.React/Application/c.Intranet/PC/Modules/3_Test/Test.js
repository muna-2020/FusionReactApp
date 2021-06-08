//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
//import SplitPane from 'react-split-pane'

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Module related fies...
import * as Test_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test_Hook';
import Test_ModuleProcessor from "@shared/Application/c.Intranet/Modules/3_Test/Test_ModuleProcessor";
import PropertyDisplay from '@root/Application/c.Intranet/PC/Modules/3_Test/PropertyDisplay/PropertyDisplay';
import TestSearch from '@root/Application/c.Intranet/PC/Modules/3_Test/TestSearch/TestSearch';

//In-line Image imports...
import PresentationImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/Presentation.svg?inline';
import DemoImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/Demo_32.svg?inline';
import LearningImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/TestLerntest_32.svg?inline';
import LowStakeImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/TestPruefung_32.svg?inline';
import HighStakeImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/TestHighStake_32.svg?inline';
import WrapperImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/WrapperSmall.svg?inline';
import HighStakeAdaptiveImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/HighStakeAdaptive.svg?inline';
import EssayImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/TestEssay_32.svg?inline';
import ExternalImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/TestExternal_32.svg?inline';
import SurveyImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/Survey_32.svg?inline';
import BackToSearchViewImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/BackToSearchView.svg?inline';
import CancelImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cancel_Large.svg?inline';
import PasteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Paste.svg?inline';
import CutImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cut.svg?inline';
import CopyImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Copy.svg?inline';
import FolderImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/Folder.svg?inline';
import TestImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/TestOnline.svg?inline';
import AdaptiveTestImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/3_Test/Adaptive.svg?inline';

/**
* @name Test
* @param {object} props props
* @summary This component displays the Test data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Test details.
*/
const Test = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Test_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Test", ["Test_ModuleProcessor"]: new Test_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Test_ModuleProcessor.Initialize(objContext, objContext.Test_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Test_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        let objSelectedRow = {};
        if (objContext.props.IsForServerRenderHtml) {
            objSelectedRow = {
                ["TestGrid"]: [objContext.Test_ModuleProcessor.GetTestGridData(objContext)?.["RowData"]?.[0]] ?? []
            };
        }        
        return (
            <React.Fragment>
                <div className="file-explorer-container">
                    <PerformanceProfiler ComponentName="TestSearch" JConfiguration={JConfiguration}>
                        <TestSearch
                            Id="TestSearch"
                            Data={{

                            }}
                            Resource={{
                                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props) ?? {}
                            }}
                            CallBacks={{
                            }}
                            Events={{
                                Search: (objSearchDetails) => objContext.Test_ModuleProcessor.Search(objContext, objSearchDetails),
                                SearchCancel: () => objContext.Test_ModuleProcessor.SearchCancel(objContext)
                            }}
                            ParentProps={props}
                        />
                    </PerformanceProfiler>
                    <div className="file-explorer-flex">
                        <SplitPane Meta={{ SplitDirection: "vertical", MinSize: 600, MaxSize: 1200, DefaultSize: "70%" }}> 
                        <PerformanceProfiler ComponentName="TestGrid" JConfiguration={JConfiguration}>
                            <Grid
                                Id="TestGrid"
                                Meta={objContext.Test_ModuleProcessor.GetTestGridMetaData(objContext)}
                                Data={objContext.Test_ModuleProcessor.GetTestGridData(objContext)}
                                Resource={objContext.Test_ModuleProcessor.GetTestGridResourceData(objContext)}
                                Events={objContext.Test_ModuleProcessor.GetTestGridEvents(objContext)}
                                CallBacks={objContext.Test_ModuleProcessor.GetTestGridCallBacks(objContext)}
                                ParentProps={{ ...props }}
                                ImageMeta={GetImageMeta()}
                            />
                        </PerformanceProfiler>

                        <PerformanceProfiler ComponentName="PropertyDisplay" JConfiguration={JConfiguration}>
                            <PropertyDisplay
                                {...props}
                                Id="PropertyDisplay"
                                Resource={{
                                    Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props) ?? {}
                                }}
                                SelectedRows={objSelectedRow}
                                CallBacks={{
                                    GetTestDisplayData: (objSelectedRow) => objContext.Test_ModuleProcessor.GetTestDetails(objContext, objSelectedRow),
                                    GetTestFolderDisplayData: (objSelectedRow) => objContext.Test_ModuleProcessor.GetTestFolderDetails(objContext, objSelectedRow)
                                }}
                                ParentProps={props}
                            />
                            </PerformanceProfiler>
                        </SplitPane>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

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
        WrapperImage: WrapperImage,
        HighStakeAdaptiveImage: HighStakeAdaptiveImage,
        EssayImage: EssayImage,
        ExternalImage: ExternalImage,
        SurveyImage: SurveyImage,
        BackToSearchViewImage: BackToSearchViewImage,
        CancelImage: CancelImage,
        PasteImage: PasteImage,
        CutImage: CutImage,
        CopyImage: CopyImage,
        FolderImage: FolderImage,
        TestImage: TestImage,
        AdaptiveTestImage: AdaptiveTestImage 
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Test_ModuleProcessor.StoreMapList()))(Test);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Test_ModuleProcessor; 