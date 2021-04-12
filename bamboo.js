#!/usr/bin/env node
require('cache-require-paths');
const { rootPath, cleanUp, getStoragePath, zipResults, setHeadlessMode, generateRandomToken } = require('./utils');
const { checkUrl, prepareData, isSelectorValid, runScan, isInputValid } = require(`${rootPath}/constants/common`);
const { bamboo_options, missing_login_param_msg, invalid_selectors, message_options} = require(`${rootPath}/constants/bambooFunctions`);
const printMessage = require('print-message');
const yargs = require("yargs");
const fs = require('fs-extra');

setHeadlessMode(true);

//Delete dataset and request queues
cleanUp('.a11y_storage');
cleanUp('.apify_storage');

//Command line argument via yargs
const options = yargs
  .usage("Usage: purple-hats -c <crawler> -u <url> OPTIONS")
  .options(bamboo_options)
  .example([
    ['To scan sitemap of website:', 'purple-hats -c [ 1 | sitemap ] -u <url_link>'],
    ['To scan a website','purple-hats -c [ 2 | website ] -u <url_link>'],
    ['To scan a login page','purple-hats -c [ 3 | login ] -u <url_link> -l <login_id> --lp <login_pwd> --uf "<username_field>" --lf "<login_pwd_field>" --sb "<submit_btn>"']
  ])
  .coerce('c', option => {

    if (typeof(option) === 'number') {
        // Will also allow integer choices
        switch(option) {
          case 1:
            option = 'sitemap';
            break;
          case 2:
            option = 'website';
            break;
          case 3:
            option = 'login'
            break;
          default:
            printMessage(["Invalid option", "Please choose to enter numbers (1,2,3) or keywords (sitemap, website, login)."], message_options);
            process.exit(1);
        }
    }

    return option.toLowerCase();
})
.check(async (argv) => {

  if ( argv.scanner === 'login') {
    //Check if there is any missing values for login crawler
    const loginValues = [argv.username, argv.userPassword, argv.usernameField, argv.passwordField, argv.submitBtnField];
    const loginHasEmptyValue = Object.values(loginValues).some(x => (x === null || x === ''));

    if (loginHasEmptyValue) {
      printMessage(missing_login_param_msg(),message_options);
      process.exit(1);
    }

    const checkUsername = isInputValid(argv.username);
    const checkPassword = isInputValid(argv.userPassword);

    if (!checkUsername || !checkPassword) {
      printMessage(['Please provide an input for the username and/or password with valid characters'], message_options);
      process.exit(1);
    }

    //Validate the CSS selectors
    const usernameFStatus = await isSelectorValid(argv.usernameField);
    const passwordFStatus = await isSelectorValid(argv.passwordField);
    const submitBtnField = await isSelectorValid(argv.submitBtnField);

    if (!usernameFStatus || !passwordFStatus || !submitBtnField) {
      printMessage(invalid_selectors(usernameFStatus,passwordFStatus,submitBtnField), message_options);
      process.exit(1); 
    }
  }


  return true;

})
.epilogue('For more information, find our manual in HATS Knowledge Base in SHIP Confluence')
.argv;

const randomToken = generateRandomToken();

const scanInit = async(argvs) => {

  //Validate the URL
  const res = await checkUrl(argvs.scanner, argvs.url);
  if (res.status === 200) {

    //To take the final url from the validation
    argvs.url = res.url;

    const data = prepareData(argvs.scanner, argvs);
    data.randomToken = randomToken;

    await runScan(data);

  } else {
    printMessage([`Invalid ${argvs.scanner} page. Please provide a URL to start the ${argvs.scanner} scan.`], message_options);
    process.exit(1);
  }

}

scanInit(options).then(async () => {

    const storagePath = getStoragePath(randomToken);
    const reportPath = `${storagePath}/reports`;
    const finalPath = `/opt/purple-hats-results/${randomToken}.zip`;

    await fs.ensureDir(reportPath).then( async () => {
      await zipResults(finalPath, reportPath);
      printMessage([`Report of this run is ${randomToken}.zip under /opt/purple-hats-results.`], message_options);
    }).catch( (error) => {
      printMessage([`Error in zipping results: ${error}`], message_options);
    });

});
