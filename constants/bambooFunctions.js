exports.bamboo_options = {
    'c': {
        alias: "scanner",
        describe: "Type of crawler, 1) sitemap, 2) website or 3) login.",
        choices: ['sitemap', 'website', 'login'],
        demandOption: true
    },
    'u': {
        alias: "url",
        describe: "Website URL you want to scan",
        type: "string",
        demandOption: true
    },
    'l': {
        alias: "username",
        describe: "Login id/username for the URL",
        type: "string",
        demandOption: false
    },
    'lp': {
        alias: "userPassword",
        describe: "Login password for the URL",
        type: "string",
        demandOption: false
    },
    'uf': {
        alias: "usernameField",
        describe: "The 'username field' selector for the URL",
        type: "string",
        demandOption: false
    },
    'lf': {
        alias: "passwordField",
        describe: "The 'password field' selector for the URL",
        type: "string",
        demandOption: false
    },
    'sb': {
        alias: "submitBtnField",
        describe: "The 'submit button' selector for the URL",
        type: "string",
        demandOption: false
    },
};

exports.missing_login_param_msg = () => {
    return [
        "ERROR: Missing parameters needed for scanning website with login",
        "Please ensure you have included the mandatory parameters",
        "1) The crawler you want to use via -c or --crawler.",
        "2) The URL you want to crawl via -u or --url.",
        "3) The login details, login id/username (-l) and password (--lp)",
        "4) The selectors",
        "- username input field (--uf)",
        "- login input field (--lf)",
        "- submit button (--sb)"
    ];
}

exports.invalid_selectors = (usernameFStatus, passwordFStatus, submitBtnStatus) => {

    function convertString(status) {
        if (status) {
            return 'Valid';
        } else {
            return 'Invalid';
        }
    }

    return [
        "ERROR: Invalid CSS selectors provided.",
        "Please check and provide valid selectors for the following:",
        `Username Field: ${convertString(usernameFStatus)}`,
        `Password Field: ${convertString(passwordFStatus)}`,
        `Password Field: ${convertString(submitBtnStatus)}`
    ];

}

exports.contact_team = () => {

    return [
        "Token does not exist. Please check that you have provided a valid token.",
        "Please contact HATS team for assistance",
        "Thank you"
    ];

}
