//Framework related imports
import * as FrameworkObjectController from '@shared/Object/a.Framework/ObjectController';
import * as CockpitObjectController from '@shared/Object/c.Cockpit/ObjectController';
import * as IntranetObjectController from '@shared/Object/c.Intranet/ObjectController';
import { func } from 'prop-types';

const ObjectController = {

    LoadAsync:async function (arrObjects) {
        let objClientSideObjects = {};
        let objObjects = {
            ...FrameworkObjectController.objObjects,
            ...CockpitObjectController.objObjects,
            ...IntranetObjectController.objObjects
        };
        let arrPromises = [];
        arrObjects.map(strObject => {
            arrPromises = [...arrPromises, objObjects[strObject]().load()];
        });

        //debugger; 

        let arrObjectsResolved = await Promise.all(arrPromises);

        //debugger; 

        arrObjects.map((strObject, i) => {
            objClientSideObjects = { ...objClientSideObjects, [strObject]: arrObjectsResolved[i].default };
        });
        return objClientSideObjects;
    },

    LoadClientSideObjects: async function (arrObjects) {
        //let objClientSideObjects = {};
        //let objObjects = {
        //    ...FrameworkObjectController.objObjects,
        //    ...CockpitObjectController.objObjects,
        //    ...IntranetObjectController.objObjects
        //};
        ////let intNumberOfObjectsLoaded = 0, blnObjectLoadStarted = false;


        //arrObjects.map(strObject => {
        //    debugger;
        //    objObjects[strObject]().load().then(obj => {
        //        debugger;
        //        intNumberOfObjectsLoaded++;
        //        objClientSideObjects = { ...objClientSideObjects, [strObject]: obj.default }
        //    })
        //});


        
        //let arrPromises = [];
        //arrObjects.map(strObject => {
        //    arrPromises = [...arrPromises, objObjects[strObject]().load()];
        //});

        ////debugger; 

        //let arrObjectsResolved = await Promise.all(arrPromises);

        //debugger; 

        //arrObjects.map((strObject, i) => {
        //    objClientSideObjects = { ...objClientSideObjects, [strObject]: arrObjectsResolved[i].default };
        //});

        let objClientSideObjects = await ObjectController.LoadAsync(arrObjects);
        return objClientSideObjects;
    }
};

export default ObjectController;






