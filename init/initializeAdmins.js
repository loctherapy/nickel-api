const config = require("../config")();
const User = require("../services/user");
const security = require("../security");

module.exports = async function() {
    const adminEmails = config.predefinedRoles.admins.map(a => a.email);
    const adminsInTheDB = await User.getUsers({ email: { $in: adminEmails } });
    const adminsInTheDBEmails = adminsInTheDB.map(a => a.email);
    const adminsToCreate = config.predefinedRoles.admins.filter(
        a => !adminsInTheDBEmails.includes(a.email)
    );
    const admins = [];

    if (adminsToCreate.length > 0) {
        // eslint-disable-next-line no-console
        console.log("Initializing admins");
    }

    adminsToCreate.forEach(async e => {
        const admin = await User.add({
            firstName: e.firstName,
            lastName: e.lastName,
            roles: [security.ROLES.ADMIN],
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
};
