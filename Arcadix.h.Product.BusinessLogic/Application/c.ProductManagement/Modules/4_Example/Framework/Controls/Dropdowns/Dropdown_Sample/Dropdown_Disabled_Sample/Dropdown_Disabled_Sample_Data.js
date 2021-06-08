/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    //The data is an array of objects required for dropdown.
    const arrData = [
        { id: "1", name: "AAA", cIsDeleted: "N" },
        { id: "2", name: "BBB", cIsDeleted: "N" },
        { id: "3", name: "CCC", cIsDeleted: "N" },
        { id: "4", name: "DDD", cIsDeleted: "Y" }
    ];

    return {
        DropdownData: arrData, //this is a mandatory prop
        SelectedValue: "2" //Dropdown will display that value as the one which is selected on load. 
                            //Here you pass the primary key of the selected items.This is an optional props
    };
};