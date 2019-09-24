const dbProvider = require("../data/db");

const artistService = () => {

  const globalTryCatch = async callback => {
    try {
      return await callback();
    } catch (err) {
      return err;
    }
  }
  /*const getAllArtists = async (cb, errorCb) => {
    await dbProvider.Artist.find({}, function(err, artists) {
          if(err) {
              errorCb(err);
          }
          else {
              cb(artists);
          }
      });
  };*/
  const getAllArtists = async () => {
    return await globalTryCatch(async () => {
      const artists = await dbProvider.Artist.find({});
      return artists;
    });
  }


  const getArtistById = (id, cb, errorCb) => {
    // Your implementation goes here
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
