const BaseConfig = require('./BaseConfig');

const State_PCClient = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/d.Extranet/1_State/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const State_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/d.Extranet/1_State/PC'
});

module.exports = [State_PCClient, State_PCServer];