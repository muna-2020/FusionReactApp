//Prefetch related Imports.
import { PrefetchEditorResourceData } from '@root/Application/e.Editor/PC/EditorPrefetch';

export function Register() {
    if (JConfiguration.IsPrefetchEnabled && "serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            //---------------------------------Registering the Service Worker-------------------------------
            navigator.serviceWorker.register(JConfiguration.BaseUrl + 'ServiceWorker.js').then(
                function (registration) {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);                
                },
                function (err) {
                    console.log("ServiceWorker registration failed: ", err);
                }
            );
            //----------------------------------------------------------------------------------------------

            //----------------------Getting response from ServiceWorker using PostMessage-------------------
            navigator.serviceWorker.addEventListener('message', event => {
                let objReformattedData = ArcadixFetchData.GetMappedColumns(event.data.EntityData);                 
                if (objReformattedData["Object_Editor_Prefetch"]) {
                    //Editor Resource Prefetch
                    PrefetchEditorResourceData(objReformattedData["Object_Editor_Prefetch"]);                    
                }
                else {
                    let objResponse = {
                        URL: event.data.EntityUrl,
                        Params: event.data.EntityParams,
                        Data: objReformattedData,
                        HeaderData: event.data.HeaderData
                    };
                    ArcadixCacheData.AddPrefetchDataToStore(objResponse);                              
                }
            });
            //-----------------------------------------------------------------------------------------------       
        });
    }
}