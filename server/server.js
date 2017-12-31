const express = require('express');
const app = express();
const path = require('path');
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.listen(port, () => console.log(`listening on port: ${port}`));