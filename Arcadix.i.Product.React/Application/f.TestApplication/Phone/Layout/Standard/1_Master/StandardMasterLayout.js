//React Related Imports
import React from 'react';


/**
 * @name StandardMasterLayout
 * @summary Standard Master Layout page
 * @param {any} props Props
 */
const StandardMasterLayout = (props) => {

    return (
        <div className="test-application-master">
            <div className="master-header">
                <img
                    src="https://extranetreview.lernpassplus.ch/Lernende/Data/Repo/Logo/115/Extranet2BlackLogo.svg"
                    alt=""
                />
                <div className="test-number">6565654</div>
                <div className="progresbar-block">
                    <div className="progressbar-text">
                        <span>Frage 3 vog 6</span>
                    </div>
                    <div className="progress-loader">
                        <div className="percentage"></div>
                    </div>
                </div>
            </div>

            <div className="master-content">
                <div className="pink-heading">Aufgabe</div>
                <p>The anwer is 1,1 and 2,2 </p>
                <div className="pink-heading">Antwort</div>
                <img src={require("./sampleimage.jpg")} alt="" />
            </div>
            <div className="footer">
                <div className="button">Evaluation</div>
                <div className="button">Next Click</div>
            </div>
        </div>
    );
}

export default StandardMasterLayout;