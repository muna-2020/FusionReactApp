//Loadable import
import loadable from '@loadable/component';

export const objObjects = {
    Object_Framework_Services_TextResource: function () {
        return loadable(() => import(/* webpackChunkName: "Object_Framework_Services_TextResource" */ '@shared/Object/a.Framework/Services/TextResource/TextResource'));
    }
};

export default objObjects;







