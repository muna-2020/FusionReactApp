//ArcadixFetchData imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_TaskEvaluation_TaskEvaluation
 * @summary Object_TaskEvaluation_TaskEvaluation
 * */
let Object_TaskContent_CMSElement_CMSAnimation = {

    /**
     * @name SaveAnimation
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to save an animation.
     * @returns {any} Promise
     */
    SaveAnimation: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": "API/Object/Editor/TaskContent/CMSAnimation/SaveAnimation",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["SavedAnimationDetails"]["Data"].length > 0) {
                    resolve(objReturn["SavedAnimationDetails"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    },

    /**
     * @name GetAnimationElementJson
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to get animation element json.
     * @returns {any} Promise
     */
    GetAnimationElementJson: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": "API/Object/Editor/TaskContent/CMSAnimation/GetAnimationElementJson",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["AnimationJson"]["Data"].length > 0) {
                    resolve(objReturn["AnimationJson"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    },

    /**
     * @name GetAnimationWrapperContents
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to get animation wrapper contents.
     * @returns {any} promise
     */
    GetAnimationWrapperContents: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": "API/Object/Editor/TaskContent/CMSAnimation/GetAnimationWrapperContents",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["AnimationWrapperContents"]["Data"].length > 0) {
                    resolve(objReturn["AnimationWrapperContents"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
};

export default Object_TaskContent_CMSElement_CMSAnimation;
