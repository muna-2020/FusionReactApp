import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/6_SharedModule/Contacts/Contacts.css';

class Contact_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="contactPage">
                <div className="contGrd fL">
                    <p className="cntctTxt m0">
                        Gerne möchten wir Lernpass plus noch mehr auf Ihre Bedürfnisse ausrichten. Bitte teilen Sie uns Ihre<br />
                        Anregungen und Fragen mit. Wenn etwas im System nicht funktioniert, unterstützen Sie uns am besten mit<br />
                        einem Bildschirmfoto des Fehlers.<br /><br />
                        Wir danken Ihnen für Ihr Interesse und Ihre Unterstützung.<br /><br />Die Projektleiterin Claudia Coray
                    </p>
                </div>

                <div className="contGrd fL">
                    <address>
                        Lehrmittelverlag St.Gallen<br />
                        Lernfördersysteme<br />
                        Gallusstrasse 14<br />
                        9001 St. Gallen<br /><br />
                        <a href="mailto:info@lernpassplus.ch" className="link p0">info@lernpassplus.ch</a><br />
                        058 228 76 90
                    </address>
                </div>

                <div className="contGrd fL">
                    <p className="title">Mitteilung</p>
                    <img className="plsIcn" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/plus.svg")} />
                    <button className="btn btnBrwn addScrnshtBtn">Bildschirmfoto hinzufügen</button>
                    <form className="cntctFrm">
                        <input type="text" className="cntctFrmIn wid100" placeholder="Betreff" />
                        <textarea className="txtArea wid100" placeholder="Nachricht"></textarea>
                        <button className="btn btnBrwn sbmtBtn">Senden</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Contact_Design);