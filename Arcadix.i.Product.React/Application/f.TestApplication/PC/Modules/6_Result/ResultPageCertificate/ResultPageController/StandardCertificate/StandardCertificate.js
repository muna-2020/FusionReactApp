//React Related Imports
import * as React from 'react';

/**
 * @name ResultPageText
 * @param {object} props props object
 * @summary Result Page Layout
 */
const StandardCertificate = (props) => {


    const GetEmogiResult = () => {

        //var EmogiResult = props.TestState.TestResult.EmogiDisplay;
        //var intTasks = props.TestState.TotalTasks;
        //EmogiResult.map((intTasks) => {
        //    for (var i = 0; i <= intTasks.CorrectObject; i++) {
        //        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-green.png'} alt="" />
        //    }
        //    for (var i = 0; i <= intTasks.WrongObject; i++) {
        //        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-pink.png'} alt="" />
        //    }
        //    for (var i = 0; i <= intTasks.NotAnsweredObject; i++) {
        //        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-black.png'} alt="" />
        //    }
        //})
    }

    return (
        <div className="result-page-main-wrapper">
            <div className="result-page-header">
                <div className="header-text">
                    <img src="./images/logo.jpg" alt="" />
                </div>
                <div className="close-button">
                    <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/excel_icon.gif'} alt="" />
                    <span>Testprotokoll</span>
                </div>
            </div>
            <div className="title">
                <span>Auswertung</span>
            </div>
            <div className="result-page-container">
                <div className="row">
                    <div className="col-6">
                        <table className="result-table">
                            {props.TestState.TestResult ?
                              < tbody > 
                                <tr>
                                    <td className="result">
                                        <div>Anzahl Aufgaben:</div>
                                        <span className="blue-text">{props.TestState.TestResult.TaskResult.TotalTask}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result">
                                        <div>Vollständig richtig:</div>
                                        <span className="blue-text">{props.TestState.TestResult.TaskResult.TotalTaskCorrect}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result">
                                        <div>Teils richtig:</div>
                                        <span className="blue-text">{props.TestState.TestResult.TaskResult.TaskPartiallyCorrect}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result">
                                        <div>Vollständig falsch:</div>
                                        <span className="blue-text">{props.TestState.TestResult.TaskResult.TaskWrong}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result">
                                        <div>Nicht gelöst:</div>
                                        <span className="blue-text">{props.TestState.TestResult.TaskResult.NotAnswered}</span>
                                    </td>
                                </tr>
                            </tbody> : ""}
                        </table>
                    </div>
                    <div className="col-6">
                        <table className="result-table">
                            <tbody>
                                <tr>
                                    <td className="result w-260">
                                        <div>Max. mögliche Punktzahl:</div>
                                        <span className="blue-text">23</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result w-260">
                                        <div>Punkte:</div>
                                        <span className="blue-text">0</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result w-260">
                                        <div>Note:</div>
                                        <span className="blue-text">1</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result w-260">
                                        <div>Notenformel:</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="result w-260">
                                        <div className="blue-text">(erzielte Punktezahl/max. Punktezahl) * 5+1</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="blue-strip">
                </div>
            </div>
            <div className="container">
                <table className="tasks-table">
                    <thead>
                        <tr>
                            <th className="blue-title">Aufgaben/Teilaufgaben</th>
                            <th>Punkteverteilung</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">1</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">2</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">3</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">4</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">5</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">6</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">7</span>
                                    <div className="icons">
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="data">
                                    <span className="circle">8</span>
                                    <div className="icons">
                                        {GetEmogiResult()}   
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>0 Pkt.</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="blue-strip">
                </div>
            </div>
            <div className="container">
                <div className="blue-title">
                    <span>Legende</span>
                </div>
                <div className="captions">
                    <div className="icons">
                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-green.png'} alt="" />
                        <span>richtig</span>
                    </div>
                    <div className="icons">
                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-yellow.png'} alt="" />
                        <span>richtig im zweiten Versuch</span>
                    </div>
                    <div className="icons">
                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-pink.png'} alt="" />
                        <span>falsch</span>
                    </div>
                    <div className="icons">
                        <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/ResultResponse/emoji-dark.png'} alt="" />
                        <span>nicht gelöst</span>
                    </div>
                </div>
                <div className="captions">
                    <div className="icons">
                        <img src="./images/nr.png" alt="" className="nr-img" />
                        <span>Klicke auf die Nummber oben, um die Frage und die richtige Antwort zu sehen</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StandardCertificate;