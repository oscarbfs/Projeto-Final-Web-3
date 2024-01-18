const warningsDB = require('../databases/local_databases/warning_database');
const authDB = require('../databases/local_databases/auth_database');

function control(request, response, requestBody, queryParams) {
    const data = requestBody ? JSON.parse(requestBody) : {};
    const tokenData = authDB.getTokenData(data.token);

    let result = {};

    if (!tokenData.isValid) {
        result = {
            responseData: { error: "Token inválido" },
            status: 400
        };

    } else if (request.method === 'GET' && request.url.includes('/warnings/getClassWarnings')) {
        console.log(`Rodando getClassWarnings`);
        result = warningsDB.getClassWarnings(queryParams.class_id);

    } else if (request.method === 'POST' && request.url.includes('/warnings/createWarning')) {
        console.log(`Rodando createWarning`);
        result = warningsDB.createWarning(data, tokenData.user_id);

    } else if (request.method === 'PUT' && request.url.includes('/warnings/updateWarning')) {
        console.log(`Rodando updateWarning`);
        result = warningsDB.updateWarning(data, tokenData.user_id);

    } else if (request.method === 'DELETE' && request.url.includes('/warnings/deleteWarning')) {
        console.log(`Rodando deleteWarning`);
        result = warningsDB.deleteWarning(data, tokenData.user_id);

    } else {
        result = {
            responseData: { error: "Rota não encontrada" },
            status: 404
        };
    }

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

module.exports = {
    control,
};
