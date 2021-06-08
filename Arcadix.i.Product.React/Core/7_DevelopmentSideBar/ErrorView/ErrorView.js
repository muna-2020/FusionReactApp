//React imports
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Module related import 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

/**
 * @name ErrorView
 * @param {any} props
 * @summary The ErrorView is to show the Performance Log for the modules loading.
 */
const ErrorView = props => {

    /**
     *@summary local state for performance log
     */
    const [strTabName, setTabName] = useState("APIErrors");
    

    /**
     * @name GetTabs
     * @summary Forms the jsx required for the Tabbed in the Top.
     * @returns {object} jsx
     */
    const GetTabs = () => {
        return <ul style={{ "display": "flex" }} className="peformance-navigation" id="FilterBlock">
            <li>
                <span id="APIErrors" className="active" onClick={() => { OnClickNavigation("APIErrors") }} >{"APIErrors"}</span>
            </li>
            <li>
                <span id="JSError" onClick={() => { OnClickNavigation("JSError") }} >{"JSError"}</span>
            </li>
        </ul>
    }

    /**
     * @name OnClickNavigation
     * @param {any} strDivToShow
     * @summary event for onClick Tabs
     */
    const OnClickNavigation = (strDivToShow) => {
        let strCurrentTab = strTabName;
        document.getElementById(strCurrentTab).classList.remove("active");
        document.getElementById(strDivToShow).classList.add("active");
        setTabName(strDivToShow);
    }

    const OnCLickClearError = () => {
        if (Object.keys(ApplicationState.GetProperty("APICallErrors")).length > 0){
            ApplicationState.SetProperty("APICallErrors", {})
        }
        if (ApplicationState.GetProperty("JSError").length > 0)
            ApplicationState.SetProperty("JSError", [])
    }

    /**
    * @name GetViews
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetViews = () => {
        let objAPICallErrors = {};
        let objAPIError = {};
        if (typeof props.APICallErrors == "string") {
            objAPIError = JSON.parse(props.APICallErrors);
        }

        Object.keys(objAPIError).map((strKey) => {
            if (objAPIError[strKey] != null) {
                objAPICallErrors = { ...objAPICallErrors, [strKey]: objAPIError[strKey] }
            }
        })
        return (
            <div className="task-container">
                <div id="APIErrors" className="" style={{ display: (strTabName == "APIErrors" ? "block" : "none") }}>
                    {
                        Object.keys(objAPICallErrors).length > 0?
                            <JSONFormatter Data={{ JSONData: objAPICallErrors }} />                    
                        :<React.Fragment> 
                        <div style={{"color":"green"}}  className="p-log-line sub-heading"> {"No API Exception"} </div>  </React.Fragment>    
                    }
                </div>
                <div id="JSError" className="" style={{ display: (strTabName == "JSError" ? "block" : "none") }}>
                    {props.JSError && props.JSError.length > 0 ?
                        props.JSError.map((objErrors) => {
                            return <JSONFormatter Data={{ JSONData: objErrors }} />;
                        })
                        : <React.Fragment> <div style={{ "color": "green" }} className="p-log-line sub-heading"> {"No JS Exception"} </div>  </React.Fragment>               
                    }
                </div>
            </div>);
    }

    /**
     * @name GetContent
     * @summary Get the Content for ErrorView
     */
    const GetContent = () => {

        return (<React.Fragment>
            <div>
                <div className="clear-all">
                    <span onClick={() => {
                        OnCLickClearError()
                    }}>ClearError<b>&#8856;</b></span>                    
                </div>
                {GetTabs()}
                {GetViews()}
            </div>
        </React.Fragment>);
    }

    //Return Jsx
    return <React.Fragment>{GetContent()}</React.Fragment>
};

export default connect(Base_Hook.MapStoreToProps([
    { "StoreKey": "ApplicationState", "DataKey": "APICallErrors" },
    { "StoreKey": "ApplicationState", "DataKey": "JSError" },
]))(ErrorView);
