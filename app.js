const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const swaggerTools = require("swagger-tools");
const jsyaml = require("js-yaml");
const path = require("path");
const passport = require("passport");
const config = require("./config")();
const responseMessages = require("./response-messages");
// eslint-disable-next-line no-undef
const dirname = __dirname;
const publicPath = path.join(dirname, "./public");

mongoose.connect(config.dbUri, {
    useCreateIndex: true,
    useNewUrlParser: true
});
mongoose.set("useFindAndModify", false);

app.use(function(request, response, next) {
    //allow cross origin requests
    response.setHeader(
        "Access-Control-Allow-Methods",
        "POST, PUT, OPTIONS, DELETE, GET"
    );
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (request.method === "OPTIONS") {
        response.end();
        return;
    }

    next();
})
    .use(bodyParser.urlencoded({ extended: false })) // get our request parameters
    .use(jsonParser)
    .use(passport.initialize()) // Use the passport package in our application
    .use(express.static(publicPath));

(function() {
    // swaggerRouter configuration
    const options = {
        swaggerUi: path.join(dirname, "/swagger.json"),
        controllers: path.join(dirname, "./controllers"),
        // eslint-disable-next-line no-undef
        useStubs: process.env.NODE_ENV === "development" // Conditionally turn on stubs (mock mode)
    };

    // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
    const spec = fs.readFileSync(
        path.join(dirname, "api/swagger.yaml"),
        "utf8"
    );
    const swaggerDoc = jsyaml.safeLoad(spec);

    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerMetadata());

        // Validate Swagger requests
        app.use(middleware.swaggerValidator());

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter(options));

        // Initialize security
        app.use(setupSwaggerSecurity(middleware));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());

        app.use((err, req, res) => {
            const code = [
                responseMessages.CODE_NAMES.TOKEN_IS_EXPIRED,
                responseMessages.CODE_NAMES.TOKEN_IS_NOT_PROVIDED,
                responseMessages.CODE_NAMES.TOKEN_IS_NOT_VALID
            ].includes(err.code)
                ? 401
                : 400;
            return res.status(code).send({ message: err.message });
        });

        function setupSwaggerSecurity(middleware) {
            return middleware.swaggerSecurity({
                jwt_token: (req, authOrSecDef, scopes, callback) => {
                    passport.authenticate(
                        "jwt",
                        { session: false },
                        (err, user) => {
                            if (err)
                                callback(
                                    new Error("Error in passport authenticate")
                                );
                            if (!user)
                                callback(
                                    new Error(
                                        "Failed to authenticate oAuth token"
                                    )
                                );
                            req.user = user;
                            return callback();
                        }
                    )(req, null, callback);
                }
            });
        }
    });
})();

module.exports = app;
