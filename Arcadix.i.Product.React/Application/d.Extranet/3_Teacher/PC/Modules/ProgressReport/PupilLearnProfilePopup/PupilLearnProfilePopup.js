//React imports
import { connect } from 'react-redux';
import React, { useReducer, useEffect, useState } from 'react';

//Module specific imports
import * as PupilLearnProfilePopup_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/PupilLearnProfilePopup/PupilLearnProfilePopup_Hook';
import PupilLearnProfilePopup_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/PupilLearnProfilePopup/PupilLearnProfilePopup_ModuleProcessor';

//Components used in module.
import ChartOne from '@root/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/PupilLearnProfilePopup/ChartOne';
import ChartTwo from '@root/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/PupilLearnProfilePopup/ChartTwo';


//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
* @name PupilLearnProfilePopup
* @param {object} props props
* @summary This component displays the PupilLearnProfilePopup data.
* @returns {object} div that encapsulated the components with PupilLearnProfilePopup details.
*/
const PupilLearnProfilePopup = (props) => {
    const [Tab, OpenTab] = useState(1);
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilLearnProfilePopup_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["PupilLearnProfilePopup_ModuleProcessor"]: new PupilLearnProfilePopup_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in PupilLearnProfilePopup_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilLearnProfilePopup_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.PupilLearnProfilePopup_ModuleProcessor.Initialize(objContext, objContext.PupilLearnProfilePopup_ModuleProcessor);

    /**
    * @name useEffect
    * @summary useEffect that calls the CalculateHeightsAndWidths everytime the arrFormLinesSubjectData changes.
    */
    useEffect(() => {
        //CalculateHeightsAndWidths(state.arrFormLinesSubjectData);
        // CalculateHeightsAndWidthsTemp(state.arrFormLinesSubjectData);
    }, [state.arrFormLinesSubjectData]);

    /**
    * @name CalculateHeightsAndWidths
    * @param {Array} arrModifiedSubjectData modified subject data with keys "Line" inside the sub-subjects.
    * @summary get appropriate ids and caluclates the heights and width and modifies the dom jsx
    */
    const CalculateHeightsAndWidths = (arrModifiedSubjectData) => {
        let intSubSubjectPadding = 15;
        let arrSubjectData = [];

        arrModifiedSubjectData.forEach(objSubject => {
            let intIntialHeight = 29;
            objSubject["SubSubjects"].forEach(objSubSubject => {
                let intRectSubSubjectHeight = 1;
                let arrResults = objSubSubject["Results"];
                let divSubSubjectLeftBox = document.getElementById('div_SubSubjectLeftBox_' + objSubSubject["SubjectId"]);
                if (divSubSubjectLeftBox) {
                    let strSubSubjectHeight = '56px';
                    if (arrResults.length == 2) {
                        strSubSubjectHeight = '81px';
                    } else if (arrResults.length == 3) {
                        strSubSubjectHeight = '106px';
                    } else if (arrResults.length == 4) {
                        strSubSubjectHeight = '131px';
                    }
                    divSubSubjectLeftBox.style.height = strSubSubjectHeight;
                }
                let lnSubSubjectStartLine = document.getElementById('rct_SubSubjectStartLine' + objSubSubject['SubjectId']);
                if (lnSubSubjectStartLine) {
                    intRectSubSubjectHeight = intRectSubSubjectHeight + intRectSubSubjectHeight;
                    lnSubSubjectStartLine.setAttribute('y', intIntialHeight.toString());
                }
                intIntialHeight = intIntialHeight + intSubSubjectPadding;
                let intTestLabelHeight = 25;
                if (arrResults.length > 0) {
                    let blnIsFirstResult = true;
                    arrResults.forEach(objTest => {
                        let strXforTestResult = CalculateXForResult(objTest['strTestPoints'], objTest["Competency"]).toString();
                        let strYforTest = (intIntialHeight + (intTestLabelHeight / 2)).toString();

                        let dotTestResult = document.getElementById('dotResult_' + objSubSubject['SubjectId'] + '_' + objTest['uTestTokenId']);
                        if (dotTestResult) {
                            dotTestResult.setAttribute('cx', strXforTestResult);
                            dotTestResult.setAttribute('cy', strYforTest);
                            objTest["x"] = strXforTestResult;
                            objTest["y"] = strYforTest;
                            intIntialHeight = intIntialHeight + intTestLabelHeight;
                            if (blnIsFirstResult) {
                                dotTestResult.setAttribute('r', "12");
                                blnIsFirstResult = false;
                            }
                        }
                    });

                    let arrOrientationSubSubjectLines = objSubSubject["Lines"];
                    arrOrientationSubSubjectLines.forEach(objLine => {
                        let line = document.getElementById('line_' + objLine['uLineId']);
                        let objFirstTest = arrResults.filter(x => x["uTestTokenId"] == objLine["uTestTokenId1"])[0];
                        let objSecondTest = arrResults.filter(x => x["uTestTokenId"] == objLine["uTestTokenId2"])[0];
                        if (line) {
                            line.setAttribute('x1', objFirstTest["x"]);
                            line.setAttribute('x2', objSecondTest["x"]);
                            line.setAttribute('y1', objFirstTest["y"]);
                            line.setAttribute('y2', objSecondTest["y"]);
                        }
                    });
                }
                else {
                    intIntialHeight += intTestLabelHeight;
                }
                intIntialHeight += intSubSubjectPadding;
            });

            let svgImage = document.getElementById('svg_' + objSubject['SubjectId']);
            if (svgImage) {
                svgImage.setAttribute("height", intIntialHeight.toString() + "px");
                svgImage.setAttribute("viewBox", "0 0 845 " + (intIntialHeight + 40).toString());
            }
            let rctPink = document.getElementById('rct_lightPinkBg' + objSubject['SubjectId']);
            if (rctPink) {
                rctPink.setAttribute("height", intIntialHeight.toString() + "px");
            }
            objSubject['Orientation_SVGHeight'] = (intIntialHeight + 40).toString() + 'px';
            arrSubjectData = [...arrSubjectData, objSubject];
        });
        dispatch({ type: 'SET_STATE', payload: { blnCalculationOver: true } });
    };

    const CalculateHeightsAndWidthsTemp = (arrModifiedSubjectData) => {
        let intSubSubjectPadding = 20;

        //let blnHideAnimation = false;
        let intTestLabelHeight = 25;
        arrModifiedSubjectData.forEach(objSubject => {
            let tbl = document.getElementById('tbl_' + objSubject['SubjectId']);
            //if (tbl) {
            //    var intCompetencyInterval = ((tbl.offsetWidth - 245) / (this.blnShowSixCompetencies ? 7 : 8));
            //    //245 px is the first td width(for sub subject name and test name), if 6 xompwtwncies then we show 7 columns, other wise 8 columns
            //    blnHideAnimation = true;
            //}
            let intIntialHeight = 30;
            objSubject["SubSubjects"].forEach(objSubSubject => {
                let arrResults = objSubSubject["Results"];


                intIntialHeight += intSubSubjectPadding;

                if (arrResults.length > 0) {
                    let blnIsFirstResult = true;

                    arrResults.forEach(objTest => {
                        let strXforTestResult = CalculateXForResultTemp(objTest['Difference'], objTest["Competency"]).toString();
                        let strYforTest = (intIntialHeight + (intTestLabelHeight / 2)).toString();

                        let dotTestResult = document.getElementById('dotResult_' + objSubSubject['SubjectId'] + '_' + objTest['uTestTokenId']);
                        let rctTestResult = document.getElementById('rctResult_' + objSubSubject['SubjectId'] + '_' + objTest['uTestTokenId']);
                        if (dotTestResult) {
                            dotTestResult.setAttribute('cx', strXforTestResult);
                            dotTestResult.setAttribute('cy', strYforTest);
                            objTest["x"] = strXforTestResult;
                            objTest["y"] = strYforTest;
                            intIntialHeight += intTestLabelHeight;
                            if (rctTestResult) {
                                rctTestResult.setAttribute("x", (parseFloat(strXforTestResult) - 9).toString());
                                rctTestResult.setAttribute("y", (parseFloat(strYforTest) - 9).toString());
                            }
                            if (blnIsFirstResult) {
                                dotTestResult.setAttribute('r', "13");
                                if (rctTestResult) {
                                    rctTestResult.setAttribute("x", (parseFloat(strXforTestResult) - 15).toString());
                                    rctTestResult.setAttribute("y", (parseFloat(strYforTest) - 15).toString());
                                    rctTestResult.setAttribute("height", "30");
                                    rctTestResult.setAttribute("width", "30");
                                }
                                blnIsFirstResult = false;
                            }
                        }
                    });

                    let arrOrientationSubSubjectLines = objSubSubject["Lines"];
                    arrOrientationSubSubjectLines.forEach(objLine => {
                        let line = document.getElementById('line_' + objLine['uLineId']);
                        ///////let line: HTMLHtmlElement = b.querySelector('line_' + objLine['uLineId']);
                        let objFirstTest = arrResults.filter(x => x["uTestTokenId"] == objLine["uTestTokenId1"])[0];
                        let objSecondTest = arrResults.filter(x => x["uTestTokenId"] == objLine["uTestTokenId2"])[0];
                        if (line) {
                            line.setAttribute('x1', objFirstTest["x"]);
                            line.setAttribute('x2', objSecondTest["x"]);
                            line.setAttribute('y1', objFirstTest["y"]);
                            line.setAttribute('y2', objSecondTest["y"]);
                        }
                    });
                }
                else {
                    intIntialHeight += intTestLabelHeight;
                }
                intIntialHeight += intSubSubjectPadding;
            });

            let svgImage = document.getElementById('svg_' + objSubject['SubjectId']);
            //////let svgImage: HTMLHtmlElement = b.querySelector('svg_' + objSubject['SubjectId']);
            if (svgImage) {
                svgImage.setAttribute("height", intIntialHeight.toString() + "px");
                tbl.style.height = (intIntialHeight.toString() + "px");
            }

            objSubject['Orientation_SVGHeight'] = (intIntialHeight + 40).toString() + 'px';
        });
        //this.SvgMouseOver(null);

        //this.blnHideView = false;

        //if (blnHideAnimation)
        //    this.onLoadComplete.emit(this);
        dispatch({ type: 'SET_STATE', payload: { blnCalculationOver: true } });
    };

    /**
    * @name CalculateXForResult
    * @param {Integer} intResult Result data
    * @param {Integer} intCompetency Competency data
    * @summary Calculates the X for result
    * @returns {Integer} Returns the X value.
    */
    const CalculateXForResult = (intResult, intCompetency) => {
        let intReturn = 0;
        let intCompetencyInterval = 102;//this.blnShowSixCompetencies ? 116.57 : 102;
        intReturn = 13 + (intCompetency * intCompetencyInterval) + (intCompetencyInterval / 2);
        return intReturn.toString();
    };

    /**
    * @name CalculateXForResult
    * @param {Integer} intResult Result data
    * @param {Integer} intCompetency Competency data
    * @summary Calculates the X for result
    * @returns {Integer} Returns the X value.
    */
    const CalculateXForResultTemp = (intDifference, intCompetency) => {
        let intReturn = 0;
        let intCompetencyInterval = 102;//this.blnShowSixCompetencies ? 116.57 : 102;
        intReturn = 245 + (intCompetency * intCompetencyInterval) + (intDifference * intCompetencyInterval);
        return intReturn.toString();
    };

    /**
    * @name DisplayResult
    * @param {String} strCircleId Circle Id
    * @param {object} objResult Result data
    * @param {String} baloonSubjectId Baloon Subject id
    * @param {String} strSubjectId Subject id
    * @summary Displays the results in the baloon
    */
    let DisplayResult = (strCircleId, objResult, baloonSubjectId, strSubjectId) => {
        dispatch({ type: 'SET_STATE', payload: { baloonSubjectId: baloonSubjectId, objResult: objResult } });
        let dotResultElement = document.getElementById(strCircleId);
        if (dotResultElement) {
            let baloonElement = document.getElementById(baloonSubjectId);
            if (baloonElement) {
                baloonElement.style.top = (Number(dotResultElement["attributes"]["cy"]["value"]) - 8).toString() + 'px';
                baloonElement.style.left = (
                    13
                    + document.getElementById('div_LeftChart_' + strSubjectId).offsetWidth
                    + parseFloat(dotResultElement["attributes"]["cx"]["value"])
                    + parseFloat(dotResultElement["attributes"]["r"]["value"])
                ).toString() + 'px';
            }
        }
    };

    /**
    * @name GetSubjectProfile
    * @param {object} objTextResource Text Resource object
    * @param {Array} arrSubjectData Subject id
    * @summary Returns the JSX for each of the subjects profile (charts)
    * @returns {object} jsx, React.Fragment
    */
    const GetSubjectProfile = (objTextResource, arrSubjectData) => {
        let Events = {
            OnMouseOver: (strCircleId, objResult, baloonSubjectId, strSubjectId) => { DisplayResult(strCircleId, objResult, baloonSubjectId, strSubjectId); },
            OnMouseLeave: () => { dispatch({ type: 'SET_STATE', payload: { baloonSubjectId: -1 } }); }
        };
        return (
            arrSubjectData.map(objSubjectData => {
                return (
                    <React.Fragment>
                        <table className="chart-table-header">
                            <tr>
                                <td>{objSubjectData["SubjectName"]}</td>
                                <td>{Localization.TextFormatter(objTextResource, 'NumberOfTests')}{objContext.PupilLearnProfilePopup_ModuleProcessor.GetTestCount(objSubjectData)}</td>
                                <td>{Localization.TextFormatter(objTextResource, 'LatestTest')}{objContext.PupilLearnProfilePopup_ModuleProcessor.GetFormattedDate(objSubjectData["dtLatestTestExecution"])}</td>
                            </tr>
                        </table>
                        <div className="chart-image">
                            <div className="svg-baloon" id={"div_Result_Popup" + objSubjectData["SubjectId"]} hidden={!("div_Result_Popup" + objSubjectData.SubjectId === state.baloonSubjectId)}>
                                <div>{state.objResult.dtTestExecution}</div>
                                <div>{Localization.TextFormatter(objTextResource, 'PointsScored')}<b>{state.objResult.strTestPoints}</b></div>
                                <div>{Localization.TextFormatter(objTextResource, 'CompetencyLevel')}{Localization.TextFormatter(objTextResource, state.objResult.Competency)} :{state.objResult.CompetencyLevel}</div>
                            </div>
                            <div className="chart-image-flex" >
                                <div className="chart-left" id={"div_LeftChart_" + objSubjectData["SubjectId"]}>
                                    <div className="competence-header">
                                        {Localization.TextFormatter(objTextResource, 'CompetencyLevel')}
                                    </div>
                                    {
                                        objSubjectData["SubSubjects"].map((objSubSubjectData) => {
                                            return (
                                                <React.Fragment>
                                                    <div className="text-block-flex" id={"div_SubSubjectLeftBox_" + objSubSubjectData["SubjectId"]}>
                                                        <div className="block-left" id={"txt_SubName_" + objSubSubjectData["SubjectId"]}>
                                                            <h3>{objSubSubjectData["SubjectName"]}</h3>
                                                        </div>
                                                        <div className="block-right">
                                                            {
                                                                objSubSubjectData["Results"].map((objResultData, intIndex) => {
                                                                    if (intIndex === 0) {
                                                                        return (
                                                                            <span><strong>{objResultData["strTestName"]}</strong></span>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <span>{objResultData["strTestName"]}</span>
                                                                        );
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                                <div className="svg-image">
                                    <ChartOne objSubject={objSubjectData} Events={Events} ParentSubjectId={"div_Result_Popup" + objSubjectData["SubjectId"]} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })
        );
    };


    /**
    * @name GetTestStastic
    * @param {object} objTextResource Text Resource object
    * @param {Array} arrParentSubject ParentSubject TestStatistic data
    * @summary Returns the JSX for each of the TestStatistic data (charts)
    * @returns {object} jsx, React.Fragment
    */
    const GetTestStastic = (objTextResource, arrParentSubject) => {
        return (
            arrParentSubject.map(objParentSubject => {
                return (
                    <React.Fragment>
                        {
                            objParentSubject["SubSubjectDetails"].length > 0 ?
                                <div>
                                    <table className="chart-table-header">
                                        <tr>
                                            <td>{objParentSubject["ParentSubjectName"]}</td>
                                            <td>
                                                {Localization.TextFormatter(objTextResource, 'SolvedTasks')}
                                                <span>
                                                    {
                                                        objParentSubject["TotalTasks"] > 0 ? objParentSubject["TotalTasks"] : " -"
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                {Localization.TextFormatter(objTextResource, 'FinalAreaOfResponsibility')}
                                                <span>
                                                    {
                                                        objParentSubject["LatestGroupName"] ? objParentSubject["LatestGroupName"] : " -"
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                {Localization.TextFormatter(objTextResource, 'LastActivity')}
                                                <span>
                                                    {
                                                        objParentSubject["LatestTestExecutionDate"] ? objContext.PupilLearnProfilePopup_ModuleProcessor.GetFormattedDate(objParentSubject["LatestTestExecutionDate"])
                                                            : " -"
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div >
                                : <React.Fragment />
                        }
                        {
                            objParentSubject["SubSubjectDetails"].length > 0 ?
                                <ChartTwo
                                    objSubject={objParentSubject}
                                    arrInterval={objContext.PupilLearnProfilePopup_ModuleProcessor.GetIntervalsForSubjects(objParentSubject)}
                                />
                                : <React.Fragment />
                        }
                    </React.Fragment>
                );
            })
        );
    };

    const GetSubjectProfileTemp = (objTextResource, arrSubjectData) => {
        let Events = {
            OnMouseOver: (strCircleId, objResult, baloonSubjectId, strSubjectId) => { DisplayResultTemp(strCircleId, objResult, baloonSubjectId, strSubjectId); },
            OnMouseLeave: () => { dispatch({ type: 'SET_STATE', payload: { baloonSubjectId: -1 } }); }
        };
        let dom = arrSubjectData.map(objSubject => {
            return (
                <React.Fragment>
                    <div id={"div_Orientation_" + objSubject['SubjectId']}>
                        <div>
                            <table className="chart-table-header">
                                <tr>
                                    <td>{objSubject["SubjectName"]}</td>
                                    <td>
                                        {Localization.TextFormatter(objTextResource, 'NumberOfTests')}
                                        <span>{objContext.PupilLearnProfilePopup_ModuleProcessor.GetTestCount(objSubject)}</span>
                                    </td>
                                    <td style={{ "border-right": "0px" }}>
                                        {Localization.TextFormatter(objTextResource, 'LatestTest')}
                                        <span>{objContext.PupilLearnProfilePopup_ModuleProcessor.GetFormattedDate(objSubject["dtLatestTestExecution"])}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="chart-image">
                            <div id={"div_Result_Popup" + objSubject['SubjectId']} className="svg-baloon"
                                //hidden="objSubject['cShowResultPopup']!='Y'"
                                hidden={!("div_Result_Popup" + objSubject.SubjectId === state.baloonSubjectId)}
                            >
                                <div>{state.objResult.dtTestExecution}</div>
                                <div>{Localization.TextFormatter(objTextResource, 'PointsScored')}: <b>{state.objResult.strTestPoints}</b></div>
                                <div>{Localization.TextFormatter(objTextResource, state.objResult.Competency)} :{state.objResult.CompetencyLevel}</div>
                            </div>
                        </div>
                        <div className="chart-image-flex" id={"div_ChartImage_" + objSubject['SubjectId']}>
                            <div className="svg-image">
                                <table style={{
                                    width: "100%",
                                    height: objContext.PupilLearnProfilePopup_ModuleProcessor.GetTableHeight(objSubject) + 'px',
                                    background: "rgb(239, 239, 239)",
                                    borderTop: "1px solid gainsboro",
                                    tableLayout: "fixed",
                                    borderCollapse: "collapse",
                                    borderSpacing: "0px"
                                    //height: "194px"
                                }}
                                    id={"tbl_" + objSubject['SubjectId']}
                                    mouseover={"SvgMouseOver($event)"}
                                >
                                    <tbody>
                                        <tr>
                                            <td className="competence-header">Kompetenzniveau</td>
                                            {
                                                state.arrCompetencyInterval.map(strCompetencyInterval => {
                                                    return (
                                                        <td>{strCompetencyInterval}</td>
                                                    );
                                                })
                                            }
                                        </tr>
                                        {
                                            objSubject['SubSubjects'].map(objSubSubject => {
                                                return (
                                                    <tr id={"tr_" + objSubSubject['SubjectId']} >
                                                        <td>
                                                            <div className="text-block-flex " id={'div_SubSubjectLeftBox_' + objSubSubject['SubjectId']}>
                                                                <div className="block-left" id={"txt_SubName_" + objSubSubject['SubjectId']} y="27">
                                                                    <h3>{objSubSubject['SubjectName']}</h3>
                                                                </div>
                                                                <div className="block-right">
                                                                    {
                                                                        objSubSubject["Results"].length > 0 ?
                                                                            objSubSubject["Results"].map((objResult, iResultIndex) => {
                                                                                if (iResultIndex == 0) {
                                                                                    return <span><strong>{objResult['strTestName']}</strong></span>;
                                                                                }
                                                                                if (iResultIndex != 0) {
                                                                                    return <span>{objResult['strTestName']}</span>;
                                                                                }
                                                                            })
                                                                            : <React.Fragment />
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {
                                                            state.arrCompetencyInterval.map(objCompetencyInterval => {
                                                                return (
                                                                    <td>
                                                                        <div className="circles-container" id="chartCol1" style={{ top: "0px", bottom: "0px", left: "0px", right: "0px" }}>
                                                                        </div>
                                                                    </td>
                                                                );
                                                            })
                                                        }
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                <svg style={{
                                    width: "100%",
                                    height: objContext.PupilLearnProfilePopup_ModuleProcessor.GetTableHeight(objSubject) + 'px',
                                    position: "absolute", left: 0, right: 0, bottom: 0, top: 0, zIndex: 9999, overflow: "visible"
                                }}
                                    id={"svg_" + objSubject['SubjectId']}
                                    mouseover="SvgMouseOver($event)"
                                >
                                    {
                                        objSubject['SubSubjects'].map((objOSubSubject, intSubSubjectIndex) => {
                                            return (
                                                <React.Fragment>
                                                    {
                                                        objOSubSubject['Lines'] ?
                                                            objOSubSubject['Lines'].map(objLine => {
                                                                let objLineScales = objContext.PupilLearnProfilePopup_ModuleProcessor.GetLineDimensions(objLine, objOSubSubject['Results']);
                                                                return <line id={'line_' + objLine['uLineId']}
                                                                    style={{
                                                                        fill: "none",
                                                                        stroke: "#3562B7",
                                                                        strokeWidth: 3,
                                                                        strokeMiterlimit: 10
                                                                    }}
                                                                    x1={objLineScales.x1} y1={objLineScales.y1} x2={objLineScales.x2} y2={objLineScales.y2}
                                                                />;
                                                            })
                                                            : <React.Fragment />
                                                    }
                                                    {
                                                        objOSubSubject['Results'].length > 0 ?
                                                            objOSubSubject['Results'].map((objResult, intResultIndex) => {
                                                                let objCirDim = objContext.PupilLearnProfilePopup_ModuleProcessor.GetCircleRectDimensions(objContext, objResult, intResultIndex, intSubSubjectIndex);
                                                                let objRectDim = objContext.PupilLearnProfilePopup_ModuleProcessor.GetCircleRectDimensions(objContext, objResult, intResultIndex, intSubSubjectIndex, true);

                                                                return (
                                                                    <React.Fragment>
                                                                        <circle id={'dotResult_' + objOSubSubject['SubjectId'] + '_' + objResult['uTestTokenId']}
                                                                            style={{ fill: "#3562B7", cursor: "pointer" }}
                                                                            cx={objCirDim.cx} cy={objCirDim.cy} r={objCirDim.r}
                                                                            // mouseover="DisplayResult(objResult,objOSubSubject['SubjectId'],objSubject,$event)"
                                                                            onMouseOver={() => { Events.OnMouseOver("dotResult_" + objOSubSubject["SubjectId"] + '_' + objResult["uTestTokenId"], objResult, "div_Result_Popup" + objSubject["SubjectId"], objSubject.SubjectId); }}
                                                                            onMouseLeave={() => { Events.OnMouseLeave(); }}
                                                                        />
                                                                        {false ? //"blnIsTabletView"
                                                                            <rect id={'rctResult_' + objOSubSubject['SubjectId'] + '_' + objResult['uTestTokenId']}
                                                                                x={objRectDim.x} y={objRectDim.y} width={objRectDim.width} height={objRectDim.height} fill="transparent"
                                                                                click="DisplayResult_Click(objResult,objOSubSubject['SubjectId'],objSubject,$event)"
                                                                            /> : <React.Fragment />}
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                            : <React.Fragment />
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </svg>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        });
        console.log("dom", dom);
        return dom;
    };

    /**
    * @name DisplayResultTemp
    * @param {String} strCircleId Circle Id
    * @param {object} objResult Result data
    * @param {String} baloonSubjectId Baloon Subject id
    * @param {String} strSubjectId Subject id
    * @summary Displays the results in the baloon
    */
    let DisplayResultTemp = (strCircleId, objResult, baloonSubjectId, strSubjectId) => {
        dispatch({ type: 'SET_STATE', payload: { baloonSubjectId: baloonSubjectId, objResult: objResult } });
        let dotResultElement = document.getElementById(strCircleId);
        if (dotResultElement) {
            let baloonElement = document.getElementById(baloonSubjectId);
            if (baloonElement) {
                baloonElement.style.top = (Number(dotResultElement["attributes"]["cy"]["value"]) - 9).toString() + 'px';
                baloonElement.style.left = (
                    4
                    //+ document.getElementById('div_LeftChart_' + strSubjectId).offsetWidth
                    + parseFloat(dotResultElement["attributes"]["cx"]["value"])
                    + parseFloat(dotResultElement["attributes"]["r"]["value"])
                ).toString() + 'px';
                baloonElement.className = "svg-baloon";
            }
        }
    };

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, div
    */
    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        let arrData = state.arrFormLinesSubjectData;
        let objPupil = props.Data.objPupil;
        return (
            <div className="modal" id="ProgressBarChart">
                <div className="popup-box progress-bar-popup" style={{ width: "98%", height: "98%" }}>
                    <div className="progressbar-chart" id="ProgressBarChartHeader">
                        <div className="progressbar-chart-popup-header">
                            <h2>{objPupil["vName"]}</h2>
                            <span className="close" onClick={() => { Popup.ClosePopup(props.Id); }}>
                                {Localization.TextFormatter(objTextResource, 'Close')}
                                <img src={CloseImage} />
                            </span>
                        </div>

                        <div className="ul-block" id="ulBlock">
                            <div className="top-head-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Class')}: {props.Data.objSelectedClass["vClassName"]}</span>
                                <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}{objContext.PupilLearnProfilePopup_ModuleProcessor.GetSchoolYear(objContext)}</span>
                            </div>
                            <div className="top-head-right">
                                <span>{Localization.TextFormatter(objTextResource, 'EvaluationGeneratedOn')}{objContext.PupilLearnProfilePopup_ModuleProcessor.GetCurrentDate()}</span>
                            </div>

                        </div>

                        <div className="progressbar-chart" id="ProgressBarChartTable">
                            <ul className="tablinks" id="ProgressBarChartTabsHeader">
                                <li className={Tab == 1 ? "active" : ""} onClick={() => OpenTab(1)}>
                                    {Localization.TextFormatter(objTextResource, 'OrientationTest')}
                                </li>
                                <li className={Tab == 2 ? "active" : ""} onClick={() => OpenTab(2)}>
                                    {Localization.TextFormatter(objTextResource, 'LearningTest')}
                                </li>
                            </ul>

                            <div className="tabscontent" style={{ display: Tab == 1 ? "block" : "none" }} >
                                <div className="progressbar-chart-table">
                                    <div className="progressbar-chart-table-block" id="ProgressBarChartTab1">
                                        <div className="chart-header">
                                            <WrapperComponent
                                                ComponentName={"FillHeight"}
                                                Id="PupilLearnLupeProfile_FillHeight" Meta={{ HeaderIds: ["Header", "outletBand"], FooterIds: ["AnalysisFooter"] }} ParentProps={{ ...props }} >
                                                <div className="chart-header-flex"><h2>{Localization.TextFormatter(objTextResource, 'OrientationTest')}</h2></div>
                                                {arrData.length > 0 ? GetSubjectProfileTemp(objTextResource, arrData) : <React.Fragment />}
                                            </WrapperComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tabscontent" style={{ display: Tab == 2 ? "block" : "none" }} >
                                <div className="progressbar-chart-table">
                                    <div className="progressbar-chart-table-block" id="ProgressBarChartTab1">
                                        <div className="chart-header">
                                            <WrapperComponent
                                                ComponentName={"FillHeight"}
                                                Id="PupilLearnLupeProfile_FillHeight" Meta={{ HeaderIds: ["Header", "outletBand"], FooterIds: ["AnalysisFooter"] }} ParentProps={{ ...props }} >
                                                <div className="chart-header-flex"><h2>{Localization.TextFormatter(objTextResource, 'LearningTest')}</h2></div>
                                                {state.arrTestStastics.length > 0 ? GetTestStastic(objTextResource, state.arrTestStastics) : <React.Fragment />}
                                            </WrapperComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tabscontent" style={{ display: Tab == 2 ? "block" : "none" }} >
                                <div className="auswertungen-tab-flex" id="ProgressBarChartTab2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name Connector
* @summary connects component to store.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilLearnProfilePopup_ModuleProcessor.StoreMapList()))(PupilLearnProfilePopup);



/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilLearnProfilePopup_ModuleProcessor; 