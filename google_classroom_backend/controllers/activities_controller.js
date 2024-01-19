const activitysDB = require('../databases/local_databases/activity_database');
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
    } else if (request.method === 'GET' && request.url.includes('/activitys/getClassActivityes')) {
        console.log(`Rodando getClassActivityes`);
        result = activitysDB.getClassActivityes(queryParams.class_id);
    } else if (request.method === 'POST' && request.url.includes('/activitys/createActivity')) {
        console.log(`Rodando createActivity`);
        result = activitysDB.createActivity(data, tokenData.user_id);
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
