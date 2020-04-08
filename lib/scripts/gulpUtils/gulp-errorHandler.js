const log = require("gulplog");

function errorHandler(e){
    this.emit("end");
    log.error(e);
}

module.exports = errorHandler;