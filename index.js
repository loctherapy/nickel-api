const app = require("./app/app");
const diContainer = require("./app/utils/di/app-di-container");
const Injectables = require("./app/utils/di/injectables");
const config = diContainer.get(Injectables.CONFIG);
const InitAdmins = diContainer.get(Injectables.INIT_ADMINS);

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
