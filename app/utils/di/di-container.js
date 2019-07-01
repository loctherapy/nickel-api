const fnArgs = require("parse-fn-args");

module.exports = function() {
    const dependencies = {};
    const factories = {};
    const diContainer = {};

    diContainer.factory = registerFactory;

    diContainer.register = register;

    diContainer.get = name => {
        if (!dependencies[name]) {
            const factory = factories[name];
            dependencies[name] = factory && inject(factory);
            if (!dependencies[name]) {
                throw new Error("Cannot find module: " + name);
            }
        }
        return dependencies[name];
    };

    diContainer.addPlugin = plugin => {
        const { NAME, TOKENS, FACTORIES } = plugin;

        register(NAME, TOKENS);

        FACTORIES.forEach(f => {
            registerFactory(f.token, f.factory);
        });
    };

    function register(name, dep) {
        dependencies[name] = dep;
    }

    function registerFactory(name, factory) {
        factories[name] = factory;
    }

    function inject(factory) {
        const args = fnArgs(factory).map(dependency =>
            diContainer.get(dependency)
        );
        return factory.apply(null, args);
    }

    return diContainer;
};
