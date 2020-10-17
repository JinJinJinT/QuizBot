const express = require('express');
const serveIndex = require('serve-index');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, () => console.log('app listening on port 8080!'));
app.use('/gators', express.static('public'))
app.use('/gators', serveIndex('public'))
app.use('/nest', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});
