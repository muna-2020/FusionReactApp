//React related imports...
import React, { useReducer } from 'react';

//Module related fies...
import FTPAuditPopup_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPAuditPopup/FTPAuditPopup_ModuleProcessor'
import * as FTPAuditPopup_Hook from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPAuditPopup/FTPAuditPopup_Hook'

//Base files...
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

/**
 * @name FTPAuditPopup
 * @param {object} props props
 * @summary This component displays the Audit data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Audit details.
 */
const FTPAuditPopup = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, FTPAuditPopup_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { props, state, dispatch, ["FTPAuditPopup_ModuleProcessor"]: new FTPAuditPopup_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Audit_Hook, that contains all the custom hooks.
     * @returns null
     */
    FTPAuditPopup_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        return <div className={state.isAuditDataPresent ? "ftp-audit-popup" : "ftp-audit-popup no-data"}>
            {state.isAuditDataPresent ?
                <div className="flex">
                    {state.arrFTPAuditDataToCompare.map(objAuditData => {
                        return <div className = "audit-content" >
                            <h3>{Localization.TextFormatter(objTextResource, objAuditData.Transaction)}</h3>
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="details">
                                        <b>{Localization.TextFormatter(objTextResource, "Action")}</b>
                                    </div>
                                    <div className="row-right">
                                        {objAuditData.vAction ? objAuditData.vAction : "-"}
                                    </div>
                                </div>
                            </div>
                            {
                                //<div className="col col-1">
                                //    <div className="col-item">
                                //        <div className="details">
                                //            <b>{Localization.TextFormatter(objTextResource, "User")}</b>
                                //        </div>
                                //        <div className="row-right">
                                //            {objAuditData.uUserId}
                                //        </div>
                                //    </div>
                                //</div>
                            }
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="details">
                                        <b className="nowrap">{Localization.TextFormatter(objTextResource, "Date")}</b>
                                    </div>
                                    <div className="row-right">
                                        {objAuditData.dtCreatedOn ? Localization.DateTimeFormatter(objAuditData.dtCreatedOn) : "-"}
                                    </div>
                                </div>
                            </div>
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className=" audit">
                                        <b>{Localization.TextFormatter(objTextResource, "Details")}</b>
                                    </div>
                                </div>
                            </div>
                            {objAuditData.vData ? < JSONFormatter
                                Data={{
                                    JSONData: JSON.parse(objAuditData.vData)
                                }}
                            />
                                : <div>{Localization.TextFormatter(objTextResource, "NoPreviousTransaction")}</div>
                            }
                        </div>

                    })
                    }
                </div> :
                <div className="no-data-text">{Localization.TextFormatter(objTextResource, "NoAuditData")}</div>}
            <div className="popup-footer">
                <button className="btn" onClick={() => { Popup.ClosePopup(props.Id); }}>
                    {Localization.TextFormatter(props.Resource.Text, "OK")}
                </button>
            </div>
        </div>
    }

    return (
        <React.Fragment>{state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment/>}
        </React.Fragment>
    );
}

export default FTPAuditPopup;