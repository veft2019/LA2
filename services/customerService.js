
const dbProvider = require("../data/db");
const customerService = () => {
    const globalTryCatch = async callback => {
        try {
            return await callback();
        } catch (err) {
            console.log(err);
            let statusCode = 500;
            return {
                status: statusCode,
                body: err
            };
            // TODO:  might need to take a look at passing the error into the body
        }
    }

  const getAllCustomers = async() => {
    return await globalTryCatch(async () => {
        const customers = await dbProvider.Customer.find({});
        return {
            status: 200,
            body: customers
        };
    });
  };

  const getCustomerById = (id, cb, errorCb) => {
    // Your implementation goes here
  };

  const getCustomerAuctionBids = (customerId, cb, errorCb) => {
    // Your implementation goes here
  };

  const createCustomer = (customer, cb, errorCb) => {
    // Your implementation goes here
  };

  return {
    getAllCustomers,
    getCustomerById,
    getCustomerAuctionBids,
    createCustomer
  };
};

module.exports = customerService();
