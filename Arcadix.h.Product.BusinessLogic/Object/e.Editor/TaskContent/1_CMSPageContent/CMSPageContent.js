//ArcadixCacheData service import
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

//Application State Classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name Object_Editor_TaskContent_CMSPageContent
 * @summary Entity Object for CMSPageContent
 * */
let Object_Editor_TaskContent_CMSPageContent = {

    URL: "API/Object/Editor/TaskContent/CMSPageContent",

    InitialDataCallParam: null,

    Initialize: function (props, arrPageIds, intLanguageId, cIsForEditor) {
        let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails");
        let objParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": arrPageIds.join()
                        }
                    },
                    {
                        "match": {
                            "iLanguageId": intLanguageId
                        }
                    }
                ]
            },
           // "uUserId": objClientUserDetails != undefined? objClientUserDetails["UserId"]: ClientUserDetails["UserId"], //'ClientUserDetails' is a global object, used in dev mode.
            "uUserId": "AE27E1A5-CEAF-48DC-9FD7-5EE49BF434C6",
            "intLanguageId": props.JConfiguration.InterfaceLanguageId,
            "cIsForEditor": cIsForEditor,
            "boolShowAnswer": true
        };
        Object_Editor_TaskContent_CMSPageContent.InitialDataCallParam = objParam
        ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSPageContent", Object_Editor_TaskContent_CMSPageContent);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSPageContent.URL,
            "Params": Object_Editor_TaskContent_CMSPageContent.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to get page content details.
     * @returns {any} Promise
     */
    GetData: (objParams, fnCallback) => {
        return new Promise((resolve, reject) => {
             ArcadixFetchData.ExecuteSingle(Object_Editor_TaskContent_CMSPageContent.URL, objParams, "Get", (objReturn) => { 
                fnCallback(objReturn);
            }, true);
        });
    },

    /**
     * @name EditData
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result.
     * @summary Makes an API call to edit page content details.
     * @returns {any} Promise
     */
    EditData: (objParams, fnCallback) => {
        return new Promise((resolve, reject) => {
             ArcadixFetchData.ExecuteSingle(Object_Editor_TaskContent_CMSPageContent.URL, objParams, "Put", (objReturn) => { 
                resolve(objReturn);
            }, true);
        });
    }
};

export default Object_Editor_TaskContent_CMSPageContent;
