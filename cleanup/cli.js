#!/usr/bin/env node

const depcheck = require('depcheck');
const glob = require('glob');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

async function removeUnusedDependencies() {
   try {
     console.log('Attempting to remove unused dependencies...');
     const jpath = path.join(__dirname, 'package.json');
     let jcontent = await fs.readFile(jpath, 'utf-8');
     let pjson = JSON.parse(jcontent);
     const unused = await depcheck(__dirname, {});
     const unusedDeps = unused.dependencies;
     console.log('Unused dependencies:', unusedDeps);
 
     if (unusedDeps.length === 0) {
       console.log('No unused dependencies to remove.');
       return;
     }
     for (const dep of unusedDeps) {
       if (pjson.dependencies && pjson.dependencies[dep]) {
         delete pjson.dependencies[dep];
       }
     }
     jcontent = JSON.stringify(pjson, null, 2);
     await fs.writeFile(jpath, jcontent, 'utf-8');
 
     console.log('Unused dependencies removed from package.json.');
   } catch (error) {
     console.error('error');
   }
 }
 
async function removeConsoleLogs() {
  console.log('removing console logs..');
  const files = glob.sync('**/*.js', { ignore: 'node_modules/**' });
  console.log('Files found:', files);
  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      content = content.replace(/console\.log\(.+?\);?/g, '');
      await fs.writeFile(file, content, 'utf-8');
    } catch (error) {
      console.error(`error`);
    }
  }
  console.log('Console logs removed from project.');
}

async function runCleanup() {
  console.log('Cleaning project...');
  await removeUnusedDependencies();
  await removeConsoleLogs();
  console.log('Cleanup completed.');
}

runCleanup();
