/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {
    //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
    let Text = {
        "TeacherId": "Teacher Type",
        "ClassGroupId": "Class Type",
        "SchoolTypeId": "School Type",
        "FirstName": "First Name",
        "Name": "Name",
        "Email": "Email",
        "dtCreatedOn": "Created On",
        "dtModifiedOn": "Modified On",
        "ActivationStatus": "ActivationStatus",
        "Edit": "Edit",
        "Cancel": "Cancel",
        "CheckBox": "CheckBoxColumn",
        "RequireValidationMessage": "RequireValidationMessage",
        "ValidationKey_FirstName": "ValidationMessage_FirstName",
        "ValidationKey_Email": "ValidationMessage_Email",
        "ValidationKey_dtCreatedOn": "ValidationMessage_dtCreatedOn",
        "EmptyDataMessage": "EmptyDataMessage",
        "TeacherGrid_ColumnName_Email": "Email",
        "TeacherGrid_ColumnName_Mobile": "Mobile",
        "TeacherGrid_ColumnName_FirstName": "FirstName",
        "TeacherGrid_ColumnName_Phone": "Phone",
        "TeacherGrid_ColumnName_Title": "Title",
        "TeacherGrid_ColumnName_Name": "Name",
        "TeacherGrid_ColumnName_ShortCut": "ShortCut",
        "Status": "Status",
        "TeacherGrid_ColumnName_SubjectExpertTeacherMarkedBySchool": "Marked By School"
    };

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let SkinPath = JConfiguration.ExtranetSkinPath;

    return {
        Text,
        SkinPath
    };
};