const CODE_NAMES = {
    get OK() {
        return "OK";
    },
    get UNKNOWN_ERROR() {
        return "UNKNOWN_ERROR";
    },
    get ARGUMENT_SHOULD_NOT_BE_EMPTY() {
        return "ARGUMENT_SHOULD_NOT_BE_EMPTY";
    },
    get USER_WITH_THIS_EMAIL_ALREADY_EXISTS() {
        return "USER_WITH_THIS_EMAIL_ALREADY_EXISTS";
    },
    get NEW_OBJECT_ADDED() {
        return "NEW_OBJECT_ADDED";
    },
    get NEW_OBJECT_ADDING_ERROR() {
        return "NEW_OBJECT_ADDING_ERROR";
    },
    get ARGUMENT_SHOULD_HAVE_ANOTHER_TYPE() {
        return "ARGUMENT_SHOULD_HAVE_ANOTHER_TYPE";
    },
    get OBJECT_NOT_FOUND() {
        return "OBJECT_NOT_FOUND";
    },
    get AUTHENTICATION_FAILED() {
        return "AUTHENTICATION_FAILED";
    },
    get SENDING_EMAIL_FAILED() {
        return "SENDING_EMAIL_FAILED";
    },
    get TOKEN_IS_NOT_VALID() {
        return "TOKEN_IS_NOT_VALID";
    },
    get TOKEN_IS_EXPIRED() {
        return "TOKEN_IS_EXPIRED";
    },
    get TOKEN_IS_NOT_PROVIDED() {
        return "TOKEN_IS_NOT_PROVIDED";
    },
    get CAN_NOT_RESET_PASSWORD() {
        return "CAN_NOT_RESET_PASSWORD";
    },
    get PERMISSION_DENIED() {
        return "PERMISSION_DENIED";
    },
    get ACCESS_DENIED() {
        return "ACCESS_DENIED";
    },
    get ACCESS_TO_DB_DATA_FAILED() {
        return "ACCESS_TO_DB_DATA_FAILED";
    },
    get DB_ERROR() {
        return "DB_ERROR";
    },
    get OBJECT_DOES_NOT_COMPLY_TO_DATA_SCHEMA() {
        return "OBJECT_DOES_NOT_COMPLY_TO_DATA_SCHEMA";
    },
    get CAN_NOT_DELETE_OBJECT_BECAUSE_IT_IS_ACTIVE() {
        return "CAN_NOT_DELETE_OBJECT_BECAUSE_IT_IS_ACTIVE";
    },
    get EXTERNAL_COSTS_WORKFLOW_ERROR() {
        return "EXTERNAL_COSTS_WORKFLOW_ERROR";
    },
    get DATA_VALIDATION_ERROR() {
        return "DATA_VALIDATION_ERROR";
    }
};

