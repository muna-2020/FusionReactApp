/**
* @name GetMetaData
* @summary it returns the object of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return {
        ShowUploadedFiles: true, // To show details of uploaded files.
        UploadSingle: 'Y' //restrict to select only one file if Y
    };
};