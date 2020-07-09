const fs = require('fs');

module.exports = function(err, req, res, next) {
    console.error(err);
    const log = `${moment().unix()} ERROR ${err.stack}\n`;
    fs.appendFile('logs.txt', log, (err) => {
        if(err) console.error(err);
    });
    res.sendStatus(err.status ? err.status : 500);
}