//ArcadixFetchData imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_TaskContent_CMSElement_CMSHtmlImage
 * @summary Module object for CMSHtmlImage
 * */
let Object_TaskContent_CMSElement_CMSHtmlImage = {

    /**
     * @name GetHtmlImageDetails
     * @param {object} intElementId Element Id of Html Image
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to get Html Image Details.
     * @returns {any} promise
     */
    GetHtmlImageDetails: (intElementId, fnCallback) => {
        let arrParams = [
            {
                "URL": "API/Object/Editor/TaskContent/CMSHtmlImage/GetHtmlImageDetails",
                "Params": {
                    "iElementId": intElementId
                }
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["HtmlImageDetails"]["Data"].length > 0) {
                    resolve(objReturn["HtmlImageDetails"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    },

    /**
     * @name SaveAnimation
     * @param {object} objParams Call params
     * @param {callback} fnCallback callback for the result
     * @summary Makes an API call to save html image.
     * @returns {Promise} Promise
     */
    SaveHtmlAsImage: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": "API/Object/Editor/TaskContent/CMSHtmlImage/SaveHtmlAsImage",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["HtmlImageDetails"]["Data"].length > 0) {
                    resolve(objReturn["HtmlImageDetails"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
};

export default Object_TaskContent_CMSElement_CMSHtmlImage;
