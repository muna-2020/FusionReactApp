// React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as StartDashboard_Hook from '@shared/Application/c.Intranet/Modules/1_Start/StartDashboard/StartDashboard_Hook';
import StartDashboard_ModuleProcessor from '@shared/Application/c.Intranet/Modules/1_Start/StartDashboard/StartDashboard_ModuleProcessor';

//In-line Image imports...
import RefreshLargeImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Refresh_Large.png?inline';
import ExcelImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/1_Start/StartDashboard/Icon_Excel.svg?inline';
import LoginImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/1_Start/StartDashboard/Login.svg?inline';
import RecentTaskImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/1_Start/StartDashboard/RecentTask.svg?inline';
import TestImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/1_Start/StartDashboard/Tests.svg?inline';
import TokenImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/1_Start/StartDashboard/Tokens.svg?inline';

//Components used...
//import Charts from "@root/Framework/Controls/Charts/Charts";

/**
 * * @name StartDashboard
 * @param {object} props props
 * @summary This component displays the StartDashboard  data in pDataX.
 * @returns {object} React.FrDataXment that encapsulated the display pDataX with StartDashboard  details.
 */
const StartDashboard = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, StartDashboard_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "StartDashboard", ["StartDashboard_ModuleProcessor"]: new StartDashboard_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.StartDashboard_ModuleProcessor.Initialize(objContext, objContext.StartDashboard_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in StartDashboard_Hook, that contains all the custom hooks.
     * @returns null
     */
    StartDashboard_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the  jsx required for the PDataX.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        //let Charts = props.ComponentController.GetFrameworkComponent("Charts");
        //let objChartData = [{ "DataX": "15-May-16", "DataY": "50", "name": "Tony" }, { "DataX": "17-Jun-16", "DataY": "90", "name": "Tony" }]
        let objD3ChartData = [{ "DataX": "2", "DataY": "50", "name": "Tony" }, { "DataX": "4", "DataY": "90", "name": "Tony" },
        { "DataX": "10", "DataY": "100", "name": "Tony" }, { "DataX": "12", "DataY": "97", "name": "Jessica" },
        { "DataX": "9", "DataY": "88", "name": "Andrew" }, { "DataX": "10", "DataY": "98", "name": "Emily" },
        { "DataX": "11", "DataY": "141", "name": "Richard" }];

        let objBarChartData = { "DataX": [2, 4, 6, 16, 20], "DataY": [10, 20, 30, 40, 50] }

        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/1_Start/StartDashboard", objContext.props) ?? {};
        return (
            <FillHeight
                id={"FillDataY_" + props.Id}
                Meta={{
                    HeaderIds: ["MasterHeader", "BreadCrumb", "OfflineExecution"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <div className="start-dashboard-grid">
                    <div className="grid-item grid-1">
                            {
                                props.IsForServerRenderHtml
                                    ?
                                    <React.Fragment />
                                :
                                <div className="grid-content">
                                    <WrapperComponent
                                        ComponentName={"Charts"}
                                        Data={objD3ChartData}
                                        Meta={{
                                            DataX: "DataX",
                                            DataY: "DataY",
                                            ChartType: "D3Chart"
                                        }}
                                        Text={{
                                            Resource: {
                                                DataX: "DataX",
                                                DataY: "DataY"
                                            }
                                        }}
                                        Events={{
                                            onClickHandler: () => { }
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                    }                            
                    </div>
                    <div className="grid-item grid-1">
                    {
                        props.IsForServerRenderHtml
                            ?
                            <React.Fragment />
                                :
                                <div className="grid-content">
                                    <WrapperComponent
                                        ComponentName={"Charts"}
                                        Data={objBarChartData}
                                        Meta={{
                                            DataX: "DataX",
                                            DataY: "DataY",
                                            ChartType: "BarChart"
                                        }}
                                        Text={{
                                            Resource: {
                                                DataX: "DataX",
                                                DataY: "DataY"
                                            }
                                        }}
                                        Events={{
                                            onClickHandler: () => { }
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                    }
                    </div>                    
                    <div className="grid-item grid-1">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: TestImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Demos</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute gestartete Demos: 0</div>
                            <div>Gestern durchgeführte Demos: 182</div>
                        </div>
                    </div>
                    <div className="grid-item grid-2">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: TestImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Übungen</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute gestartete Übungen: 5</div>
                            <div className="data">Gestern gestartete Übungen: 2311</div>
                        </div>
                    </div>
                    <div className="grid-item grid-3">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: TestImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Prüfungen</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute durchgeführte Prüfungen: 5</div>
                            <div className="data">Gestern durchgeführte Prüfungen: 22</div>
                        </div>
                    </div>
                    <div className="grid-item grid-4">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: TestImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Scharfe Tests</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute durchgeführte Tests: 0</div>
                            <div className="data">Gestern durchgeführte Tests: 1133</div>
                            <div className="data" style={{ "paddingLeft": "15px" }}><a href="">Frühjahr 2020: 49</a> &nbsp;&nbsp; <a href="">Orientierungstests2018: 174</a></div>
                            <div className="data" style={{ "paddingLeft": "15px" }}><a href="">Herbst 2019: 38</a></div>
                        </div>
                    </div>
                    <div className="grid-item grid-5">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: TokenImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Neue Vorschläge</h3>
                        </div>
                        <div className="grid-content">

                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            Neue Vorschläge seit letztem Login: 0</td>
                                        <td> Animation elements used:
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: ExcelImage,
                                                    AltText: ""
                                                }}
                                                ParentProps={{ ...props }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Survey Export:
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: ExcelImage,
                                                    AltText: ""
                                                }}
                                                ParentProps={{ ...props }}
                                            />
                                        </td>
                                        <td>Older pending learning test: 0</td>
                                    </tr>
                                    <tr>
                                        <td>Learning test today:</td>
                                        <td>94 (Orientation Test:95) [Double: 0]</td>
                                    </tr>
                                    <tr>
                                        <td>Learning test yesterday:</td>
                                        <td>793 (Orientation Test:802) [Double: 0]</td>
                                    </tr>
                                    <tr>
                                        <td>Learning journal activity today:</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Learning journal activity yesterday:</td>
                                        <td>18</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid-item grid-6">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: RecentTaskImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Kürzlich bearbeitete Aufgaben</h3>
                        </div>
                        <div className="grid-content">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            Neue Vorschläge seit letztem Login: 0</td>
                                        <td> Animation elements used:
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: ExcelImage,
                                                    AltText: ""
                                                }}
                                                ParentProps={{ ...props }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Survey Export:
                                            <WrapperComponent
                                            ComponentName={"Image"}
                                            Data={{
                                                Image: ExcelImage,
                                                AltText: ""
                                            }}
                                            ParentProps={{ ...props }}
                                        />
                                        </td>
                                        <td>Older pending learning test: 0</td>
                                    </tr>
                                    <tr>
                                        <td>Learning test today:</td>
                                        <td>94 (Orientation Test:95) [Double: 0]</td>
                                    </tr>
                                    <tr>
                                        <td>Learning test yesterday:</td>
                                        <td>793 (Orientation Test:802) [Double: 0]</td>
                                    </tr>
                                    <tr>
                                        <td>Learning journal activity today:</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Learning journal activity yesterday:</td>
                                        <td>18</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid-item grid-7">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: LoginImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Benutzerstatistik</h3>
                        </div>
                        <div className="grid-content">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            Neue Vorschläge seit letztem Login: 0</td>
                                        <td> Animation elements used:
                                            <WrapperComponent
                                            ComponentName={"Image"}
                                            Data={{
                                                Image: ExcelImage,
                                                AltText: ""
                                            }}
                                            ParentProps={{ ...props }}
                                        />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Survey Export:
                                            <WrapperComponent
                                            ComponentName={"Image"}
                                            Data={{
                                                Image: ExcelImage,
                                                AltText: ""
                                            }}
                                            ParentProps={{ ...props }}
                                        />
                                        </td>
                                        <td>Older pending learning test: 0</td>
                                    </tr>
                                    <tr>
                                        <td>Learning test today:</td>
                                        <td>94 (Orientation Test:95) [Double: 0]</td>
                                    </tr>
                                    <tr>
                                        <td>Learning test yesterday:</td>
                                        <td>793 (Orientation Test:802) [Double: 0]</td>
                                    </tr>
                                    <tr>
                                        <td>Learning journal activity today:</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Learning journal activity yesterday:</td>
                                        <td>18</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid-item grid-8">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: TokenImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Tokens</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute durchgeführte Prüfungen: 5</div>
                            <div className="data">Gestern durchgeführte Prüfungen: 22</div>
                        </div>
                    </div>
                    <div className="grid-item grid-9">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: RecentTaskImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Neue Testzentren</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute durchgeführte Prüfungen: 5</div>
                            <div className="data">Gestern durchgeführte Prüfungen: 22</div>
                        </div>
                    </div>
                    <div className="grid-item grid-9">
                        <div className="grid-item-header">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: LoginImage,
                                    AltText: ""
                                }}
                                ParentProps={{ ...props }}
                            />
                            <h3>Anzahl Benutzer</h3>
                        </div>
                        <div className="grid-content">
                            <div className="data">Heute durchgeführte Prüfungen: 5</div>
                            <div className="data">Gestern durchgeführte Prüfungen: 22</div>
                        </div>
                    </div>
                </div>
            </FillHeight>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        RefreshLargeImage: RefreshLargeImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(StartDashboard_ModuleProcessor.StoreMapList()))(StartDashboard);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = StartDashboard_ModuleProcessor; 