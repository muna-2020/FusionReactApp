import React, { useState } from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

const EditAdministrators = props => {
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")
    let objTextResource = props.Data.objTextResource;
    let objDisplayRow = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {}
    const [objData, SetData] = useState(objDisplayRow);

    const SaveMethod = () => {
        let objSchoolYearParams = {
            
            "vEditData": objData
        };
        let arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/SchoolYear",
                "Params": objSchoolYearParams,//{ "vAddData": objData },
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
                //if (objMetaData["vControlType"] === "checkbox") {
                if (e.currentTarget.checked === true) {
                    objEditData[strDataKey] = strCellName === strDataKey ? "Y" : objData[strDataKey];
                } else {
                    objEditData[strDataKey] = strCellName === strDataKey ? "N" : objData[strDataKey];
                }
            }
            else if (objMetaData["vColumnName"] === "t_TestDrive_Member_Class_SchoolYear_Data.vSchoolYearName") {
                let arrTemp = objData["t_TestDrive_Member_Class_SchoolYear_Data"].map((objCategory) => {
                    if (objCategory["iLanguageId"].toString() !== "3") {
                        return objCategory
                    } else {
                        return { ...objCategory, vSchoolYearName: e.currentTarget.value }
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

    return (
        <React.Fragment>
            {arrSelectedRows.length === 0 ? <div>Please select a line before continuing</div>:
                <React.Fragment>
                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'PopUpSchoolYear')} :</span>
                        <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[0]) }} key={props.Data.arrHeaderData[0]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[0]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[0]['vColumnName']} value={props.Data.arrHeaderData[0]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[0]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[0]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[0]['vColumnName']]} />
                    </div>
                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'PopUpSchoolYearName')} :</span>
                        <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[1]) }} key={props.Data.arrHeaderData[1]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[1]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[1]['vColumnName']} value={props.Data.arrHeaderData[1]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[1]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[1]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[1]['vColumnName']]} />
                    </div>
                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource,'PopUpDisplayOrder')} :</span>
                        <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[2]) }} key={props.Data.arrHeaderData[2]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[2]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[2]['vColumnName']} value={props.Data.arrHeaderData[2]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[2]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[2]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[2]['vColumnName']]} />
                    </div>
                    <div className="wrap">
                        <button onClick={SaveMethod} className="button brown-button">Save</button>
                    </div>
                </React.Fragment>
            }
            <div className="wrap">
                <button onClick={e => props.closePopUp(props.objModal)} class="button brown-button">close</button>
            </div>
        </React.Fragment>
    );
}
export default EditAdministrators;