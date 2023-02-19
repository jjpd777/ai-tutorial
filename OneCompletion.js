

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


module.exports = async function create_one_completion( prompt, temperature ){
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: temperature,
            max_tokens: 500,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
          }).then((res) => res.data.choices);

        // perform action
        return  response[0].text
    } catch (e) {
        console.log(e)
        return e
    }
}
