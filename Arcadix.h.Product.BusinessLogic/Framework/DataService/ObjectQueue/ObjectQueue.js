import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { useCallback } from 'react';
import { GetLoadedDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

class ObjectQueue {

    /**
    * @name QueueAndExecute
    * @param {array} arrCallData passes queued array
    * @summary Calls the Queue and Execute method
    */
    QueueAndExecute(arrCallData, fnCallback) {
        let arrCalls = this.Queue(arrCallData)["DataCalls"];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrCalls, function (objReturn) {
            if (fnCallback) {
                fnCallback(objReturn);
            }
        });
    }

    /**
    * @name Queue
    * @param {array} arrQueueData array of request queued
    * @summary Returns the array of data requests
    * @return {Array} Array of data requests
    */
    Queue(arrQueueData, objModuleProcessor, props) {
        let arrDataRequest = [];
        arrQueueData.map(
            objQueue => {
                if (Array.isArray(objQueue.GetInitialDataCall())) {
                    arrDataRequest = [...arrDataRequest, ...objQueue.GetInitialDataCall()];
                }
                else
                    arrDataRequest = [...arrDataRequest, objQueue.GetInitialDataCall()];
            }
        );
        if (objModuleProcessor && props && objModuleProcessor.GetDynamicStyles && global.ReactVersionType === "ReactJs") {            
            let arrDynamicStyleParams = objModuleProcessor.GetDynamicStyles(props);
            let arrLoadedDynamicLinks = (props.IsForServerRenderHtml ? props.LoadedDynamicStyles : GetLoadedDynamicStyles()) ?? [];
            arrLoadedDynamicLinks.forEach(strLoadedLink => {
                arrDynamicStyleParams = arrDynamicStyleParams.filter(strDynamicStyleParams => !strDynamicStyleParams.includes(strLoadedLink));
            })
            //arrDynamicStyleParams = arrDynamicStyleParams.filter(objDynamicStyleParams => !arrLoadedDynamicLinks.includes(objDynamicStyleParams["Id"]));
            if (arrDynamicStyleParams.length > 0) {
                Object_Framework_Services_DynamicStyleReactJs.Initialize(arrDynamicStyleParams);
                arrDataRequest = [...arrDataRequest, Object_Framework_Services_DynamicStyleReactJs.GetInitialDataCall()];
            }
        }
        return {
            "DataCalls": arrDataRequest
        };
    }

    /**
* @name QueueAPI
* @param {object} objModuleProcessor Instance of ModuleProcessor
* @param {object} props props
* @summary Returns the array of data requests
* @return {Array} Array of data requests
*/
    QueueAPI(objModuleProcessor, props) {
        let arrDataRequest = [];
        if (objModuleProcessor?.InitialDataParams && props) {
            let arrQueueData = objModuleProcessor.InitialDataParams(props);
            arrQueueData.map(
                objQueue => {
                    if (Array.isArray(objQueue.GetInitialDataCall())) {
                        arrDataRequest = [...arrDataRequest, ...objQueue.GetInitialDataCall()];
                    }
                    else
                        arrDataRequest = [...arrDataRequest, objQueue.GetInitialDataCall()];
                }
            );
        }
        if (objModuleProcessor?.GetDynamicStyles && props && global.ReactVersionType === "ReactJs") {
            let arrDynamicStyleParams = objModuleProcessor.GetDynamicStyles(props);
            let arrLoadedDynamicLinks = (props.IsForServerRenderHtml ? props.LoadedDynamicStyles : GetLoadedDynamicStyles()) ?? [];
            arrLoadedDynamicLinks.forEach(strLoadedLink => {
                arrDynamicStyleParams = arrDynamicStyleParams.filter(strDynamicStyleParams => !strDynamicStyleParams.includes(strLoadedLink));
            })
            //arrDynamicStyleParams = arrDynamicStyleParams.filter(objDynamicStyleParams => !arrLoadedDynamicLinks.includes(objDynamicStyleParams["Id"]));
            if (arrDynamicStyleParams.length > 0) {
                Object_Framework_Services_DynamicStyleReactJs.Initialize(arrDynamicStyleParams);
                arrDataRequest = [...arrDataRequest, Object_Framework_Services_DynamicStyleReactJs.GetInitialDataCall()];
            }
        }
        return {
            "DataCalls": arrDataRequest
        };
    }

    /**
 * @name QueueAndExecute
 * @param {array} arrCallData passes queued array
 * @summary Calls the Queue and Execute method
 */
    QueueAndExecuteAPI(objModuleProcessor,props, fnCallback) {
        let arrCalls = this.Queue(objModuleProcessor.InitialDataParams(props), objModuleProcessor, props)["DataCalls"];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrCalls, function (objReturn) {
            if (fnCallback) {
                fnCallback(objReturn);
            }
        });
    }

}

export default ObjectQueue;