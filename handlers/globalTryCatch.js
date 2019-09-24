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
        // TODO: might need to take a look at passing the error into the body
    }
}

module.exports = globalTryCatch;