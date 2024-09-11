(function () {
    console.log("Injected function started.");  // Added log

    let hCaptchaInstance;

    Object.defineProperty(window, "hcaptcha", {
        get: function () {
            console.log("hCaptcha getter called.");  // Added log
            return hCaptchaInstance;
        },
        set: function (e) {
            console.log("hCaptcha setter called.");  // Added log
            hCaptchaInstance = e;

            let originalRenderFunc = e.render;

            hCaptchaInstance.render = function (container, opts) {
                console.log("hCaptcha render called.");  // Added log
                createHCaptchaWidget(container, opts);
                return originalRenderFunc(container, opts);
            };
        },
    });

    let createHCaptchaWidget = function (container, opts) {
        console.log("createHCaptchaWidget called with container:", container);  // Added log
        if (opts.callback !== undefined && typeof opts.callback === "function") {
            let key = "hcaptchaCallback" + Date.now();
            window[key] = opts.callback;
            opts.callback = key;
        }

        let widgetInfo = {
            captchaType: "hcaptcha",
            widgetId: 0,
            containerId: container,
            sitekey: opts.sitekey,
            callback: opts.callback,
        };
        window["widgetInfo"] = widgetInfo;
        console.log("Widget info:", widgetInfo);  // Added log
    };
})();