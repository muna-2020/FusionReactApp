﻿/*
 * @name GetMetaData
 * @summary it returns the array of meta datas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    //Meta data pass the column name 
   return {
        DisplayColumn: 'DisplayName',  //As a value, pass the Key of HierachicalDropdown data, that need displaying in the HierachicalDropdown 
        ValueColumn: 'id', //As a value, pass the primary key of the HierachicalDropdown data   
        ParentId: 'parentId', //Contains the parent column name 
        Root: '0', //Root Id of the entire data usually it will be 0.
        IsLanguageDependent: "Y", //If this is  "Y", HierachicalDropdown will know that data passed is a multilanguage data
        DependingTableName: "MultiLanguageTable", //HierachicalDropdown will check for this DependingTableName's value to look for the DisplayColumn
        DefaultOptionValue: -1, //Pass the id of the default option text       
        ShowDefaultOption: true, //when true shows the DefaultOptionText (from resource) in the HierachicalDropdown
        Disabled: "Y" //This Key is used to make the HierachicalDropdown disabled (on click dropdown list will not show) if value is "Y"
        //DefaultOptionTextKey: "PleaseChooseSomething" // DefaulOptionTextKey if passed, will get the value from the resource with this key and show in the HierachicalDropdown instead of DefaultOptionText.
    };
};