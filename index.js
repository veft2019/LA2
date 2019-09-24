// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Verður að hafa til að parsa body fyrir post aðgerðir
app.use(bodyParser.json());

const artistService = require('./services/artistService');
const artService = require('./services/artService');

// Art
app.get('/api/arts', async function (req, res) {
    const statusCode = 200;
    const result = await artService.getAllArts();
    if(Object.entries(result).length === 0) {
       statusCode = 404;
    }
    return res.status(statusCode).json(result);
});

app.get('/api/arts/:artId', async function(req, res) {
    let statusCode = 200;
    const artId = req.params.artId;
    const result = await artService.getArtById(artId);
    //if(result.includes("Error")) {
        //statusCode = 404;
    //}
    return res.status(statusCode).json(result);
});

app.post('/api/arts', async function (req, res) {
    let statusCode = 201;
    const result = await artService.createArt(req.body);
    //if(result.name.includes("Error")) {
        //statusCode = 400;
    //}
    return res.status(statusCode).json(result);
});

// Artists
app.get('/api/artists', async function (req, res) {
    const statusCode = 200;
    const result = await artistService.getAllArtists();
    if(Object.entries(result).length === 0) {
        statusCode = 404;
    }
    return res.status(statusCode).json(result);
});

app.get('/api/artists/:artistId', async function(req, res) {
    let statusCode = 200;
    const artistId = req.params.artistId;
    const result = await artistService.getArtistById(artistId);
    if(result.name.includes("Error")) {
        statusCode = 404;
    }
    return res.status(statusCode).json(result);
});

app.post('/api/artists', async function(req, res) {
    let statusCode = 201;
    const result = await artistService.createArtist(req.body);
    if(result.name.includes("Error")) {
        statusCode = 400;
    }
    return res.status(statusCode).json(result);
});


// http://localhost:3000
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
