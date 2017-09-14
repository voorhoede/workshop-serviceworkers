const buble = require('rollup-plugin-buble')              	// https://buble.surge.sh/guide/
const commonjs = require('rollup-plugin-commonjs')        	// https://github.com/rollup/rollup-plugin-commonjs
const eslint = require('rollup-plugin-eslint')            	// https://github.com/TrySound/rollup-plugin-eslint
const json = require('rollup-plugin-json')					// https://github.com/rollup/rollup-plugin-json
const nodeResolve = require('rollup-plugin-node-resolve')	// https://github.com/rollup/rollup-plugin-node-resolve

const plugins = [
    eslint(),
	nodeResolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
	json(),
	buble({ transforms: { forOf: false } } ),
]

module.exports = plugins
