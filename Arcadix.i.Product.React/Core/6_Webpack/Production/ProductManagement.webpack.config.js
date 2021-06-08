const BaseConfig = require('./BaseConfig');

const ProductManagement_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.ProductManagement/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const ProductManagement_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.ProductManagement/PC'
});

module.exports = [ProductManagement_PCClient, ProductManagement_PCServer];