let getMessage = (function() {
    const eCodes = [
        {
            code: CODE_NAMES.OK,
            message: function(args) {
                return args[0];
            }
        },
        {
            code: CODE_NAMES.UNKNOWN_ERROR,
            message: function(args) {
                return "Unknown error happened";
            }
        },
        {
            code: CODE_NAMES.ARGUMENT_SHOULD_NOT_BE_EMPTY,
            message: function(args) {
                return `Argument '${args[0]}' should not be empty`;
            }
        },
        {
            code: CODE_NAMES.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
            message: function(args) {
                return `User with email '${args[0]}' already exists in the app`;
            }
        },
        {
            code: CODE_NAMES.NEW_OBJECT_ADDED,
            message: function(args) {
                return `New ${args[0]} - ${args[1]} - was added`;
            }
        },
        {
            code: CODE_NAMES.NEW_OBJECT_ADDING_ERROR,
            message: function(args) {
                return `Error adding ${args[1]} - ${args[0]} object`;
            }
        },
        {
            code: CODE_NAMES.ARGUMENT_SHOULD_HAVE_ANOTHER_TYPE,
            message: function(args) {
                return `Argument '${args[0]}' should be an instance of '${
                    args[1]
                }' type`;
            }
        },
        {
            code: CODE_NAMES.OBJECT_NOT_FOUND,
            message: function(args) {
                return `Object '${args[0]}' - with property '${args[1]}' = '${
                    args[2]
                }' was not found`;
            }
        },
        {
            code: CODE_NAMES.AUTHENTICATION_FAILED,
            message: function(args) {
                return `Authentication failed. Reason - ${args[0]}`;
            }
        },
        {
            code: CODE_NAMES.SENDING_EMAIL_FAILED,
            message: function(args) {
                return `An error happened while sending an email to ${
                    args[0]
                }. Message: ${args[0]}`;
            }
        },
        {
            code: CODE_NAMES.TOKEN_IS_NOT_VALID,
            message: function() {
                return `Token is not valid`;
            }
        },
        {
            code: CODE_NAMES.TOKEN_IS_EXPIRED,
            message: function(args) {
                return `Token is expired ${args[0].toISOString()}`;
            }
        },
        {
            code: CODE_NAMES.TOKEN_IS_NOT_PROVIDED,
            message: function(args) {
                return `Token is not provided`;
            }
        },
        {
            code: CODE_NAMES.CAN_NOT_RESET_PASSWORD,
            message: function(args) {
                return `Can not reset password for ${args[0]}`;
            }
        },
        {
            code: CODE_NAMES.PERMISSION_DENIED,
            message: function(args) {
                return `The user doesn't have the permission ${
                    args[0]
                } to do this`;
            }
        },
        {
            code: CODE_NAMES.ACCESS_DENIED,
            message: function(args) {
                return `Access denied. ${args[0]}`;
            }
        },
        {
            code: CODE_NAMES.ACCESS_TO_DB_DATA_FAILED,
            message: function(args) {
                return `Access to collection ${args[0]} failed`;
            }
        },
        {
            code: CODE_NAMES.DB_ERROR,
            message: function(args) {
                return `DB Error. ${args[0]}`;
            }
        },
        {
            code: CODE_NAMES.OBJECT_DOES_NOT_COMPLY_TO_DATA_SCHEMA,
            message: function(args) {
                return `Object '${args[0]}' doesn't comply to the '${
                    args[1]
                }' data schema`;
            }
        },
        {
            code: CODE_NAMES.CAN_NOT_DELETE_OBJECT_BECAUSE_IT_IS_ACTIVE,
            message: function(args) {
                return `Can not delete '${args[0]}' in collection '${
                    args[1]
                }' because it's active`;
            }
        },
        {
            code: CODE_NAMES.EXTERNAL_COSTS_WORKFLOW_ERROR,
            message: function(args) {
                return `${args[0]}`;
            }
        },
        {
            code: CODE_NAMES.DATA_VALIDATION_ERROR,
            message: function(args) {
                return `Collection: '${args[0]}'. ${args[1]}`;
            }
        }
    ];

    return function(codeName, args) {
        let eCode, unknownCodeName;

        function findECode(eName) {
            return eCodes.filter(errorCode => {
                return errorCode.code === eName;
            })[0];
        }

        eCode = findECode(codeName);

        if (eCode === undefined) {
            unknownCodeName = CODE_NAMES.UNKNOWN_ERROR;
            eCode = findECode(unknownCodeName);

            return {
                code: unknownCodeName,
                message: eCode.message(args)
            };
        }

        return {
            code: codeName,
            message: eCode.message(args)
        };
    };
})();

function OK(arg) {
    return getMessage(CODE_NAMES.OK, [arg]);
}

function argumentShouldNotBeEmpty(arg) {
    return getMessage(CODE_NAMES.ARGUMENT_SHOULD_NOT_BE_EMPTY, [arg]);
}

function userWithThisEmailAlreadyExists(email) {
    return getMessage(CODE_NAMES.USER_WITH_THIS_EMAIL_ALREADY_EXISTS, [email]);
}

function newObjectAdded(objectTypeName, objectName) {
    return getMessage(CODE_NAMES.NEW_OBJECT_ADDED, [
        objectTypeName,
        objectName
    ]);
}

function newObjectAddingError(objectTypeName, objectName) {
    return getMessage(CODE_NAMES.NEW_OBJECT_ADDING_ERROR, [
        objectTypeName,
        objectName
    ]);
}

