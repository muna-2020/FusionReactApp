import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherNews/TeacherNews.css';

class TeacherNews_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="newsBoardPage">
                {/*<!--LEFT COLUMN-->*/}
                <div className="lftCol fL">
                    <div className="searchRow">
                        <input type="text" className="searchIn wid100" placeholder="Suchen" />
                        <button className="btn btnBrwn addBtn">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/pluswhite.svg")} className="plsIcn vam" />
                            Neue Gruppe
                        </button>
                    </div>
                    <div className="classNameLists">  </div>
                    <div className="conversationLists">
                        <div className="conversationItem csrP p10 oA">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/icon_fish.png")} className="fL avatarIcn" width="60" height="60" />
                            <span className="fR msgTime">1:43</span>
                            <h6 className="m0 fontBold">Corina Bühler (1)</h6>
                            <p className="m0">Meine Antwort auf Deine Frage lautet…</p>
                        </div>
                        <div className="conversationItem csrP p10 oA">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/icon_zebra.png")} className="fL avatarIcn" width="60" height="60" />
                            <span className="fR msgTime">6:58</span>
                            <h6 className="m0 fontBold">Gruppe Vulkan (1)</h6>
                            <p className="m0">Morgen wird die Lava dampen, lorem…</p>
                        </div>
                        <div className="conversationItem csrP p10 oA">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/icon_lion.png")} className="fL avatarIcn" width="60" height="60" />
                            <span className="fR msgTime">12:23</span>
                            <h6 className="m0">Elke Huber (1)</h6>
                            <p className="m0">Meine Antwort auf Deine Frage lautet…</p>
                        </div>
                        <div className="conversationItem csrP p10 oA">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/icon_fish.png")} className="fL avatarIcn" width="60" height="60" />
                            <span className="fR msgTime">6:10</span>
                            <h6 className="m0">Bella Ledergerber</h6>
                            <p className="m0">Weine nicht Rosita-Kind, weil wir uns…</p>
                        </div>
                        <div className="conversationItem csrP p10 oA">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/icon_zebra.png")} className="fL avatarIcn" width="60" height="60" />
                            <span className="fR msgTime">5:40</span>
                            <h6 className="m0">Gruppe Zimtstern</h6>
                            <p className="m0">Bald wird alles wieder so schön wie es…</p>
                        </div>
                    </div>
                </div>

                {/*<!--RIGHT COLUMN-->*/}
                <div className="rghtCol fL rel">
                    {/*<!--<div className="infoMsg abs">
                            <p className="wid100 tal">
                                Keine Nachrichten ausgewählt
                       </p>
                        </div>-->*/}
                    <div className="chtBlock">
                        <header className="oA">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/icon_fish.png")} className="fL" />
                            <span className="disIB">Corina Bühler</span>
                        </header>
                        <div className="chtMsgs oA">
                            <div className="fR rel clear rghtMsg">
                                <span className="msgTime fR">Heute 11:23</span>
                                <ul className="msgFrwrdIcons abs">
                                    <li><img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/cross_small.png")} /></li>
                                    <li><img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/forward.png")} /></li>
                                </ul>
                                <div className="sentMsg msgTxt clear">
                                    <p className="m0">Meine Antwort auf Deine Frage lautet, es packte seine sieben Versalien, schob sich sein Brot in den Gürtel und machte sich.</p>
                                </div>
                            </div>
                            <div className="fL rel clear lftMsg">
                                <span className="msgTime fL">Heute 11:29</span>
                                <div className="rcvdMsg msgTxt clear">
                                    <p className="m0">Hoi Max, hast Du am Freitag Zeit für ein Treffen? Packte seine sieben Versalien, schob sich sein Brot in den Gürtel.</p>
                                    <ul className="atchmntLists disIB">
                                        <li className="atchmntItem csrP">
                                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/attachment.png")} className="atchmntIcon vam" />Dokument-1.xls
                                            </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="txtareaBlock clear oA">
                                <textarea placeholder="Schreibe eine Nachricht" className="oA"></textarea>
                                <ul className="atchmntLists fL">
                                    <li className="atchmntItem csrP">
                                        <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/attachment.png")} className="atchmntIcon vam" />Dokument-1.xls
                                        </li>
                                </ul>
                                <button className="btn btnBrwn fR">Senden </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(TeacherNews_Design);