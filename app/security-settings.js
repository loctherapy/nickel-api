const ROLES = {
    get ADMIN() {
        return "ADMIN";
    },
    get GENERAL_USER() {
        return "GENERAL_USER";
    }
};

const PERMISSIONS = {
    //
    // USERS
    get USERS_GET_ALL() {
        return "USERS_GET_ALL";
    },
    get USERS_GET() {
        return "USERS_GET";
    },
    get USERS_ADD() {
        return "USERS_ADD";
    },
    get USERS_UPDATE() {
        return "USERS_UPDATE";
    },
    get USERS_DELETE() {
        return "USERS_DELETE";
    },
    get USERS_ARCHIVE() {
        return "USERS_ARCHIVE";
    },
    get USERS_ACTIVATE() {
        return "USERS_ACTIVATE";
    },
    get USERS_GET_ALL_AVAILABLE_USER_ROLES() {
        return "USERS_GET_ALL_AVAILABLE_USER_ROLES";
    },
    //
    // BOARDS
    get BOARDS_GET_ALL() {
        return "BOARDS_GET_ALL";
    },
    get BOARDS_GET() {
        return "BOARDS_GET";
    },
    get BOARDS_ADD() {
        return "BOARDS_ADD";
    },
    get BOARDS_DELETE() {
        return "BOARDS_DELETE";
    },
    get BOARDS_UPDATE() {
        return "BOARDS_UPDATE";
    },
    get BOARDS_CLOSE() {
        return "BOARDS_CLOSE";
    },
    get BOARDS_OPEN() {
        return "BOARDS_OPEN";
    },
    //
    // LISTS
    get LISTS_GET_ALL() {
        return "LISTS_GET_ALL";
    },
    get LISTS_GET() {
        return "LISTS_GET";
    },
    get LISTS_ADD() {
        return "LISTS_ADD";
    },
    get LISTS_DELETE() {
        return "LISTS_DELETE";
    },
    get LISTS_UPDATE() {
        return "LISTS_UPDATE";
    },
    get LISTS_CLOSE() {
        return "LISTS_CLOSE";
    },
    get LISTS_OPEN() {
        return "LISTS_OPEN";
    }
};

const ROLES_PERMISSIONS_MAP = [
    {
        role: ROLES.ADMIN,
        inherits: [ROLES.GENERAL_USER],
        permissions: [
            //
            // USERS
            PERMISSIONS.USERS_GET_ALL,
            PERMISSIONS.USERS_GET,
            PERMISSIONS.USERS_ADD,
            PERMISSIONS.USERS_ARCHIVE,
            PERMISSIONS.USERS_ACTIVATE,
            PERMISSIONS.USERS_UPDATE,
            PERMISSIONS.USERS_DELETE
        ]
    },
    {
        role: ROLES.GENERAL_USER,
        permissions: [
            //
            // BOARDS
            PERMISSIONS.BOARDS_GET_ALL,
            PERMISSIONS.BOARDS_GET,
            PERMISSIONS.BOARDS_ADD,
            PERMISSIONS.BOARDS_DELETE,
            PERMISSIONS.BOARDS_UPDATE,
            PERMISSIONS.BOARDS_CLOSE,
            PERMISSIONS.BOARDS_OPEN,
            //
            // LISTS
            PERMISSIONS.LISTS_GET_ALL,
            PERMISSIONS.LISTS_GET,
            PERMISSIONS.LISTS_ADD,
            PERMISSIONS.LISTS_DELETE,
            PERMISSIONS.LISTS_UPDATE,
            PERMISSIONS.LISTS_CLOSE,
            PERMISSIONS.LISTS_OPEN,
            //
            // USERS
            PERMISSIONS.USERS_GET_ALL_AVAILABLE_USER_ROLES
        ]
    }
];

module.exports = {
    ROLES,
    PERMISSIONS,
    ROLES_PERMISSIONS_MAP
};
