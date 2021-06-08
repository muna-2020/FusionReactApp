// this file will be present in the Arcadix.h.Product.BusinessLogic project. It will foloow the same folder structure as the original Component

import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import Logger from '../../../../../Framework/Services/Logger/Logger';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        //Logger.Log("Mapping class");
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        // Logger.Log("not mapping class");
        return {};
    }
};
export function SetToggle(toggle) {
    return !toggle
}
export function OnLoginClick(strUserName, strPassword) {
    if (strUserName !== "" && strPassword !== "") {
        var objLoginDataRequest = {
            URL: "API/Extranet/ExtranetLogin/ValidateUser",
            Params: {
                UserName: strUserName.trim(),
                Password: strPassword.trim(),
                Host: window.location.host + '/' + window.location.pathname.split('/')[1]
            }
        };
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/ValidateUser", "POST", objLoginDataRequest)
            .then(response => response.json())
            .then(objResponse => {
                if (objResponse.login.Data.Success === true) {
                    ApplicationState.SetProperty('ClientUserDetails', objResponse.login.Data);
                    ApplicationState.SetProperty('SelectedClassId', objResponse.login.Data.SelectedClassId);
                    //Performance.LogPerformance('Login');
                    ApplicationState.SetProperty('IsLoggedIn', true);
                } else {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    //Performance.LogPerformance('Login');
                    alert("Invalid username or password");
                }
            });
    }
}

export function SendLoginDetails(strEmail) {
    var objLoginDataRequest = {
        URL: "API/Extranet/ExtranetLogin/SendExtranetLogin",
        Params: {
            vEmail: strEmail,
            uUserId: "00000000-0000-0000-0000-000000000000"
        }
    };
    ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/SendExtranetLogin", "POST", objLoginDataRequest)
        .then(response => response.json())
        .then(objResponse => {

            console.log("forgot password response".response);
            if (objResponse.Login === 0) {
                ApplicationState.SetProperty("SendLoginStatus", "Diese E - Mail Adresse ist bei Lernlupe nicht registriert.");
            }
            else {
                ApplicationState.SetProperty("SendLoginStatus", "Login details sent to email.");
            }
            console.log("Resp=====>", objResponse);
        });
    return objResponse;
}



