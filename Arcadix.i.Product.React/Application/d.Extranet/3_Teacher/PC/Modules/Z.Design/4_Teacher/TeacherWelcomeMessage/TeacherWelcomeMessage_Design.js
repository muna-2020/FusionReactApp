import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherWelcomeMessage/TeacherWelcomeMessage.css';

class TeacherWelcomeMessage_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="PopupDiv">
                {/*<h2>Willkommen bei Lernlupe</h2>*/}

                <div className="popupBox">
                    <h2>Kurzanleitung</h2>

                    <p>Bitte beachten Sie:</p>
                    <h2>Vorbereitungsarbeiten</h2>
                    <ol>
                        <li>Erfassen Sie zuerst Ihre Klasse mit den Schülerinnen und Schülern > <span className="textHighlight">Klassen und Lernende </span> (evtl. bereits durch die Schulleitung ausgeführt)</li>
                        <li>Erstellen Sie die Logins für LupIn, den geschützten Arbeitsbereich der Schülerinnen und \u2028     Schüler >  <span className="textHighlight">Logins Lernendea</span> .</li>
                    </ol>
                    <h2>Fördern durch das System</h2>
                    <ol>
                        <li>Stellen Sie die individuellen Kompetenzniveaus Ihrer Schülerinnen und Schüler fest >
     <span className="textHighlight">Orientierungstest </span>  </li>
                        <li>Steuern und überprüfen Sie den Übungsprozess >  <span className="textHighlight">Fördern</span>   </li>
                    </ol>
                    <h2>Lernjournal</h2>
                    <ol>
                        <li>Legen Sie den Stundenplan fest >  <span className="textHighlight">Stundenplan erfassen</span> (Zeitstruktur wird durch die Schulleitung\u2028 festgelegt)</li>
                        <li>Begleiten und unterstützen Sie die Schülerinnen und Schüler beim Planungsprozess > <span className="textHighlight">Lernjournal</span> </li>
                    </ol>
                    <h2>e-Learning</h2>
                    <ol>
                        <li>Machen Sie sich auf unserer E-Learning-Plattform mit Lernlupe vertraut.</li>
                        <li>Die oben beschriebenen und weitere Funktionen werden Ihnen kurz und bündig erklärt.</li>
                    </ol>
                </div>
            </div>
        );
    }
}

export default withRouter(TeacherWelcomeMessage_Design);