/**
* @name GetMetaData
* @summary it returns the object metadata
* @returns {object} MetaData
*/
export const GetMetaData = () => {        
    return {
        "DisplayColumn": "MultiLanguageName", //As a value, pass the Key of Dropdown data, that need displaying in the Dropdown 
        "ValueColumn": "id", //As a value, pass the primary key of the Dropdown data    
        "IsLanguageDependent": "Y", //If this is  "Y", dropdown will know that data passed is a multilanguage data
        "DependingTableName": "MultiLanguageTable" //Dropdown will check for this DependingTableName's value to look for the DisplayColumn
        //"Disabled": "Y" //This Key is used to make the Dropdown disabled (on click dropdown list will not show) if value is "Y"
        //"DefaultOptionValue": -1, //Pass the id of the default option text       
        //"ShowDefaultOption": true, //when true shows the DefaultOptionText (from resource) in the Dropdown
        //"DefaultOptionTextKey": "DefaultOptionTextKey_Text" //DefaulOptionTextKey if passed, will get the value from the resource with this 
                                                               //key and show in the Dropdown instead of DefaultOptionText.
    };
};