/* 
 * @name GetMetaData
 * @summary it returns the array of meta datas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    //Meta data pass the column name 
   return {
       DisplayColumn: 'MultiLanguageName', //As a value, pass the Key of Dropdown data, that need displaying in the Dropdown 
        ValueColumn: 'id', //As a value, pass the primary key of the Dropdown data    
        ParentId: 'parentId', //Contains the parent column name 
        Root: '0', //Root Id of the entire data usually it will be 0.
        IsLanguageDependent: "Y",//If this is "Y", dropdown will know that data passed is a multilanguage data
        DependingTableName: "MultiLanguageTable", //Dropdown will check for this DependingTableName's value to look for the DisplayColumn
        DefaultOptionValue: -1, //Pass the id of the default option text      
        ShowDefaultOption: true //when true shows the DefaultOptionText (from resource) in the Dropdown
        //DefaultOptionValue: "PleaseChooseSomething" // DefaulOptionTextKey if passed, will get the value from the resource with this key and show in the Dropdown instead of DefaultOptionText.
        //Disabled: "Y" //This Key is used to make the HierachicalDropdown disabled (on click dropdown list will not show) if value is "Y"
   };
};