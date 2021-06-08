//import { useEffect, useLayoutEffect } from 'react';
//import TestDriveFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';

////Modules used
//import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

////UniqueId.
//import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

///**
// * 
// * @param {*} state 
// * @summary   Maps entity/application state to props of the component.
// */
//export function MapStateToProps(state) {
//    if (!global["mode"]) {
//        return {
//            textresource: DataRef(state.Entity, "object_framework_services_textresource", true),
//            // containertemplateselection:  DataRef(state.Entity, "containertemplateselection", true)
//        };
//    }
//    else {
//        return {};
//    }
//};

///**
// * 
// * @param {*} JConfiguration 
// * @param {*} props 
// * @summary   Get initial request(s) params for the component.
// */
//export const InitialDataParams = (JConfiguration, props) => {
//    let objResourceParams = {
//"SearchQuery": {
//            "must": [
//                {
//        "match": {
//                    "Id": JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection"
//        }
//                }
//    ]
//}
//    };
//    let arrDataRequest = [
//        {
//            "URL": "API/Object/Cockpit/Blocks/TextResource",
//            "Params": objResourceParams,
//            "MethodType": "Get",
//            "UseFullName": true
//        },
//        // {
//        //     "URL": "API/Editor/Modules/ContainerTemplateSelection/ContainerTemplateSelection",
//        //     "Params": {},
//        //     "MethodType": "Get"
//        // }
//    ]
//    return {
//        "DataCalls": arrDataRequest
//    };
//};

///**
// * 
// * @param {*} arrParams
// * @summary   Calls FetchAndCacheData execute method to make the api call.
// */
//export const DataCall = (objContext, arrParams) => {
//    let objTestDriveFetchAndCacheData = new TestDriveFetchAndCacheData();
//    objTestDriveFetchAndCacheData.Execute(arrParams);
//};

///**
// * 
// * @param {*} objContext 
// * @summary   Calls the DataCall method and the InitialDataParams.
// */
//export const useDataLoader = (objContext) => {
//    useLayoutEffect(() => {
//        if (!DataRef(objContext.props.textresource, "object_framework_services_textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection")) {
//            DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
//        }
//    }, []);
//};

///**
// * 
// * @param {*} objContext 
// * @summary   Checks if the data is loaded to props and then set the component state accordingly.
// */
//export const useDataLoaded = (objContext) => {
//    useEffect(() => {
//        if (DataRef(objContext.props.textresource, "object_framework_services_textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection")) {
//            if (!objContext.state.isLoadComplete) {
//                var objTabData = GenerateTabDetails();
//                objContext.dispatch({
//                    type: "SET_STATE_VALUES", payload: {
//                        "isLoadComplete": true,
//                        "arrTabDetails": objTabData["arrTabDetails"],
//                        "objTabInfo": objTabData["objTabInfo"],
//                        "intSelectedTabIndex": objTabData["intSelectedTabIndex"],
//                        "intSelectedTemplateId": objTabData["intSelectedTemplateId"]
//                    }
//                });
//                SelectContainer(objContext, objTabData["intSelectedTemplateId"]);
//            }
//            // objContext.dispatch({type: "SET_STATE_VALUES", payload: { "activeTabIndex": DataRef("containertemplateselection").Data[0]["LoadContainerTemplateImages"]['TabDetails'][0]["TabIndex"] } });
//        }
//    }, [objContext.props.textresource]);
//};

