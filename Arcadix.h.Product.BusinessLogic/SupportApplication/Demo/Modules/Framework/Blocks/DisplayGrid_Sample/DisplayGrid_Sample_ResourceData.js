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
        "DateColumn": "DateColumn_Text",
        "DateTimeColumn": "DateTimeColumn_Text",
        "ImageColumn": "ImageColumn_Text",
        "ImageColumn_CheckBox": "ImageColumn_CheckBox_Text",
        "DropDownColumn":"DropDownColumn_Text",
        "OrganizationalUnit": "Organizational Unit",
        "Name": "Name",
        "FirstName": "First Name",
        "Email": "E-Mail",
        "Password": "Password",
        "TeacherId": "Teacher ID",
        "ShortStateName": "Language",
        "School": "School",
        "ParentSubjectId": "Parent Subject Id",
        "DisplayOrder": "Display Order",
        "MainClientId": "Main Client Id",
        "SubjectId": "SubjectId",
        "SubjectName": "SubjectName",
        "File": "File",
    };

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let ImagePath = JConfiguration.IntranetSkinPath + "/Images/Common/Icons/";

    return {
        Text,
        ImagePath
    };
};