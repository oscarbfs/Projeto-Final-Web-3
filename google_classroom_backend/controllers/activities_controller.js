const activitysDB = require('../databases/local_databases/activity_database');
const authDB = require('../databases/local_databases/auth_database');
const classDB = require('../databases/local_databases/class_database');

function control(request, response, requestBody, queryParams, headers) {
    const data = requestBody ? JSON.parse(requestBody) : {};
    const token = headers['authorization'] ? headers['authorization'].split(' ')[1] : null;
    const tokenData = authDB.getTokenData(token);

    let result = {};

    if (!tokenData.isValid) {
        result = {
            responseData: { error: "Token inválido" },
            status: 400
        };
    } else if (request.method === 'GET' && request.url.includes('/activitys/getClassActivityes')) {
        console.log(`Rodando getClassActivityes`);
        const isCreator = classDB.isCreator(queryParams.class_id, tokenData.user_id);
        result = isCreator === true || isCreator === false
            ? activitysDB.getClassActivityes(queryParams.class_id)
            : {
                responseData: { error: "Somente os participantes da turma podem visualizar as atividades" },
                status: 400
            };
    } else if (request.method === 'POST' && request.url.includes('/activitys/createActivity')) {
        console.log(`Rodando createActivity`);
        const isCreator = classDB.isCreator(data.class_id, tokenData.user_id);
        result = isCreator 
            ? activitysDB.createActivity(data, tokenData.user_id) 
            : {
                responseData: { error: "Somente o criador da turma pode criar atividades" },
                status: 400
            };
    } else if (request.method === 'POST' && request.url.includes('/activitys/updateResponse')) {
        console.log(`Rodando editResponseInActivity`);
        result = activitysDB.editResponseInActivity(data, tokenData.user_id);
    } else if (request.method === 'POST' && request.url.includes('/activitys/addResponse')) {
        console.log(`Rodando addResponseToActivity`);
        result = activitysDB.addResponseToActivity(data, tokenData.user_id);
    } else if (request.method === 'PUT' && request.url.includes('/activitys/updateActivity')) {
        console.log(`Rodando updateActivity`);
        result = activitysDB.updateActivity(data, tokenData.user_id);
    } else if (request.method === 'DELETE' && request.url.includes('/activitys/deleteActivity')) {
        console.log(`Rodando deleteActivity`);
        result = activitysDB.deleteActivity(data, tokenData.user_id);
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
