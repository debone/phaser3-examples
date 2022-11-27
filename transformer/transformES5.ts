import fs from "fs-extra";
import path from "path";

import puppeteer from "puppeteer";

import { transform } from "lebab";
import jscodeshift from "jscodeshift";

import { getExamples } from "./utils.js";
import { Example, processExample } from "./utilsBrowser.js";

let examples: any[] = [];

getExamples(examples, "../public/src/es5");

const j = jscodeshift;

const testServer = "http://localhost:8080/";

let goodConversion = 0;
let needsReview = 0;
let badConversion = 0;

const browserPromise = puppeteer.launch({
    headless: true,
    executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

browserPromise.then(async (browser) => {
    //for (let i = 0; i < examples.length; i++) {
    for (let i = 0, l = 20; i < l; i++) {
        console.log(`Starting convertion of ${i}/${l}...`);

        let example = examples[i];
        if (i % 100 === 0) console.log(i);

        let isBadConversion = false;
        let isReviewNeeded = false;

        const exampleObj: Example = {
            es5: {
                uri: `${testServer}view.html?src=${example.url.replace(
                    "../public/",
                    ""
                )}`,
            },
            es6: {
                uri: `${testServer}view.html?src=${example.url.replace(
                    "../public/src/es5/",
                    "src/es6/"
                )}`,
            },
        };

        try {
            await processExample(browser, exampleObj, "es5");

            if (exampleObj.es5.errors.length) {
                console.table(exampleObj.es5.errors);
                throw new Error("Original example error on the browser");
            }

            const file = fs.readFileSync(example.path).toString();

            const { code, warnings } = transform(file, ["let"]);

            if (warnings.length) {
                console.warn("Lebab warning");
                console.table(warnings);
                isReviewNeeded = true;
            }

            const root = j(code);

            let exampleEs6 = writeToEs6(example, code);

            await processExample(browser, exampleObj, "es6");

            if (exampleObj.es6.errors.length) {
                console.table(exampleObj.es6.errors);
                throw new Error("ES6 example error on the browser");
            }
        } catch (error) {
            isBadConversion = true;
            console.error(example.url.replace("../public/", ""), error);
        }

        if (isBadConversion) {
            badConversion++;
        } else if (isReviewNeeded) {
            needsReview++;
        } else {
            goodConversion++;
        }
    }

    console.log(`Conversions finished`);
    console.log(`Good ones: ${goodConversion}`);
    console.log(`Needs review: ${needsReview}`);
    console.log(`Broken conversion: ${badConversion}`);

    process.exit();
});

function writeToEs6(example, file) {
    const es6File = example.url.replace("/public/src/es5/", "/public/src/es6/");
    const es6Path = path.dirname(es6File);

    if (!fs.existsSync(es6Path)) {
        fs.mkdirSync(es6Path, { recursive: true });
    }

    fs.writeFileSync(es6File, file);

    return {
        ...example,
        url: es6File,
        path: es6Path,
    };
}
