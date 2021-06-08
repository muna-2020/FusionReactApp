/**
* @name GetMetaData
* @summary it returns the object of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return {
        DisplayColumn: "DisplayName",
        ValueColumn: "ValueColumn",
        IsLanguageDependent: 'Y',
        DependingTableName: "DependingTableName"
    }
};