//const GenerateTabDetails = () => {
//    // API end point for tab data is not created.
//    var objTabData = {
//        "Status": "Success",
//        "Data": {
//            "GetResourceByJson": {
//                "ContainerSelection": {
//                    "ContainerPopUpTitle": "Container Vorlage",
//                    "ContainerPopUpSubTitle": "Container Vorlage w�hlen"
//                }
//            },
//            "LoadContainerTemplateImages": {
//                "ContainerTemplateInfo": {
//                    "TabInfo": [
//                        {
//                            "TabIndex": "1",
//                            "TabContent": [
//                                {
//                                    "Index": "1",
//                                    "ContainerTemplateId": "35",
//                                    "ContainerTemplateName": "Standard-Vorlage",
//                                    "ContainerDescription": "Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.",
//                                    "vTabName": "Favoriten",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"
//                                },
//                                {
//                                    "Index": "1",
//                                    "ContainerTemplateId": "36",
//                                    "ContainerTemplateName": "Breite Vorlage mit Frage links",
//                                    "ContainerDescription": "Frage oben links, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen.",
//                                    "vTabName": "Favoriten",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                }
//                            ],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"35\" ContainerTemplateName=\"Standard-Vorlage\" ContainerDescription=\"Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_35.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"36\" ContainerTemplateName=\"Breite Vorlage mit Frage links\" ContainerDescription=\"Frage oben links, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_36.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "2",
//                            "TabContent": [
//                                {
//                                    "Index": "2",
//                                    "ContainerTemplateId": "37",
//                                    "ContainerTemplateName": "Anleitungs Vorlage",
//                                    "ContainerDescription": "Frage rechts, links ein Multimedia-Objekt oder Text. Diese Vorlage kann eingesetzt werden um einen Sachverhalt zu erkl�ren oder eine Einleitung zu geben. Diese Vorlage enth�lt kein Funktionsmodul und eignet sich daher nicht f�r eine Testfrage.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "2",
//                                    "ContainerTemplateId": "56",
//                                    "ContainerTemplateName": "Single",
//                                    "ContainerDescription": "Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "2",
//                                    "ContainerTemplateId": "35",
//                                    "ContainerTemplateName": "Standard-Vorlage",
//                                    "ContainerDescription": "Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "2",
//                                    "ContainerTemplateId": "53",
//                                    "ContainerTemplateName": "Zweispaltige Vorlage",
//                                    "ContainerDescription": "Frage rechts, links ein Multimedia-Objekt oder Text.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "2",
//                                    "ContainerTemplateId": "27",
//                                    "ContainerTemplateName": "Breite Vorlage mit Frage rechts",
//                                    "ContainerDescription": "Frage oben rechts, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen und die Frage oben rechts sein soll. ",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                }
//                            ],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"37\" ContainerTemplateName=\"Anleitungs Vorlage\" ContainerDescription=\"Frage rechts, links ein Multimedia-Objekt oder Text. Diese Vorlage kann eingesetzt werden um einen Sachverhalt zu erkl�ren oder eine Einleitung zu geben. Diese Vorlage enth�lt kein Funktionsmodul und eignet sich daher nicht f�r eine Testfrage.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"56\" ContainerTemplateName=\"Single\" ContainerDescription=\"Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_56.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"35\" ContainerTemplateName=\"Standard-Vorlage\" ContainerDescription=\"Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_35.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"53\" ContainerTemplateName=\"Zweispaltige Vorlage\" ContainerDescription=\"Frage rechts, links ein Multimedia-Objekt oder Text.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_53.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"27\" ContainerTemplateName=\"Breite Vorlage mit Frage rechts\" ContainerDescription=\"Frage oben rechts, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen und die Frage oben rechts sein soll. \" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_27.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "3",
//                            "TabContent": [
//                                {
//                                    "Index": "3",
//                                    "ContainerTemplateId": "34",
//                                    "ContainerTemplateName": "Breite Multimedia Vorlage",
//                                    "ContainerDescription": "Diese Vorlage eignet sich in Kombination mit anderen Vorlagen um z.B. oberhalb einer Frage ein Multimedia-Objekt abzuspielen(z.B. Flash, Video) oder ein Bild / Text anzuzeigen.",
//                                    "vTabName": "Breit",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "3",
//                                    "ContainerTemplateId": "55",
//                                    "ContainerTemplateName": "Breite Multimedia Vorlage",
//                                    "ContainerDescription": "Diese Vorlage eignet sich in Kombination mit anderen Vorlagen um z.B. oberhalb einer Frage ein Multimedia-Objekt abzuspielen(z.B. Flash, Video) oder ein Bild / Text anzuzeigen.",
//                                    "vTabName": "Breit",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "3",
//                                    "ContainerTemplateId": "36",
//                                    "ContainerTemplateName": "Breite Vorlage mit Frage links",
//                                    "ContainerDescription": "Frage oben links, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen.",
//                                    "vTabName": "Breit",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "3",
//                                    "ContainerTemplateId": "41",
//                                    "ContainerTemplateName": "Halbierte Frage/Antwort Vorlage",
//                                    "ContainerDescription": "Frage rechts, Antwort links. Diese Vorlage eignet sich gut wenn Frage und Antwort etwas gleichviel Platz ben�tigen, die Standard-Vorlage jedoch daf�r nicht ausreicht bzw. ein Multimedia-Objekt nicht erforderlich/erw�nscht ist. ",
//                                    "vTabName": "Breit",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                }
//                            ],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"34\" ContainerTemplateName=\"Breite Multimedia Vorlage\" ContainerDescription=\"Diese Vorlage eignet sich in Kombination mit anderen Vorlagen um z.B. oberhalb einer Frage ein Multimedia-Objekt abzuspielen(z.B. Flash, Video) oder ein Bild / Text anzuzeigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_34.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"55\" ContainerTemplateName=\"Breite Multimedia Vorlage\" ContainerDescription=\"Diese Vorlage eignet sich in Kombination mit anderen Vorlagen um z.B. oberhalb einer Frage ein Multimedia-Objekt abzuspielen(z.B. Flash, Video) oder ein Bild / Text anzuzeigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_55.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"36\" ContainerTemplateName=\"Breite Vorlage mit Frage links\" ContainerDescription=\"Frage oben links, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_36.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"41\" ContainerTemplateName=\"Halbierte Frage/Antwort Vorlage\" ContainerDescription=\"Frage rechts, Antwort links. Diese Vorlage eignet sich gut wenn Frage und Antwort etwas gleichviel Platz ben�tigen, die Standard-Vorlage jedoch daf�r nicht ausreicht bzw. ein Multimedia-Objekt nicht erforderlich/erw�nscht ist. \" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_41.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "4",
//                            "TabContent": [
//                                {
//                                    "Index": "4",
//                                    "ContainerTemplateId": "39",
//                                    "ContainerTemplateName": "Mehrteilige Frage Vorlage",
//                                    "ContainerDescription": "Diese Vorlage ist einzusetzen wenn eine Aufgabe mehrteilig ist und aus mehreren Funktionsmodulen besteht. Diese Vorlage ist eine Kopfvorlage ohne Funktionsmodul und muss mit der n�chsten Vorlage �Mehrteilige Antwort Vorlage� kombiniert werden.",
//                                    "vTabName": "Mehrteilig",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "4",
//                                    "ContainerTemplateId": "40",
//                                    "ContainerTemplateName": "Mehrteilige Antwort Vorlage",
//                                    "ContainerDescription": "Diese Vorlage ist f�r mehrteilige Antworten einzusetzen wobei jedoch Teilantwort zus�tzlich diesen Container ben�tigt. Diese Vorlage besteht aus Teilfrage und Funktionsmodul.",
//                                    "vTabName": "Mehrteilig",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"


