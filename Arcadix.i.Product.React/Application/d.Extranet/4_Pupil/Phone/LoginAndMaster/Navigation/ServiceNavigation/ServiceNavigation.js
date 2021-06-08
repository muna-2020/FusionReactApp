import React from 'react';
import { withRouter } from 'react-router-dom';

//ModuleSpecific
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Navigation/Navigation_ModuleProcessor';

//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V I C E   N A V I G A T I O N   C O M P O N E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────
//

const ServiceNavigation = (props) => {

    let objContext = { props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };

    return (
        <ul className="service-navigation">
            <li
                onClick={() => {
                    objContext.Navigation_ModuleProcessor.OnNavigationClick(objContext, {
                        "ParentNavigationId": 0,
                        "NavigationName": "PupilNews",
                        "URL": "PupilNews",
                        "DisplayOrder": 6,
                        "NavigationIcon": "news.svg",
                        "IsOpenNewWindow": "N",
                        "IsBeta": "Y",
                        "NavigationStyle": "mitteilungen",
                        "IsAlignRight": null,
                        "ActiveNavigationIcon": "mitteilungen_white.svg",
                        "IsServiceNavigation": "N",
                        "NavigationText": {
                            "de": "MITTEILUNGEN",
                            "en": ""
                        }
                    });
                }}
            >
                <span>Mitteilungen</span>
            </li>
            <li>
                <span>Dokumente</span>
            </li>
            <li>
                <span>Kontakt</span>
            </li>
            <li>
                <span>Notizen</span>
            </li>
        </ul>
    );
};


export default withRouter(ServiceNavigation);