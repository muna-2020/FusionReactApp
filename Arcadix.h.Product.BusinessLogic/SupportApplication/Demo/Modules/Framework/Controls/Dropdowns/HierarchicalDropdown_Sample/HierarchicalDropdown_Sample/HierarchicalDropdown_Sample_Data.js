/**
* @name GetData
* @summary it returns the object for Data 
* @returns {*} object
*/
export const GetData = () => {
    //The data is array of objects required for the Hierarcical Dropdown without multilanguage data
    let Data = [
        { id: 1, DisplayName: "Option1", parentId:"0" ,cIsDeleted: "N" },
        { id: 2, DisplayName: "Option2", parentId: "0",cIsDeleted: "N" },
        { id: 3, DisplayName: "Option3", parentId: "1",cIsDeleted: "N" },
        { id: 4, DisplayName: "Option4", parentId: "2",cIsDeleted: "Y" }
    ];

    return {
        HierarchicalDropdownData: Data,//this is a mandatory prop
        SelectedValue: -1 //HierarchicalDropdown will display that value as the one which is selected on load. Here you pass the primary key of the selected items. This is an optional props
    };
};