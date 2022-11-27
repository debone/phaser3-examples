import { Browser } from "puppeteer";

export type ExampleConf = {
    uri: string;
    logs?: string[];
    errors?: string[];
    screenshot?: string | Buffer;
};

export type Example = {
    es5: ExampleConf;
    es6: ExampleConf;
};

export function processExample(
    browser: Browser,
    exampleObject: Example,
    which: "es5" | "es6"
) {
    let example = exampleObject[which];

    example.logs = [];
    example.errors = [];

    return browser
        .newPage()
        .then((page) => {
            page.on("console", (msg) => {
                example.logs.push(msg.text());
            });
            page.on("pageerror", (error) => {
                //console.log(error);
                example.errors.push(String(error));
            });
            page.on("response", (response) => {
                //console.log(response.status() + ': '+response.url());
                if (response.status() == 404) {
                    example.errors.push(
                        response.status() + ": " + response.url()
                    );
                }
            });
            page.on("requestfailed", (request) => {
                //console.log(request.failure().errorText, request.url());
                if (request.failure().errorText != "net::ERR_ABORTED") {
                    example.errors.push(
                        request.failure().errorText + ": " + request.url()
                    );
                }
            });
            return page
                .goto(example.uri, { timeout: 5000 })
                .then(() => page.waitForSelector("canvas", { timeout: 5000 }))
                .then(() => new Promise((p) => setTimeout(p, 1000)))
                .then(() => page.screenshot())
                .then((screenshot) => {
                    example.screenshot = screenshot;
                    return onDone();
                })
                .catch((e) => {
                    example.errors.push(String(e));
                    return onDone();
                });

            function onDone() {
                return page.close().catch(function (e) {
                    console.log("page close error: ");
                    console.log(e);
                });
            }
        })
        .catch(() => {});
}
