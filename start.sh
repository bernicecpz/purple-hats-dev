#!/bin/bash

if ! [ -d "node_modules" ]; then
    echo "Necessary NPM packages are not installed yet. Please run 'npm install'."
    echo "Please note that Purple HATS need NodeJS 10 and above."
    echo "If there is a need to manage your node versions, you can consider using Node Version Manager (NVM)."
    
    exit 0
else
    node index
fi