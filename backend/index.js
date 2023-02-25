const express = require('express');
const app = express();
const cors = require('cors');

const openAi = require('openai');
app.use(cors());
app.use(express.json());
const configuration = new openAi.Configuration({
  apiKey: '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',
});
const openai = new openAi.OpenAIApi(configuration);
app.get('/', (req, res) => {
  res.status(200).send('Welcome to backend');
});
app.post('/generate', async (req, res) => {
  // res.status(200).send({ bot: 'hey there' });
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const keys = req.body.keys;
    console.log(keys);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `$Generate a product description for a product using keywords ${keys}`,
      temperature: 0,
      //higher temperature means the model will take more risks
      max_tokens: 3000, //more and larger responses
      top_p: 1,
      frequency_penalty: 0.5,
      //less likely to repeant the answer
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text),
      res.status(200).send({
        bot: response.data.choices[0].text,
      });
  } catch (error) {
    res.status(500).send({ error });
  }
});
app.listen(4000, () => {
  console.log('Listening to port 4000');
});
