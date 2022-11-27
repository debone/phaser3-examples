import fs from "fs-extra";
import path from "path";

import jscodeshift from "jscodeshift";

import { getExamples } from "./utils.js";

let examples: any[] = [];

getExamples(examples, "../public/src/3.60");

const j = jscodeshift;

examples.forEach((example, i) => {
    if (i % 100 === 0) console.log(i);

    try {
        const file = fs.readFileSync(example.path).toString();
        if (!j(file).find(j.ClassDeclaration).length) {
            const es5File = example.url.replace(
                "/public/src/3.60/",
                "/public/src/es5/"
            );
            const es5Path = path.dirname(es5File);

            if (!fs.existsSync(es5Path)) {
                fs.mkdirSync(es5Path, { recursive: true });
            }

            fs.writeFileSync(es5File, file);
        }
    } catch (error) {
        console.error(error);
    }
});
