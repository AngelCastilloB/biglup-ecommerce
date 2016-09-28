System.config({
    packages: {
        'biglup-ui': {
            main: 'main',
            format: 'register',
            map: {
                '.': System.normalizeSync('{biglup:biglup-ui}')
            }
        }
    }
});
