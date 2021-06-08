/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iStateId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "StateAdministrator",
            "vTextResourceKey": "StateId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "vControlType": "textbox",
            "iDisplayOrder": 2,
            "vTextResourcePage": "StateAdministrator",
            "vTextResourceKey": "Name",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "vControlType": "textbox",
            "iDisplayOrder": 3,
            "vTextResourcePage": "StateAdministrator",
            "vTextResourceKey": "FirstName",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "textbox",
            "iDisplayOrder": 4,
            "vTextResourcePage": "StateAdministrator",
            "vTextResourceKey": "Email",
            "IsMandatory": null,
            "vValidationType": "email"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uStateAdministratorId",
    };
    return objMeta;
};
