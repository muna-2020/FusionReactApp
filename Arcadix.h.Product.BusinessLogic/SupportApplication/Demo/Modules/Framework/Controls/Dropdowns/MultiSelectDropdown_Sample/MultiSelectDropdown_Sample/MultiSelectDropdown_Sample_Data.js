/**
* @name GetData
* @summary it returns the object for Data 
* @returns {*} object
*/
export const GetData = () => {
    //The data is array of objects required for the Multiselect Dropdown without multilanguage data

    const arrData = [
        { id: "1", name: "Option1", cIsDeleted: "N" },
        { id: "2", name: "Option2", cIsDeleted: "N" },
        { id: "3", name: "Option3", cIsDeleted: "N" },
        { id: "4", name: "Option4", cIsDeleted: "Y" }
    ];

    const arrSelectedData = [
        { id: "2", name: "Option2", cIsDeleted: "N" },
        { id: "3", name: "Option3", cIsDeleted: "N" }
    ];

    return {
        MultiSelectDropdownData: arrData, //It is an array of objects. It is a mandatory props.
        SelectedItems: arrSelectedData //MultiSelectDropdownData will display that value as the one which is selected on load. Here you pass the primary key of the selected items. 
    };
};