/**
 * @name GetMetaData
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    //Meta data pass the column name 
   return {
        DisplayColumn: 'DisplayName', //As a value, pass the Key of HierarchicalDropdown data, that need displaying in the Hierarchical Dropdown 
        ValueColumn: 'id', //As a value, pass the primary key of the Hierarchical Dropdown data    
        ParentId: 'parentId', //Contains the parent column name 
        Root: '0', //Root Id of the entire data usually it will be 0.      
        DefaultOptionValue: -1,  //Pass the id of the default option text 
        ShowDefaultOption: true //when true shows the DefaultOptionText (from resource) in the Hierarchical Dropdown
        //DependingTableName: "MultiLanguageTable", //This props is used to check if the Hierarchical Dropdown data is language dependent.
        //IsLanguageDependent: "N", //If this is "N", Hierarchical dropdown will know that data passed is a multilanguage data
        //DefaultOptionTextKey: "PleaseChooseSomething" // DefaulOptionTextKey if passed, will get the value from the resource with this key and show in the Hierarchical Dropdown instead of DefaultOptionText.
        //Disabled: "Y" //This Key is used to make the HierachicalDropdown disabled (on click dropdown list will not show) if value is "Y"
    };
};