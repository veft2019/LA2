const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const artistService = () => {
    const getAllArtists = async () => {
        return await globalTryCatch(async () => {
            const artists = await dbProvider.Artist.find({});
            return {
                status: 200,
                body: artists
            };
        });
    };


    const getArtistById = async (artistId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Artist.findById(artistId);
            return {
                status: 200,
                body: result
            };
        });
    };

    const createArtist = async (artist) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Artist.create(artist);
            return {
                status: 201,
                body: result
            };
        });
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
