
/**
 * @name Navigation_ModuleProcessor
 * @summary processor for Navigation.
 * */
class Navigation_ModuleProcessor {

    OnNavigationClick(objContext, objNavigation) {
        var strPushUrl = "/" + objNavigation.NavigationName;
        ApplicationState.SetProperty('RouterPath', "");
        objContext.props.history.push({
            pathname: strPushUrl,
            state: objNavigation
        });

        objContext.props.CloseMenu();
    }
}

export default Navigation_ModuleProcessor;