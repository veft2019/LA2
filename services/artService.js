const dbProvider = require("../data/db");
const artService = () => {

    const globalTryCatch = async callback => {
        try {
            return await callback();
        } catch (err) {
            return err;
            //Could build an object here that as a status code in it to use in index
        }
    }
    const getAllArts = async() => {
        return await globalTryCatch(async () => {
        const arts = await dbProvider.Art.find({});
        return arts;
        });
    };

    const getArtById = async (artId) => {
       return await globalTryCatch(async () => {
           const art = await dbProvider.Art.findById(artId);
           return art;
       });
    };

    const createArt = (art, cb, errorCb) => {
        // Your implementation goes here
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
