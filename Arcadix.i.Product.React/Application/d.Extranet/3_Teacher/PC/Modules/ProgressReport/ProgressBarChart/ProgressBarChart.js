import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, {
    useState,
    useEffect,
    useReducer,
    useLayoutEffect,
    useMutationEffect
} from "react";
import * as ProgressBarChartBusinessLogic from '@shared/Application/d.Extranet/3_Teacher/Modules/LearningTestSystem/LearningTestSystemPopups/ProgressBarChart/ProgressBarChartBusinessLogic';
import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";

//Inline Images import
import ProcessImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/process.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import CheckImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/check.svg?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

const ProgressBarChart = props => {
    const [state, dispatch] = useReducer(ProgressBarChartBusinessLogic.Reducer, ProgressBarChartBusinessLogic.GetInitialState(props.passedEvents));

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };
    let objTextResouce = objContext.props.Data.objTestStatisticsData;

    /**
     * @summary Custom hook that makes the request for the data.
     */
    ProgressBarChartBusinessLogic.useDataLoader(objContext);

    const [Tab, OpenTab] = useState(1);

    function GetStatusTestImage(iTestUsageId) {
        switch (iTestUsageId) {
            case 5:
                return <img title="Übung abgeschlossen" src={CheckImage} />;
            case 3:
                return <img title="In Arbeit" src={ProcessImage} />;
            default:
                return <img title="Übung bereit – noch nicht angefangen" src={RocketImage} />;
        }
    }

    /**
        * for open test popup
        * @param {any} test
        */
    function OpenTestPopUp(vTestLink) {
        props.showPopup({
            MaxHeight: '890px',
            MaxWidth: '98%',
            popUpMinHeight: '890px',
            popUpMinWidth: '98%',
            popUpName: 'testpopup', //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {},
            headerTitle: '',
            Data: {
                vTestLink: vTestLink
            }
        })
    }

    /**
         * returns the task elements*/
    function GetTaskElements() {
        let arrTaskElements = state.arrTaskData.map(objTask => {
            return (
                <tr>
                    <td>
                        <a>{objTask["PageName"]}</a>
                    </td>
                    <td>{Localization.TextFormatter(objTextResource,'vSubjectName')}</td>
                    <td>{Localization.TextFormatter(objTextResource,'vSubSubjectName')}</td>
                    <td>{objTask["DifficultyLevelId"]}</td>
                    <td className="circle-block">
                        <div className={objTask.Rep1} onClick={() => { OpenTestPopUp(objTask.TaskURL1) }}></div>
                    </td>
                    <td className="circle-block">
                        <div className={objTask.Rep2} onClick={() => { OpenTestPopUp(objTask.TaskURL2) }}></div>
                    </td>
                    <td className="circle-block">
                        <div className={objTask.Rep3} onClick={() => { OpenTestPopUp(objTask.TaskURL3) }}></div>
                    </td>
                    <td className="circle-block">
                        <div className={objTask.Rep4} onClick={() => { OpenTestPopUp(objTask.TaskURL4) }}></div>
                    </td>
                    <td className="circle-block">
                        <div className={objTask.Rep5} onClick={() => { OpenTestPopUp(objTask.TaskURL5) }}></div>
                    </td>
                    <td className="circle-block">
                        <div className={objTask.Rep6} onClick={() => { OpenTestPopUp(objTask.TaskURL6) }}></div>
                    </td>
                    <td className="circle-block">
                        <div className={objTask.Rep7} onClick={() => { OpenTestPopUp(objTask.TaskURL7) }}></div>
                    </td>
                </tr>
            );
        })
        return arrTaskElements;
    }

    const GetContent = () => {
        return (
            <div className="test-statistics-popup">
                <div className="test-statistics-popup-header" id="TestStatisticsHeader">
                    <h2>{Localization.TextFormatter(objTextResource,'vFirstName')}</h2>
                    <span className="close" onClick={e => props.closePopUp(props.objModal)}>
                        Schliessen
                         <img src={CloseImage} />
                    </span>
                </div>

                <div class="ul-block" id="ulBlock">
                    <ul>
                        <li>
                            <span>Fach: </span>
                            <span className="right">{Localization.TextFormatter(objTextResource,'vSubjectName')}</span>
                        </li>
                        <li>
                            <span>Übung: </span>
                            <span className="right">{Localization.TextFormatter(objTextResource,'vTestName')}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>Generiert am:</span>
                            <span className="right">{Localization.TextFormatter(objTextResource,'dtCreatedOn')}</span>
                        </li>
                        <li>
                            <span>Klasse:</span>
                            <span className="right">{Localization.TextFormatter(objTextResource,'vClassName')}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>Aufgaben:</span>
                            <span className="right">15</span>
                        </li>
                        <li>
                            <span>Status:</span>
                            {GetStatusTestImage(Localization.TextFormatter(objTextResource, 'iTestUsageId'))}
                        </li>
                    </ul>
                </div>

                <div className="test-statistics">
                    <ul className="tablinks" id="TestStatisticsTabsHeader">
                        <li className={Tab == 1 ? "active" : ""} onClick={() => OpenTab(1)}>
                            Aufgabenstatistik
                        </li>
                    </ul>
                    <div
                        className="tabscontent"
                        style={{ display: Tab == 1 ? "block" : "none" }}
                    >
                        <div className="test-statistics-table" id="TestStatisticsTable">
                            <FillHeight
                                id="ProgressbarchartFillHeightTab1"
                                HeaderIds={[
                                    // "Header",
                                    `EditorPopup_Header_Id${props.modalUId}`,
                                    "TestStatisticsHeader",
                                    "TestStatisticsTabsHeader",
                                    "ulBlock"
                                ]}
                                ParentReference={`EditorPopupParent${props.modalUId}`}
                                FooterIds={[
                                    `EditorPopup_Footer_Id${props.modalUId}`,
                                    "test-statistics-popup-footer"
                                ]}
                                className="bgStyle"
                                scrollStyle={{ overflow: "auto" }}
                            >
                                <div className="test-statistics-table-block">
                                    <div class="color-block">
                                        <ul>
                                            <li>
                                                <span class="bubble-circle green" />
                                                <span>Richtig nach einmaligem Lösen</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle green-ring" />
                                                <span>Richtig nach mehrmaligem</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle red" />
                                                <span>Falsch gelöst</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle yellow" />
                                                <span>Teilweise richtig</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle black" />
                                                <span>Nicht gelöst</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colspan="7" className="tr-row">
                                                Durchgang
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Aufgaben ({state.arrTaskData.length})</th>
                                            <th>Fach</th>
                                            <th>Bereich</th>
                                            <th>Schwierigkeit</th>
                                            <th>1</th>
                                            <th>2</th>
                                            <th>3</th>
                                            <th>4</th>
                                            <th>5</th>
                                            <th>6</th>
                                            <th>7</th>
                                        </tr>
                                        {GetTaskElements()}
                                    </tbody>
                                </table>
                            </FillHeight>
                        </div>
                    </div>

                    <div className="tabscontent" style={{ display: Tab == 2 ? "block" : "none" }}>
                        <FillHeight
                            id="ProgressbarchartFillHeightTab2"
                            HeaderIds={[
                                // "Header",
                                `EditorPopup_Header_Id${props.modalUId}`,
                                "TestStatisticsHeader",
                                "TestStatisticsTabsHeader",
                                "ulBlock"
                            ]}
                            ParentReference={`EditorPopupParent${props.modalUId}`}
                            FooterIds={[
                                `EditorPopup_Footer_Id${props.modalUId}`,
                                "test-statistics-popup-footer"
                            ]}
                            className="bgStyle"
                            scrollStyle={{ overflow: "auto" }}
                        >
                            <div className="auswertungen-tab-flex">
                                <div className="auswertungen-tab-box">
                                    Anzahl Aufrufe:
                                    <br /> Letzter Aufruf:
                                    <br />
                                    <br /> Anzahl Aufgaben:
                                    <br /> Maximale Punktzahl:
                                    <br />
                                    <br /> Richtig nach einmaligem Lösen:
                                    <br /> Teilweise richtig:
                                    <br /> Falsch gelöst:
                                    <br /> Nicht gelöst:
                                    <br /> Punktzahl:
                                    <br />
                                    <br />
                                </div>
                                <div className="auswertungen-tab-box">
                                    1<br />
                                    <span>15.03.2019 06:10:32</span>
                                    <br />
                                    <br /> -<br /> -<br />
                                    <br /> -<br /> -<br /> -<br /> -<br /> -<br />
                                    <br />
                                </div>
                            </div>
                        </FillHeight>
                    </div>
                    <div
                        className="tabscontent"
                        style={{ display: Tab == 3 ? "block" : "none" }}
                    >
                        <FillHeight
                            id="ProgressbarchartFillHeightTab3"
                            HeaderIds={[
                                // "Header",
                                `EditorPopup_Header_Id${props.modalUId}`,
                                "TestStatisticsHeader",
                                "TestStatisticsTabsHeader",
                                "ulBlock"
                            ]}
                            ParentReference={`EditorPopupParent${props.modalUId}`}
                            FooterIds={[
                                `EditorPopup_Footer_Id${props.modalUId}`,
                                "test-statistics-popup-footer"
                            ]}
                            className="bgStyle"
                            scrollStyle={{ overflow: "auto" }}
                        >
                            <div className="test-statistics-table protocol-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Fach</th>
                                            <th>Bereich</th>
                                            <th>Letzter Aufruf</th>
                                            <th>Aufgaben</th>
                                            <th>Punkte (Max.)</th>
                                            <th>Anzahl Aufrufe (Dauer)</th>
                                        </tr>
                                        <tr>
                                            <td>Natur und Technik</td>
                                            <td>
                                                1 | Wesen und Bedeutung von Naturwissenschaften und
                                                Technik verstehen
                                            </td>
                                            <td>15.03.2019</td>
                                            <td>-</td>
                                            <td>- (-)</td>
                                            <td>1 (0 Min.)</td>
                                        </tr>
                                        <tr>
                                            <td>Deutsch</td>
                                            <td>Lesen</td>
                                            <td>15.03.2019</td>
                                            <td>-</td>
                                            <td>- (-)</td>
                                            <td>1 (0 Min.)</td>
                                        </tr>
                                        <tr>
                                            <td>Deutsch</td>
                                            <td>Lesen</td>
                                            <td>11.03.2019</td>
                                            <td>10</td>
                                            <td>1 (13)</td>
                                            <td>1 (0 Min.)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </FillHeight>
                    </div>
                </div>
                <div
                    className="test-statistics-popup-footer"
                    id="test-statistics-popup-footer"
                />
            </div>               
         );
    }
    return (<React.Fragment>{state.isLoadComplete ? <React.Fragment>{GetContent(props)}</React.Fragment> : <React.Fragment></React.Fragment>}</React.Fragment>);
};

export default connect(ProgressBarChartBusinessLogic.mapStateToProps)(ProgressBarChart);
