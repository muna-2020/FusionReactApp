import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function OnLoginClick(strUserName, strPassword) {
    if (strUserName != "" && strPassword != "") {
        var objLoginDataRequest = {
            URL: "API/Extranet/ExtranetLogin/ValidateUser",
            Params: {
                UserName: strUserName,
                Password: strPassword,
                Host: window.location.host + '/' + window.location.pathname.split('/')[1]
            }
        };
        //SetShowAnimation(true);
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/ValidateUser", "POST", objLoginDataRequest)
            .then(response => response.json())
            .then(objResponse => {
                if (objResponse.login.Data.Success == true) {
                    ApplicationState.SetProperty('ClientUserDetails', objResponse.login.Data);
                    ApplicationState.SetProperty('SelectedClassId', objResponse.login.Data.SelectedClassId);
                    ApplicationState.SetProperty('IsLoggedIn', true);
                } else {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    alert(objResponse.login.Data.FailureMessage);
                }               
                //SetShowAnimation(false);
            });
    }
}



