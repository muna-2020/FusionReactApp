const path = require('path');
const LoadablePlugin = require('../../../../Arcadix.i.Product.React.Bundle/node_modules/@loadable/webpack-plugin')
const WebpackCleanupPlugin = require('../../../../Arcadix.i.Product.React.Bundle/node_modules/webpack-cleanup-plugin');

const ClientIndexFilePath = "G:/Arcadix/Product.Fusion/Arcadix.i.Product.React/Application/f.TestApplication/PC/WebView/AppIndex/Index.js";
const res = p => path.resolve(__dirname, p);
const base = { mode: 'development' };

var babelOptions = {
    "presets": [
        [path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/preset-env"), {
            "targets": {
                "browsers": ["last 2 versions", "> 2%"]
            }
        }],
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/preset-react")
    ],
    "plugins": [
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/plugin-transform-spread"),
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/react-hot-loader/babel"),
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@loadable/babel-plugin"),
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/plugin-transform-runtime")
    ]
};

const loaderRules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            }
        ]
    },
    {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('../../../../Arcadix.i.Product.React.Bundle/node_modules/url-loader'),
        options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
        }
    },
    { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
    { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
    { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
    { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
];

const webpackPlugins = [
    new WebpackCleanupPlugin(),
    new LoadablePlugin()
];

//Client side webpack configuration
const ClientSideConfiguration = () => {

    return {
        ...base,
        name: 'client',
        target: 'web',
        devtool: 'source-map',
        node: {
            __dirname: true
        },
        entry: {
            index: res(ClientIndexFilePath)
        },
        output: {
            path: res('../../../../Arcadix.i.Product.React.Bundle/Production/WebView/ClientBuild'),
            filename: '[name].js',
            chunkFilename: "[name].chunk.js",
            publicPath: 'ClientBuild/',
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: loaderRules
        },
        resolve: {
            modules: [path.join(__dirname, '../../../../Arcadix.i.Product.React.Bundle/node_modules')],
            extensions: [".js", ".css"],
            alias: {
                '@root': path.join(__dirname, '../../../'),
                '@shared': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic'),
                '@appfolder': path.join(__dirname, '../../../WebView')
            }
        },
        plugins: webpackPlugins
    };
}

module.exports = [ClientSideConfiguration]