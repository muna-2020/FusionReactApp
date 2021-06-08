/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    //The data is an array of objects required for Tab.
    let arrTabData = [
        {
            Text: "Tab_1"
        },
        {
            Text: "Tab_2"
        },
        {
            Text: "Tab_3"
        },
        {
            Text: "Tab_4"
        },
        {
            Text: "Tab_5"
        }
    ];
    return {
        TabData: arrTabData //this is a mandatory prop
    };
};