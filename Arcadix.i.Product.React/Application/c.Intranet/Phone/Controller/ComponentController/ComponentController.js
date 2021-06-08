// React related imports.
import React from 'react';

//Losable import
import loadable from '@loadable/component';

//Controller related imports
import * as ComponentController_Client from '@root/../Arcadix.i.Product.React.Client/Application/c.Intranet/PC/Controller/ComponentController/ComponentController';

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';


export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'));
    },
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/c.Intranet/Phone/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/c.Intranet/Phone/LoginAndMaster/Master/Master'));
    },
    Empty: function () {
        return loadable(() => {
            return <React.Fragment />;
        });
    }
};

const ComponentController = {
    GetComponent: function (strComponentName) {
        let objClientComponent = ComponentController_Client.objComponents;

        let objComponent = objClientComponent[strComponentName.split('?')[0] + "_" + JConfiguration.MainClientIdentifier] ?
            objClientComponent[strComponentName.split('?')[0] + "_" + JConfiguration.MainClientIdentifier] : objComponents[strComponentName.split('?')[0]];

        if (objComponent !== undefined && objComponent !== null) {
            try {
                return objComponent();
            }
            catch (error) {
                Logger.LogError("Module", strComponentName);
                Logger.LogError("Module Import Error", error);
                console.trace("Import Error");
            }
        }
        else {
            return undefined;
        }
    },
    CheckComponent: function (strComponentName) {
        if (objComponents[strComponentName.split('?')[0]] && objComponents[strComponentName.split('?')[0]] !== null) {
            return true;
        }
        else {
            console.log("notfound");
            return false;
        }
    },
    GetFrameworkComponent: function (strFrameworkComponentName) {
        let objFrameworkComponents = FrameworkController.objComponents;
        let objComponent = objFrameworkComponents[strFrameworkComponentName];
        if (objComponent !== undefined && objComponent !== null) {
            try {
                return objComponent();
            }
            catch (error) {
                Logger.LogError("Framework Component", strFrameworkComponentName);
                Logger.LogError("Framework Component Import Error", error);
                console.trace("Import Error");
            }
        }
        else {
            return undefined;
        }
    }
};

export default ComponentController;






