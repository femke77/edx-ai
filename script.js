const { OpenAI } = require("langchain/llms/openai");
require("dotenv").config();
const inquirer = require('inquirer');
const { PromptTemplate } = require("langchain/prompts");

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-3.5-turbo",
});

// console.log({ model });

const init = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Ask a coding question:',
    },
  ]).then((inquirerResponse) => {
    promptFunc(inquirerResponse.name)
  });
};

const promptFunc = async (input) => {
  try {
    const prompt = new PromptTemplate({
      template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{question}",
  inputVariables: ["question"],
    })
    const res = await model.call(input);    
    console.log(res);
  }
  catch (err) {
    console.error(err);
  }
};


init();