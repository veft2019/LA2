const dbProvider = require("../data/db");

const artistService = () => {
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

    const getAllArtists = async () => {
        return await globalTryCatch(async () => {
            const artists = await dbProvider.Artist.find({});
            return {
                status: 200,
                body: artists
            };
        });
    }


    const getArtistById = async (artistId) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.Artist.findById(result);
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
