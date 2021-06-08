/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    //Meta data pass the column name 
    return {
        DisplayColumn: 'name',//As a value, pass the Key of MultiSelectDropdown data, that need displaying in the MultiSelectDropdown 
        ValueColumn: 'id',//As a value, pass the primary key of the MultiSelectDropdown data   
        IsLanguageDependent: "N", //If this is "N", MultiSelectDropdown will know that data passed is not a multilanguage data
        ShortNameColumn: "name" //This props is used to display the Short form of DisplayColumn.  
        //ShowDefaultOption: true,  //when true shows the DefaultOptionText (from resource) in the MultiSelectDropdown Dropdown
        //DependingTableName: "t_TestDrive_Subject_Data",
        //Disabled: "Y" //This Key is used to make the MultiSelectDropdown disabled (on click dropdown list will not show) if value is "Y"
        //DefaultOptionTextKey: "PleaseChooseSomething" //DefaulOptionTextKey if passed, will get the value from the resource with this key and show in the MultiSelectDropdown instead of DefaultOptionText.
    };
};