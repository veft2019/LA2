const dbProvider = require("../data/db");

const artService = () => {
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

    const getAllArts = async() => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Art.find({});
            return {
                status: 200,
                body: result
            };
        });
    };

    const getArtById = async (artId) => {
       return await globalTryCatch(async () => {
           const result = await dbProvider.Art.findById(artId);
           return {
               status: 200,
               body: result
           };
       });
    };

    const createArt = async (art) => {
       return await globalTryCatch(async () => {
           const result = await dbProvider.Art.create(art);
           return {
               status: 201, 
               body: result
            };
       })
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
