/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {
    //Will hold the skin path.
    let SkinPath = JConfiguration.ExtranetSkinPath;
    return {
        SkinPath
    };
};