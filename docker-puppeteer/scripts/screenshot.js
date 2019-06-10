#!/usr/bin/env node

// <url> <filename> [delay in ms=0] [resolution=1920x1080]

function sleep(ms) {
    ms = (ms) ? ms : 0;
    return new Promise(resolve => {setTimeout(resolve, ms);});
}

process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, p);
    process.exit(1);
});

const puppeteer = require('puppeteer');

// console.log(process.argv);

if (!process.argv[2] || !process.argv[3]) {
    console.error('ERROR: url and filename missing \n');

    console.info('for example:\n');
    console.log('  docker run --shm-size 1G --sysctl net.ipv6.conf.all.disable_ipv6=1 --rm -v /var/tmp:/output \\');
    console.log('  ryanschulze/docker-puppeteer:latest env node /app/screenshot.js \'https://www.google.com\' \'google_com.png\'\n');
    process.exit(1);
}

var url = process.argv[2];

var filename = process.argv[3];

var now = new Date();

var dateStr = now.toISOString();

var delay = 0;

if (typeof process.argv[4] === 'string') {
    delay = parseInt(process.argv[4], 10);
}

var width = 1920;
var height = 1080;

if (typeof process.argv[5] === 'string') {
    var [width, height] = process.argv[3].split('x').map(v => parseInt(v, 10));
}

var isMobile = false;

(async() => {

    const browser = await puppeteer.launch({
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    page.setViewport({
        width,
        height,
        isMobile
    });

    await page.goto(url, {waitUntil: 'networkidle2', timeout: 20000 });

    await sleep(delay);

    await page.screenshot({path: `/output/${filename}`, fullPage: false});

    browser.close();

    console.log(
        JSON.stringify({
            timestamp: Math.floor(now.getTime() / 1000),
            url,
            filename,
            delay,
            width,
            height
        })
    );

})();
