import loadable from '@loadable/component';

const EmptyComponent = function () {
    return loadable(() => import(/* webpackChunkName: "EmptyComponent" */ '@root/Application/c.Intranet/PC/Modules/EmptyComponent/EmptyComponent'));
};

const BaseComponentController = {

    GetComponent: function (strComponentName, objComponents) {
        if (objComponents[strComponentName] !== undefined) {
            try {
                let LoadedComponent = objComponents[strComponentName]();
                LoadedComponent.load().then((objComponent) => {
                    if (objComponent.default !== "undefined" && objComponent.default.DynamicStyles !== "undefined" && objComponent.default && objComponent.default.DynamicStyles) {
                        var ComponentStyleArray = objComponent.default.DynamicStyles({ JConfiguration });
                        ComponentStyleArray.forEach(Style => {
                            if (document !== "undefined" && document != null && document) {
                                if (!document.getElementById(Style)) { // adding style to the header.
                                    var objStyle = document.createElement('link');
                                    objStyle.id = Style;
                                    objStyle.setAttribute("rel", "stylesheet");
                                    objStyle.setAttribute("href", Style);
                                    objStyle.setAttribute('type', 'text/css');
                                    document.head.appendChild(objStyle);
                                }
                            } else if (global && global.arrDynamicStyles) { // adding style to the global DynamicStyle server.
                                if (!global.arrDynamicStyles.includes(Style)) {
                                    global.arrDynamicStyles = [...global.arrDynamicStyles, Style];
                                }
                            }
                        });
                    }
                });
                return LoadedComponent;
            } catch{
                return EmptyComponent();
            }
        }
        else {
            console.log("Component '" + strComponentName + "' not found");
            return null;
        }
    },
    CheckComponent: function (strComponentName, objComponents) {
        if (typeof objComponents[strComponentName] !== "undefined") {
            return true;
        }
        else {
            return false;
        }
    }
}

export default BaseComponentController;