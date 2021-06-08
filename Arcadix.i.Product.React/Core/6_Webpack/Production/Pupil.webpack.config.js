const BaseConfig = require('./BaseConfig');

const Pupil_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/4_Pupil/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Pupil_PhoneClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/4_Pupil/Phone',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Pupil_TabletClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/4_Pupil/Tablet',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Pupil_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/4_Pupil/PC'
});

const Pupil_PhoneServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/4_Pupil/Phone'
});

const Pupil_TabletServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/4_Pupil/Tablet'
});

//module.exports = [Pupil_PCClient, Pupil_PhoneClient, Pupil_TabletClient,
//    Pupil_PCServer, Pupil_PhoneServer, Pupil_TabletServer];

module.exports = [Pupil_PCClient, Pupil_PCServer, Pupil_PhoneClient, Pupil_PhoneServer];