/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-08 10:25:55
 * @LastEditors: lax
 * @LastEditTime: 2020-04-08 10:34:47
 */
const
CONFIG_PATH = process.env.GCP || "./../../config/config.json",
CONFIG = require(CONFIG_PATH);

const 

DEFAULT_ASSETS_PATH = "./src/",

DEFAULT_SOURCE_PATH = "./dist/",

DEFAULT_PRODUCTION_NAME = "prod",

DEFAULT_JS_FILE_NAME = "main.js",

DEFAULT_ES_VERSION = "es2015";


let STATIC = {};

STATIC.ISPRODUCTION = process.env.ENV === DEFAULT_PRODUCTION_NAME,

STATIC.ES_PRESET = CONFIG.es || DEFAULT_ES_VERSION,

STATIC.ASSETS_PATH = CONFIG.assets || DEFAULT_ASSETS_PATH,

STATIC.SOURCE_PATH = CONFIG.source || DEFAULT_SOURCE_PATH,

STATIC.JS_FILE_NAME = CONFIG.jsName || DEFAULT_JS_FILE_NAME,

module.exports = STATIC;