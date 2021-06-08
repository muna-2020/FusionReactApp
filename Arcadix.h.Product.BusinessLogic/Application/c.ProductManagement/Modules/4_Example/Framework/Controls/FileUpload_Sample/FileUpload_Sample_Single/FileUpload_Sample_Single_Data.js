/**
* @name GetData
* @summary it returns the object of Data requied for file upload this Data props is optional.
* @returns {object} Data
*/
export const GetData = () => {
    let arrFileData = [
        {
            FileOrigin : "Animation/634445_Animation_1/DigitalClock_JSON_AnimateCC.zip"
        },
        //{
        //    FileName: "00000000-0000-0000-0000-0000000000005122019151929668.png",
        //    OriginalFileName: "TreePath.png",
        //}
    ]
    return {
        FileData: arrFileData //already selected data.
    }
};