/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {

    //Will hold the skin path. This is not a mandatory prop.
    let SkinPath = JConfiguration.IntranetSkinPath;

    return {
        SkinPath,
        ImagePathDetails: { "Folder": "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png" }
    };
};