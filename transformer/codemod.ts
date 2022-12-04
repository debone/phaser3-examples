import jscodeshift, {
    Collection,
    Identifier,
    Program,
    VariableDeclarator,
} from "jscodeshift";
import { filters } from "jscodeshift/src/collections/JSXElement";

const j = jscodeshift;

/*
function transformer(file, api) {
    const exampleClass = j.classDeclaration(
        j.identifier("Example"),
        j.classBody([
            j.methodDefinition(
                "constructor",
                j.identifier("constructor"),
                j.functionExpression(
                    null,
                    [],
                    j.blockStatement([
                        j.expressionStatement(
                            j.callExpression(j.identifier("super"), [])
                        ),
                    ])
                ),
                false
            ),
        ]),
        j.memberExpression(j.identifier("Phaser"), j.identifier("Scene"))
    );

    // Naive add example class
    root.get().node.program.body.unshift(exampleClass);

    // Naive find globals and add to class
    root.find(j.VariableDeclaration, { kind: "let" }).forEach((path) => {
        // naive simple let
        const declaration = path.value.declarations[0];

        const { name: memberName } = declaration.id;
        const { init: memberValue } = declaration.id;

        // Modifies all the identifiers to it
        root.find(j.Identifier, {
            name: memberName,
        }).forEach((p) => {
            j(p).replaceWith(
                j.memberExpression(j.thisExpression(), j.identifier(memberName))
            );
        });

        j(exampleClass)
            .find(j.MethodDefinition, {
                key: {
                    type: "Identifier",
                    name: "constructor",
                },
            })
            .forEach((path) => {
                const { body: constructorBody } = path.value.value.body;
                constructorBody.push(
                    j.expressionStatement(
                        j.assignmentExpression(
                            "=",
                            j.memberExpression(
                                j.thisExpression(),
                                j.identifier(memberName)
                            ),
                            j.literal("")
                        )
                    )
                );
            });

        j(path).remove();
    });

    // Naive move all function calls into the Example calss
    root.find(j.FunctionDeclaration, {
        id: {
            type: "Identifier",
        },
    }).forEach((path) => {
        exampleClass.body.body.push(
            j.methodDefinition(
                "method",
                path.value.id,
                j.functionExpression(null, path.value.params, path.value.body),
                false
            )
        );
        j(path).remove();
    });

    return root.toSource();
} */

