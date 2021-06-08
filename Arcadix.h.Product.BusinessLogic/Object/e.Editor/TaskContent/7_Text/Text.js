//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_Text
 * @summary Entity Object for Text
 * */
let Object_Editor_TaskContent_Text = {

    URL: "API/Object/Editor/TaskContent/Text",

    InitialDataCallParam: null,

    /**
     * @name SpellCheckPage
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to get the spellched cmspage.
     * @returns {any} Promise
     */
    SpellCheckPage: (objParams, fnCallback) => {
        let iPageId = objParams["SearchQuery"]["must"][0]["match"]["iPageId"];
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_Text.URL + "/SpellCheckPage", objParams, null, (objReturn) => {
                if (objReturn["Object_Editor_TaskContent_Text_SpellCheckPage;iPageId;" + iPageId]["Data"].length > 0) {
                    resolve(objReturn["Object_Editor_TaskContent_Text_SpellCheckPage;iPageId;" + iPageId]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            }, true);
        });
    },

    GetSuggestions: (objParam) => {
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_Text.URL + "/GetSuggestions", objParam, null, (objReturn) => {
                if (objReturn["Object_Editor_TaskContent_Text_GetSuggestions"]["Data"].length > 0) {
                    resolve(objReturn["Object_Editor_TaskContent_Text_GetSuggestions"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            }, true)
        });
    }
};

export default Object_Editor_TaskContent_Text;