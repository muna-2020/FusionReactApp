/**
 * @name GetTreeMetaData
 * @summary Contains the meta data for the tree.
 * @returns {object} meta data.
 */
export function GetTreeMetaData() {
    let objMeta = {
        IdField: 'Id', 
        ParentIdField: 'PId', 
        TextField: 'Name', 
        RootNodeId: "0",
        ShowExpandCollapseIcon: true
    };
    return objMeta;
}

