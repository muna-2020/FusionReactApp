//React related imports
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

//Internal service class imports
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Store related imports
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name RouteLoader
 * @param {object} props props
 * @summary returns the route
 * @returns {JSX} returns the route
 */
const RouteLoader = (props) => {

    return (<div className="moduleContainer__section w-100 h-100">
        <Switch>
            <Route
                path={`${props.RouterPath}/:strComponentName`}
                render={renderProps => {
                    ApplicationState.SetProperty('ModuleAPICalls', []);
                    LogPerformanceToRedis();
                    let blnForceServerRender = ApplicationState.GetProperty('IsSSRReload') ? ApplicationState.GetProperty('IsSSRReload') : false;
                    let blnForceClientRender = props.IsForceClientRender;
                    let blnServerRenderModule = (renderProps.location.state != undefined &&
                        renderProps.location.state.SSREnabled != undefined &&
                        renderProps.location.state.SSREnabled == "Y") || (renderProps.location.state?.SSREnabled != "N" && JConfiguration["IsSSREnabled"] == true) ? true : false;
                    let blnCacheSSRComponent = (renderProps.location.state != undefined &&
                        renderProps.location.state.CacheSSRComponent != undefined &&
                        renderProps.location.state.CacheSSRComponent == "Y") ? true : false;
                    let objJConfiguration = { ...props.JConfiguration, IsSSREnabled: blnServerRenderModule };
                    let blnIsModuleReload = arrModulesRendered[arrModulesRendered.length - 1] == renderProps.match.params.strComponentName.split('?')[0] ? true : false;
                    let strInitialHtml = document.getElementById("ModuleContainerParent") != null ? document.getElementById("ModuleContainerParent").innerHTML : "";
                    let objRenderProp = { ...renderProps, IsFromRouteLoader: true, IsForceClientRender: blnForceClientRender, IsForceServerRender: blnForceServerRender, InitialHtml: strInitialHtml, IsModuleReload: blnIsModuleReload };
                    return (<ComponentLoader DivName="divModule" {...objRenderProp} ClientUserDetails={props.ClientUserDetails} ComponentController={props.ComponentController} JConfiguration={objJConfiguration} CacheSSRComponent={blnCacheSSRComponent} />);
                }
                } />
        </Switch>
    </div>);

};

   /**
     * @name LogPerformanceToRedis
     * @summary logging of performance data to the redis as we do the routing
     */
export const LogPerformanceToRedis = () => {

    //Logging the performance log details.
    let objAllPerformanceLogData = ApplicationState.GetProperty("AllPerformanceLogData");
    let arrPerformanceLog = objAllPerformanceLogData ? objAllPerformanceLogData["PerformanceLogData"] : [];
    let arrClientRenderTime = objAllPerformanceLogData ? objAllPerformanceLogData["ClientRenderTime"] : [];
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails");

    if (arrPerformanceLog && arrPerformanceLog.length > 0 || arrPerformanceLog && arrClientRenderTime.length > 0) {
        let arrParams = [
            {
                "URL": "API/Framework/Services/FrameworkLogging/FrameworkLogging/LogPerformance",
                "Params": {
                    "PerformanceData": {
                        "PerformanceLog": arrPerformanceLog,
                        "ClientRenderTime": arrClientRenderTime
                    },
                    "uUserId": objClientUserDetails.UserId
                },
            }];

        //Making the common application state as empty.
        ApplicationState.SetProperty("AllPerformanceLogData", {});

        (new ArcadixFetchAndCacheData()).Execute(arrParams, function (objReturn, blnIsAdded) {

        })
    }
}

export default connect(Base_Hook.MapStoreToProps([
    { "StoreKey": "ApplicationState", "DataKey": "iReloadCount" }
]))(RouteLoader);