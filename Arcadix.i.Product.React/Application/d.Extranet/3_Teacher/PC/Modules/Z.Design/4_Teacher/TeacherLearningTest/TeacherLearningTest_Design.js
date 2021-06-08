import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherLearningTest/TeacherLearningTest.css';

class TeacherLearningTest_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="learningTestPage">
                <div className="navTools oA">
                    <div className="selectionDrpdwn fL">
                        <label>Klasse/n:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>Alle</li>
                            </ul>
                        </div>
                    </div>
                    <div className="selectionDrpdwn fL">
                        <label>SuS:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>Alle</li>
                            </ul>
                        </div>
                    </div>
                    <div className="selectionDrpdwn fL">
                        <label>Fach:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>Alle</li>
                            </ul>
                        </div>
                    </div>
                    <button className="btn btnDrkGrn fR searchBtn">Anwenden</button>
                </div>

                <h2 className="pageTitle m0">Lernende (23)</h2>

                <div className="selectDateRow oA">
                    <div className="selectDate fL">
                        <img className="arrowIcnBtn" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/angle_left.png")} />
                        <div className="showDate disIB rel">
                            <span className="fontBold">KW 9: </span>27.2. – 3.3.2017
                            <img className="arrowIcnBtn abs" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/angle_down.png")} />
                        </div>
                        <img className="arrowIcnBtn" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/angle_right.png")} />
                    </div>
                    <div className="filterDrpdwn fR">
                        <ul className="dropdown">
                            <li>Woche</li>
                        </ul>
                    </div>
                </div>

                <div className="tableSection clear">
                    <table className="pupilTestDetailsTbl wid100">
                        <tr>
                            <th>Titel</th>
                            <th>Fach</th>
                            <th>Bereich</th>
                            <th>Generiert am</th>
                            <th>Klasse</th>
                            <th>Aufgaben</th>
                            <th>Status</th>
                            <th style={{ width: 50 }}></th>
                        </tr>
                        <tr>
                            <td className="fontBold">Anna Meier</td>
                            <td>DE</td>
                            <td>Lesen 3</td>
                            <td>03.03.17</td>
                            <td>4a</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/rocket.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnGrn grdBtn">Anzeigen </button></td>
                        </tr>
                        <tr>
                            <td className="fontBold">Beat Szabo</td>
                            <td>DE</td>
                            <td>Lesen 3</td>
                            <td>03.03.17</td>
                            <td>5b</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnGrn grdBtn">Anzeigen</button></td>
                        </tr>
                        <tr>
                            <td className="fontBold">Daniela Adler</td>
                            <td>DE</td>
                            <td>Zahlen 2</td>
                            <td>03.03.17</td>
                            <td>4a</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/rocket.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnGrn grdBtn">Anzeigen</button></td>
                        </tr>
                        <tr>
                            <td>Fabiana Ledergerber</td>
                            <td>DE</td>
                            <td>Hören 2</td>
                            <td>28.02.17</td>
                            <td>5b</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/rocket.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnGrn grdBtn">Anzeigen</button></td>
                        </tr>
                        <tr>
                            <td>Konrad Eichenberger</td>
                            <td>DE</td>
                            <td>Lesen 2</td>
                            <td>28.02.17</td>
                            <td>4a</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/process.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnGrn grdBtn">Anzeigen</button></td>
                        </tr>
                        <tr>
                            <td>Melanie Gähler</td>
                            <td>MA</td>
                            <td>Zahlen 2</td>
                            <td>28.02.17</td>
                            <td>4a</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/process.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnGrn grdBtn">Anzeigen</button></td>
                        </tr>
                        <tr>
                            <td>Oliver Krug</td>
                            <td>MA</td>
                            <td>Zahlen 2</td>
                            <td>28.02.17</td>
                            <td>4a</td>
                            <td>15</td>
                            <td>
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/process.png")} />
                            </td>
                            <td style={{ width: 50 }}><button className="btn btnLightGreen grdBtn">Anzeigen</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(TeacherLearningTest_Design);