//                                },
//                                {
//                                    "Index": "4",
//                                    "ContainerTemplateId": "54",
//                                    "ContainerTemplateName": "",
//                                    "ContainerDescription": "Diese Vorlage ist f�r mehrteilige Antworten einzusetzen wobei jedoch Teilantwort zus�tzlich diesen Container ben�tigt. Diese Vorlage besteht aus Teilfrage und Funktionsmodul.",
//                                    "vTabName": "Mehrteilig",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                }
//                            ],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"39\" ContainerTemplateName=\"Mehrteilige Frage Vorlage\" ContainerDescription=\"Diese Vorlage ist einzusetzen wenn eine Aufgabe mehrteilig ist und aus mehreren Funktionsmodulen besteht. Diese Vorlage ist eine Kopfvorlage ohne Funktionsmodul und muss mit der n�chsten Vorlage �Mehrteilige Antwort Vorlage� kombiniert werden.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_39.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"40\" ContainerTemplateName=\"Mehrteilige Antwort Vorlage\" ContainerDescription=\"Diese Vorlage ist f�r mehrteilige Antworten einzusetzen wobei jedoch Teilantwort zus�tzlich diesen Container ben�tigt. Diese Vorlage besteht aus Teilfrage und Funktionsmodul.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_40.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr><tr><td width=10px>&nbsp;&nbsp;</td><td id=ContainerTemplateHolder0 valign=top align=center ><img ContainerTemplateId=\"54\" ContainerTemplateName=\"\" ContainerDescription=\"Diese Vorlage ist f�r mehrteilige Antworten einzusetzen wobei jedoch Teilantwort zus�tzlich diesen Container ben�tigt. Diese Vorlage besteht aus Teilfrage und Funktionsmodul.\" Type=ContainerTypeImage id=imgContainerType0 name=imgContainerType0 style=cursor:hand src=http://localhost:3001/App_Themes_Old/Default/Intranet/Editor//Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_54.gif /></td><td width=10px>&nbsp;&nbsp;</td></tr><tr height=12px><td colspan=3></td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "5",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "6",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "7",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "8",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "9",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "10",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "11",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "12",
//                            "TabContent": [
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "27",
//                                    "ContainerTemplateName": "Breite Vorlage mit Frage rechts",
//                                    "ContainerDescription": "Frage oben rechts, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen und die Frage oben rechts sein soll. ",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "34",
//                                    "ContainerTemplateName": "Breite Multimedia Vorlage",
//                                    "ContainerDescription": "Diese Vorlage eignet sich in Kombination mit anderen Vorlagen um z.B. oberhalb einer Frage ein Multimedia-Objekt abzuspielen(z.B. Flash, Video) oder ein Bild / Text anzuzeigen.",
//                                    "vTabName": "Breit",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "35",
//                                    "ContainerTemplateName": "Standard-Vorlage",
//                                    "ContainerDescription": "Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.",
//                                    "vTabName": "Favoriten",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"
//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "36",
//                                    "ContainerTemplateName": "Breite Vorlage mit Frage links",
//                                    "ContainerDescription": "Frage oben links, darunter ein Funktionsmodul. Diese Vorlage eignet sich gut wenn die Frage bzw. Antwort viel Platz ben�tigen.",
//                                    "vTabName": "Favoriten",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "37",
//                                    "ContainerTemplateName": "Anleitungs Vorlage",
//                                    "ContainerDescription": "Frage rechts, links ein Multimedia-Objekt oder Text. Diese Vorlage kann eingesetzt werden um einen Sachverhalt zu erkl�ren oder eine Einleitung zu geben. Diese Vorlage enth�lt kein Funktionsmodul und eignet sich daher nicht f�r eine Testfrage.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "39",
//                                    "ContainerTemplateName": "Mehrteilige Frage Vorlage",
//                                    "ContainerDescription": "Diese Vorlage ist einzusetzen wenn eine Aufgabe mehrteilig ist und aus mehreren Funktionsmodulen besteht. Diese Vorlage ist eine Kopfvorlage ohne Funktionsmodul und muss mit der n�chsten Vorlage �Mehrteilige Antwort Vorlage� kombiniert werden.",
//                                    "vTabName": "Mehrteilig",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "40",
//                                    "ContainerTemplateName": "Mehrteilige Antwort Vorlage",
//                                    "ContainerDescription": "Diese Vorlage ist f�r mehrteilige Antworten einzusetzen wobei jedoch Teilantwort zus�tzlich diesen Container ben�tigt. Diese Vorlage besteht aus Teilfrage und Funktionsmodul.",
//                                    "vTabName": "Mehrteilig",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"


