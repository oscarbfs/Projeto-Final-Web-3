let warnings = [];
let warningIdCounter = 1;

function createWarning(warningData) {
    if (warningData.token) {
        const userEmail = authDB.getEmailByToken(warningData.token);

        if (userEmail) {
            delete warningData.token;
            warningData.id = warningIdCounter++;
            warningData.userEmail = userEmail;
            warnings.push(warningData);
            return { responseData: warningData, status: 201 };
        } else {
            return { responseData: { error: 'Token inválido' }, status: 401 };
        }
    } else {
        return { responseData: { error: 'Token ausente' }, status: 400 };
    }
}

function getWarningsByClass(classId, token) {
    if (token) {
        const userEmail = authDB.getEmailByToken(token);

        if (userEmail) {
            const classWarnings = warnings.filter(warning => warning.classId === classId);
            return { responseData: classWarnings, status: 200 };
        } else {
            return { responseData: { error: 'Token inválido' }, status: 401 };
        }
    } else {
        return { responseData: { error: 'Token ausente' }, status: 400 };
    }
}

// Outros métodos conforme necessário...

module.exports = {
    createWarning,
    getWarningsByClass,
    // Outros métodos...
};
