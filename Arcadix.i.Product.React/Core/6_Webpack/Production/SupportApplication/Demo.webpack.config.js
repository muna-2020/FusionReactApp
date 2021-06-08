const BaseConfig = require('../BaseConfig');

const Demo_PCClient = BaseConfig.ClientSideConfiguration({
    ApplicationFolderName: 'SupportApplication/Demo/PC'
});

const Demo_PhoneClient = BaseConfig.ClientSideConfiguration({
    ApplicationFolderName: 'SupportApplication/Demo/Phone'
});

const Demo_TabletClient = BaseConfig.ClientSideConfiguration({
    ApplicationFolderName: 'SupportApplication/Demo/Tablet'
});

const Demo_PCServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'SupportApplication/Demo/PC'
});

const Demo_PhoneServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'SupportApplication/Demo/Phone'
});

const Demo_TabletServer = BaseConfig.ServerSideConfiguration({
    ApplicationFolderName: 'SupportApplication/Demo/Tablet'
});

module.exports = [Demo_PCClient,Demo_PCServer];