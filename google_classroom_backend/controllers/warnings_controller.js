const warningsDB = require('../databases/local_databases/warning_database');
const authDB = require('../databases/local_databases/auth_database');
const classDB = require('../databases/local_databases/class_database');

async function control(request, response, requestBody, queryParams, headers) {
    const data = requestBody ? JSON.parse(requestBody) : {};
    const token = headers['authorization'] ? headers['authorization'].split(' ')[1] : null;
    const tokenData = await authDB.getTokenData(token);

    let result = {};

    if (!tokenData.isValid) {
        result = {
            responseData: { error: "Token inválido" },
            status: 400
        };

    } else if (request.method === 'GET' && request.url.includes('/warnings/getClassWarnings')) {
        console.log(`Rodando getClassWarnings`);
        const isCreator = await classDB.isCreator(queryParams.class_id, tokenData.user_id);
        result = isCreator === true || isCreator === false
            ? await warningsDB.getClassWarnings(queryParams.class_id)
            : {
                responseData: { error: "Somente os participantes da turma podem visualizar os avisos" },
                status: 400
            };

    } else if (request.method === 'POST' && request.url.includes('/warnings/createWarning')) {
        console.log(`Rodando createWarning`);
        const isCreator = await classDB.isCreator(data.class_id, tokenData.user_id);
        result = isCreator === true || isCreator == false 
            ? await warningsDB.createWarning(data, tokenData.user_id)
            : {
                responseData: { error: isCreator === null 
                    ? "Somente participantes da turma podem criar avisos" 
                    : "ID da turma não encontrada"
                },
                status: 400
            };

    } else if (request.method === 'PUT' && request.url.includes('/warnings/updateWarning')) {
        console.log(`Rodando updateWarning`);
        result = await warningsDB.updateWarning(data, tokenData.user_id);

    } else if (request.method === 'DELETE' && request.url.includes('/warnings/deleteWarning')) {
        console.log(`Rodando deleteWarning`);
        result = await warningsDB.deleteWarning(data, tokenData.user_id);

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
