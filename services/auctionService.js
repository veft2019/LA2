const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const auctionService = () => {
    const getAllAuctions = async () => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Auction.find({});
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No auctions were found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const getAuctionById = async (_auctionId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Auction.findById(_auctionId);
            if(result == null) {
                return {
                    status: 404,
                    body: "Auction with this id was not found"
                }
            }

            return {
                status: 200,
                body: result
            }
        });
    };

    const getAuctionWinner = async (_auctionId) => {
        return await globalTryCatch(async () => {
            const auctionValidtion = await dbProvider.Auction.findById(_auctionId);
            if (auctionValidtion == null) {
                return {
                    status: 404,
                    body: "Auction not found!"
                }
            }

            if (auctionValidtion.endDate.getTime() > Date.now()) {
                return {
                    status: 209,
                    body: "Conflict! - Auction has not ended!"
                };
            }

            const highestBid = await dbProvider.AuctionBid.find({auctionId: _auctionId}).sort({price: -1});
            if (highestBid.length == 0) {
                return {
                    status: 200,
                    body: "This auction has no bids"
                };
            }

            const result = await dbProvider.Customer.findById(highestBid[0].customerId);
            return {
                status: 200,
                body: result
            };
        });
    };

    const createAuction = async (auction) => {
        return await globalTryCatch(async () => {
            const art = await dbProvider.Art.findById(auction.artId);
            if (art == null) {
                return {
                    status: 404,
                    body: "Art work not found"
                }
            }

            const exists = await dbProvider.Auction.find({artId: auction.artId});
            if (exists.length != 0) {
                return {
                    status: 409,
                    body: "Conflict! - Auction already exists for this art item"
                }
            }

            if (!art.isAuctionItem) {
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

    const getAuctionBidsWithinAuction = async (_auctionId) => {
        return await globalTryCatch(async () => {
            const auctionValidation = await dbProvider.Auction.findById(_auctionId);
            if (auctionValidation == null) {
                return {
                    status: 404,
                    body: "Auction with this id was not found"
                }
            }

            const result = await dbProvider.AuctionBid.find({auctionId: _auctionId}).sort({price: -1});
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No bids were found for this auction"
                }
            }

            return {
                status: 200,
                body: result
            }
        });
    };

    const placeNewBid = async (_auctionId, _customerId, _price) => {
        //Validate auction id
        const auction = await dbProvider.Auction.findById(_auctionId);
        if (auction == null) {
            return {
                status: 404,
                body: "Auction with this id was not found!"
            }
        }

        //Validate customer id
        const customer = await dbProvider.Customer.findById(_customerId);
        if (customer == null) {
            return {
                status: 404,
                body: "Customer with this id was not found!"
            }
        }

        //Check if auction is over (date)
        if (auction.endDate < Date.now()) {
            return {
                status: 403,
                body: "Forbidden! - Auction is already over!"
            }
        }

        //Find all bids for this auction, order by price
        //Check if price is higher than highest bid
        const highestBid = await dbProvider.AuctionBid.find({auctionId: _auctionId}).sort({price: -1});

        //Check if price is higher than minimum price
        if (auction.minimumPrice >= _price || highestBid[0].price >= _price) {
            return {
                status: 412,
                body: "Bidding price too low!"
            }
        }

        //Create the bid
        await dbProvider.AuctionBid.create({
            auctionId: _auctionId,
            customerId: _customerId,
            price: _price
        });

        //Update auction winner prtop of auction to customerId if everything valid
        await dbProvider.Auction.findById(auctionId).updateOne({auctionWinner: _customerId});

        return {
            status: 202,
            body: "Success - Your bid has been placed!"
        }
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
