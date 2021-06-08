//Loadable import
import loadable from '@loadable/component';

export const objObjects = {
    Object_Cockpit_MainClient_MainClientLanguage: function () {
        return loadable(() => import(/* webpackChunkName: "Object_Framework_Services_TextResource" */ '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage'));
    },
    Object_Cockpit_Language: function () {
        return loadable(() => import(/* webpackChunkName: "Object_Cockpit_Language" */ '@shared/Object/c.Cockpit/Language/Language'));
    }
};

export default objObjects;







