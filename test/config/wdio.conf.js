exports.config = {
    runner: 'local',

    specs: [
        '../specs/**/*.js'
    ],

    exclude: [],

    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--lang=en-US', '--window-size=1920,1080'],
            prefs: { 'intl.accept_languages': 'en-US,en' }
        }
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',

    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

}