//                                },
//								{
//                                    "Index": "12",
//                                    "ContainerTemplateId": "41",
//                                    "ContainerTemplateName": "Halbierte Frage/Antwort Vorlage",
//                                    "ContainerDescription": "Frage rechts, Antwort links. Diese Vorlage eignet sich gut wenn Frage und Antwort etwas gleichviel Platz ben�tigen, die Standard-Vorlage jedoch daf�r nicht ausreicht bzw. ein Multimedia-Objekt nicht erforderlich/erw�nscht ist. ",
//                                    "vTabName": "Breit",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "53",
//                                    "ContainerTemplateName": "Zweispaltige Vorlage",
//                                    "ContainerDescription": "Frage rechts, links ein Multimedia-Objekt oder Text.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "54",
//                                    "ContainerTemplateName": "",
//                                    "ContainerDescription": "Diese Vorlage ist f�r mehrteilige Antworten einzusetzen wobei jedoch Teilantwort zus�tzlich diesen Container ben�tigt. Diese Vorlage besteht aus Teilfrage und Funktionsmodul.",
//                                    "vTabName": "Mehrteilig",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "55",
//                                    "ContainerTemplateName": "Single",
//                                    "ContainerDescription": "Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                },
//                                {
//                                    "Index": "12",
//                                    "ContainerTemplateId": "56",
//                                    "ContainerTemplateName": "Single",
//                                    "ContainerDescription": "Eine Frage oben rechts, links ein Multimedia Objekt oder Text, rechts ein Funktionsmodul. Diese Standard-Vorlage eignet sich gut wenn die Frage bzw. Antwort nicht zu viel Platz ben�tigen.",
//                                    "vTabName": "Standard",
//                                    "vContainerImage": "https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/CMS/Editor/ContainerTemplateImages/ContainerTemplate_37.gif"

