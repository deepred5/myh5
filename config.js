var config = {
    appenders: [
        {
            type: 'file',
            filename: __dirname + "/log/server.log",
        }
    ]
}

module.exports = config