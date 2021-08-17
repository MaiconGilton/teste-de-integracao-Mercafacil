module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@modules': './src/modules',
                '@database': './src/database',
                '@utils': './src/utils',
                '@services': './src/services',
                '@middlewares': './src/middlewares',
                '@providers': './src/providers',
            }
        }],
        ["transform-remove-console"]
    ],
    ignore: [
        '**/*.spec.ts',
    ]
}
