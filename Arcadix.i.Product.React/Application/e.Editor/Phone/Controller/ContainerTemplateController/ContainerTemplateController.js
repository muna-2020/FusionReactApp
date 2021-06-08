import loadable from '@loadable/component';

const objContainerTemplates = {
    "ContainerTemplate27": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate27" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate27'));
    },
    "ContainerTemplate34": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate34" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate34'));
    },
    "ContainerTemplate35": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate35" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate35'));
    },
    "ContainerTemplate36": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate36" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate36'));
    },
    "ContainerTemplate37": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate37" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate37'));
    },
    "ContainerTemplate39": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate39" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate39'));
    },
    "ContainerTemplate40": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate40" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate40'));
    },
    "ContainerTemplate41": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate41" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate41'));
    },
    "ContainerTemplate53": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate53" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate53'));
    },
    "ContainerTemplate54": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate54" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate54'));
    },
    "ContainerTemplate55": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate55" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate55'));
    },
    "ContainerTemplate56": function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplate56" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/ContainerTemplates/TemplateComponents/ContainerTemplate56'));
    }
};

const TemplateController = {
    GetTemplate: function (strTemplateId) {
        let strTemplateName = `ContainerTemplate${strTemplateId}`;
        if (objContainerTemplates[strTemplateName]) {
            return objContainerTemplates[strTemplateName]();
        }
        else {
            console.log("ContainerTemplate$ '" + strTemplateId + "' not found");

        }
    }
};

export default TemplateController;

