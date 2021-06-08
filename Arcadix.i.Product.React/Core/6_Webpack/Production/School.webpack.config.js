const BaseConfig = require('./BaseConfig');

const School_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/2_School/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const School_PhoneClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/2_School/Phone',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const School_TabletClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/2_School/Tablet',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const School_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/2_School/PC'
});

const School_PhoneServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/2_School/Phone'
});

const School_TabletServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/2_School/Tablet'
});


//module.exports = [School_PCClient, School_PhoneClient, School_TabletClient,
//    School_PCServer, School_PhoneServer, School_TabletServer];
module.exports = [School_PCClient, School_PCServer, School_PhoneClient, School_PhoneServer];