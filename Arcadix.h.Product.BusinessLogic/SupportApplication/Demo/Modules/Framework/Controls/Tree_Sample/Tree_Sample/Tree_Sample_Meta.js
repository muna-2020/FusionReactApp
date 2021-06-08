/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {

    const objMeta = {
        IdField: 'id', //Id field of the Node
        ParentIdField: 'pid', //Parent Id field of the Node.
        TextField: 'name', //The value with the this key from the node object will be diplayed.
        RootNodeId: 'root', //The value of the Node to be taken as the parent folder.
        //OpenChildNodes : true
    };

    return objMeta;
};