import * as React from "react";
//import { Redirect } from 'react-router';
import { Link, Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import TreeView from '@rootFramework/Controls/TreeView/TreeView';
import SimpleTreeContainer from "@root/Framework/Controls/SimpleTree/SimpleTreeContainer";
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

function mapStateToProps(state) {
  return {
    blnShowSubNavigation: state.ApplicationState.blnShowSubNavigation
  };
}
const BreadCrumb = props => {
  return (
    <div class="bread-crumb task-title" id="TaskTitle">
      <span>Aufgaben: </span>
      <span>
        <b>Aufgaben</b>
      </span>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(BreadCrumb));
