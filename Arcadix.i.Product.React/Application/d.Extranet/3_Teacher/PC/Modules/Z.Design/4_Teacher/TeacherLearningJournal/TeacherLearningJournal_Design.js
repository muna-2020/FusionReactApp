import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherLearningTest/TeacherLearningTest.css';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherLearningJournal/TeacherLearningJournal.css';

class TeacherLearningJournal_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="learningJournallPage">
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
                    <div className="selectionDrpdwn fL">
                        <label>Prozessschritt:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>Kommentare</li>
                            </ul>
                        </div>
                    </div>
                    <button className="btn btnDrkGrn fR searchBtn">Anwenden</button>
                </div>

                <h2 className="pageTitle m0">Kommentare (7)</h2>

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
                            <th>Vorname<img className="updwnIcn vam" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/arrange_icon.png")} /></th>
                            <th>Nachname<img className="updwnIcn vam" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/arrange_icon.png")} /></th>
                            <th>Klasse<img className="updwnIcn vam" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/arrange_icon.png")} /></th>
                            <th>Fach<img className="updwnIcn vam" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/arrange_icon.png")} /></th>
                            <th>Erstellt für</th>
                            <th>Slebsteinschätzung</th>
                            <th>Kommentar</th>
                            <th style={{ width: 20 }}><img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/arrowup_dwn.png")} /></th>
                        </tr>
                        <tr>
                            <td>Damian</td>
                            <td>Hochreuter</td>
                            <td>5b</td>
                            <td>MA</td>
                            <td>28.2.17</td>
                            <td>1.3.17<img className="checkIcon rel" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} /></td>
                            <td><button className="btn btnOrnge grdBtn">Anzeigen </button></td>
                            <td style={{ width: 20 }}>(0)</td>
                        </tr>
                        <tr>
                            <td>Daniela</td>
                            <td>Adler</td>
                            <td>5b</td>
                            <td>MA</td>
                            <td>28.2.17</td>
                            <td>2.3.17<img className="checkIcon rel" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} /></td>
                            <td><button className="btn btnOrnge grdBtn">Anzeigen </button></td>
                            <td style={{ width: 20 }}>(0)</td>
                        </tr>
                        <tr>
                            <td>Fabiana</td>
                            <td>Ledergerber</td>
                            <td>5b</td>
                            <td>MA</td>
                            <td>28.2.17</td>
                            <td>2.3.17<img className="checkIcon rel" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} /></td>
                            <td><button className="btn btnOrnge grdBtn">Anzeigen </button></td>
                            <td style={{ width: 20 }}>(0)</td>
                        </tr>
                        <tr>
                            <td>Konrad</td>
                            <td>Eichenberger</td>
                            <td>4a</td>
                            <td>DE</td>
                            <td>2.3.17</td>
                            <td>5.3.17<img className="checkIcon rel" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} /></td>
                            <td><button className="btn btnOrnge grdBtn">Anzeigen </button></td>
                            <td style={{ width: 20 }}>(1)</td>
                        </tr>
                        <tr>
                            <td>Rex</td>
                            <td>Gildo</td>
                            <td>4a</td>
                            <td>DE</td>
                            <td>2.3.17</td>
                            <td>27.2.17<img className="checkIcon rel" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} /></td>
                            <td><button className="btn btnOrnge grdBtn">Anzeigen </button></td>
                            <td style={{ width: 20 }}>(0)</td>
                        </tr>
                        <tr>
                            <td>Oliver</td>
                            <td>Krug</td>
                            <td>5b</td>
                            <td>MA</td>
                            <td>28.2.17</td>
                            <td>2.3.17<img className="checkIcon rel" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/check.png")} /></td>
                            <td><button className="btn btnOrnge grdBtn">Anzeigen </button></td>
                            <td style={{ width: 20 }}>(2)</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(TeacherLearningJournal_Design);