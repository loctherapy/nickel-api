let PredefinedRoles, Security, UserService;

async function init() {
    const adminEmails = PredefinedRoles.admins.map(a => a.email);
    const adminsInTheDB = await UserService.getUsers({
        email: { $in: adminEmails }
    });
    const adminsInTheDBEmails = adminsInTheDB.map(a => a.email);
    const adminsToCreate = PredefinedRoles.admins.filter(
        a => !adminsInTheDBEmails.includes(a.email)
    );
    const admins = [];

    if (adminsToCreate.length > 0) {
        // eslint-disable-next-line no-console
        console.log("Initializing admins");
    }

    adminsToCreate.forEach(async e => {
        const admin = await UserService.add({
            firstName: e.firstName,
            lastName: e.lastName,
            roles: [Security.ROLES.ADMIN],
            password: e.password,
            email: e.email
        });
        admins.push(admin);

        // eslint-disable-next-line no-console
        console.log(
            `Admin initialized: ${e.firstName} ${e.lastName} (${e.email})`
        );
    });

    return admins;
}

module.exports = function(predefinedRoles, security, userService) {
    PredefinedRoles = predefinedRoles;
    Security = security;
    UserService = userService;

    return {
        init
    };
};
