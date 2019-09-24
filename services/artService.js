const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const artService = () => {
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
