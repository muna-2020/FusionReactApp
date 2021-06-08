//Client Side entry point 
import "babel-polyfill";
import "isomorphic-fetch"
//-------------------code for IE---------------------
if (!global.setTimeout) { //removes error setTimeout is undefined after importing promise for IE
    global.setTimeout = null;
}
var Promise = require("es6-promise"); //removes error 'promise' is undefined in IE
Promise.polyfill();
var objassign = require("es6-object-assign");
objassign.polyfill();
//-----------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import ComponentController from '../Controller/ComponentController/DynamicComponentController';
import Main from '../LoginAndMaster/Main';
import { HandleError } from '@root/Framework/Services/FrameworkLogging/FrameworkLogging';
import ArcadixFetchDataProvider from "@shared/Framework/DataService/ArcadixFetchData/ReactJS/ArcadixFetchDataProvider";
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import LoggerClass from '@shared/Framework/Services/Logger/Logger';
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';
import { GetQueryStringValue } from '@root/Framework/Services/QueryString/QueryString';

global.GetQueryStringValue = GetQueryStringValue;
global.ProviderController = {
    ArcadixFetchDataProvider: ArcadixFetchDataProvider
};

var DEBUG = false;
var Logger = new LoggerClass(DEBUG);
window.Logger = Logger;

console.log("JConfigurationFromIndex:", JConfiguration);
const intitalData = window["__INITIAL_STATE__"].Entity;
console.log("ClientUserDetailsFromIndex:", ClientUserDetails);
if (ClientUserDetails && Object.keys(ClientUserDetails).length !== 0) {
    ApplicationState.SetProperty('ClientUserDetails', ClientUserDetails);
}
window.onerror = HandleError;
window.store = store;
JConfiguration["isSsrEnabled"] = true;
if(Main.DynamicStyles){
    Main.DynamicStyles({JConfiguration}).map((item) => {
        LoadDynamicStyles(item);
    });
}
console.log("vxcvxcv fsdfdsf");
ReactDOM.hydrate(<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route
                path={JConfiguration.VirtualDirName}
                render={props => <Main {...props}
                    ComponentController={ComponentController}
                    JConfiguration={JConfiguration}
                    ApplicationName="School"
                    ApplicationFolderName="2_School"
                />}
            />
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('divRoot'));
