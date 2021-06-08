
import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/1_LoginAndMaster/Master.css';
import MainNavigation from '../Navigation/MainNavigation/MainNavigation';
import ServiceNavigation from '../Navigation/ServiceNavigation/ServiceNavigation';
import ModuleController from '@root/Framework/Blocks/RouteLoader/ModuleController/ModuleController';
import RouteLoader from '@root/Core/3_Route/RouteLoader';
import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';
import Outlet from '../Outlet/Outlet';
import ArcadixFetchAndCacheData from '@root/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import DropDownMenu from '@root/Application/Extranet/3_Teacher/Modules/1_LoginAndMaster/DropDownMenu/DropDownMenu';


function mapStateToProps(state) {
    return {
        OutletData: state.ApplicationState.OutletData
    }
}
class Master extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        //let paramsString = "name=foo&age=1337"
        //let searchParams = new URLSearchParams(paramsString);
        var objParams = {
            "SearchKeys": {
                "must": [
                    {
                        "match": {
                            "iApplicationTypeId": this.props.JConfiguration.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "iTargetDeviceId": 7
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc",
                        "missing": "_last",
                        "unmapped_type": "long"
                    }
                }
            ],
            "OutputColumns": ["iNavigationId", "iParentNavigationId", "vNavigationName", "vNavigationIcon", "iNavigationTypeId", "dtModifiedOn", "vURL", "t_Framework_Navigation_Data.iLanguageId", "t_Framework_Navigation_Data.vNavigationText"]
        };

        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        var objParams = {"Params":
            {
                "URL": "API/Object/ApplicationMaster/Navigation/Navigation",
                "Params": objParams,
                "MethodType": "Get"
            }
        };
              
       
        return new Promise((resolve, reject) => {
            //objArcadixFetchAndCacheData.GetData(arrRequest, (objReturn) => {
            objArcadixFetchAndCacheData.GetData("API/Object/ApplicationMaster/Navigation/Navigation",objParams, (objReturn) => {
                var abc = objReturn;
                console.log(abc);
                //this.setState({ blnShowAnimation: false });
                console.log("pathname:", window.location.pathname);
                var browserUrl = window.location.pathname;
                var arrBrowserUrl = browserUrl.split('/');
                var strRouterPath = "";
                if (arrBrowserUrl.length > 2) {
                    for (var i = 1; i < arrBrowserUrl.length - 1; i++) {
                        strRouterPath = strRouterPath + '/' + arrBrowserUrl[i];
                    }
                    var mainNav = abc['navigation;iApplicationTypeId;1;iTargetDeviceId;7']['Data'].filter(x => x.vNavigationName === arrBrowserUrl[2]);

                    ApplicationState.SetProperty('ActiveMainNavigationId', mainNav[0].iNavigationId);




                    if (arrBrowserUrl[3]) {
                        var subNav = abc['navigation;iApplicationTypeId;1;iTargetDeviceId;7']['Data'].filter(x => x.vNavigationName === (arrBrowserUrl[3]));
                        ApplicationState.SetProperty('ActiveSubNavigationId', subNav[0].iNavigationId || 0);
                    }
                }
                else {
                    strRouterPath = '/' + arrBrowserUrl[1];
                    ApplicationState.SetProperty('ActiveMainNavigationId', 0);
                    ApplicationState.SetProperty('ActiveSubNavigationId', 0);
                    // displaying welcome outlet

                    var navItem = {
                        //vNavigationIcon(pin): null
                        //dtModifiedOn(pin): "2018-08-31T15:22:45.167"
                        iNavigationTypeId: 33,
                        vNavigationName: "Willkommen bei Lernlupe",
                        iParentNavigationId: -1,
                        iNavigationId: -1,
                        vURL: "TeacherWelcomeMessage"
                    }
                    ApplicationState.SetProperty('OutletData', {
                        ShowOutlet: true,
                        ComponentName: "TeacherWelcomeMessage",
                        NavData: navItem
                    })
                    ApplicationState.SetProperty('ActiveServiceNavigationId', 0);

                    //Welcome message ends here 
                    // ApplicationState.SetProperty('ActiveServiceNavigationId',0);
                }
                console.log("arrBrowserUrl", arrBrowserUrl)

                ApplicationState.SetProperty('RouterPath', strRouterPath);

                let strUrlSearchParams = window.location.search;
                if (strUrlSearchParams !== "") {
                    let strServiceNavigation = QueryString.GetQueryStringValue('ServiceNavigation');
                    console.log(strServiceNavigation)
                    var strNavURL = strServiceNavigation.split('/')[0];
                    console.log(strNavURL)
                    //search in abc for the same vURL to get nav item
                    var arrNavs = abc['navigation;iApplicationTypeId;1;iTargetDeviceId;7']['Data'].filter(x => x.vNavigationName === strNavURL);
                    console.log(arrNavs)
                    if (strServiceNavigation !== "") {
                        ApplicationState.SetProperty('OutletData', {
                            ShowOutlet: true,
                            ComponentName: strServiceNavigation,
                            NavData: arrNavs[0]
                        })
                        ApplicationState.SetProperty('ActiveServiceNavigationId', arrNavs[0].iNavigationId);
                    }
                }
                resolve({ success: true });
            });
        });


    }

    onServiceNavClick(strServiceNavigation) {
        var objServiceNavigation = {
            ShowOutlet: true,
            ComponentName: strServiceNavigation
        }
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?ServiceNavigation=' + strServiceNavigation;
        window.history.pushState({ path: newurl }, '', newurl);
        ApplicationState.SetProperty('OutletData', objServiceNavigation);
    }

    render() {
        var showHideDiv = {};

        if (this.props.OutletData) {
            if (this.props.OutletData.ShowOutlet) {
                console.log("setting display to none")
                showHideDiv = {
                    display: 'none'
                }
            }
            else {
                showHideDiv = {}
            }
        }
        return (
            <div className="wrapper">

                {/*HEADER*/}
                <header>
                    <div className="hdrTop flxCtr">
                        <div className="drpdwnList fL">
                            <DropDownMenu ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />

                        </div>

                        <div className="logo abs">
                            <img src={require('@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/logo.svg')} className="logo" />
                        </div>

                        <ServiceNavigation ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />
                    </div>

                    {/*NAVIGATION BLOCK*/}
                    <div style={showHideDiv}>
                        <MainNavigation ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />
                    </div>
                </header>


                {/*BODY SECTION*/}
                <section>
                    <div id="outlet">
                        <Outlet ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />
                    </div>
                    <div style={showHideDiv}>
                        <div className="contentSection">
                            <div className="innerContent parent4Con" fill-height>

                                <RouteLoader RouterPath={ApplicationState.GetProperty('RouterPath')} {...this.props} ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />
                            </div>
                        </div>
                    </div>
                </section>

                {/*FOOTER SECTION*/}
                {/* <footer className="rel">
                    <div id="footerSection">
                        <div className="fL">
                            <button className="btn btn-green csrP abs kSans">Zur Förderung</button>
                        </div>
                        <div className="cntr">
                            <button className="btn btn-ornge csrP kSans">Test-Login erstellen (pdf)</button>
                        </div>
                        <div className="fR">
                            <a href="#" className="abs">
                                Alle PDF's
                                <span className="dwnArw disIB rel"></span>
                            </a>
                        </div>
                    </div>
                </footer>*/}

            </div>
        );
    }

}


function QueryString.GetQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}


export default withRouter(connect(mapStateToProps)(Master));