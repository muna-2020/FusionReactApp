/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {

    //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
    let Text = {
        "SchoolName": "Schulhausname",
        "StateName": "Kanton",
        "TitleId": "Anrede",
        "ZIPCode": "PLZ",
        "EMail": "E-Mail",
        "FirstName": "Vorname",
        "Name": "Name",
        "Password": "Passwort ändern",
        "Phone": "Telefon",
        "SchoolType": "Schulstatus",
        "Street": "Ort",
        "Town": "Strasse",
        "RequireValidationMessage": "The field is Mandatory",
        "vSchoolName_RequireValidationMessage": "Enter the School Name",
        "PasswordValidationMessage": "Pw not matching",
        "Email_val_msg": "Email is not in correct format",
        "Phone_val_msg": "Please enter number"
        //"Email_val_msg": "Email already exists"
    };;

    return Text;
};