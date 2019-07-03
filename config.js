module.exports = function() {
    return {
        projectName: "Nickel",
        dbUri:
            // eslint-disable-next-line no-undef
            process.env.MONGODB_LACONIC_NICKEL ||
            "mongodb://localhost:27017/nickel",
        // eslint-disable-next-line no-undef
        port: process.env.NICKEL_PORT || "5050",
        passwordSecret:
            "P6CFmW*tPqsB2U4hM#bKY#AD75BAM2chCmNtBh%AgZ2CqFRhZV&n#PeN2NnPnGPrBtj^3P*n6#FbNUHcPc9Nw7wRwGdUn!^^uuh",
        signUpEnabled: true,
        authToken: {
            expiresInMinutes: 60 * 24 * 30,
            expirable: false
        },
        changePwdToken: {
            expiresInMinutes: 15
        },
        webApp: {
            URL: "http://nickel-api.herokuapp.com"
        },
        predefinedRoles: {
            admins: [
                {
                    firstName: "Egor",
                    lastName: "Panok",
                    email: "egorpanok@gmail.com",
                    password: "110785"
                }
            ]
        },
        formats: {
            date: "DD.MM.YYYY"
        }
    };
};
