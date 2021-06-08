import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TimeTable/TimeTable.css';

class TimeTable_Design extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="timeTablePage">
                <div className="navTools oA">
                    <div className="selectionDrpdwn fL">
                        <label>Schuljahr:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>2018/09</li>
                            </ul>
                        </div>
                    </div>
                    <div className="selectionDrpdwn fL">
                        <label>Klasse:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>Thus 06_09_2018</li>
                            </ul>
                        </div>
                    </div>
                    <div className="selectionDrpdwn fL">
                        <label>Lehrperson:</label>
                        <div className="drpdwnList">
                            <ul className="dropdown grid">
                                <li>Alle</li>
                            </ul>
                        </div>
                    </div>
                    <button className="btn btnDrkGrn fR searchBtn">Anzeigen</button>
                </div>

                <div className="tableSection clear">
                    <table className="timeTable wid100">
                        <tr>
                            <th>Mo</th>
                            <th>Di</th>
                            <th>Mi</th>
                            <th>Do</th>
                            <th>Fr</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Fach & Lehrperson</td>
                            <td>Fach & Lehrperson</td>
                            <td>Fach & Lehrperson</td>
                            <td>Fach & Lehrperson</td>
                        </tr>
                        <tr>
                            <td>09:00-09:31</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>09:30-10:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>10:00-10:30</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>11:00-11:30</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>11:30-12:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>12:00-12:30</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>12:30-01:00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(TimeTable_Design);