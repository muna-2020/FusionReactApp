//React related imports
import React from 'react';

//Module related imports
import ApplicationType from '@root/Application/c.Cockpit/PC/Modules/MainClient/ApplicationType/ApplicationType'

/**
 * @name Cockpit
 * @param {object} Props Props
 * @summary imports the module that need to wrapped up in main.
 * @returns {Jsx} Returs the application specific Component to be loaded.
 */
const Cockpit = (props) => {
    return (<React.Fragment>
        <ApplicationType
            JConfiguration={props.JConfiguration}
            ClientUserDetails={props.ClientUserDetails} />
        </React.Fragment>);
}

export default Cockpit;