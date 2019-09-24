const dbProvider = require("../data/db");

const artistService = () => {
    const getAllArtists = (cb, errorCb) => {
        dbProvider.Artist.find({}, function(err, artists) {
            if(err) {
                errorCb(err);
            }
            else {
                cb(artists);
            }
        });
    };

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
