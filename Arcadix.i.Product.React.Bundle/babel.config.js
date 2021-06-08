module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/react"
    ],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
                "@babel/react"
            ],
            plugins: [
                "@babel/plugin-transform-spread",
                [
                    "module-resolver",
                    {
                        "alias": {
                            "@root": "G://Arcadix/Product.Fusion/Arcadix.i.Product.React",
                            "@shared": "G://Arcadix/Product.Fusion/Arcadix.h.Product.BusinessLogic"
                        },
                        "extensions": [".css", ".js", ".json"]
                    }
                ],
                'react-refresh/babel'
            ]
        }
    }
};