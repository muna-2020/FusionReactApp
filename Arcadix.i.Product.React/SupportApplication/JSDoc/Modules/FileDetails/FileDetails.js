// React related imports.
import React, { useReducer , useMemo } from 'react';

//Module related files.
import * as FileDetailsBusinessLogic from '@shared/SupportApplication/k.JSDoc/Modules/FileDetails/FileDetailsBusinessLogic';

//Components used
import Tree from '@root/Framework/Controls/Tree/Tree';

/**
* @name Tree
* @param {object} props props
* @summary This component displays the Tree_Sample.
* @returns {object} JSX.
*/
const FileDetails = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(FileDetailsBusinessLogic.Reducer, FileDetailsBusinessLogic.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    /**
     * @summary called at initial load to check the Query string for file name.
     */
    FileDetailsBusinessLogic.useOnInitialLoad(objContext);

    let objNodeFields = { IdField: 'Id', ParentIdField: 'pId', TextField: 'name', RootNodeId: 'G:/Arcadix/Product.Fusion', IconPath: ImagePath.Path, ImageTypePaths: { "Folder": "Folder.svg", "File": "File.png" } };
        

    /**
     * @name GetMethods
     * @summary Get the File Content View JSX for Methods.
     */
    function GetMethods() {
        let arrMethods = objContext.state.arrFileCommentsContent;
        let domMethods = [];
        if (arrMethods.length > 0) {
            arrMethods.map((objMethods, index) => {
                if (objMethods["Error"]) {
                    domMethods = [...domMethods, <div className="JS-accordion-wrapper">

                        <div className="JS-accordion-trigger" onClick={() => FileDetailsBusinessLogic.ToggleShowMethod(objContext, index, objMethods["expand"])}>
                            <span>{objMethods["Error"]}</span>
                            <img src={objMethods["expand"] ? ImagePath.Path + 'angle_down.svg' : ImagePath.Path + 'angle_right.png'} />
                        </div>
                        <div className="JS-accordion-content" style={{ display: objMethods["expand"] ? 'block' : 'none' }}>
                            <div className='JSdoc-header'> StackTrace: <span>{objMethods["StackTrace"]} </span></div>
                        </div>
                    </div>];
                }
                else {
                    domMethods = [...domMethods, <div className="JS-accordion-wrapper">

                        <div className="JS-accordion-trigger" onClick={() => FileDetailsBusinessLogic.ToggleShowMethod(objContext, index, objMethods["expand"])}>
                            <span>{objMethods["FunctionName"]}</span>
                            <img src={objMethods["expand"] ? ImagePath.Path + 'angle_down.svg' : ImagePath.Path + 'angle_right.png'} />
                        </div>
                        <div className="JS-accordion-content" style={{ display: objMethods["expand"] ? 'block' : 'none' }}>
                            <div className='JSdoc-header'> Summary: <span>{objMethods["Summary"]} </span></div>
                            {GetParams(objMethods["Params"])}
                            <div className='JSdoc-header'> Returns: <span>{objMethods["Returns"]}</span></div>
                        </div>
                    </div>];
                }
            });
        }
        else {
            domMethods = [...domMethods, <div className="JS-accordion-wrapper" style={{ display: 'block', 'padding-top': '400px' }}>
                <div className="JS-accordion-content" style={{ display: 'block', 'textAlign': 'center' }}>
                   No Content
                </div>
            </div>];
        }
        return domMethods;
    }

    /**
     * @name GetParams
     * @param {any} arrParams
     * @summary Get the File Content View JSX for Parameters 
     */
    function GetParams(arrParams) {
        let domParams = [];
        arrParams.map((objParams, index) => {
            domParams = [...domParams, <table><tbody>
                <tr>
                    <td rowSpan="5">Param {index + 1}</td>
                </tr>
                {/* <tr>
                    <td>Name </td>
                    <td>{objParams["name"]}</td>
                </tr> */}
                <tr>
                    <td>Param Name </td>
                    <td>{objParams["Param"]}</td>
                </tr>
                <tr>
                    <td>Type </td>
                    <td>{objParams["Type"]}</td>
                </tr>
                <tr>
                    <td>Description </td>
                    <td>{objParams["Description"]}</td>
                </tr>
            </tbody>
            </table>];
        });
        return domParams;
    }

    /**
     * @name GetContent
     * @returns {JSX} returns the content to display.
     * @summary jsx for FileDetails
     */
    function GetContent() {

        let strFileName = QueryString.GetQueryStringValue("FileName");
        let objData = {
            NodeData: FileStructure
        };
        if (strFileName != null && strFileName != "") {
            let objSelectedNode = FileDetailsBusinessLogic.GetFilePath(strFileName);
            if (objSelectedNode != undefined)
                objData = { NodeData: FileStructure, SelectedNodeId: objSelectedNode.Id };
        }

        return (
            <div className="JSdoc-grid">
                <div className="jd-left">
                    {useMemo(() =>
                        <Tree
                            Id={"FileDetailsTree"}
                            Meta={objNodeFields}
                            Data={objData}
                            Events={{
                                OnDragAndDrop: FileDetailsBusinessLogic.OnDragAndDrop,
                                OnExpandOrCollapse: FileDetailsBusinessLogic.OnExpandOrCollapse,
                                OnSelectNode: (objSelectedNode, arrNewNodes) => FileDetailsBusinessLogic.OnSelectNode(objSelectedNode, arrNewNodes, FileComments, objContext)
                            }}
                            Resource={{
                                SkinPath: JConfiguration.SkinPath,
                                ImagePathDetails: { "Folder": "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png" }
                            }}
                            CallBacks={{
                                OnBeforeShowNode: (objNodde) => {
                                    return { ...objNodde, "ImageType": "Folder" }
                                }
                            }}
                        />, [])}
                </div>
                <div className="jd-right">
                    {GetMethods()}
                </div>
            </div>
        );
    }

    return GetContent();
};

export default FileDetails;