function argumentShouldHaveAnotherType(argumentName, validType) {
    return getMessage(CODE_NAMES.ARGUMENT_SHOULD_HAVE_ANOTHER_TYPE, [
        argumentName,
        validType
    ]);
}

function objectNotFound(
    objectTypeName,
    objectPropertyName,
    objectPropertyValue
) {
    return getMessage(CODE_NAMES.OBJECT_NOT_FOUND, [
        objectTypeName,
        objectPropertyName,
        objectPropertyValue
    ]);
}

function authenticationFailed(reason) {
    return getMessage(CODE_NAMES.AUTHENTICATION_FAILED, [reason]);
}

function sendingEmailFailed(to, message) {
    return getMessage(CODE_NAMES.SENDING_EMAIL_FAILED, [to, message]);
}

function tokenIsNotValid() {
    return getMessage(CODE_NAMES.TOKEN_IS_NOT_VALID);
}

function tokenIsExpired(when) {
    return getMessage(CODE_NAMES.TOKEN_IS_EXPIRED, [when]);
}

function tokenIsNotProvided() {
    return getMessage(CODE_NAMES.TOKEN_IS_NOT_PROVIDED, []);
}

function cannotResetPassword(forWhom) {
    return getMessage(CODE_NAMES.CAN_NOT_RESET_PASSWORD, [forWhom]);
}

function permissionDenied(permissionCode) {
    return getMessage(CODE_NAMES.PERMISSION_DENIED, [permissionCode]);
}

function accessDenied(reason) {
    return getMessage(CODE_NAMES.ACCESS_DENIED, [reason]);
}

function accessToDbDataFailed(collectionName) {
    return getMessage(CODE_NAMES.ACCESS_TO_DB_DATA_FAILED, [collectionName]);
}

function dbError(errorMessage) {
    return getMessage(CODE_NAMES.DB_ERROR, [errorMessage]);
}

function objectDoesntComplyDataSchema(obj, dataSchemaName) {
    return getMessage(CODE_NAMES.OBJECT_DOES_NOT_COMPLY_TO_DATA_SCHEMA, [
        obj,
        dataSchemaName
    ]);
}

function canNotDeleteObjectBecauseItIsActive(obj, collectionName) {
    return getMessage(CODE_NAMES.CAN_NOT_DELETE_OBJECT_BECAUSE_IT_IS_ACTIVE, [
        obj,
        collectionName
    ]);
}

function externalCostsWorkflowError(message) {
    return getMessage(CODE_NAMES.EXTERNAL_COSTS_WORKFLOW_ERROR, [message]);
}

function dataValidationError(collectionName, message) {
    return getMessage(CODE_NAMES.DATA_VALIDATION_ERROR, [
        collectionName,
        message
    ]);
}

module.exports = {
    CODE_NAMES: CODE_NAMES,
    OK: OK,
    argumentShouldNotBeEmpty: argumentShouldNotBeEmpty,
    userWithThisEmailAlreadyExists: userWithThisEmailAlreadyExists,
    newObjectAdded: newObjectAdded,
    argumentShouldHaveAnotherType: argumentShouldHaveAnotherType,
    objectNotFound: objectNotFound,
    authenticationFailed: authenticationFailed,
    sendingEmailFailed: sendingEmailFailed,
    newObjectAddingError: newObjectAddingError,
    tokenIsNotValid: tokenIsNotValid,
    tokenIsExpired: tokenIsExpired,
    tokenIsNotProvided: tokenIsNotProvided,
    cannotResetPassword: cannotResetPassword,
    permissionDenied: permissionDenied,
    accessDenied: accessDenied,
    accessToDbDataFailed: accessToDbDataFailed,
    dbError: dbError,
    objectDoesntComplyDataSchema: objectDoesntComplyDataSchema,
    canNotDeleteObjectBecauseItIsActive: canNotDeleteObjectBecauseItIsActive,
    externalCostsWorkflowError: externalCostsWorkflowError,
    dataValidationError: dataValidationError
};
