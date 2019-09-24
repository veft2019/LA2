const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const customerService = () => {
    const getAllCustomers = async () => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Customer.find({});
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No customers were found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const getCustomerById = async (_customerId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Customer.findById(_customerId);
            if(result == null) {
                return {
                    status: 404,
                    body: "Customer with this id was not found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const getCustomerAuctionBids = async (_customerId) => {
        return await globalTryCatch(async () => {
            const customer = await dbProvider.Customer.findById(_customerId);
            if(customer == null) {
                return {
                    status: 404,
                    body: "Customer with this id was not found"
                }
            }

            const result = await dbProvider.AuctionBid.find({customerId: _customerId});
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No bids made by this customer were found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const createCustomer = async (customer) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Customer.create(customer);
            return {
                status: 201,
                body: result
            };
        });
    };

    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
        createCustomer
    };
};

module.exports = customerService();
