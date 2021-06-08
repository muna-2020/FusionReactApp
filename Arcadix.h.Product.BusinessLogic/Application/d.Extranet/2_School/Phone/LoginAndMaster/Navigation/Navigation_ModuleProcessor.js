
/**
 * @name Navigation_ModuleProcessor
 * @summary processor for Navigation.
 * */
class Navigation_ModuleProcessor {

    OnNavigationClick(objContext, objNavigation) {
        var strPushUrl = "/" + objNavigation.NavigationName;
        ApplicationState.SetProperty('RouterPath', "");
        ApplicationState.SetProperty('blnShowAnimation', true);
        objContext.props.history.push({
            pathname: strPushUrl,
            state: objNavigation
        });

        objContext.props.CloseMenu();
    }

    /**
     * @summary sets selected navigation and assigns sunbavs
     * @param {any} objClickedNavigation
     */
    OnMainNavigationClick(objContext, objClickedNavigation) {
        //objContext.dispatch({ type: "SET_STATE", payload: { objSelectedNavigation: objClickedNavigation, iSelectedNavId: objClickedNavigation.NavigationId } })
        //if (objContext.props.IsServiceNavigation == "Y")
        //    this.OnServiceNavigationClick(objContext, objClickedNavigation);
        //else
        this.OnNavigationClick(objContext, objClickedNavigation);
    };

    OnClickNavigation(objContext, objNavigation) {
        this.OnNavigationClick(objContext, objNavigation);
    }
}

export default Navigation_ModuleProcessor;