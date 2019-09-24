const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const artistService = () => {
    const getAllArtists = async () => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Artist.find({});
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No artists were found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const getArtistById = async (artistId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Artist.findById(artistId);
            if(result == null) {
                return {
                    status: 404,
                    body: "Artist with this id was not found"
                }
            }

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
