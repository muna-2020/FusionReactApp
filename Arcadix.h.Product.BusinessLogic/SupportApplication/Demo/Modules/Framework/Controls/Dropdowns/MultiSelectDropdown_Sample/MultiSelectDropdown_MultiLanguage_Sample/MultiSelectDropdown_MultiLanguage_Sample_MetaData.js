/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    //Meta data pass the column name 
    return {
        DisplayColumn: 'vSubjectName', //As a value, pass the Key of MultiSelectDropdown data, that need displaying in the MultiSelectDropdown 
        ValueColumn: 'iSubjectId', //As a value, pass the primary key of the MultiSelectDropdown data   
        IsLanguageDependent: "Y", //If this is "Y", MultiSelectDropdown will know that data passed is a multilanguage data
        DependingTableName: "t_TestDrive_Subject_Data", //This props is used to check if the MultiSelectDropdown Dropdown data is language dependent.
        ShortNameColumn: "vSubjectShortName", //This props is used to display the Short form of DisplayColumn.  
       // Disabled: "Y" //This Key is used to make the MultiSelectDropdown disabled (on click dropdown list will not show) if value is "Y"
        //ShowDefaultOption: true  //when true shows the DefaultOptionText (from resource) in the MultiSelectDropdown Dropdown
        //DefaultOptionTextKey: "PleaseChooseSomething" //DefaulOptionTextKey if passed, will get the value from the resource with this key and show in the MultiSelectDropdown instead of DefaultOptionText.
    };
};