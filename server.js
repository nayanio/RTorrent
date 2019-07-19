const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(require('./src/routes'));
app.use(express.static(__dirname + '/public'));
// create a GET route
app.get('/ping', (req, res) => {
    res.send({ express: 'PONG' });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));