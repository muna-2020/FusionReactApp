// React related imports.
import React, { useRef } from 'react';

//Helper File.
import * as Localization from "@root/Framework/Blocks/Localization/Localization";

//Inline Images import
import CheckedImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Grid/icon_Y.gif?inline';
import UncheckedImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Grid/closeWindow.svg?inline';

/**
* @name Row
* @param {object} props 
* @summary This component Forms the Row Cells(td) based on the ControlType.
* @returns {object} returns a jsx with provied data that will be displayed in it.
*/
const DisplayRow = (props) => {

    const refHierarchicalGrid = React.useRef();

    /**
     * @name GetShowLessContent
     * @param {any} strDisplayData
     * @sumarry When the String lengh is more than 70, it is make it 50 chars length.
     * @returns {string} 
     */
    function GetShowLessContent(strDisplayData) {
        return strDisplayData?.length > 70 ? strDisplayData.substring(0, 50) + "...." : strDisplayData;
    }

    /**
     * @name GetCell
     * @param {*} objColumn 
     * @param {*} strRowValue 
     * @sumarry forms the html cell element of the each cell(td)
     * @returns {object} JSX
     */
    function GetCell(objColumn, strRowValue, strKey) {
        var objStyle = { width: objColumn["iWidth"] + "px" };
        var strDisplayData = objColumn["cShowLess"] && objColumn["cShowLess"].toLowerCase() == "y" ? GetShowLessContent(strRowValue) : strRowValue;
        var strSpanDisplayData = "";
        let Cell = [];
        switch (objColumn["vControlType"].toLowerCase()) {
            case "textbox":
                Cell = (<td style={objStyle} key={strKey} title={strDisplayData}>{strDisplayData}</td>);
                break;
            case "label":
                Cell = (<td style={objStyle} key={strKey} title={strDisplayData}>{strDisplayData}</td>);
                break;
            case "date":
                Cell = (<td style={objStyle} key={strKey}>{Localization.DateFormatter(strDisplayData)}</td>);
                break;
            case "datetime":
                Cell = (<td style={objStyle} key={strKey}>{Localization.DateTimeFormatter(strDisplayData)}</td>);
                break;
            case "image":
                if (objColumn["vDataType"].toLowerCase() == "image") {
                    Cell = <td style={objStyle} key={strKey}>
                        {/*<img src={props.Resource.SkinPath + props.Resource.ImagePathDetails[strDisplayData]} />*/}
                        <img src={props.ImageMeta ? props.ImageMeta[strDisplayData] : props.Resource.SkinPath + props.Resource.ImagePathDetails[strDisplayData]} />
                    </td>;
                }
                else {
                    let blnIsChecked = strDisplayData ? strDisplayData.toUpperCase() : "N";
                    Cell = <td style={objStyle} key={strKey}>
                        {/*{blnIsChecked == "Y" ? <img src={props.Resource.SkinPath + "/Images/Framework/ReactJs/PC/Blocks/Grid/icon_Y.gif"} /> : <img src={props.Resource.SkinPath + "/Images/Framework/ReactJs/PC/Blocks/Grid/closeWindow.svg"} />}*/}
                        {blnIsChecked == "Y" ? <img src={props.ImageMeta ? props.ImageMeta["Checked"] : CheckedImage} /> : <img src={props.ImageMeta ? props.ImageMeta["Unchecked"] : UncheckedImage} />}

                    </td>;
                }
                break;
            case "dropdown":
                var objDropDownData = props.Data.DropDownData[objColumn["vColumnName"]];
                let strIsLanguageDependent = objDropDownData["IsLanguageDependent"];
                switch (strIsLanguageDependent) {
                    case "Y":
                        objDropDownData["Data"].map(objDropDownTableData => {
                            if (objDropDownTableData[objDropDownData["ValueColumn"]] == strDisplayData) {
                                objDropDownTableData[objDropDownData["DependingTableName"]].map(item => {
                                    if (item["iLanguageId"].toString() === props.ParentProps.JConfiguration["InterfaceLanguageId"]) {
                                        strSpanDisplayData = item[objDropDownData["DisplayColumn"]];
                                    }
                                })
                            }
                        });
                        break;
                    case "N":
                        objDropDownData["Data"].map(objDropDownTableData => {
                            if (objDropDownTableData[objDropDownData["ValueColumn"]] === strDisplayData) {
                                strSpanDisplayData = objDropDownTableData[objDropDownData["DisplayColumn"]];
                            }
                        });
                        break;
                    default:
                        strSpanDisplayData = strDisplayData;
                        break;

                }
                Cell = <td style={objStyle} key={strKey}>{strSpanDisplayData}</td>
                break;
            case "custom":
                Cell = <td onClick={(e) => { e.preventDefault() }}>{strRowValue}</td>;
                break;
            default:
                Cell = <td></td>
                break;

        }
        return Cell;
    }

    /**
    * @name GetMultiCells
    * @param {*} objColumn
    * @param {*} strRowValue
    * @param {*} strColumnName
    * @sumarry forms the html cell elements of the mutli languge column.
    * @returns {object} JSX
    */
    function GetMultiCells(objColumn, strTableName, strColumnName) {
        let RowCells = [];
        props.Data.LanguageIds.map((intLanguageId, intIndex) => {
            let objLanguageData = props.Data.RowData[strTableName].find(objLanguageData => objLanguageData["iLanguageId"] == intLanguageId)
            let strCellColumnData = objLanguageData ? objLanguageData[strColumnName] : "";
            RowCells = [...RowCells, GetCell(objColumn, strCellColumnData, intIndex)]
        })
        return RowCells;
    }

    /**
    * @name GetCells
    * @sumarry forms the cells of each row by calling required methods and return the formed row(td's)
    * @returns {object} JSX
    **/
    function GetCells() {
        let RowCells = [];
        props.Meta.HeaderData.map((objColumn, intIndex) => {
            let strCellColumnData;
            if (objColumn["vColumnName"].split('.').length === 2) {
                let strTableName = objColumn["vColumnName"].split('.')[0];
                let strColumnName = objColumn["vColumnName"].split('.')[1];
                if (objColumn["vControlType"].toLowerCase() == "textbox" || objColumn["vControlType"].toLowerCase() == "custom") {
                    //To Show the multilanguage data.
                    if (objColumn["cShowMultiLanguage"] && objColumn["cShowMultiLanguage"] === "Y") {
                        RowCells = [...RowCells, GetMultiCells(objColumn, strTableName, strColumnName)];
                    }
                    //To get only the main client language data.
                    else {
                        let objMainClientRowData = props.Data.RowData[strTableName].find(objLanguageData => objLanguageData["iLanguageId"] == props.ParentProps.JConfiguration["InterfaceLanguageId"]);
                        strCellColumnData = objMainClientRowData ? objMainClientRowData[strColumnName] : "";
                        RowCells = [...RowCells, GetCell(objColumn, strCellColumnData, intIndex)]
                    }
                }
                else {//vControlType would be "dropdown".
                    strCellColumnData = props.Data.RowData[strColumnName];
                    RowCells = [...RowCells, GetCell(objColumn, strCellColumnData, intIndex)];
                }

            }
            else {
                strCellColumnData = props.Data.RowData[objColumn["vColumnName"]];
                RowCells = [...RowCells, GetCell(objColumn, strCellColumnData, intIndex)]
            }
        });
        return RowCells;
    }

    const GetContent = () => {
        return (
            <React.Fragment>
                <tr key={props.Index} type={props.Data.RowData.Type} id={props.Data.RowData[props.ParentProps.Meta.PrimaryKey]}
                    dragdrop_dragareatype="DragArea" dragdrop_dragelementtype="DraggableElement"
                    className={props.Meta.IsRowSelected ? "selected-row" : ""} onClick={props.Events.OnClickRow}
                    onContextMenu={e => {
                        props.Events.OnContextMenuClick(e)
                    }}
                    onDoubleClick={e => {
                        props.Events.OnDoubleClick(props.Data.GridRowData, e)
                    }}
                >
                    {
                        props.Meta.HideSelectionCheckBox
                            ?
                            <React.Fragment />
                            :
                            <td style={{ width: 30 }}>
                                <input type="checkbox" onClick={event => event.stopPropagation()} //To stop the Click event of the row on checking the check box. 
                                    onChange={props.Events.OnCheckBoxChange} checked={props.Meta.IsRowChecked} />
                            </td>
                    }
                    {props.Data.IsHierarchicalGrid == "Y" ?
                        <td>
                            <span onClick={(e) => { props.Events.OnCollapseClick(props.Data.RowData, e, refHierarchicalGrid, "HierarchicalGrid") }} className={props.Data.RowData.HierarchicalGridCollapse == "Y" ? "open-sub-grid active" : "open-sub-grid"} title="Read" />
                        </td> : ""
                    }
                    {GetCells()}
                </tr>
                <tr ref={refHierarchicalGrid} ></tr>
            </React.Fragment>
        );
    }

    /**
     * JSX of the rows
     */
    return GetContent();
};

export default DisplayRow;