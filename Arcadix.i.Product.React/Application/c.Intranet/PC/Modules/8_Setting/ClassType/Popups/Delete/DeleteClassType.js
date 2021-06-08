import React, { useState } from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

const DeleteClassType = props => {
    const DeleteMethod = () => {        
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        let arrDeleteRow = []
        let objDeleteRow = {}
        arrSelectedRows.map((objSelectedRows) => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, "cIsDeleted": "Y" }]
        })
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
            "vDeleteData": arrDeleteRow
        };
        let arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/ClassType",
                "Params": objClassTypeParams,//{ "vDeleteData": [objDeleteRow] },
                "MethodType": "Delete"
            }];

        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
            //Do something
            props.closePopUp(props.objModal)
        });
    }
    
    return (
        <React.Fragment>
            {ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows").length > 0 ? 
                <React.Fragment>
                    <div>Do you really want to delete this area?</div>
                    <div className="wrap">
                        <button onClick={DeleteMethod} className="button brown-button">OK</button>
                    </div>
                    <div className="wrap">
                        <button onClick={e => props.closePopUp(props.objModal)} class="button brown-button">Abort,Stop</button>
                    </div>
                </React.Fragment> :
                <React.Fragment>
                    <div>Please select a line before contuning</div>
                    <div className="wrap">
                        <button onClick={e => props.closePopUp(props.objModal)} class="button brown-button">Close</button>
                    </div>
                </React.Fragment>}            
        </React.Fragment>
    );
}
export default DeleteClassType;