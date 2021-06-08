
/**
* @name ExternalAPITest_ModuleProcessor
* @summary Class for ExternalAPITest module processor.
*/
class ExternalAPITest_ModuleProcessor {

    /**
     * @name onClickHandler
     * @param {any} objContext
     * @param {any} objData
     */
    OnClickHandler(objContext) {
        let RequestURL = objContext.state.RequestUrl.split(":")[0] == "http" || objContext.state.RequestUrl.split(":")[0] == "https" ?
            objContext.state.RequestUrl :
            JConfiguration.BaseUrl + objContext.state.RequestUrl;
        let objJRequestBody = JSON.parse(objContext.state.RequestBody == null ? '{"Token":""}' : objContext.state.RequestBody);
        if (objJRequestBody != undefined) {
            if (objContext.state.blnIsPostData) {
                fetch(RequestURL, {
                    method: "POST",
                    body: objContext.state.RequestBody,
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    credentials: 'same-origin'
                }).then(objResponse => { return objResponse.json() })
                    .then(objJsonResponse => {
                        objContext.dispatch({ type: "SET_STATE", payload: { ResponseJson: objJsonResponse } });
                    })
            }
            else {
                fetch(RequestURL, {
                    method: "GET",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Token': objJRequestBody.Token != undefined ? objJRequestBody.Token : ""
                    }),
                    credentials: 'same-origin'
                }).then(objResponse => { return objResponse.json() })
                    .then(objJsonResponse => {
                        objContext.dispatch({ type: "SET_STATE", payload: { ResponseJson: objJsonResponse } });
                    })
            }
        }
    }

    /**
     * @name onCheckBoxClick
     * @param {any} objContext
     * @param {any} blnIsPostDataSelected
     */
    OnCheckBoxClick(objContext,blnIsPostDataSelected) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnIsPostData: blnIsPostDataSelected } });
    }

    OnChangeHandler(objContext, objEvent) {
        let strUrl = objEvent.target.value;
        objContext.dispatch({ type: 'SET_STATE', payload: { RequestUrl: strUrl } });
    }

    OnReuestBodyUpdate(objContext, objEvent) {
        let strUrl = objEvent.target.value;
        objContext.dispatch({ type: 'SET_STATE', payload: { RequestBody: strUrl } });

    }
}


export default ExternalAPITest_ModuleProcessor
