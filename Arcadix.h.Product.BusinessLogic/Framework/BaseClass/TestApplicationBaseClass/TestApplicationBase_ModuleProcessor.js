//Service
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Helper Imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name TestApplicationBase_ModuleProcessor
* @summary class that holds the common methods used in Test Application
*/
class TestApplicationBase_ModuleProcessor//extends Base_ModuleObject
{

    /**
     * @name MergeTestState
     * @param {object} json response json
     * @summary merges test state from response with curretn test state on client side
     */
    MergeTestState(objTestState) {
        //if (objTestState.PrefetchElements) {
        //    new TestApplicationBase_ModuleProcessor().PreFetchTestApplication(objTestState);
        //}
        var TestState = ApplicationState.GetProperty("TestState");
        if (TestState == undefined)
            ApplicationState.SetProperty("TestState", objTestState);
        else
            ApplicationState.SetProperty('TestState', { ...TestState, ...objTestState });
    }

    /**
     * @name ExecuteAPI
     * @param {any} URL
     * @param {any} objNewParams
     * @param {any} fnCallback
     * @summary Common return Method for all the APIs.
     */
    ExecuteAPI(URL, objParams, fnCallback) {
        var customHeaders = { "ExecutionTime": Date.now() };
        //Performance.Reset();
        let objRequestParams = new TestApplicationBase_ModuleProcessor().FilterParams(objParams);
        var dtStartTime = new Date().getTime();
        ArcadixFetchData.ExecuteCustom(URL, 'POST', objRequestParams, customHeaders)
            .then(response => {
                var strExecutionTime = new Date().getTime() - dtStartTime;
                var HeaderData = {};
                for (var pair of response.headers.entries()) {
                    HeaderData[pair[0]] = pair[1];
                }
                var performanceloginmemory = HeaderData["performanceloginmemory"] ? HeaderData["performanceloginmemory"] : '{}';
                var performancestarttime = HeaderData["executiontime"];
                if (performancestarttime && performancestarttime != "")
                    strExecutionTime = Date.now() - performancestarttime;

                var contentlength = HeaderData["content-length"];

                if (JConfiguration.Performance && HeaderData["performancelog"] != undefined && strExecutionTime) {
                    let performancelog = {
                        ["APICallType"]: "Multi",
                        ["APICallsDetails"]: JSON.parse(HeaderData["performancelog"]),
                        ["InMemoryTimes"]: performanceloginmemory != undefined ? JSON.parse(performanceloginmemory) : "",
                        ["ExecutionTime"]: strExecutionTime,
                        ["ContentLength"]: contentlength,
                        ["Response"]: {
                            ["Data"]: {},
                            ["Header"]: HeaderData
                        }
                    };
                    Performance.GetTotalPerformanceData(performancelog);
                }
                return response.json()
            })
            .then(json => {
                if (json.state === 'session expired') {
                    window.location.replace(props.JConfiguration.Baseurl);
                }
                if (!objParams.MergerNotRequired) {
                    new TestApplicationBase_ModuleProcessor().MergeTestState(json);
                }
                if (!json.Error) {
                    fnCallback({ Success: true, TestState: objParams.TestState, json: json });
                }
                else {
                    fnCallback({ Success: false, TestState: objParams.TestState, json: json });
                }
            })
            .catch((error) => {
                fnCallback({ Success: false, TestState: objParams.TestState });
            });
    }

    FilterParams(objParams) {
        if (objParams.TestState) {
            if (objParams.TestState.ActionType) {
                switch (objParams["TestState"]["ActionType"]) {
                    case "ValidatePreloginDetails":
                        delete objParams['property']
                        break;
                    case "ValidateLoginClick":
                        delete objParams["TestState"]['LoginPageProperties']
                        delete objParams["TestState"]['SSRData']
                        delete objParams["TestState"]['strSessionKey']
                        break;
                    case "StartTestClick":
                        delete objParams["TestState"]['IntroductionPageProperties']
                        delete objParams["TestState"]['TestTaskDetails']
                        delete objParams["TestState"]['CurrentRoute']
                        delete objParams["TestState"]['SSRData']
                        break;
                    case "NextTaskClick":
                        delete objParams["TestState"]['TaskPageProperties']
                        delete objParams["TestState"]['PageJson']
                        break;
                    case "TaskPreview":
                        delete objParams["TestState"]['TaskPageProperties']
                }
            }
        }
        return objParams;
    }

    /**
     * @name PreFetchTestApplication
     * @param {object} objContext passes Context object
     * @summary For creating link tags for prefetch 
     * @returns {object} null
     */
    PreFetchTestApplication(props) {
        let objHead = document.getElementsByTagName('head')[0];
        props.PrefetchElements.UsedElementType.map(objElements => {
            let objLinkTag = document.createElement('link');
            objLinkTag.setAttribute('id', objElements);
            objLinkTag.setAttribute('rel', 'prefetch');
            objLinkTag.setAttribute('as', 'fetch');
            objLinkTag.setAttribute('href', JConfiguration["BaseUrl"] + "Bundle/" + JConfiguration["ApplicationFolderName"] + JConfiguration["DeviceType"] + "/ClientBuild/CMS" + objElements + "_TestApplication.chunk.js");
            objHead.appendChild(objLinkTag);
        })
        props.PrefetchElements.UsedMultiMediaPath.map(objElementsPath => {
            let objLinkTag = document.createElement('link');
            objLinkTag.setAttribute('id', objElementsPath);
            objLinkTag.setAttribute('rel', 'prefetch');
            objLinkTag.setAttribute('as', 'fetch');
            objLinkTag.setAttribute('href', JConfiguration["WebDataPath"] + "" + objElementsPath + "");
            objHead.appendChild(objLinkTag);
        })
    }
}

export default TestApplicationBase_ModuleProcessor;