import React, { useState } from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

const AddAdministrators = props => {
    const [objData, SetData] = useState(
        {
            "uStateAdministratorId": "00000000-0000-0000-0000-000000000000",
            "iMainClientId": 97,
            "iStateId": null,
            "vFirstName": "",
            "vName": "",
            "vEmail": "",
            "vPassword": "",
            "cIsDeleted": "N",
            "iProfilePictureFileSize": null,
            "iProfilePictureFileVersion": null,
            "vProfilePictureFileType": null,
            "uUserId": "00000000-0000-0000-0000-000000000000",
            "dtModifiedOn": ""
        }
      )

    const AddMethod = () => {
        let objStateAdministratorsParams = {
            "vAddData": objData
        };
        let arrParams = [
            {
                "URL": "API/Object/Intranet/Member/StateAdminstrator",
                "Params": objStateAdministratorsParams,//{ "vAddData": objData },
                "MethodType": "Post"
            }];

        console.log("............arrParams ", arrParams)

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
            else if (objMetaData["vColumnName"] === "t_TestDrive_Category_Competency_Data.tCompetencyText") {
                let arrTemp = objData["t_TestDrive_Category_Competency_Data"].map((objCategory) => {
                    if (objCategory["iLanguageId"].toString() !== "3") {
                        return objCategory
                    } else {
                        return { ...objCategory, tCompetencyText: e.currentTarget.value }
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
                <div style={{ display: "flex" }}>
                <span style={{ marginRight: "10px" }}>{props.Data.objTextResource['PopUpStateNumberForTestToken']} :</span>
                    <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[0]) }} key={props.Data.arrHeaderData[0]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[0]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[0]['vColumnName']} value={props.Data.arrHeaderData[0]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[0]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[0]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[0]['vColumnName']]} />
                </div>
                <div style={{ display: "flex" }}>
                <span style={{ marginRight: "10px" }}>{props.Data.objTextResource['PopUpStateName']} :</span>
                    <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[1]) }} key={props.Data.arrHeaderData[1]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[1]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[1]['vColumnName']} value={props.Data.arrHeaderData[1]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[1]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[1]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[1]['vColumnName']]} />
                </div>
                <div style={{ display: "flex" }}>
                    <span style={{ marginRight: "10px" }}>{props.Data.objTextResource['PopUpShortStateName']} :</span>
                    <input id="textboxfocused" type="text" onChange={(e) => { HandleChange(e, props.Data.arrHeaderData[2]) }} key={props.Data.arrHeaderData[2]['vColumnName']} data-cell-control-type={props.Data.arrHeaderData[2]['vDataType']} data-cell-attribute-name={props.Data.arrHeaderData[2]['vColumnName']} value={props.Data.arrHeaderData[2]['vColumnName'].split('.').length > 1 ? objData[props.Data.arrHeaderData[2]['vColumnName'].split('.')[0]][0][props.Data.arrHeaderData[2]['vColumnName'].split('.')[1]] : objData[props.Data.arrHeaderData[2]['vColumnName']]} />
                </div>
                
                <div className="wrap">
                    <button onClick={AddMethod} class="button brown-button">Add</button>
                </div>
                <div className="wrap">
                    <button onClick={e => props.closePopUp(props.objModal)} class="button brown-button">close</button>
                </div>
        </React.Fragment>
    );
}
export default AddAdministrators;