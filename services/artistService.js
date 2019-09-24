const dbProvider = require("../data/db");

const artistService = () => {

    const globalTryCatch = async callback => {
        try {
            return await callback();
        } catch (err) {
            return err;
            //Could build an object here that as a status code in it to use in index
        }
    }

  const getAllArtists = async () => {
    return await globalTryCatch(async () => {
        const artists = await dbProvider.Artist.find({});
        return artists;
    });
  }


  const getArtistById = async (artistId) => {
    return await globalTryCatch(async () => {
        const artist = await dbProvider.Artist.findById(artistId);
        return artist;
    });
  };

  const createArtist = (artist, cb, errorCb) => {
    // Your implementation goes here
  };

  return {
    getAllArtists,
    getArtistById,
    createArtist
  };
};

module.exports = artistService();
