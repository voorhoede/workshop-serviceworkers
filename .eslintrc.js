const isProduction = process.env.NODE_ENV;

module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": "off",
		"no-debugger":"off",
		"semi": ["error", "never"]
    }
};
