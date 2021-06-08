import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import * as SendLoginBusinessLogic from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/SendLogin/SendLoginBusinessLogic';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const SendLogin = props => {
    const [state, dispatch] = useReducer(SendLoginBusinessLogic.Reducer, SendLoginBusinessLogic.GetInitialState());
    let objContext = { state, props, dispatch };
    let objTextResource = objContext.props.Data.objTextResource;
    /**
     * JSX of Send login
     */
    return (
        <React.Fragment>
            <div>{Localization.TextFormatter(objTextResource,"Process")}</div>
            <div>{Localization.TextFormatter(objTextResource,"MailingLogins")}</div>
            <br />
            <div>{Localization.TextFormatter(objTextResource,"Instruction")}</div>
            <br />
            <div>{Localization.TextFormatter(objTextResource,"Total")}</div>
            <div>{Localization.TextFormatter(objTextResource,"Posted")}</div>
            <div>{Localization.TextFormatter(objTextResource,"Failed")}</div>
            <br />
            <div>
                <button className="err-btn" onClick={e => { console.log("Begin") }}>{Localization.TextFormatter(objTextResource,"Begin")}</button>
            </div>
            <div>
                <button className="err-btn" onClick={e => { console.log("AbortStop") }} disabled={!objContext.state.blnIsCancellable}>{Localization.TextFormatter(objTextResource,"AbortStop")}</button>
            </div>
            <div>
                <button className="err-btn" onClick={e => { console.log("ShutDown")}}>{Localization.TextFormatter(objTextResource,"ShutDown")}</button>
            </div>
        </React.Fragment>
    );
}

export default connect(SendLoginBusinessLogic.mapStateToProps)(SendLogin);