//                                }
//                            ],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "13",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        },
//                        {
//                            "TabIndex": "14",
//                            "TabContent": [],
//                            "ContainerImagesHtml": "<table border=0 cellspacing=0 cellpadding=0><tr height=7 valign=top><td colspan=3>&nbsp;</td></tr></table>"
//                        }
//                    ]
//                },
//                "TabDetails": [
//                    {
//                        "TabIndex": "1",
//                        "TabTitle": "Favoriten"
//                    },

//                    {
//                        "TabIndex": "3",
//                        "TabTitle": "Standard"
//                    },

//                    {
//                        "TabIndex": "2",
//                        "TabTitle": "Breit"
//                    },

//                    {
//                        "TabIndex": "12",
//                        "TabTitle": "Mehrteilig"
//                    }

//                ]
//            }
//        },
//        "CompressMethods": [],
//        "CacheDetails": []
//    };
//    var arrTabDetails = objTabData["Data"]["LoadContainerTemplateImages"]["TabDetails"];
//    var arrTabInfo = objTabData["Data"]["LoadContainerTemplateImages"]["ContainerTemplateInfo"]["TabInfo"];
//    var objTabInfo = {};
//    arrTabInfo.map(tabInfo => {
//        if (objTabInfo && objTabInfo[tabInfo["TabIndex"]] === undefined) {
//            objTabInfo = { ...objTabInfo, [tabInfo["TabIndex"]]: { ["children"]: tabInfo["TabContent"] } };
//        }
//    });
//    return {
//        "arrTabDetails": [...arrTabDetails],
//        "objTabInfo": { ...objTabInfo },
//        "intSelectedTabIndex": arrTabDetails[0]["TabIndex"],
//        "intSelectedTemplateId": objTabInfo[arrTabDetails[0]["TabIndex"]]["children"][0]["ContainerTemplateId"]
//    };
//};

///**
// * 
// * @param {*} objContext 
// * @summary   Returns the text resource for the passed key.
// */
//export const GetTextResource = (objContext) => {
//    return DataRef(objContext.props.textresource, "object_framework_services_textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection")["Data"][0]["ContainerTemplateSelection"];
//};

