const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const customerService = () => {
    const getAllCustomers = async () => {
        return await globalTryCatch(async () => {
            const customers = await dbProvider.Customer.find({});
            return {
                status: 200,
                body: customers
            };
        });
    };

    const getCustomerById = async (customerId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Customer.findById(customerId);
            return {
                status: 200,
                body: result
            };
        });
    };

    const getCustomerAuctionBids = async (customerId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.AuctionBid.find({
                customerId: customerId
            });
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
