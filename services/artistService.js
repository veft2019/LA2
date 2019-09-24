const dbProvider = require("../data/db");

const artistService = () => {

    const globalTryCatch = async callback => {
        try {
            return await callback();
        } catch (err) {
            console.log(err);
            let statusCode = 400;
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
        const artist = await dbProvider.Artist.findById(artistId);
        return {
          status: 200,
          body: artist
        }
    });
  };

  const createArtist = async (artist) => {
      return await globalTryCatch(async () => {
        const stuff = await dbProvider.Artist.create(artist);
        console.log(stuff);
        return {
          status: 201,
          body: stuff
        }
    });
  };

  return {
    getAllArtists,
    getArtistById,
    createArtist
  };
};

module.exports = artistService();
