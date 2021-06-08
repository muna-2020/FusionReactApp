/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    //The data is an array of objects required for dropdown.
    const arrData = [
        { id: "1", name: "Name_1", cIsDeleted: "N" },
        { id: "2", name: "Name_2", cIsDeleted: "N" },
        { id: "3", name: "Name_3", cIsDeleted: "N" },
        { id: "4", name: "Name_4", cIsDeleted: "Y" }
    ];

    return {
        DropdownData: arrData, //this is a mandatory prop
        SelectedValue: "-1" //Dropdown will display that value as the one which is selected on load. Here you pass the primary key of the selected items. This is an optional props

    };
};