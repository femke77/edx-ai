const { OpenAI } = require("langchain/llms/openai");
require("dotenv").config();
const inquirer = require("inquirer");
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-3.5-turbo",
});

// console.log({ model });

const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Ask a coding question:",
      },
    ])
    .then(({name}) => {
      promptFunc(name);
    });
};

const promptFunc = async (input) => {
  try {
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      code: "Javascript code that answers the user's question",
      explanation: "detailed explanation of the example code provided"
    });
    const formatInstructions = parser.getFormatInstructions();
    const prompt = new PromptTemplate({
      template:
        "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{format_instructions}\n{question}",
      inputVariables: ["question"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const promptInput = await prompt.format({
      question: `"${input}"`,
    });
    const res = await model.call(promptInput)
    console.log(await parser.parse(res));
  } catch (err) {
    console.error(err);
  }
};

init();
