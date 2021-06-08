import loadable from '@loadable/component'

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/SupportApplication/JSDoc/Main'))
    }    
}

const ComponentController = {
    GetComponent: function (strComponentName) {
        console.log("string", strComponentName.split('?')[0]);
        if (objComponents[strComponentName.split('?')[0]] && objComponents[strComponentName.split('?')[0]] !== null) {
            try {
                let objComponent = objComponents[strComponentName.split('?')[0]]();
                return objComponent
            }
            catch (error) {
                Logger.LogError("Module", strComponentName);
                Logger.LogError("Module Import Error", error);
                console.trace("Import Error");
            }
        }
        else if (EditorComponentController.GetComponent(strComponentName.split('?')[0])) {
            return EditorComponentController.GetComponent(strComponentName.split('?')[0]);
        }
        else {
            console.log("notfound");
            return undefined;
        }
    }
}

export default ComponentController;