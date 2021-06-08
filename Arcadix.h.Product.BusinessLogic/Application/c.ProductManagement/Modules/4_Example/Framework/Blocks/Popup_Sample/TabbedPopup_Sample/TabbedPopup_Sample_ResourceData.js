/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {

    //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
    let Text = {
        "TextBoxColumn": "TextBoxColumn_Text",
        "LabelColumn": "LabelColumn_Text",
        "ErrorPopup_ErrorText:1": "Please Enter the value",
        "ErrorPopup_ErrorText:n": "Please Enter the value",
        "ErrorPopup_ErrorText": "Please Enter the value",
        "ErrorPopup_OkButtonText": "Okay",
        "RequireValidationMessage": "field is required",
    };

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let ImagePath = JConfiguration.IntranetSkinPath + "/Images/Common/Icons/";

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let SkinPath = JConfiguration.IntranetSkinPath;

    let ImagePathDetails = {
        "test.svg": ImagePath + "/test.svg"
    }


    return {
        Text,
        ImagePath,
        SkinPath,
        ImagePathDetails
    };
};