import fs from "fs-extra";
import p from "path";
import * as Diff from "diff";

import jscodeshift from "jscodeshift";

const maxDepth = 25;

// TODO: Manually take these
//const extraExclusions = [];

export const getExamples = (examples, path, depth = 0) => {
    const files = fs.readdirSync(p.resolve(path));
    if (
        depth > maxDepth ||
        path.includes("archived") ||
        path.includes("3.24") // ||
        //      extraExclusions.every((exclusion) => path.includes(exclusion))
    ) {
        return;
    }

    for (let file of files) {
        const fileInfo = fs.statSync(p.resolve(path, file));
        if (fileInfo.isDirectory() && file[0] !== "_") {
            getExamples(examples, path + "/" + file, depth + 1);
        } else if (
            p.extname(file) === ".js" &&
            file[0] !== "_" &&
            file[0] !== "."
        ) {
            examples.push({
                url: path + "/" + file,
                path: p.resolve(path, file),
            });
        }
    }
};

export const generateES5Examples = (path) => {
    let examples: any[] = [];

    getExamples(examples, path);

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
                const es5Path = p.dirname(es5File);

                if (!fs.existsSync(es5Path)) {
                    fs.mkdirSync(es5Path, { recursive: true });
                }

                if (fs.existsSync(es5File)) {
                    const curr = fs.readFileSync(es5File).toString();
                    const diff = Diff.structuredPatch(
                        es5File,
                        es5File,
                        curr,
                        file
                    );

                    if (diff.hunks.length > 0) {
                        const filePath = `${p.dirname(es5File)}${
                            p.sep
                        }${p.basename(es5File, ".js")}`;

                        if (fs.existsSync(`${filePath}.patch`)) {
                            throw new Error(
                                `Erm... file patch for ${es5File} already exists, please make sure to remove or merge it back to the file before proceeding`
                            );
                        }

                        fs.writeFileSync(
                            `${filePath}.patch`,
                            Diff.createPatch(es5File, file, curr)
                        );
                    }
                }

                fs.writeFileSync(es5File, file);
            }
        } catch (error) {
            console.error(error);
        }
    });
};

export const getPatchedVersion = (examplePath): string => {
    const file = fs.readFileSync(examplePath).toString();
    const filePath = `${p.dirname(examplePath)}${p.sep}${p.basename(
        examplePath,
        ".js"
    )}`;
    const newFilePath = `${filePath}.new`;
    const doesNewFileExists = fs.existsSync(`${filePath}.new`);
    const patchFilePath = `${filePath}.patch`;
    let doesPatchFileExists = fs.existsSync(`${filePath}.patch`);

    if (!doesPatchFileExists && doesNewFileExists) {
        console.log(`Creating patch file for ${examplePath}`);
        const newFile = fs.readFileSync(newFilePath).toString();

        fs.writeFileSync(
            patchFilePath,
            Diff.createPatch(newFilePath, file, newFile)
        );

        doesPatchFileExists = true;
    }

    let finalFile;

    if (doesPatchFileExists) {
        console.log(`Applying patch file for ${examplePath}`);
        finalFile = Diff.applyPatch(
            file,
            fs.readFileSync(patchFilePath).toString()
        );
    } else {
        finalFile = file;
    }

    return finalFile;
};

export const makePatchedVersion = (path, code): string => {
    const filePath = `${p.dirname(path)}${p.sep}${p.basename(path, ".js")}`;
    const newFilePath = `${filePath}.new`;
    const doesNewFileExists = fs.existsSync(`${filePath}.new`);
    const patchFilePath = `${filePath}.patch`;
    let doesPatchFileExists = fs.existsSync(`${filePath}.patch`);

    if (!doesPatchFileExists && doesNewFileExists) {
        console.log(`Creating patch file for ${path}`);
        const newFile = fs.readFileSync(newFilePath).toString();

        fs.writeFileSync(
            patchFilePath,
            Diff.createPatch(newFilePath, code, newFile)
        );

        doesPatchFileExists = true;
    }

    let finalFile;

    if (doesPatchFileExists) {
        console.log(`Applying patch file for ${path}`);
        finalFile = Diff.applyPatch(
            code,
            fs.readFileSync(patchFilePath).toString()
        );
    } else {
        finalFile = code;
    }

    return finalFile;
};

export const writeToEs6 = (example, file) => {
    const es6File = example.url.replace("/public/src/es5/", "/public/src/es6/");
    const es6Path = p.dirname(es6File);

    if (!fs.existsSync(es6Path)) {
        fs.mkdirSync(es6Path, { recursive: true });
    }

    fs.writeFileSync(es6File, makePatchedVersion(es6File, file));

    return {
        ...example,
        url: es6File,
        path: es6Path,
    };
};
