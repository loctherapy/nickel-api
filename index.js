const app = require("./app");
const config = require("./config")();
const initializer = require("./init/init");

(async () => {
    await initializer.initializeAdmins();
})();

app.listen(config.port, () => {
    console.log(`
        Server has been started on ${config.port}
        ----
        Swagger is available
        http://localhost:${config.port}/docs`);
});
