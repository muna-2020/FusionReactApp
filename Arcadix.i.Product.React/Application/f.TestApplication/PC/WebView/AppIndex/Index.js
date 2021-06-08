//Polyfill imports
import "@babel/polyfill";
import "isomorphic-fetch";
import { hot } from 'react-hot-loader';
import ReactDOM, { hydrate, render } from 'react-dom';
import React, { useRef, useEffect } from 'react';

//Store related imports
import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';

//Provider
import { Provider } from 'react-redux';

//Loadable import
import { loadableReady } from '@loadable/component';

//Internal service class imports
import ArcadixFetchDataProvider from "@shared/Framework/DataService/ArcadixFetchData/ReactJS/ArcadixFetchDataProvider";

//Router related imports
import { BrowserRouter } from 'react-router-dom';

// Test Application Content
import Content from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Content';

//Performance Class
import PerformanceClass from '@shared/Framework/Services/Performance/Performance';

//Editor ComponenetController
import ComponentController from '@root/Application/f.TestApplication/PC/WebView/ComponentController/ComponentController';

//------------------Global variable declaration--------
global.ProviderController = {
    ArcadixFetchDataProvider: ArcadixFetchDataProvider
};
global.store = store;
global.Performance = new PerformanceClass();

//------------------------------------------------------

/**
 * @name App
 * @summary Returns the Main Component to be rendered.
 * @returns {JSX} the Component to be rendered Editor or Main.
 */
const App = () => {
    alert("Successfull call for bundle!!")
    global.ContentRef = useRef({});
    let objTestState = TestState;
    let PageJsonDetails = {
        "TestState": {
            "TaskPageProperties": {
                "PageJson": JSON.parse(PageJson) 
            }
        }
    };

    return (
        <Provider store={store}>
            <BrowserRouter>
                {
                    <div><Content {...PageJsonDetails} ComponentController={ComponentController} JConfiguration={JConfiguration} ContentRef={ContentRef}/></div>
                }
            </BrowserRouter>
        </Provider>
        

    );
};

//To Hydrate the App to DOM
let AppComponent = App;
if (process.env.NODE_ENV === "development" && JConfiguration["IsDevelopment"] !== false) {
    AppComponent = hot(module)(App);
}
else {
    if (__webpack_require__.p) {
        __webpack_require__.p = JConfiguration["BaseUrl"].substring(0, JConfiguration["BaseUrl"].length - 1) + __webpack_require__.p;
    }
}

loadableReady(() => {
    const RenderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
    RenderMethod(<AppComponent />, document.getElementById('divRootClient'), function () {
        window.setTimeout(function () {
            document.getElementById('divRoot').style.display = "none";
        }, 1000);
    });
});

