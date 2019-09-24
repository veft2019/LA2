const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const auctionService = () => {
    const getAllAuctions = async () => {
        return await globalTryCatch (async () => {
            const result = await dbProvider.Auction.find({});
            return {
                status: 200,
                body: result
            };
        });
    };

    const getAuctionById = (id, cb, errorCb) => {
        // Your implementation goes here
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const createAuction = (auction, cb, errorCb) => {
        // Your implementation goes here
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
