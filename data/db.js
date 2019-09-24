const mongoose = require('mongoose');
const artSchema = require('../schemas/art');
const artistSchema = require('../schemas/artist');
const auctionSchema = require('../schemas/auction');
const auctionBidSchema = require('../schemas/auctionBid');
const customerSchema = require('../schemas/customer');

const connection = mongoose.createConnection('mongodb://db_user:abc12345@ds317808.mlab.com:17808/mansion_de_subastas2019', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
    Art: connection.model('Art', artSchema),
    Artist: connection.model('Artist', artistSchema),
    Auction: connection.model('Auction', auctionSchema),
    AuctionBid: connection.model('AuctionBid', auctionBidSchema, "auctionBids"),
    Customer: connection.model('Customer', customerSchema)
};
