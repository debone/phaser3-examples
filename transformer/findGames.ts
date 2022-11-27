import fs from "fs-extra";

import jscodeshift from "jscodeshift";

import { getExamples } from "./utils.js";

let examples: any[] = [];

getExamples(examples, "../public/src/3.60");

const j = jscodeshift;

let gameIdentifier = 0;
let withoutGame = 0;

examples.forEach((example: { path: string }, i) => {
    if (i % 100 === 0) console.log(i);

    try {
        const file = fs.readFileSync(example.path).toString();
        if (
            j(file)
                .find(j.VariableDeclaration)
                .find(j.Identifier, { name: "game" }).length
        ) {
            gameIdentifier++;
        } else {
            console.log(example.path);

            fs.writeFileSync(
                `../tmp/${example.path
                    .replace("/phaser3-examples/public/src/3.60/", "")
                    .replace(/\//g, "_")}`,
                file
            );
            withoutGame++;
        }
    } catch (error) {
        console.error(error);
    }
});

console.log(`Out of ${examples.length}:`);
console.log(`Without game: ${withoutGame}`);
console.log(`With game: ${gameIdentifier}`);
