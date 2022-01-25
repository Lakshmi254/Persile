#!/bin/node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');

const envList = ['qa', 'stg', 'prod'];
const targetEnv = process.argv[2];

if (!envList.includes(targetEnv)) {
  console.log(`Error: ${targetEnv} not found in [${envList.join(', ')}]`);
  process.exit(1);
}

// get targetEnv json
const envFileContent = require(`./${targetEnv}.json`);

// Write targetEnv json to env.json
fs.writeFileSync(
  './envs/env.json',
  JSON.stringify(envFileContent, undefined, 2),
);
console.log('set env:', targetEnv);