export const codemod = (code: string): string => {
    const root = j(code);

    // Find config object
    const game: Collection<VariableDeclarator> =
        root.findVariableDeclarators("game");

    if (game.length !== 1) {
        throw new Error("Could not find the variable game");
    }

    const isGameConfig = game
        .find(j.NewExpression)
        .find(j.Identifier, { name: "config" }).length;

    if (isGameConfig !== 1) {
        throw new Error("Phaser configured not with variable");
    }

    // Leaving it here so if anormally happens with examples, errors will show up
    let exampleClass;

    const config = root.findVariableDeclarators("config").filter((path) => {
        return j(path).closestScope().isOfType(j.Program);
    });

    /*const sceneConfi2g = config.find(j.Property, {
        key(identifier) {
            return (
                identifier.type === "Identifier" && identifier.name === "scene"
            );
        },
    });*/

    const sceneConfig = config.find(j.Property, {
        key: {
            type: "Identifier",
            name: "scene",
        },
    });

    if (sceneConfig.get().value.value.type === "ObjectExpression") {
        exampleClass = j.classDeclaration(
            j.identifier("Example"),
            j.classBody([
                /*j.methodDefinition(
                    "constructor",
                    j.identifier("constructor"),
                    j.functionExpression(
                        null,
                        [],
                        j.blockStatement([
                            j.expressionStatement(
                                j.callExpression(j.identifier("super"), [])
                            ),
                        ])
                    ),
                    false
                ),*/
            ]),
            //TODO: Maybe this will take the name of the class if there's one already?
            j.memberExpression(j.identifier("Phaser"), j.identifier("Scene"))
        );

        root.get().node.program.body.unshift(exampleClass);

        const sceneObject = sceneConfig.get().value.value;
        console.log("Object", sceneObject);

        const declared: string[] = sceneObject.properties.map((property) => {
            return property.value.name;
        });

        root.find(j.FunctionDeclaration, {
            id: {
                type: "Identifier",
            },
        })
            .filter((path) => declared.indexOf(path.get().value.id.name) > -1)
            .forEach((path) => {
                exampleClass.body.body.push(
                    j.methodDefinition(
                        "method",
                        path.value.id,
                        j.functionExpression(
                            null,
                            path.value.params,
                            path.value.body
                        ),
                        false
                    )
                );
                j(path).remove();
            });

        // Swapping sceneConfig with Identifier for the exampleClass
        sceneConfig.replaceWith(
            j.property("init", j.identifier("scene"), j.identifier("Example"))
        );
    } else if (sceneConfig.get().value.value.type === "Identifier") {
        console.log("Identifier");
        throw new Error("Unhandled scene config object");
    } else if (sceneConfig.get().value.value.type === "ArrayExpression") {
        // console.log("ArrayExpression");
        // throw new Error("Unhandled scene config object");

        // Arrays should need better care than this... but I'm betting on manual changes not
        // Phaser.Class
        root.find(j.NewExpression)
            .filter((path) => {
                const c = path.value.callee;
                if (c.type === "MemberExpression") {
                    return (
                        c.object.type === "Identifier" &&
                        c.object.name === "Phaser" &&
                        c.property.type === "Identifier" &&
                        c.property.name === "Class"
                    );
                }
                return false;
            })
            .forEach((path) => {
                const name = path.parentPath.value.id;

                if (path.value.arguments[0].type !== "ObjectExpression") {
                    throw new Error("Unhandled Phaser.Class configuration");
                }

                const classProperties = path.value.arguments[0].properties;

                const classMethods = classProperties
                    .filter(
                        (prop) =>
                            prop.type === "Property" &&
                            prop.value.type === "FunctionExpression"
                    )
                    .map((fn) => {
                        if (
                            fn.type !== "Property" ||
                            fn.value.type !== "FunctionExpression"
                        ) {
                            throw new Error(
                                "Unhandled Phaser.Class configuration"
                            );
                        }
                        return j.methodDefinition(
                            "method",
                            fn.key,
                            fn.value,
                            false
                        );
                    });

                const extend = classProperties.find(
                    (prop) =>
                        prop.type === "Property" &&
                        prop.key.type === "Identifier" &&
                        prop.key.name === "Extends"
                );

                if (
                    extend.type !== "Property" ||
                    extend.value.type !== "MemberExpression"
                ) {
                    throw new Error("Unhandled Phaser.Class configuration");
                }

                j(path.parentPath.parentPath.parentPath).replaceWith(
                    j.classDeclaration(
                        name,
                        j.classBody(classMethods),
                        extend.value
                    )
                );
            });
    } else {
        console.log("Unknown");
        throw new Error("Unhandled scene config object");
    }

    // Global variables go to the example class
    root.find(j.VariableDeclaration)
        .filter((path) => {
            return (
                (
                    (path.value.declarations[0] as VariableDeclarator)
                        .id as Identifier
                ).name !== "game" &&
                (
                    (path.value.declarations[0] as VariableDeclarator)
                        .id as Identifier
                ).name !== "config" &&
                j(path).closestScope().isOfType(j.Program)
            );
        })
        .forEach((path) => {
            const declaration = path.value.declarations[0];

            if (
                declaration.type !== "VariableDeclarator" ||
                declaration.id.type !== "Identifier"
            ) {
                throw new Error("Unhandled variable transformation");
            }

            const { name: memberName } = declaration.id;
            const { init: memberValue } = declaration;

            // Sometimes we have clashes of parameters and names, we need to bypass the 'this' replacement
            const ignoreScopes = [];

            // Modifies all the identifiers to it
            root.find(j.Identifier, {
                name: memberName,
            })
                .filter((path) => {
                    if (path.parentPath.name === "params") {
                        ignoreScopes.push(path.parentPath.scope.node);
                    }

                    if (ignoreScopes.indexOf(path.parentPath.scope.node) > -1) {
                        return false;
                    }

                    if (
                        path.parentPath.value.type === "VariableDeclarator" ||
                        path.parentPath.value.type === "Property"
                    ) {
                        return false;
                    }

                    if (path.parentPath.value.type === "MemberExpression") {
                        return path.parentPath.value.object.name === memberName;
                    }

                    return true;
                })
                .forEach((p) => {
                    j(p).replaceWith(
                        j.memberExpression(
                            j.thisExpression(),
                            j.identifier(memberName)
                        )
                    );
                });

            exampleClass.body.body.unshift(
                j.classProperty(j.identifier(memberName), memberValue)
            ); /*
                j.expressionStatement(
                    j.assignmentExpression(
                        "=",
                        j.memberExpression(
                            j.thisExpression(),
                            j.identifier(memberName)
                        ),
                        memberValue
                    )
                )
            );
            /*
                .find(j.MethodDefinition, {
                    key: {
                        type: "Identifier",
                        name: "constructor",
                    },
                })
                .forEach((path) => {
                    const { body: constructorBody } = path.value.value.body;
                    constructorBody.push(
                        j.expressionStatement(
                            j.assignmentExpression(
                                "=",
                                j.memberExpression(
                                    j.thisExpression(),
                                    j.identifier(memberName)
                                ),
                                j.literal("")
                            )
                        )
                    );
                });
*/
            j(path).remove();
        });

    // fn
    root.find(j.FunctionDeclaration, {
        id: {
            type: "Identifier",
        },
    })
        .filter((path) => {
            return path.parentPath.scope.isGlobal;
        })
        .forEach((path) => {
            const declaration = path.value;

            const { name: memberName } = declaration.id;

            // Modifies all the identifiers to it
            root.find(j.Identifier, {
                name: memberName,
            })
                .filter((path) => {
                    if (
                        path.parentPath.value.type === "VariableDeclarator" ||
                        path.parentPath.value.type === "Property"
                    ) {
                        return false;
                    }

                    if (path.parentPath.value.type === "MemberExpression") {
                        return path.parentPath.value.object.name === memberName;
                    }
                    return true;
                })
                .forEach((p) => {
                    j(p).replaceWith(
                        j.memberExpression(
                            j.thisExpression(),
                            j.identifier(memberName)
                        )
                    );
                });

            exampleClass.body.body.push(
                j.methodDefinition(
                    "method",
                    j.identifier(memberName),
                    j.functionExpression(
                        null,
                        path.value.params,
                        path.value.body
                    ),
                    false
                )
            );

            j(path).remove();
        });

    /*const config = (root.get().value.program as Program).body.filter(
        (n) =>
            j(n).isOfType(j.VariableDeclaration) &&
            j(n)
                .find(j.VariableDeclarator)
                .filter(
                    (n) =>
                        n.value.id.type === "Identifier" &&
                        n.value.id.name === "config"
                ).length > 0
    );*/

    return root.toSource({});
};
