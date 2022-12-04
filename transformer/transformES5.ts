import fs from "fs-extra";
import nodeFs from "fs";
import path from "path";

import puppeteer from "puppeteer";

import { transform as lebabTransform } from "lebab";

import { getExamples, getPatchedVersion, writeToEs6 } from "./utils.js";
import { Example, processExample } from "./utilsBrowser.js";
import { codemod } from "./codemod.js";

let examples: any[] = [];

getExamples(examples, "../public/src/es5");

const testServer = "http://localhost:8080/";

let goodConversion = 0;
let badConversion = 0;

const browserPromise = puppeteer.launch({
    headless: true,
    executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

browserPromise.then(async (browser) => {
    let l = examples.length;
    for (let i = 0; i < l; i++) {
        console.log(`Starting convertion of ${i}/${l}...`);

        let example = examples[i];

        let isBadConversion = false;

        let overallError = "";

        const exampleObj: Example = {
            es5: {
                uri: `${testServer}view.html?src=${example.url.replace(
                    "../public/",
                    ""
                )}`,
                warnings: [],
                errors: [],
            },
            es6: {
                uri: `${testServer}view.html?src=${example.url.replace(
                    "../public/src/es5/",
                    "src/es6/"
                )}`,
                warnings: [],
                errors: [],
            },
        };

        try {
            // TODO: Testing codemods, remember to uncomment
            // await processExample(browser, exampleObj, "es5");

            if (exampleObj.es5.errors?.length) {
                throw new Error("Original example error on the browser");
            }

            const file = getPatchedVersion(example.path);

            let { code, warnings } = lebabTransform(file, [
                "let",
                "arrow",
                "arrow-return",
                "template",
            ]);

            if (warnings.length) {
                exampleObj.es5.warnings = warnings;
                throw "";
            }

            try {
                code = codemod(code);
            } catch (e) {
                exampleObj.es5.errors?.push(e);
                throw e;
            }

            let exampleEs6 = writeToEs6(example, code);

            await processExample(browser, exampleObj, "es6");

            if (exampleObj.es6.errors?.length) {
                throw new Error("ES6 example error on the browser");
            }
        } catch (error) {
            overallError = error;
            isBadConversion = true;
        }

        if (isBadConversion) {
            console.warn(example.url.replace("../public/", ""));

            if (overallError !== "") {
                console.error(overallError);
            }

            if (exampleObj.es5.warnings?.length) {
                console.warn("Lebab warnings");
                console.table(exampleObj.es5.warnings);
            }

            if (exampleObj.es5.errors?.length) {
                console.error("ES5 Errors");
                console.table(exampleObj.es5.errors);
            }

            if (exampleObj.es6.errors?.length) {
                console.error("ES6 Errors");
                console.table(exampleObj.es6.errors);
            }

            badConversion++;
        } else {
            goodConversion++;
        }
    }

    console.log(
        `Conversions finished with ${100 * (goodConversion / l)}% success`
    );
    console.log(`Good ones: ${goodConversion}`);
    console.log(`Broken conversion: ${badConversion}`);

    process.exit();
});
