// dependencies
const { OpenAI } = require("langchain/llms/openai");
require("dotenv").config();
const inquirer = require('inquirer');

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
    const res = await model.call(input);    
    console.log(res);
  }
  catch (err) {
    console.error(err);
  }
};


init();