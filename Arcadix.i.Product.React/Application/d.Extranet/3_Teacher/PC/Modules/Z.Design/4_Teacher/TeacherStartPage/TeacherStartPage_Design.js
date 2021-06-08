import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherStartPage/TeacherStartPage.css';

class TeacherStartPage_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClick(e) {
        alert("Clicked", e)
    }
    render() {
        return (
            <div className="startPage oA">
                <div className="startActivatnBlk oA fL">
                    <header>
                        <span className="title disIB">Übersicht & Aktivitäten</span>
                        <div className="drpdwnList disIB hdr">
                            <ul className="dropdown">
                                <li onClick={this.handleClick}>Woche</li>
                            </ul>
                        </div>
                        <button onClick={this.handleClick}>click</button>
                    </header>
                    <div className="colGrid tstRslt fL wid50">
                        <h4 className="colTitle">Orientierungstests</h4>
                        <div className="testDetailsBlock clear">
                            <h5 className="colSubTitle fontBold">In Arbeit</h5>
                            <ul className="pieListResults oA">
                                <li className="clear oA">
                                    <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/pie3.png")} className="fL" />
                                    <span className="fontBold">Test:</span> T–Deutsch–Schreiben–4<br />
                                    Vom Montag 16.2.2016
                                </li>
                                <li className="clear oA">
                                    <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/pie3.png")} className="fL" />
                                    <span className="fontBold">Test:</span> T–Mathematik–V/Z–2<br />
                                    Vom Freitag, 13.2.2016
                                </li>
                            </ul>
                            <button className="btn btnGrn fR seeRsltBtn">Zur Vorbereitung</button>
                        </div>

                        <div className="testDetailsBlock clear">
                            <h5 className="colSubTitle fontBold">Letzte Ereignisse</h5>
                            <ul className="resultLists">
                                <li>Peter Sacher, Mathematik_… {/*<!--<span className="subjctName">Lesen</span>-->*/}<span className="disIB fR">417</span></li>
                                <li>Annette Meier, Deutsch_Spr… <span className="disIB fR">620</span></li>
                                <li>Samu Mülle<span className="disIB fR">526</span></li>
                                <li>Eva Hartmann, Mathematik… <span className="disIB fR">701</span></li>
                            </ul>
                            <button className="btn btnGrn fR seeRsltBtn">Alle Ergebnisse</button>
                        </div>
                    </div>

                    <div className="colGrid highstake fL">
                        <h4 className="colTitle">Übungen</h4>
                        <h5 className="colSubTitle fontBold">In Arbeit</h5>
                        <ul className="pieListResults oA">
                            <li className="clear oA">
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/pie2.png")} className="fL" />
                                <span className="fontBold">Übung:</span> Ü-Mathematik-V/Z-1<br />
                                Vom Dienstag 17.2.2016
                            </li>
                            <li className="clear oA">
                                <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/pie1.png")} className="fL" />
                                <span className="fontBold">Übung:</span> Ü-Deutsch-Schreiben-3<br />
                                Vom Freitag, 13.2.2016
                            </li>
                        </ul>
                        <button className="btn btnDrkGrn fR allBtn">Alle Übungen</button>

                        <div className="testDetailsBlock clear">
                            <h5 className="colSubTitle fontBold">Letzte Ereignisse</h5>
                            <ul className="resultLists">
                                <li>Peter Sacher, Mathematik_…
                                    <div className="fR ptsList">
                                        <span className="pts disIB">60</span>
                                        <span className="pts disIB">72</span>
                                        <span className="disIB fR">82%</span>
                                    </div>
                                </li>
                                <li>Annette Meier, Deutsch_Spr…
                                    <div className="fR ptsList">
                                        <span className="pts disIB">59</span>
                                        <span className="pts disIB">67</span>
                                        <span className="disIB fR">75%</span>
                                    </div>
                                </li>
                                <li>Samu Mülle
                                    <div className="fR ptsList">
                                        <span className="pts disIB">63</span>
                                        <span className="disIB fR">67%</span>
                                    </div>
                                </li>
                                <li>Eva Hartmann, Mathematik…
                                    <div className="fR ptsList">
                                        <span className="pts disIB">45</span>
                                        <span className="pts disIB">44</span>
                                        <span className="disIB fR">66%</span>
                                    </div>
                                </li>
                            </ul>
                            <button className="btn btnDrkGrn fR allBtn">Alle Ergebnisse</button>
                        </div>
                    </div>
                </div>

                <div className="mainInfoBlk oA fL">
                    <header>
                        <span className="title disIB">Meine Infos</span>
                    </header>
                    <div className="mainInfoItem oA">
                        <h4 className="colTitle">Planen</h4>
                        <h5 className="colSubTitle fontBold">Nächste Lernlupe-Lektionen</h5>
                        <h5 className="colSubTitle fontBold">Mittwoch, 17.2.16</h5>
                        <table className="wid100 tmeTblInfo">
                            <tr>
                                <td>07:30–08:15 Uhr</td>
                                <td>Klasse 3a</td>
                                <td>Deutsch</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>07:30–08:15 Uhr</td>
                                <td>Klasse 3a</td>
                                <td>Deutsch</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>07:30–08:15 Uhr</td>
                                <td>Klasse 3a</td>
                                <td>Deutsch</td>
                                <td></td>
                            </tr>
                        </table>
                        <button className="btn btnViolet fR mreInfoBtn clear">Kalender öffnen</button>
                    </div>

                    <div className="mainInfoItem oA news">
                        <h4 className="colTitle">Mitteilungen</h4>
                        <h5 className="colSubTitle fontBold m0">Neuste Mitteilungen</h5>
                        <ul className="newsInfoLsts m0">
                            <li className="clear oA">
                                <span className="fontBold">Samu Müller,</span>16.2.2016 – 16:45<br />
                                Bitte am Montag die Lernbögen mitbr …<br />
                            </li>
                            <li className="clear oA">
                                <span className="fontBold">Lena Eschenbach,</span>13.2.16 – 11:05<br />
                                Sandra und Eva werden Dir helfen die …
                            </li>
                            <li className="clear oA">
                                <span className="fontBold">Lena Eschenbach,</span>13.2.16 – 11:05<br />
                                Sandra und Eva werden Dir helfen die …
                            </li>
                        </ul>
                        <button className="btn btnViolet fR mreInfoBtn clear">Mitteilungen öffnen</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TeacherStartPage_Design);