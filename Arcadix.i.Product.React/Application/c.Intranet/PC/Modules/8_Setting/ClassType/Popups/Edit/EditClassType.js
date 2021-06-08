import React, { useState } from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";

const EditClassType = props => {
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")
    let objDisplayRow = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {}
    const [objData, SetData] = useState(objDisplayRow);

    const SaveMethod = () => {
        let objClassTypeParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": props.Data.intStateDropdownSelectedValue.toString()
                        }
                    },
                ]
            },
            "vEditData": objData
        };
        let arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/ClassType",
                "Params": objClassTypeParams,//{ "vAddData": objData },
                "MethodType": "Put"
            }];

        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
            //Do something
            props.closePopUp(props.objModal)
        });
    }

    const HandleChange = (e, objMetaData) => {
        var strCellName = e.currentTarget ? e.currentTarget.attributes["data-cell-attribute-name"].value : e;
        var objEditData = {};
        Object.keys(objData).map((strDataKey) => {
            if (objMetaData["vColumnName"] === "cIsActive") {
                if (e.currentTarget.checked === true) {
                    objEditData[strDataKey] = strCellName === strDataKey ? "Y" : objData[strDataKey];
                } else {
                    objEditData[strDataKey] = strCellName === strDataKey ? "N" : objData[strDataKey];
                }
            }
            else if (objMetaData["vColumnName"] === "t_TestDrive_Member_ClassType_Data.vClassTypeName") {
                let arrTemp = objData["t_TestDrive_Member_ClassType_Data"].map((objCategory) => {
                    if (objCategory["iLanguageId"].toString() !== "3") {
                        return objCategory
                    } else {
                        return { ...objCategory, vClassTypeName: e.currentTarget.value }
                    }
                })
                objEditData[strDataKey] = strCellName.split('.')[0] === strDataKey ? arrTemp : objData[strDataKey];
            }
            else if (objMetaData["vColumnName"] === "t_TestDrive_Member_ClassType_Data.vLongClassTypeName") {
                let arrTemp = objData["t_TestDrive_Member_ClassType_Data"].map((objCategory) => {
                    if (objCategory["iLanguageId"].toString() !== "3") {
                        return objCategory
                    } else {
                        return { ...objCategory, vLongClassTypeName: e.currentTarget.value }
                    }
                })
                objEditData[strDataKey] = strCellName.split('.')[0] === strDataKey ? arrTemp : objData[strDataKey];
            }
            else {
                objEditData[strDataKey] = strCellName === strDataKey ? e.currentTarget.value : objData[strDataKey];
            }
        });
        SetData(objEditData);
    }

    const DropDownChange = (objChangeData, props) => {
        Logger.Log(objChangeData)
        var strCellName = props["ValueColumn"];
        var objEditData = JSON.parse(JSON.stringify(objData));
        objEditData[strCellName] = objChangeData[strCellName];
        SetData(objEditData);
    }

    //for dropdown
    var arrDropDownData = [], IsLanguageDependent = "", strDisplayColumn = "", strDependingTableName = "", strValueColumn = "";
    var objDropDownData = props.Data.objDropDownData //[props.Data.arrHeaderData[1]['vColumnName']];
    arrDropDownData = objDropDownData["Data"];
    IsLanguageDependent = objDropDownData["cISLanguageDependent"];
    strDependingTableName = objDropDownData["DependingTableName"];
    strDisplayColumn = objDropDownData["DisplayColumn"];
    strValueColumn = objDropDownData["ValueColumn"];
    let objTextResource = props.Data.objTextResource;
    return (
        <React.Fragment>
            {arrSelectedRows.length === 0 ? <div>Please select a line before continuing</div>:
                <React.Fragment>
                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'OrganizationalUnit')} :</span>
                        <DropDown
                            id={props.Data.arrHeaderData[1]['vColumnName']}
                            Data={arrDropDownData}
                            DisplayColumn={strDisplayColumn}
                            IsLanguageDependent={IsLanguageDependent}
                            ValueColumn={strValueColumn}
                            DependingTableName={strDependingTableName}
                            SelectedValue={objData[props.Data.arrHeaderData[1]['vColumnName']]}
                            OnChangeEventHandler={DropDownChange}
                            JConfiguration={props.JConfiguration}
                        />
                    </div>
                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'ClassTypeName')} :</span>
                        <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[2]) }} key={props.Data.arrHeaderData[2]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[2]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[2]['vColumnName']} value={props.Data.arrHeaderData[2]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[2]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[2]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[2]['vColumnName']]} />
                    </div>

                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'LongClassTypeName')} :</span>
                        <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[3]) }} key={props.Data.arrHeaderData[3]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[3]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[3]['vColumnName']} value={props.Data.arrHeaderData[3]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[3]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[3]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[3]['vColumnName']]} />
                    </div>
                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'Sequence')} :</span>
                        <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[4]) }} key={props.Data.arrHeaderData[4]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[4]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[4]['vColumnName']} value={props.Data.arrHeaderData[4]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[4]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[4]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[4]['vColumnName']]} />
                    </div>

                    <div className="wrap">
                        <button onClick={SaveMethod} class="button brown-button">Save</button>
                    </div>
                </React.Fragment>
            }
            <div className="wrap">
                <button onClick={e => props.closePopUp(props.objModal)} class="button brown-button">close</button>
            </div>
        </React.Fragment>
    );
}
export default EditClassType;