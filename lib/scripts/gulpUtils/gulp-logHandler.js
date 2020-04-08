function logHandler(task){
    return {
        before: task+" log starting",
        //beforeEach: "bEach",
        afterEach: " is over",
        //prefix : "prefix",
        //suffix: "suffix",
        after: task+" log end",
        //extname: "ext",
        //basename: "base",
        //dest: "dest",
        colors: true,
        display: "name",
        showChange: true
    };
}

module.exports = logHandler;