//// /**
////  * 
////  * @param {*} objContext 
////  * @param {*} intActioveTabIndex 
////  * @summary   Returns the array of tab content data.
////  */
//// export const GetTabContent = (objContext, intActioveTabIndex) => {
////     let arrData = DataRef(objContext.props.containertemplateselection)["Data"];
////     if(arrData.length> 0)
////     {
////         let objData = arrData[0]["LoadContainerTemplateImages"]["ContainerTemplateInfo"]["TabInfo"].find((a) => a['TabIndex'] === intActioveTabIndex ? intActioveTabIndex : objContext.state.activeTabIndex);
////         if(objData)
////         {
////             return objData["TabContent"];
////         }
////     }
////     return [];
//// };

//// /**
////  * 
////  * @param {*} objContext 
////  * @summary   Returns the array of tab details data.
////  */
//// export const GetTabDetails = (objContext) => {
////     let arrData = DataRef(objContext.props.containertemplateselection)["Data"];
////     if(arrData.length> 0)
////     {
////         let arrTabDetails = arrData[0]["LoadContainerTemplateImages"]["TabDetails"];
////         return arrTabDetails;
////     }
////     return [];
//// };

//// /**
////  * 
////  * @param {*} objContext 
////  * @param {*} intTabIndex 
////  * @summary   Closes the tab.
////  */
//// export const RemoveTab = (objContext, intTabIndex) => {
////     console.log('deleting the tab', intTabIndex);
////     let arrTaskDetails = objContext.state.Data["LoadContainerTemplateImages"]["TabDetails"].filter((a) => String(a["TabIndex"]) !== String(intTabIndex));
////     let objData = {...objContext.state.Data, ["LoadContainerTemplateImages"]: {...objContext.state.Data["LoadContainerTemplateImages"], ["TabDetails"]: [...arrTaskDetails]}};
////     let strActiveTabIndex = objContext.state.Data["LoadContainerTemplateImages"]["TabDetails"].filter((a) => String(a["TabIndex"]) !== String(intTabIndex))[0]["TabIndex"];
////     objContext.dispatch({type: "SET_STATE_VALUES", payload:{ "Data": objData, "activeTabIndex": strActiveTabIndex }});
////     // delete objContext.Data['LoadContainerTemplateImages']['ContainerTemplateInfo']["TabInfo"].find(a => a['TabIndex'] == tabIndex);
////     // console.log('tabdetail',objContext.state.LoadContainerTemplateImages.TabDetails);
////     // objContext.setState((prevState, props) => {
////     //     // console.log(prevState.Data);
////     //     console.log('prevState', prevState.Data);
////     //     return {
////     //         ...prevState, Data: {
////     //             ...prevState.Data,
////     //             LoadContainerTemplateImages: {
////     //                 ...prevState.Data.LoadContainerTemplateImages,
////     //                 TabDetails: [...prevState.Data.LoadContainerTemplateImages.TabDetails.filter((a) => String(a.TabIndex) !== String(tabIndex))]
////     //             }
////     //         },
////     //         activeTabIndex: prevState.Data.LoadContainerTemplateImages.TabDetails.filter((a) => String(a.TabIndex) !== String(tabIndex))[0].TabIndex
////     //     }
////     // })

//// };

//// /**
////  * 
////  * @param {*} objContext 
////  * @param {*} intTemplateId 
////  * @summary   Change the selection of template on click.
////  */
//// export const ChangeTemplate = (objContext, intTemplateId) => {
////     objContext.dispatch({type: "SET_STATE_VALUES", payload:{ "activeContainerTemplateId": intTemplateId }});
//// };

//// /**
////  * 
////  * @param {*} objContext 
////  * @param {*} intTabIndex 
////  * @summary   Change the tab on click of different tabs.
////  */
//// export const ChangeTab = (objContext, intTabIndex) => {
////     console.log("changing tab to ", intTabIndex);
////     let arrData = GetTabContent(objContext, intTabIndex);
////     objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "activeTabIndex": intTabIndex, "activeContainerTemplateId": arrData.length > 0 ? arrData[0] ? arrData[0]["ContainerTemplateId"] : 0 : "0" }});
//// };


