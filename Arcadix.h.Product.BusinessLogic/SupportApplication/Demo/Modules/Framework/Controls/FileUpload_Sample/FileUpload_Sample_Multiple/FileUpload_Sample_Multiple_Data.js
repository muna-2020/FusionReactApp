/**
* @name GetData
* @summary it returns the object of Data requied for file upload this Data props is optional.
* @returns {object} Data
*/
export const GetData = () => {
    let arrFileData = [
        {
            FileName: "00000000-0000-0000-0000-000000000000512201915177638.txt",
            OriginalFileName: "asdf.txt"
        },
        {
            FileName: "00000000-0000-0000-0000-0000000000005122019151929668.png",
            OriginalFileName: "TreePath.png"
        }
    ];
    return {
        FileData: arrFileData //already selected data.
    };
};