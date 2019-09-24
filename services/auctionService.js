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

    const getAuctionById = async (auctionId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Auction.findById(auctionId);
            return {
                status: 200, 
                body: result
            }
        });
        
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const createAuction = async (auction)  => {
        return await globalTryCatch(async () => {
            const exists = await dbProvider.Auction.find({ artId: auction.artId });
            console.log(exists.length);
            if(exists.length != 0) {
                return {
                    status: 409,
                    body: "Conflict! - Auction already exists for this art item"
                }
            }
            const art = await dbProvider.Art.findById(auction.artId);
            if(art == null) {
                return {
                    status: 404,
                    body: "Art work not found"
                }
            }
            if(!art.isAuctionItem) {
                return {
                    status: 412,
                    body: "This art work is not an auction item"  
                }
            }
            const result = await dbProvider.Auction.create(auction);
            return {
                status: 201,
                body: result
            };
            
        });
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
