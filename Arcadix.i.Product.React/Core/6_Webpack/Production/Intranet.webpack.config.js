const BaseConfig = require('./BaseConfig');

const Intranet_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.Intranet/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Intranet_PhoneClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.Intranet/Phone',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Intranet_TabletClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.Intranet/Tablet',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Intranet_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.Intranet/PC'
});

const Intranet_PhoneServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.Intranet/Phone'
});

const Intranet_TabletServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.Intranet/Tablet'
});

//module.exports = [Intranet_PCClient, Intranet_PhoneClient, Intranet_TabletClient,Intranet_PCServer, Intranet_PhoneServer, Intranet_TabletServer];
module.exports = [Intranet_PCClient, Intranet_PCServer, Intranet_PhoneClient, Intranet_PhoneServer];