import { retrieveToken } from '@shared/Framework/Services/AsyncStorage/AsyncStorage';

const ProviderController = {
    ArcadixFetchDataProvider : {
        fetch: function (strUrl, strHttpMethodType, objParams, customHeaders = {}) {
            var result = retrieveToken().then((JWT) => {
                if(strHttpMethodType == "Get"){
                    var fetchResult = fetch(global.JConfiguration.BaseUrl + strUrl,
                        {
                            method: strHttpMethodType.toUpperCase(),
                            credentials: 'same-origin'
                        });
                } else
                {
                    var fetchResult = fetch(global.JConfiguration.BaseUrl + strUrl,
                        {
                            method: strHttpMethodType.toUpperCase(),
                            body: JSON.stringify(objParams),
                            headers: new Headers({
                                'Authorization': JWT,
                                'Device':"Native",
                                'Content-Type': 'application/json',
                                ...customHeaders
                            }),
                            credentials: 'same-origin'
                        });
                }

                return fetchResult;

            }).catch((error) => {3
                console.log("TOKEN_FETCH_ERROR", error);
            });

            return result;
        }
    }
};

export default ProviderController;