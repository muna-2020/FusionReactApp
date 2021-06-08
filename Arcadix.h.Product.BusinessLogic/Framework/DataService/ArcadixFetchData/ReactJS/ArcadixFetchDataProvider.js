/**
 * react js provider is a simple fetch
 */
const ArcadixFetchDataProvider = {
    fetch: function (strUrl, strHttpMethodType, objParams, customHeaders = {}) {
        var fetchResult = {};
        if (strHttpMethodType.toLowerCase() == "get" || strHttpMethodType.toLowerCase() == "delete") {
            fetchResult = fetch(global.JConfiguration.BaseUrl + strUrl,
                {
                    method: strHttpMethodType.toUpperCase(),
                    headers: new Headers({
                        'Content-Type': 'application/json', ...customHeaders
                    }),
                    credentials: 'same-origin'
                });
        }
        else {
            try {
                fetchResult = fetch(global.JConfiguration.BaseUrl + strUrl,
                    {
                        method: strHttpMethodType.toUpperCase(),
                        body: JSON.stringify(objParams),
                        headers: new Headers({
                            'Content-Type': 'application/json', ...customHeaders
                        }),
                        credentials: 'same-origin'
                    });
            }
            catch (e) {
                console.log("FETCH_ERROR", e);
            }
        }
        return fetchResult;
    }
};
export default ArcadixFetchDataProvider;
