import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherProfile/TeacherProfile.css';

class TeacherProfile_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="profilePage contGrd">
                <form>
                    <table className="wid50">
                        <tr>
                            <td className="prflLbl fontBold">Anrede</td>
                            <td>
                                <input type="text" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td className="prflLbl fontBold">Vorname</td>
                            <td>
                                <input type="text" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td className="prflLbl fontBold">Name</td>
                            <td>
                                <input type="text" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td className="prflLbl">Kürzel</td>
                            <td>
                                <input type="text" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td className="prflLbl">Telefon Privat</td>
                            <td>
                                <input type="tel" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td className="prflLbl">Telefon Schule</td>
                            <td>
                                <input type="tel" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td className="prflLbl fontBold">E-Mail</td>
                            <td>
                                <input type="email" className="prflIn" />
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={2} className="prflLbl pswrdTxt">Passwort ändern</td>
                            <td>
                                <input placeholder="Neues Passwort" name="Password" type="password" className="prflIn pswrdIn" />
                                <input placeholder="Wiederholen" type="password" name="ConfirmPassword" className="prflIn" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className="btn btnOrnge fR saveBtn">Speichern</button>
                            </td>
                        </tr>
                    </table>
                </form>
                <br />
            </div>

        );
    }
}

export default withRouter(TeacherProfile_Design);