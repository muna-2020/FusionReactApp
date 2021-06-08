/**
* @name GetMetaData
* @summary it returns the object of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return {
        DisplayColumn: "vSubjectName", // attribute name of sub table objects.
        DependingTableName: "t_TestDrive_Subject_Data" // sub table name
    }
};