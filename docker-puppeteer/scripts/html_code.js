#!/usr/bin/env node

// <url> <searchstring> [timeout in ms=10000]

process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, p);
    process.exit(1);
});

const puppeteer = require('puppeteer');

if (!process.argv[2] || !process.argv[3]) {
    console.error('ERROR: url / search string missing \n');
    process.exit(1);
}


if (!process.argv[2] || !process.argv[3]) {
    console.error('ERROR: url and filename missing \n');

    console.info('for example:\n');
    console.log('  docker run --shm-size 1G --sysctl net.ipv6.conf.all.disable_ipv6=1 --rm \\');
    console.log('  ryanschulze/docker-puppeteer:latest env node /app/html_code.js \'https://www.google.com\' \'footer\'\n');
    process.exit(1);
}

var url = process.argv[2];

var text = process.argv[3];

if (!process.argv[4]) {
	var Timeout = 10000;
} else {
	var Timeout = process.argv[4];
}

(async () => {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        ]
    });

    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded', timeout: Timeout });
    try {
        await page.waitForFunction(
            text => document.querySelector('body').innerText.includes(text),
            {},
            text
        );
    } catch(e) {
        console.log("The text -${text}- was not found on the page");
    }

    const html = await page.content();

    await console.log(html);

    await browser.close();
})();
