import React, { useState } from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

const DeleteAdministrators = props => {
    console.log("ApplicationState.GetProperty", ApplicationState.GetProperty("SelectedRows"))
    const DeleteMethod = () => {
        
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        //let objRow = arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        let arrDeleteRow = []
        let objDeleteRow = {}
        arrSelectedRows.map((objSelectedRows) => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, "cIsDeleted": "Y" }]
        })
        
        console.log("arrDeleteRow ", arrDeleteRow)
        let objAdministratorsParams = {
            "vDeleteData": arrDeleteRow
        };
        let arrParams = [
            {
                "URL": "API/Object/Intranet/Member/IntranetAdministrator",
                "Params": objAdministratorsParams,//{ "vDeleteData": [objDeleteRow] },
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
                        <button onClick={DeleteMethod} class="button brown-button">OK</button>
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
export default DeleteAdministrators;