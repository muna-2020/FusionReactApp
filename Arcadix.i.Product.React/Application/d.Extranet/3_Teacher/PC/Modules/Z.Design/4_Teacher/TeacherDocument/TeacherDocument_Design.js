import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherDocument/TeacherDocument.css';

class TeacherDocument_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="documentPage">

                {/* <!--LEFT COLUMN--> */}
                <div className="lftCol fL">
                    <button className="btn btnBrwn addBtn">
                        <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/pluswhite.svg")} className="plsIcn vam" />
                        Neuen Ordner erstellen
                    </button>

                    <div className="docFilterDrpdwn">

                    </div>
                    <div className="grpMemBlock">
                        <div className="grpMemItem csrP">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/folder_shared_brown.svg")} className="grpIcn vam" width="41" height="50" />
                            Klassenlager 2017
                        </div>
                        <div className="grpMemItem csrP">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/folder_brown.svg")} className="grpIcn vam" width="41" height="50" />
                            Natur & Technik
                        </div>
                        <div className="grpMemItem csrP">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/folder_brown.svg")} className="grpIcn vam" width="41" height="50" />
                            Vortrag Vulkane
                        </div>
                    </div>
                </div>

                {/*<!--RIGHT COLUMN-->*/}
                <div className="rghtCol fL rel">
                    {/*<!--<div className="infoMsg abs">
                        <p className="wid100 tal">
                            Um Dateien hochzuladen, muss ein Ordner ausgewählt werden.
                        </p>
                    </div>-->*/}
                    <div className="grpMemInfo">
                        <span>Klassenlager 2017</span>
                        <div className="icnsBlock fR">
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/shared_group_white.svg")} width="23" height="23" />
                            <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/delete_white.svg")} width="20" height="20" />
                        </div>
                    </div>

                    <div className="grpMemFiles">
                        <table className="wid100">
                            <tr>
                                <th>Name</th>
                                <th>Datum</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Dokument-1.doc</td>
                                <td>15.6.2017</td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/download_brown.png")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/doc_eye.svg")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/cross_brown.png")} /></td>
                            </tr>
                            <tr>
                                <td>Dokument-2.mov</td>
                                <td>12.6.2017</td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/download_brown.png")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/doc_eye.svg")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/cross_brown.png")} /></td>
                            </tr>
                            <tr>
                                <td>Dokument-3.mp4</td>
                                <td>29.5.2017</td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/download_brown.png")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/doc_eye.svg")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/cross_brown.png")} /></td>
                            </tr>
                            <tr>
                                <td>Dokument-4.mov</td>
                                <td>25.5.2017</td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/download_brown.png")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/doc_eye.svg")} /></td>
                                <td className="tal"> <img src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/cross_brown.png")} /></td>
                            </tr>
                            <tr>
                                <td colSpan={5}>
                                    <button className="btn btnBrwn upldBtn fR m10">
                                        Datei hochladen
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>



        );
    }
}

export default withRouter(TeacherDocument_Design);