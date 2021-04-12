# Purple HATS
Purple HATS is a customisable, automated accessibility testing tool that allows software development teams to assess whether their products are user-friendly to persons with disabilities (PWDs).

## Technology Stack
1. [Apify SDK](https://sdk.apify.com/)
2. [Axe-core](https://github.com/dequelabs/axe-core)
3. [Node.js](https://Node.js.org/en/)

## Prerequisites and Installations
Please ensure the following requirements are met:
- Node.js version to be version 10 and above.
- Install the required NPM packages with `npm install`.

### Usage of Node Version Manager (NVM)
```shell
# If have not install a version > v8.1, install NodeJs version wiyh NVM
nvm install <nodejs_version_greater_than_8.1>

# For subsequent use, you will need to run the command below as time you open a new terminal
nvm use <nodejs_version_greater_than_8.1>
```

### Facing issues?
Please refer to [Troubleshooting section](#troubleshooting) for more information.

---

## Features
Purple HATS can perform the following to scan the target URL. 
- Results will be compiled in JSON format, followed by generating a HTML report. 
- To start using Purple HATS, run `node index`. Questions will be prompted to assist you in providing the right inputs. 

> NOTE: For your initial scan, there may be some loading time required before use.

### Scan Selection
You can interact via your arrow keys.
```shell
% node index
┌────────────────────────────────────────────────────────────┐
│ Welcome to HATS Accessibility Testing Tool!                │
│ We recommend using Chrome browser for the best experience. │
└────────────────────────────────────────────────────────────┘
? What would you like to scan today? 
❯ Sitemap 
  Website 
```
  
### Headless Mode
Headless mode would allow you to run the scan in the background. If you would like to observe the scraping process, please enter `n`
```shell
 % node index 
┌────────────────────────────────────────────────────────────┐
│ Welcome to HATS Accessibility Testing Tool!                │
│ We recommend using Chrome browser for the best experience. │
└────────────────────────────────────────────────────────────┘
? What would you like to scan today? Sitemap
? Do you want purple-hats to run in the background? (Y/n) Y
```

### Sitemap Scan
```shell
% node index
┌────────────────────────────────────────────────────────────┐
│ Welcome to HATS Accessibility Testing Tool!                │
│ We recommend using Chrome browser for the best experience. │
└────────────────────────────────────────────────────────────┘
? What would you like to scan today? Sitemap
? Do you want purple-hats to run in the background? Yes
? Do you need to login to your website? No
? Please enter URL to sitemap:  https://www.sitemaps.org/sitemap.xml

Scanning website... 

#purple-hats will then start scraping from the file link provided above.
#Console results

```
  
If the sitemap URL provided is invalid, an error message will be prompted for you to provide a valid input.
```shell
>> Invalid sitemap format. Please provide a URL with a valid sitemap.
```


### Website Scan
```shell
% node index
┌────────────────────────────────────────────────────────────┐
│ Welcome to HATS Accessibility Testing Tool!                │
│ We recommend using Chrome browser for the best experience. │
└────────────────────────────────────────────────────────────┘
? What would you like to scan today? Website
? Do you want purple-hats to run in the background? Yes
? Do you need to login to your website? (Y/n) No
? Please enter URL of website:  https://www.sitemaps.org
```
  
If the website URL provided is invalid, an error message will be prompted for you to provide a valid input.
```shell
>> Cannot resolve URL. Please provide a valid URL.
```

