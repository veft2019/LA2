// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const artistService = require('./services/artistService');
const artService = require('./services/artService');
const customerService = require('./services/customerService');

// ================ ART =================== //

app.get('/api/arts', async function (req, res) {
    const result = await artService.getAllArts();
    return res.status(result.status).json(result.body);
});

app.get('/api/arts/:artId', async function(req, res) {
    const artId = req.params.artId;
    const result = await artService.getArtById(artId);
    return res.status(result.status).json(result.body);
});

app.post('/api/arts', async function (req, res) {
    const result = await artService.createArt(req.body);
    return res.status(result.status).json(result.body);
});

// ================ ARTISTS =================== //

app.get('/api/artists', async function (req, res) {
    const result = await artistService.getAllArtists();
    return res.status(result.status).json(result.body);
});

app.get('/api/artists/:artistId', async function(req, res) {
    const artistId = req.params.artistId;
    const result = await artistService.getArtistById(artistId);
    return res.status(result.status).json(result.body);
});

app.post('/api/artists', async function(req, res) {
    const result = await artistService.createArtist(req.body);
    return res.status(result.status).json(result.body);
});

// ================ CUSTOMERS =================== //
//getAllCustomers
app.get('/api/customers', async function(req, res) {
    const result = await customerService.getAllCustomers();
    return res.status(result.status).json(result.body);
})
//getCustomerByIdbyid

//getCustomerAuctionBids

//createCustomer



// http://localhost:3000
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
