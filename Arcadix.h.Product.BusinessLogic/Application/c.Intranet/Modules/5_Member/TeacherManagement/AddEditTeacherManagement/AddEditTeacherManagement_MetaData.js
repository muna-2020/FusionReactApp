/**
 * @name GetMetaData
 * @param {*} 
 * @param {*} 
 * @summary return the respective object of the metadata which matches the vColumnName
 */
export const GetMetaData = () => {
    return [
        {
            "vColumnName": "uSchoolId",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "TeacherManagement"
        },
        {
            "vColumnName": "vFirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "TeacherManagement"
        },
        {
            "vColumnName": "vName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "TeacherManagement"
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage",
            "iWidth": null,
            "iTabId": "TeacherManagement"
        },
        {
            "vColumnName": "vPhonePrivate",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "TeacherManagement"
        },
        {
            "vColumnName": "vPhoneSchool",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "TeacherManagement"
        }
    ];
    //let objMeta = {
    //    HeaderData: arrHeaderData,
    //    PrimaryKey: "uStateAdministratorId",
    //};
    // return objMeta;
};