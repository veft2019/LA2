// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const artistService = require('./services/artistService');
const artService = require('./services/artService');
const customerService = require('./services/customerService');
const auctionService = require('./services/auctionService');

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
//http://localhost:3000/api/customers [GET]
app.get('/api/customers', async function(req, res) {
    const result = await customerService.getAllCustomers();
    return res.status(result.status).json(result.body);
});

//getCustomerByIdbyid
//http://localhost:3000/api/customers/:customerId [GET]
app.get('/api/customers/:customerId', async function(req, res) {
    const customerId = req.params.customerId;
    const result = await customerService.getCustomerById(customerId);
    return res.status(result.status).json(result.body);
});

//getCustomerAuctionBids
////http://localhost:3000/api/customers/:customerId [GET]
//VIRKAR EKKI
app.get('/api/customers/:customerId/auction-bids', async function(req, res) {
    const customerId = req.params.customerId;
    const result = await customerService.getCustomerAuctionBids(customerId);
    return res.status(result.status).json(result.body);
});

//createCustomer
//http://localhost:3000/api/customers/[POST]
app.post('/api/customers', async function(req, res) {
    const result = await customerService.createCustomer(req.body);
    return res.status(result.status).json(result.body);
});

// ================ AUCTION =================== //

app.get('/api/auctions', async function(req, res) {
    const result = await auctionService.getAllAuctions();
    return res.status(result.status).json(result.body);
});

app.get('/api/auctions/:auctionId', async function(req, res) {
    const auctionId = req.params.auctionId;
    const result = await auctionService.getAuctionById(auctionId);
    return res.status(result.status).json(result.body);
})

app.get('/api/auctions/:auctionId/winner', async function(req, res) {
    const auctionId = req.params.auctionId;
    const result = await auctionService.getAuctionWinner(auctionId);
    return res.status(result.status).json(result.body);
});

// http://localhost:3000
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
