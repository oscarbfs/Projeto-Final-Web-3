const activitysDB = require('../databases/mysql_databases/activity_database');
const authDB = require('../databases/mysql_databases/auth_database');
const classDB = require('../databases/mysql_databases/class_database');

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
    } else if (request.method === 'GET' && request.url.includes('/activitys/getClassActivityes')) {
        console.log(`Rodando getClassActivityes`);
        const isCreator = await classDB.isCreator(queryParams.class_id, tokenData.user_id);
        result = isCreator === true || isCreator === false
            ? await activitysDB.getClassActivityes(queryParams.class_id)
            : {
                responseData: { error: "Somente os participantes da turma podem visualizar as atividades" },
                status: 400
            };
    } else if (request.method === 'POST' && request.url.includes('/activitys/createActivity')) {
        console.log(`Rodando createActivity`);
        const isCreator = await classDB.isCreator(data.class_id, tokenData.user_id);
        result = isCreator 
            ? await activitysDB.createActivity(data, tokenData.user_id) 
            : {
                responseData: { error: "Somente o criador da turma pode criar atividades" },
                status: 400
            };
    } else if (request.method === 'POST' && request.url.includes('/activitys/updateResponse')) {
        console.log(`Rodando editResponseInActivity`);
        result = await activitysDB.editResponseInActivity(data, tokenData.user_id);
    } else if (request.method === 'POST' && request.url.includes('/activitys/addResponse')) {
        console.log(`Rodando addResponseToActivity`);
        result = await activitysDB.addResponseToActivity(data, tokenData.user_id);
    } else if (request.method === 'PUT' && request.url.includes('/activitys/updateActivity')) {
        console.log(`Rodando updateActivity`);
        result = await activitysDB.updateActivity(data, tokenData.user_id);
    } else if (request.method === 'DELETE' && request.url.includes('/activitys/deleteActivity')) {
        console.log(`Rodando deleteActivity`);
        result = await activitysDB.deleteActivity(data, tokenData.user_id);
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
