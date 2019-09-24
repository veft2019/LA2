// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Verður að hafa til að parsa body fyrir post aðgerðir
app.use(bodyParser.json());

const artistService = require('./services/artistService');


// Artist

app.get('/api/artists', async function (req, res) {
  const result = await artistService.getAllArtists();
  return res.json(result);
});





// http://localhost:3000
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
