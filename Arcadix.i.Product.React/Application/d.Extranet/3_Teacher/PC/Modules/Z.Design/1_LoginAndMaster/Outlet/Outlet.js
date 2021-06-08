import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from "react-redux";
import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import SubNavigation from '@root/Application/Extranet/3_Teacher/Modules/1_LoginAndMaster/Navigation/SubNavigation/SubNavigation';
function mapStateToProps(state){
    return {
        OutletData : state.ApplicationState.OutletData,
        ActiveServiceNavigationId:state.ApplicationState.ActiveServiceNavigationId,
        NavigationData: (state.Entity["navigation"] != undefined && state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] != undefined) ?
            state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] : undefined
    }
}
class Outlet extends React.Component {
    constructor(props){
        super(props);
        this.state={
            childComponentName:null
        }
    }
    componentDidMount(){
        var nextProps= this.props;
       if(nextProps.OutletData){
            if(nextProps.OutletData.ShowOutlet){
                
                if(this.state.childComponentName === null){

                    if(nextProps.OutletData.NavData.vURL === ""){
                        var arrChildren =  (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == nextProps.OutletData.NavData.iNavigationId) : [];
                        console.log("arrChildren",arrChildren)
                        var firstChild = arrChildren[0];
                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?ServiceNavigation=' + firstChild.vURL ;
                        window.history.pushState({path:newurl},'',newurl);
                        ApplicationState.SetProperty('ActiveSubNavigationId',firstChild.iNavigationId);
                        ApplicationState.SetProperty('OutletData', {
                            ShowOutlet:true,
                            ComponentName:firstChild.vURL,
                            NavData:nextProps.OutletData.NavData
                        });
                        this.setState({childComponentName:firstChild.vURL})
                    }
                }
            }
            
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.OutletData){
            if(nextProps.OutletData.ShowOutlet){
                
                if(this.state.childComponentName === null){

                    if(nextProps.OutletData.NavData.vURL === ""){
                        var arrChildren =  (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == nextProps.OutletData.NavData.iNavigationId) : [];
                        console.log("arrChildren",arrChildren)
                        var firstChild = arrChildren[0];
                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?ServiceNavigation=' + firstChild.vURL ;
                        window.history.pushState({path:newurl},'',newurl);
                        ApplicationState.SetProperty('ActiveSubNavigationId',firstChild.iNavigationId);
                        ApplicationState.SetProperty('OutletData', {
                            ShowOutlet:true,
                            ComponentName:firstChild.vURL,
                            NavData:nextProps.OutletData.NavData
                        });
                        this.setState({childComponentName:firstChild.vURL})
                    }
                }
            }
            
        }
    }
    render(){
        
        if(this.props.OutletData){
            var OutletComponent;
            if(this.props.OutletData.ShowOutlet){
                
                var arrComponentName = this.props.OutletData.ComponentName.split('/');
                var strComponentName="";
                if(arrComponentName[1] == undefined){
                    strComponentName=arrComponentName[0]
                }
                else
                    strComponentName=arrComponentName[1]
                OutletComponent = this.props.ComponentController.GetComponent(strComponentName)
            }
            return(
                <div>
                    {this.props.OutletData.ShowOutlet ? 
                    (<div>
                        <div className="parentHdng">
                            <span className="fL">{this.props.OutletData.ComponentName}</span>
                            <span className="fR closeTxt csrP" onClick = {()=>{
                                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname ;
                                window.history.pushState({path:newurl},'',newurl);
                                ApplicationState.SetProperty('OutletData',{})
                                ApplicationState.SetProperty('ActiveServiceNavigationId',0);
                                ReactDOM.unmountComponentAtNode(document.getElementById('outlet'));
                                }}>Schliessen
                                <img className="fR" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/Icons/close.svg")} />
                            </span>
                        </div>
                        <div className="navigation clear">
                            <ul className="mainNavbg">
                                <li className="navList disIB csrP parentNavigationItem active">
                                    {(this.props.OutletData.NavData.vURL === "")? <SubNavigation ParentNavigationId={this.props.OutletData.NavData.iNavigationId} ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />:null}
                                </li>
                            </ul>
                        </div>
                        <div className="contentSection">
                            <div className="innerContent parent4Con" fill-height>
                                {(OutletComponent != undefined)? <OutletComponent ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} /> : <div>yet to be implemented</div>}
                            </div>
                        </div>
                    </div>)
                    :null}
                </div>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default withRouter(connect(mapStateToProps)(Outlet));
