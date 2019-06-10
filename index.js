const app = require("./app/app");
const DIContainer = require("appDIContainer");
const Injectables = require("injectables");
const config = DIContainer.get(Injectables.CONFIG);
const InitAdmins = DIContainer.get(Injectables.INIT_ADMINS);

(async () => {
    await InitAdmins.init();
})();

app.listen(config.port, () => {
    console.log(`
        Server has been started on ${config.port}
        ----
        Swagger is available
        http://localhost:${config.port}/docs`);
});
