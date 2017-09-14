const plugins = require('./rollup.config.base')

module.exports = {
    entry: 'views/sw.js',
    dest: 'dist/sw.js',
    sourceMap: 'dist/sw.js.map',
    format: 'iife',
    plugins,
}
