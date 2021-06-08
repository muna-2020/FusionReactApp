import React, { useEffect } from 'react';
import * as TabbedPopup_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_MetaData';
import * as TabbedPopup_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_ResourceData';
import * as TabbedPopup_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_Data';

//Internal services
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

const Popup_Sample = props => {

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);    

    const GetTextResource = () => {
        return {
            "ComponentPopupTitle": "Login Title",
            "ErrorPopup_ErrorText:1": " You have seleced one row",
            "ErrorPopup_ErrorText:n": " You have seleced n rows",
            "ErrorPopup_ErrorText": "{!@ErrorVariable}, <br/> with TextResourceskey - Error",
            "ErrorPopup_OkButtonText": "Okay", //if OkButtonText Key not passed by default error popup take string "Ok"
            "ConfirmationPopup_ConfirmText:1": "Confirmation Popup, <br/> with TextResourceskey - Error",
            "ConfirmationPopup_ConfirmText:n": "Confirmation Popup, <br/> with TextResourceskey - Error",
            "ConfirmationPopup_ConfirmButtonText": "{!@ConfirmVariable}",
            //if _ConfirmButtonText Key not passed by default error popup take string "Confirm"
            "ConfirmationPopup_CloseButtonText": "Close",
            "ConfirmationPopup_Title": "Title",
            "ConfirmationPopup_Subtitle": "Subtitle",
        };
    };

    const GetVariables = () => {
        return {
            "ErrorVariable": "Error popup",
            "ConfirmVariable": "CONFIRM"
        };
    };

    const OpenComponentPopup = () => {
        Popup.ShowPopup({
            Data: {
                HeaderTitle: "Title"
            },
            Meta: {
                PopupName: 'Login',
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: 112,
                Width  : 666
            },
            Resource: {
                Text: GetTextResource(),
                SkinPath: props.JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
                //PopupCallBack: (strPopupUniqueId) => alert("popup callback... Do any module specific operations here with the PopupUniqueId: " + strPopupUniqueId)
            }            
        });
    };

   
    const OpenErrorPopup = () => {
        Popup.ShowErrorPopup({
            Data: {
                Count: 2
            },
            Meta: {
                ShowHeader: true,
                ShowCloseIcon: true,
            },
            Resource: {
                Text: GetTextResource(),
                SkinPath: props.JConfiguration.IntranetSkinPath,
                TextResourcesKey: "ErrorPopup",
                Variables: GetVariables()
            },
            Events: {},
            CallBacks: {
                PopupCallBack: (strPopupUniqueId) => alert("Error popup callback... Do any module specific operations here with the PopupUniqueId: " + strPopupUniqueId )
            },
        });
    };


    const ConfirmationCallBack = (strPopupUniqueId) => {
        alert("ConfirmationCallBack executed. Press ok to close the popup");
        Popup.ClosePopup(strPopupUniqueId);
    };

    const OpenConfirmationPopup = () => {
        Popup.ShowConfirmationPopup({
            Data: {
                Count: 2
            },
            Meta: {
                ShowHeader: true,
                ShowCloseIcon: true,
            },
            Resource: {
                Text: GetTextResource(),
                SkinPath: props.JConfiguration.IntranetSkinPath,
                TextResourcesKey: "ConfirmationPopup",
                Variables: GetVariables(),
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => ConfirmationCallBack(strPopupUniqueId)
            },
            CallBacks: {
                PopupCallBack: (strPopupUniqueId) => alert("Confirmation popup callback... Do any module specific operations here with the PopupUniqueId: " + strPopupUniqueId)
            }
        });
    };

    const OpenProgressBarPopup = () => {
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "Y",
                "HasCloseButton": "Y",
                "StartProgressOnLoad": false,
                "CloseProgessBarOnComplete" : true
            },
            "Resource": {
                "Text": {
                    "ProgressBarPopup_TitleText": "TitleText",
                    "ProgressBarPopup_Total": "Total",
                    "ProgressBarPopup_Posted": "Posted",
                    "ProgressBarPopup_Failed": "Failed",
                    "ProgressBarPopup_CancelButtonText": "Cancel",
                    "ProgressBarPopup_CloseButtonText": "Close",
                    "ProgressBarPopup_StartButtonText": "Start"
                },
                "TextResourcesKey": "ProgressBarPopup",
                "Variables": GetVariables(),
                SkinPath: props.JConfiguration.IntranetSkinPath,
            },
            "Events": {
                "StartProgress": (strProgressBarId) => {//Do the progress bar related updation...
                }
            },
            "CallBacks": {
                PopupCallBack: (strPopupUniqueId) => alert("ProgressBar popup callback... Do any module specific operations here with the PopupUniqueId: " + strPopupUniqueId)
            }
        });
    };

    const OpenTabbedPopup = () => {
        Popup.ShowTabbedPopup({
            "Data": {
                "DataForModule": TabbedPopup_Sample_Data.GetData()//Other Required Data for Component 
            },
            "Meta": {
                "PopupName": "TabbedPopup_Sample",//Provide Component name which you want to load 
                "CssClassName": "sample-css-class",//optional Css ClassName
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
                "Height": "auto", 
                "width": "auto",
                ...TabbedPopup_Sample_MetaData.GetMetaData() //Module MetaData if Required
            },
            "Resource": {...TabbedPopup_Sample_ResourceData.GetResourceData()},
            "Events": {
                "StartProgress": () => { }
            },
            "CallBacks": {
                //PopupCallBack: (strPopupUniqueId) => alert("Tabbed popup callback... Do any module specific operations)
            }
        });
    };

    const GetContent = () => {
        return (
            <React.Fragment>
                
                <button onClick={OpenComponentPopup} >OpenComponentPopup</button>
                <br/><br/>
                
                <button onClick={OpenErrorPopup} >OpenErrorPopup</button>
                <br/><br/>
                
                <button onClick={OpenConfirmationPopup} >OpenConfirmationPopup</button>
                <br/><br/>
                
                <button onClick={OpenProgressBarPopup} >OpenProgressBarPopup</button>        
                <br /><br />

                <button onClick={OpenTabbedPopup} >OpenTabbedPopup</button>        
            </React.Fragment>
        );
    };

    return GetContent();
};

LoadDynamicStyles(JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css");

export default Popup_Sample;