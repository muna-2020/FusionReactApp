//React related imports...
import React, { useReducer } from 'react';

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

/**
 * @name AuditPopup
 * @param {object} props props
 * @summary This component displays the Audit data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Audit details.
 */
const AuditPopup = props => {
       
    /**
     * @name GetDisplayDiv
     * @summary Forms the jsx required for displaying one JSON object data.
     * @returns {object} jsx
     */
    const GetDisplayDiv = () => {
        let objTextResource = props.Resource.Text;
        return <div style={{ overflow: "auto", height : "665px" }} >
            <div className="col col-1">
                <div className="col-item">
                    <div className="details">
                        <b>{Localization.TextFormatter(objTextResource, "Action")}</b>
                    </div>
                    <div className="row-right">
                        {props.Data.AuditData.vAction}
                    </div>
                </div>
            </div>
            <div className="col col-1">
                <div className="col-item">
                    <div className="details">
                        <b>{Localization.TextFormatter(objTextResource, "User")}</b>
                    </div>
                    <div className="row-right">
                        {props.Data.AuditData.uUserId}
                    </div>
                </div>
            </div>
            <div className="col col-1">
                <div className="col-item">
                    <div className="details">
                        <b className ="nowrap">{Localization.TextFormatter(objTextResource, "ModifiedOn")}</b>
                    </div>
                    <div className="row-right">
                        {props.Data.AuditData.dtCreatedOn}
                    </div>
                </div>
            </div>
            <div className="col col-1">
                <div className="col-item">
                    <div className="">
                       <b>{Localization.TextFormatter(objTextResource, "Details")}</b>
                    </div>                   
                </div>
            </div>
            < JSONFormatter
                Data={{
                    JSONData: JSON.parse(props.Data.AuditData.vData)
                }}
            />
        </div>
    }

    /**
     * @name GetCompareDiv
     * @summary Forms the jsx required for comapre of two JSON object data.
     * @returns {object} jsx
     */
    const GetCompareDiv = () => {
        let objTextResource = props.Resource.Text;
        return <div className="flex">
            {props.Data.AuditData.map(objAuditData => {
                return <div style={{ overflow: "auto", height: "665px" }} >
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="details">
                                <b>{Localization.TextFormatter(objTextResource, "Action")}</b>
                            </div>
                            <div className="row-right">
                                {objAuditData.vAction}
                            </div>
                        </div>
                    </div>
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="details">
                                <b>{Localization.TextFormatter(objTextResource, "User")}</b>
                            </div>
                            <div className="row-right">
                                {objAuditData.uUserId}
                            </div>
                        </div>
                    </div>
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="details">
                                <b className="nowrap">{Localization.TextFormatter(objTextResource, "ModifiedOn")}</b>
                            </div>
                            <div className="row-right">
                                {objAuditData.dtCreatedOn}
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
                    < JSONFormatter
                        Data={{
                            JSONData: JSON.parse(objAuditData.vData)
                        }}
                    />
                </div>
            })}
            </div>
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return props.Meta.Type == "Compare" ? GetCompareDiv() : GetDisplayDiv()                         
    }

    return (
        <React.Fragment>{props.Data.AuditData ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default AuditPopup;