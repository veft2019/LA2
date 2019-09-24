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
            //const artist = await dbProvider.Artist.findById(art.artistId);
            //const artist = await artistService.getArtistById(art.artistId);
            //Check if the database throws an error or if we need to do something to check if the artist exists
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
