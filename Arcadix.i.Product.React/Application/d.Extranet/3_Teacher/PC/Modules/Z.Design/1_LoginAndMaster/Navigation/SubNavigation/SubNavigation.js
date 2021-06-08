import * as React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';

import { connect } from "react-redux";
function mapStateToProps(state) {
    return {
        NavigationData: (state.Entity["navigation"] != undefined && state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] != undefined) ?
            state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] : undefined,
        ActiveSubNavigationId:state.ApplicationState.ActiveSubNavigationId
    };
}
class SubNavigation extends React.Component{

    constructor(props){
        super(props)
        this.OnSubNavClick = this.OnSubNavClick.bind(this);
        this.state = {
            arrSubNavigationData:[]
        }
    }

    componentDidMount(){
        var nextProps = this.props;
        //console.log(nextProps)
        if (this.state.arrSubNavigationData.length === 0) {
            var arrSubNavigationData = (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == nextProps.ParentNavigationId) : [];
            this.setState({arrSubNavigationData:arrSubNavigationData})
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.state.arrSubNavigationData.length === 0) {
            var arrSubNavigationData = (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == nextProps.ParentNavigationId) : [];
            this.setState({arrSubNavigationData:arrSubNavigationData})
        }
    }
    /*static getDerivedStateFromProps(nextProps,prevState){
        console.log(nextProps)
        if (prevState.arrSubNavigationData.length == 0) {
            var arrSubNavigationData = (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == nextProps.ParentNavigationId) : [];
            return {arrSubNavigationData:arrSubNavigationData}
        }
        else
            return null;
    }*/
    
    OnSubNavClick(navItem){
        console.log(navItem)
        if(navItem.iNavigationTypeId != 33){
            
            var pushUrl = this.props.JConfiguration.VirtualDirName + navItem.vURL;
            this.props.history.push({ pathname: pushUrl });
        }
        else{
            var od = ApplicationState.GetProperty('OutletData')
            ApplicationState.SetProperty('OutletData', {ShowOutlet:true, ComponentName:navItem.vURL,NavData:od.NavData})
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?ServiceNavigation=' + navItem.vURL;
            window.history.pushState({path:newurl},'',newurl);
        }
        ApplicationState.SetProperty('ActiveSubNavigationId',navItem.iNavigationId);
        //this.setState({active:navItem.vNavigationName })
    }
    
    GetSubNavigationList(){
        //console.log(this.state.arrSubNavigationData);
        var subNavList = this.state.arrSubNavigationData.map((navItem)=>{
            return (
                <li id={navItem.vNavigationName} className={"navItem disIB csrP"+ (this.props.ActiveSubNavigationId === navItem.iNavigationId ? " active" : "")} onClick={(e)=> {e.stopPropagation();this.OnSubNavClick(navItem)}}>
                    <span className="navTitle disB">{navItem.vNavigationName}</span>
                </li>
            )
        });
        return subNavList;
    }
    render(){
        return (
            <nav>
                <div className="secndryNav wid100">
                    <ul className="navLists">
                        {this.state.arrSubNavigationData.length !== 0 ? this.GetSubNavigationList():[]}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(connect(mapStateToProps)(SubNavigation));

// {this.getSubNavList(this.props.subNavs)}