///**
//     * update the active container on selecting container
//     */
//export const SelectContainer = (objContext, intTemplateId) => {
//    let objContainer = {
//        "Elements": [],
//        "iContainerId": UniqueId.GetRandomInt(10000000),
//        "iContainerTypeId": "5",
//        "iOrder": "1",
//        "vElementVerticalAlignment": "top",
//        "vElementHorizontalAlignment": "center",
//        "cShowCalculator": "N",
//        "cShowCalculatorOnLoad": "N",
//        "cIsQuestionTitleEditable": "N",
//        "cIsAnswerTitleEditable": "N",
//        "cIsSetHeight": "Y",
//        "cIsParentContainer": "N"
//    };
//    objContainer = { ...objContainer, ["iContainerTemplateId"]: intTemplateId };
//    UpdateActiveContainer(objContext, objContainer);
//};

///**
// * 
// * @param {*} objContext 
// * @summary   Closes the popup
// */
//export const RemovePopUp = (objContext, objEvent) => {
//    objEvent.preventDefault();
//    objContext.props.ClosePopup(objContext.props.objModal);
//};

//export const HandleTabSelectedItem = (objContext, intTabIndex) => {
//    var intContainerTemplateId = objContext.state.objTabInfo[intTabIndex]["children"].length > 0 ? objContext.state.objTabInfo[intTabIndex]["children"][0]["ContainerTemplateId"]: "";
//    objContext.dispatch({ "type": "SET_STATE_VALUES", "payload": { "intSelectedTabIndex": intTabIndex, "intSelectedTemplateId": intContainerTemplateId } });
//    SelectContainer(objContext, intContainerTemplateId);
//};

//export const HandleContainerSelectedItem = (objContext, intContainerTemplateId) => {
//    objContext.dispatch({ "type": "SET_STATE_VALUES", "payload": { "intSelectedTemplateId": intContainerTemplateId } });
//};


///**
// * @summary   Returns the the initial State for the component.
// */
//export const GetInitialState = (props) => {
//    return {
//        // "Data": props.containertemplateselection ? props.containertemplateselection.Data[0].LoadContainerTemplateImages : {},
//        // "style": { display: "block" },
//        // "activeTabIndex": props.containertemplateselection ? props.containertemplateselection.Data[0].LoadContainerTemplateImages['TabDetails'][0]["TabIndex"] : 1,
//        // "activeContainerTemplateId": props.containertemplateselection ? props.containertemplateselection.Data[0].LoadContainerTemplateImages['ContainerTemplateInfo']["TabInfo"][0]['TabContent'][0]['ContainerTemplateId'] : 0,
//        "isLoadComplete": false,
//        "intSelectedTabIndex": null,
//        "arrTabDetails": [],
//        "intSelectedTemplateId": null
//    };
//};

///** 
// * 
// * @param {*} state 
// * @param {*} action 
// * @summary   State reducer used for maintaining local state
// */
//export const Reducer = (state, action) => {
//    switch (action.type.toUpperCase()) {
//        case "DATA_LOAD_COMPLETE":
//            return {
//                ...state,
//                ["isLoadComplete"]: action.payload
//            };
//        case "SET_STATE_VALUES":
//            return {
//                ...state,
//                ...action.payload
//            };
//        case "UPDATE_ACTIVE_CONTAINER":
//            return {
//            ...state,
//            activeContainer: { ...action.payload }
//        };
//    }
//};

///**
// * @param {*} objContext 
// * @param {*} objContainer 
// */
//export const UpdateActiveContainer = (objContext, objContainer) => {
//    objContext.dispatch({
//        type: "UPDATE_ACTIVE_CONTAINER",
//        payload: { ...objContainer }
//    });
//};
