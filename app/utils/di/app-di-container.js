const Injectables = require("./injectables");
const config = require("../../../config")();

const diContainer = require("./di-container")();

// Constants from config
diContainer.register(Injectables.CONFIG, config);
diContainer.register(Injectables.DB_URI, config.dbUri);
diContainer.register(Injectables.PASSWORD_SECRET, config.passwordSecret);
diContainer.register(
    Injectables.AUTH_TOKEN_EXPIRES_IN_MINUTES,
    config.authToken.expiresInMinutes
);
diContainer.register(Injectables.PREDEFINED_ROLES, config.predefinedRoles);
diContainer.register(
    Injectables.SECURITY_SETTINGS,
    require("../../security-settings")
);

// Factories
diContainer.register(
    Injectables.RESPONSE_MESSAGES,
    require("../response-messages")
);
diContainer.factory(Injectables.CONNECTION, require("../connection"));

// Plugins
diContainer.addPlugin(require("../../plugins/command/command.module"));
diContainer.addPlugin(require("../../plugins/user/user.module"));
diContainer.addPlugin(require("../../plugins/security/security.module"));
diContainer.addPlugin(require("../../plugins/board/board.module"));
diContainer.addPlugin(require("../../plugins/list/list.module"));
diContainer.addPlugin(require("../../plugins/init/init.module"));

module.exports = diContainer;
