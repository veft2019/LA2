const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        // Your implementation goes here
    };

    const getAuctionById = (id, cb, errorCb) => {
        // Your implementation goes here
    };

    const getAuctionWinner = async (auctionId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Auction.findById(auctionId);
            /*if(result.endDate.getTime() > Date.now()) {
                return {
                    status: 209,
                    body: "Conflict! - Auction has not ended!"
                };
            }*/

            //find auction bids by this auction id
            //get the highest one (sort by highest, take first or something)
            //get the customer id of that
            //get the customer with that id
            const highestBid = await dbProvider.AuctionBid.find({ auctionId: "5d836ac0b3ce4a1661c29ae8" });
            console.log(highestBid);
            return null;
        });
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
