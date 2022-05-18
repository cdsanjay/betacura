// Based on https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
// const favicon = require('express-favicon');
const path = require('path');
const port = process.env.NODE_PORT || 3001;
const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());


app.use('/api/appointment', require('./services/appointment.api'));
app.use('/api/employee', require('./services/employee.api'));


app.get('/ping', function (req, res) {
    return res.send('pong!');
});
// Or just the asset.
app.use('/website', (req, res, next) => {
    req.url = path.basename(req.originalUrl);
    app.use(express.static(path.join(__dirname, 'build')))(req, res, next);
});

app.get('/website/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/',  (req, res) => res.send(`
<div style="margin: auto">
<h1>Coming soon...</h1>
</div>
`));

// the __dirname is the current directory from where the script is running
app.listen(port);

process.stdout.write('Betacura is serving in port: '+port)