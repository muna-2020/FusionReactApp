/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {
    let Text = {
        "UploadButtonText": "Upload" // Button text
    };

    let ImagePath = { //Icons to show in control not mandatory. Send when want to override default icons.
        DownloadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/download_brown.png", //by default down-arrow will show.
        DeleteIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_brown.png", //by default recycle-bin will show.
        UploadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png" //by default plus will show.
    }

    let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory

    return {
        Text,
        SkinPath,
        ImagePath
    };
};