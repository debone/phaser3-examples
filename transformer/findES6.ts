import fs from "fs-extra";

import jscodeshift from "jscodeshift";

import { getExamples } from "./utils.js";

let examples: any[] = [];

getExamples(examples, "../public/src/3.60");

const j = jscodeshift;

let es6Examples = 0;
let es5Examples = 0;

examples.forEach((example, i) => {
    if (i % 100 === 0) console.log(i);

    try {
        const file = fs.readFileSync(example.path).toString();
        if (j(file).find(j.ClassDeclaration).length) {
            es6Examples++;
        } else {
            es5Examples++;
        }
    } catch (error) {
        console.error(error);
    }
});

console.log(`Out of ${examples.length}:`);
console.log(`ES5: ${es5Examples}`);
console.log(`ES6: ${es6Examples}`);
