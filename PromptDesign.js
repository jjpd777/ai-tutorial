const one_completion = require('./OneCompletion');


const sandler_ = `

PROMPT_JUAN ============================================================================================

Write a few key bullet points about the Sandler Sales methodology. 
Make sure to emphasize the descriptiveness of this sales methodology's emotional and persuasive aspects.

========================================================================================================

GPT RESPONSE ===========================================================================================

The Sandler Sales methodology is a sales technique that emphasizes emotional and 
persuasive aspects of the sales process. Some key bullet points about this methodology are:

The Sandler Sales methodology focuses on building strong relationships with customers by establishing 
trust and rapport early in the sales process.

This approach emphasizes the importance of understanding the customer's needs and pain points, rather 
than simply pushing a product or service.

The methodology also emphasizes the importance of listening actively to the customer and asking open-ended 
questions to help the customer articulate their needs and concerns.

A key element of the Sandler Sales methodology is the use of "pain funnel" questioning to help customers 
fully articulate their pain points and the impact those pain points have on their business.

The methodology also emphasizes the importance of using "negative reverse selling" to overcome objections by 
asking the customer to explain why they don't want to buy a product or service, which can help to clarify 
any misunderstandings or concerns.

In addition to these emotional and persuasive aspects, the Sandler Sales methodology also emphasizes the 
importance of creating a sales process that is repeatable and scalable,so that sales teams can consistently 
achieve success over time.

Overall, the Sandler Sales methodology is a comprehensive approach to sales that emphasizes the importance of building 
strong relationships with customers, understanding their needs and pain points, and using persuasive 
techniques to overcome objections and close deals.`

const contextBuilder = (q)=>{
    const prompt = [
    `=== CONTEX ================`,
    `You are a customer service chat bot named Giovanni at a Medical Aesthetics clinic called Perfect B in Doral, Miami`,
    `As a chatbot, you need to receive inbound leads from Instagram, WhatsApp, Facebook or SMS`,
    `Your company uses The Sandler sales methodology, which is focused on emotional connection to the user through`,

    `=== TONE SPECIFICATIONS ========`,
    `The response provided by the agent should be on a tone that emotionally exposes the patient and makes them feel`,
    `open to sharing their vulnerabilities in a subtle way. Play strong on persuasion elements like`,
    `>> Mirroring, Reciprocity, Social proof, Scarcity, and Liking<<`,
    `Whenever possible offer constant compliments sprinkled in like "That's smart" or "I like that idea" `,

    `=== FORMAT SPECIFICATIONS ======`,
    `Make sure to be succinct about answers, with no answer exceeding 50 characters.`,
    `Respond concise and persuasive short sentences`,
    `Always push the customer toward doing a visit to the clinic`,
    `=== TASK TO PERFORM ============`,
    `Given the context provided above, please answer the following question from an in-bound sales lead coming from Instagram ${q}`

    ];

    return prompt.join( ' ')
};

const taskSelecter = (prompt_key, question )=>{
    const library = {

    "prompt1": `Provide a list of 10 possible ways to buy coffee online. Make the output be a list of comma-separated values`,

    "prompt2" : `Write 10 questions that would normally make at aesthetic medicine clinic, and a 
                correspoding answer to those questions. Make sure you include specific examples with
                real-world usage like questions about Botox, M-Sculpt, Laser Depilation, and others.

                Use a comma ',' for the space between Question and Answer, and '&&&' as a separator between each pair of prompt and completion, in the format:
                &&& Q1: , A1: &&&&
                `,

    "prompt3" : `Provide 10 questions that a patient would normally ask about hesitations to go to 
                a clinic, and corresponding answers by a persuasive agent that convinces the 
                patient to go to the clinic.`,

    "prompt5" : contextBuilder(question)
}
return library[prompt_key]
}

              
async function fetchPromptCompletion( libraryKey, question, temperature=0.7 ){
    const specificTask = taskSelecter(libraryKey, question);
    return one_completion(specificTask, temperature);
}

async function main() {
//   const response = await fetchPromptCompletion("prompt2", "hey I want a hair growth treatment");
//   console.log(response);

  const responses = [];

  for (let i = 0.5; i < 1; i += 0.1) {
    const response = await fetchPromptCompletion("prompt2", "", i);
    console.log(response);
    const listOfPairings = response.split('&&&');
    responses.push(listOfPairings);
  }

  console.log("The responses obtained: ", responses);
}

main();