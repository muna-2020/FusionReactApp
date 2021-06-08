const BaseConfig = require('./BaseConfig');

const Cockpit_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.Cockpit/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Cockpit_PhoneClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.Cockpit/Phone',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Cockpit_TabletClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/c.Cockpit/Tablet',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Cockpit_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.Cockpit/PC'
});

const Cockpit_PhoneServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.Cockpit/Phone'
});

const Cockpit_TabletServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/c.Cockpit/Tablet'
});

//module.exports = [Cockpit_PCClient, Cockpit_PhoneClient, Cockpit_TabletClient,
//    Cockpit_PCServer, Cockpit_PhoneServer, Cockpit_TabletServer];

module.exports = [Cockpit_PCClient, Cockpit_PCServer];