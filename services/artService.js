const dbProvider = require("../data/db");
const globalTryCatch = require("../handlers/globalTryCatch");

const artService = () => {
    const getAllArts = async () => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Art.find({});
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No art works were found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const getArtById = async (artId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Art.findById(artId);
            if(result == null) {
                return {
                    status: 404,
                    body: "Art work with this id was not found"
                }
            }

            return {
                status: 200,
                body: result
            };
        });
    };

    const createArt = async (art) => {
        return await globalTryCatch(async () => {
            const artist = await dbProvider.Artist.findById(art.artistId);
            if(artist == null) {
                return {
                    status: 400,
                    body: "Artist with this id was not found"
                }
            }

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
