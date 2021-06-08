const BaseConfig = require('./BaseConfig');

const TestApplication_PC_Client = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/f.TestApplication/PC',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}

const TestApplication_Phone_Client = (env, argv) => {
    let objBuild = BaseConfig.ClientSideConfiguration({
        ApplicationFolderName: 'Application/f.TestApplication/Phone',
        MinimizeChunk: argv.minimize == 'N' ? false : true
    });
    return objBuild
}


const TestApplication_PC_Server = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/f.TestApplication/PC'
});

const TestApplication_Phone_Server = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'Application/f.TestApplication/Phone'
});

module.exports = [TestApplication_PC_Client, TestApplication_PC_Server, TestApplication_Phone_Client, TestApplication_Phone_Server]