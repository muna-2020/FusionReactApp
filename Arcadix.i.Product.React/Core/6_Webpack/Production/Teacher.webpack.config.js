const BaseConfig = require('./BaseConfig');

const Teacher_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/3_Teacher/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Teacher_PhoneClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/3_Teacher/Phone',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Teacher_TabletClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/3_Teacher/Tablet',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const Teacher_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/3_Teacher/PC'
});

const Teacher_PhoneServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/3_Teacher/Phone'
});

const Teacher_TabletServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/3_Teacher/Tablet'
});

module.exports = [Teacher_PCClient, Teacher_PCServer, Teacher_PhoneClient, Teacher_PhoneServer];