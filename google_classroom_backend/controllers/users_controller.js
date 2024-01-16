const userDB = require('../databases/local_databases/user_database');
const authDB = require('../databases/local_databases/auth_database');
const classDB = require('../databases/local_databases/class_database');

function control(request, response, requestBody, queryParams) {
    const data = JSON.parse(requestBody);
    const tokenData = authDB.getTokenData(data.token);

    const result = {};

    if (request.method === 'POST' && request.url.includes('/useres/createUser')) {
        console.log(`Rodando createUser`);
        result = userDB.createUser(data);
    
    } else if( !tokenData.isValid ) {
        result = { 
            responseData: { error: "Token inválido" },
            status: 400
        }
    
    } else if (request.method === 'GET' && request.url.includes('/useres/searchUsers')) {
        console.log(`Rodando searchUsers`);
        result = userDB.searchUsers(queryParams.name, queryParams.discipline);
    
    } else if (request.method === 'GET' && request.url.includes('/useres/getUser')) {
        console.log(`Rodando getUser`);
        result = userDB.getUser(queryParams.id);
    
    } else if (request.method === 'GET' && request.url.includes('/useres/getClassUsers')) {
        console.log(`Rodando getClassUsers`);
        const { creatorId, membersIds } = classDB.getClass(queryParams.class_id).responseData;
        result = userDB.getClassUsers(creatorId, membersIds);
    
    } else if (request.method === 'PUT' && request.url.includes('/useres/updateUser')) {
        console.log(`Rodando updateUser`);
        result = userDB.updateUser(data, tokenData.user_id);
    
    } else if (request.method === 'DELETE' && request.url.includes('/useres/deleteUser')) {
        console.log(`Rodando deleteUser`);
        result = userDB.deleteUser(data, tokenData.user_id);
    
    } else {
        result = { 
            responseData: { error: "Rota não encontrada" },
            status: 404
        }
    }

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

module.exports = {
    control,
};
