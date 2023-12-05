const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api/post/*",
        createProxyMiddleware({
            target: "http://localhost:5050",
            changeOrigin: true,
        })
    );
    // app.use(
    //     "/api/post/submit",
    //     createProxyMiddleware({
    //         target: "http://localhost:5050",
    //         changeOrigin: true,
    //     })
    // );
};
