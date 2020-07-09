require('../config.js');
const express = require('express');
const postRouter = require('./routers/posts.js');
const errorhandler = require('./middleware/error-handler.js');

app = express();

app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
    next();
}
app.use(allowCrossDomain);

app.use('/api', postRouter);
app.use(errorhandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});