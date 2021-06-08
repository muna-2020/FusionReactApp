/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    //Meta data pass the column name 
    return {
        DisplayColumn: 'DisplayName',
        ValueColumn: 'id',
        ParentId: 'parentId',
        Root: '0',
        IsLanguageDependent: "N",
        //DependingTableName: "MultiLanguageTable",
        DefaultOptionValue: -1,
        ShowDefaultOption: true
    };
};