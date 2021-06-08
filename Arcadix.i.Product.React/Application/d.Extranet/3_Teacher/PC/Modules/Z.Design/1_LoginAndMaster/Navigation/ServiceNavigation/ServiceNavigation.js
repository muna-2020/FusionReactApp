import * as React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';

import { connect } from "react-redux";
function mapStateToProps(state) {
    return {
        NavigationData: (state.Entity["navigation"] != undefined && state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] != undefined) ?
            state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] : undefined,
        ActiveServiceNavigationId:state.ApplicationState.ActiveServiceNavigationId
    };
}

class ServiceNavigation extends React.Component{

    constructor(props){
        super(props)
        this.OnServiceNavClick = this.OnServiceNavClick.bind(this);
        this.state = {
            arrServiceNavigationData:[],
            active:""
        }
    }
    componentWillReceiveProps(nextProps){
        console.log( nextProps.NavigationData);
        if (this.state.arrServiceNavigationData.length === 0) {
            var arrServiceNavigationData = (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == -1) : [];
            this.setState({arrServiceNavigationData:arrServiceNavigationData})
        }
    }
    OnServiceNavClick(navItem){
        var strServiceNavigation = navItem.vNavigationName;
        var objServiceNavigation={
            ShowOutlet:true,
            ComponentName:strServiceNavigation,
            NavData:navItem
        }
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?ServiceNavigation=' + strServiceNavigation ;
        window.history.pushState({path:newurl},'',newurl);
        ApplicationState.SetProperty('OutletData', objServiceNavigation);
        ApplicationState.SetProperty('ActiveServiceNavigationId',navItem.iNavigationId);

        this.setState({active:navItem.vNavigationName })
    }
    GetServiceNavList(){
        //t_Framework_Navigation_Data
        console.log(this.state.arrServiceNavigationData)
        var serviceNavList = this.state.arrServiceNavigationData.map((navItem)=>{
            return (
                <li className={"disIB csrP serviceNavigationItem"  + (this.props.ActiveServiceNavigationId === navItem.iNavigationId ? " active" : "")}>
                    {/*<Link to={this.props.JConfiguration.VirtualDirName+'/TeacherDocument'} >Dokumente</Link>*/}
                    <span onClick={()=>{this.OnServiceNavClick(navItem)}}>{navItem.t_Framework_Navigation_Data[0].vNavigationText}</span>
                    
               </li>
            )
        });
        return serviceNavList;
    }
    render(){
        
        return(
            <div className="fR pnlRt">
                <ul className="listItems">
                    {this.state.arrServiceNavigationData.length !== 0 ? this.GetServiceNavList():[]}
                
                </ul>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps)(ServiceNavigation));