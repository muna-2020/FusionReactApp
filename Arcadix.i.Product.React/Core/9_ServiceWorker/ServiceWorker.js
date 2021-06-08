self.addEventListener('activate', event => {
    //To Claim the Client in Activate step so that ServiceWorker takes control of the client from First load itself
    clients.claim();
});

self.addEventListener("fetch", function (event) {
    let objResponse;
    //Intercepting the Prefetch calls alone in Service-Worker
    //if (event.request.url.includes("Prefetch/Prefetch.html")) {
    //    let objUrlParams = new URL(event.request.url);
    //    let strUrl = objUrlParams.searchParams.get("APIUrl");
    //    let strPrefetchUrl = objUrlParams.searchParams.get("PrefetchUrl");
    //    let strApplicationHostUrl = objUrlParams.searchParams.get("ApplicationHostUrl");
    //    let strParams = objUrlParams.searchParams.get("APIParams");
    //    let objParams = {
    //        Params: [
    //            {
    //                "URL": strUrl,
    //                "Params": JSON.parse(strParams),
    //                "MethodType": "GET",
    //                "UseFullName": true
    //            }
    //        ]
    //    };
    //    let strToken = objUrlParams.searchParams.get("token");
    //    let objCustomHeaders = {};
    //    if (strToken) {
    //        objCustomHeaders = {
    //            'Device': 'ServiceWorker',
    //            'Token': strToken
    //        }
    //    }  
    //    let objFetchParams = {
    //        method: "POST",
    //        body: JSON.stringify(objParams),
    //        headers: new Headers({
    //            ...objCustomHeaders,
    //            'Content-Type': 'application/json'
    //        }),
    //        //mode: 'cors',
    //        //credentials: 'same-origin',
    //        //referrerPolicy: 'origin',
    //    };
    //    let objHeaderData = {};
    //    //Making out custom API Multi call to Prefetch the Entity data
    //    event.respondWith(fetch(strPrefetchUrl + "API/MultiClassMethodCall/Execute?ApplicationHostUrl=" + strApplicationHostUrl, objFetchParams)//HARDCODE_CHECK 
    //        .then(objFetchResponse => {
    //            for (var pair of objFetchResponse.headers.entries()) {
    //                objHeaderData[pair[0]] = pair[1];
    //            }
    //            objResponse = objFetchResponse.clone();//cloning the response as we need to send to browser DOM(to complete the prefetch request)
    //            return objFetchResponse.json()
    //        })
    //        .then(async objJSON => {
    //            // Get the client.
    //            const client = await clients.get(event.clientId);
    //            //Sending Response Data to Client using PostMessage.
    //            client.postMessage({
    //                HeaderData: objHeaderData,
    //                EntityUrl: strUrl,
    //                EntityData: objJSON,
    //                EntityParams: JSON.parse(strParams)
    //            });
    //            return objResponse;
    //        })
    //    );
    //}
})