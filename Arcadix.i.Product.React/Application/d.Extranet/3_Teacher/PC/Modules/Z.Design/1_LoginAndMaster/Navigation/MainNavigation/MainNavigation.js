import * as React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import SubNavigation from '@root/Application/Extranet/3_Teacher/LoginAndMaster/Navigation/SubNavigation/SubNavigation';
import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';
import { connect } from "react-redux";
function mapStateToProps(state) {
    return {
        NavigationData: (state.Entity["navigation"] != undefined && state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] != undefined) ?
            state.Entity["navigation"]["navigation;iApplicationTypeId;1;iTargetDeviceId;7"] : undefined,
        ActiveMainNavigationId:state.ApplicationState.ActiveMainNavigationId
    };
}
class MainNavigation extends React.Component{

    constructor(props){
        super(props)
        this.OnMainNavClick = this.OnMainNavClick.bind(this);
        this.state = {
            active: "Start",
            arrMainNavigationData: []
        }
    }
    componentWillReceiveProps(nextProps){
        console.log( nextProps.NavigationData);
        if (this.state.arrMainNavigationData.length === 0) {
            var arrMainNavigationData = (nextProps.NavigationData != undefined && nextProps.NavigationData.Data != undefined) ? nextProps.NavigationData.Data.filter(x => x.iParentNavigationId == 0) : [];
            this.setState({arrMainNavigationData:arrMainNavigationData})
        }
        //return null;
    }
    /*/onLiClick(e:any) {
        console.log(e.target)
        //ApplicationState.SetProperty('RouterPath',e.target.id || e.target.parentNode.id);
        this.setState({active:e.target.id || e.target.parentNode.id })
        
    }*/
    OnMainNavClick(navItem){
        //var pushUrl = ApplicationState.SetProperty('RouterPath','') + navItem.vURL;
        //this.props.history.push({ pathname: pushUrl });
        var strRouterPath = '/'+ this.props.JConfiguration.VirtualDirName.split('/')[1];
        if(navItem.vURL !== ''){
            
            ApplicationState.SetProperty('RouterPath',strRouterPath);
            var pushUrl = this.props.JConfiguration.VirtualDirName + navItem.vNavigationName;
            this.props.history.push({ pathname: pushUrl });
        }
        else{
            strRouterPath= strRouterPath + '/' + navItem.vNavigationName;
            ApplicationState.SetProperty('RouterPath',strRouterPath);
        }
        ApplicationState.SetProperty('ActiveMainNavigationId',navItem.iNavigationId);
        this.setState({active:navItem.vNavigationName })
    }
    GetMainNavigationList(){
        console.log(this.state.arrMainNavigationData)
        var mainNavList = [];
        mainNavList=this.state.arrMainNavigationData.map((navItem,index)=>{
            return (<li id={navItem.vNavigationName} className={"navItem disIB csrP parentNavigationItem" + (this.props.ActiveMainNavigationId === navItem.iNavigationId ? " active" : "")} onClick={()=>{this.OnMainNavClick(navItem)}}>
                        {/*<Link to={this.props.JConfiguration.VirtualDirName+'TeacherStartPage'} className="navTitle disB">Übersicht</Link>*/}
                        <span  className="navTitle disB">{navItem.vNavigationName}</span>
                        <SubNavigation ParentNavigationId={navItem.iNavigationId} subNavs = {['StartPage']} parentNav="Start" ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />
                     </li>);
        }) 
        console.log(mainNavList)
        return mainNavList;
    }
    render(){
        console.log("NavigationData",this.props.NavigationData)
        var mainNavList;
        if(this.props.NavigationData)
            mainNavList=this.GetMainNavigationList();
        return (
                <nav>
                    <div className="primaryNav rel">
                        <ul className="navLists">
                            {this.props.NavigationData ? this.GetMainNavigationList():[]}
                        </ul>                        
                    </div>
                </nav>
        )
    }

}


export default withRouter(connect(mapStateToProps)(MainNavigation));