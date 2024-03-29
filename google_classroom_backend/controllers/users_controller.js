const userDB = require('../databases/mysql_databases/user_database');
const authDB = require('../databases/mysql_databases/auth_database');
const classDB = require('../databases/mysql_databases/class_database');

async function control(request, response, requestBody, queryParams, headers) {
    const data = requestBody ? JSON.parse(requestBody) : {};
    const token = headers['authorization'] ? headers['authorization'].split(' ')[1] : null;
    const tokenData = await authDB.getTokenData(token);

    let result = {};

    if (request.method === 'POST' && request.url.includes('/users/createUser')) {
        console.log(`Rodando createUser`);
        result = await userDB.createUser(data);
    
    } else if( !tokenData.isValid ) {
        result = { 
            responseData: { error: "Token inválido" },
            status: 400
        }
    
    } else if (request.method === 'GET' && request.url.includes('/users/searchUsers')) {
        console.log(`Rodando searchUsers`);
        result = await userDB.searchUsers(queryParams.name, queryParams.email);
    
    } else if (request.method === 'GET' && request.url.includes('/users/getUser')) {
        console.log(`Rodando getUser`);
        result = await userDB.getUser(queryParams.id);
    
    } else if (request.method === 'GET' && request.url.includes('/users/getClassUsers')) {
        console.log(`Rodando getClassUsers`);
        const { creator_id, members_ids } = await classDB.getClass(queryParams.class_id).responseData;
        result = await userDB.getClassUsers(creator_id, members_ids);
    
    } else if (request.method === 'PUT' && request.url.includes('/users/updateUser')) {
        console.log(`Rodando updateUser`);
        result = await userDB.updateUser(data, tokenData.user_id);
    
    } else if (request.method === 'DELETE' && request.url.includes('/users/deleteUser')) {
        console.log(`Rodando deleteUser`);
        await authDB.logout(data.token)
        result = await userDB.deleteUser(tokenData.user_id);
    
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
