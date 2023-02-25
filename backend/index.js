const express = require('express');
const app = express();
const deepai = require('deepai');
const cors = require('cors');
app.use(cors());
app.use(express.json());

deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Express Backend');
});
app.post('/generate', async (req, res) => {
  var resp = await deepai.callStandardApi('text-generator', {
    text: req.body.data,
  });
  console.log(resp);
  res.status(200).send({ response: resp });
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
