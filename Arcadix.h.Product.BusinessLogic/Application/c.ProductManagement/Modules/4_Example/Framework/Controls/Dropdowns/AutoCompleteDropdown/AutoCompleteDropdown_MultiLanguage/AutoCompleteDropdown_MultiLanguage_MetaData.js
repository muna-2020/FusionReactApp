/**
* @name GetMetaData
* @summary it returns the object of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return {
        DisplayColumn: "DisplayName",
        ValueColumn: "Id",
        IsLanguageDependent: 'N',
        // DependingTableName: "DependingTableName",//if IsLanguageDependent = N no need of passing this.
    }
};