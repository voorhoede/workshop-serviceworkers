const plugins = require('./rollup.config.base')

module.exports = {
    entry: 'views/index.js',
    dest: 'dist/index.js',
    sourceMap: 'dist/index.js.map',
    format: 'iife',
    plugins,
}
