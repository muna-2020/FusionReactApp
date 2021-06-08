import loadable from '@loadable/component'

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/SupportApplication/ModuleDeveloper/Main'))
    },
    ExtranetSchool: function () {
        return loadable(() => import(/* webpackChunkName: "ExtranetSchool" */ '@root/SupportApplication/ModuleDeveloper/Application/d.Extranet/2_School/ExtranetSchool'))
    },
    ExtranetTeacher: function () {
        return loadable(() => import(/* webpackChunkName: "ExtranetTeacher" */ '@root/SupportApplication/ModuleDeveloper/Application/d.Extranet/3_Teacher/ExtranetTeacher'))
    },
    ExtranetPupil: function () {
        return loadable(() => import(/* webpackChunkName: "ExtranetPupil" */ '@root/SupportApplication/ModuleDeveloper/Application/d.Extranet/4_Pupil/ExtranetPupil'))
    },
    Intranet: function () {
        return loadable(() => import(/* webpackChunkName: "Intranet" */ '@root/SupportApplication/ModuleDeveloper/Application/c.Intranet/Intranet/'))
    },
    Cockpit: function () {
        return loadable(() => import(/* webpackChunkName: "Cockpit" */ '@root/SupportApplication/ModuleDeveloper/Application/c.Cockpit/Cockpit'))
    },
    Editor: function () {
        return loadable(() => import(/* webpackChunkName: "Editor" */ '@root/SupportApplication/ModuleDeveloper/Application/e.Editor/Editor'))
    },
    TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplication" */ '@root/SupportApplication/ModuleDeveloper/Application/f.TestApplication/TestApplication'))
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