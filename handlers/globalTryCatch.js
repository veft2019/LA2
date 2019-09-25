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
    }
}

module.exports = globalTryCatch;