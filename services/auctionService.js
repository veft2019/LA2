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

    const getAuctionWinner = async (_auctionId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Auction.findById(_auctionId);
            if(result == null) {
                return {
                    status: 404,
                    body: "Auction not found!"
                }
            }

            if(result.endDate.getTime() > Date.now()) {
                return {
                    status: 209,
                    body: "Conflict! - Auction has not ended!"
                };
            }

            const highestBid = await dbProvider.AuctionBid.find({ auctionId: _auctionId }).sort({ price: -1 });
            if(highestBid.length == 0) {
                return { 
                    status: 200, 
                    body: "This auction has no bids" 
                };
            }
            
            const customer = await dbProvider.Customer.findById(highestBid[0].customerId);
            return { 
                status: 200, 
                body: customer 
            };
        });
    };

	const createAuction = async (auction)  => {
        return await globalTryCatch(async () => {
            const exists = await dbProvider.Auction.find({ artId: auction.artId });
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
