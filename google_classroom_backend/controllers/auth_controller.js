const authDB = require('../databases/mysql_databases/auth_database');
const userDB = require('../databases/mysql_databases/user_database');

async function control(request, response, requestBody, queryParams, headers) {
    const data = requestBody ? JSON.parse(requestBody) : {};
    const token = headers['authorization'] ? headers['authorization'].split(' ')[1] : null;

    let result = {};

    if (request.method === 'POST' && request.url.includes('/auth/login')) {
        console.log(`Rodando login`);
        const user = await userDB.verifyCredentials(data.email, data.password);
        result = await authDB.login(user);
    
    } else if (request.method === 'DELETE' && request.url.includes('/auth/logout')) {
        console.log(`Rodando logout`);
        result = await authDB.logout(token);
    
    } else if (request.method === 'GET' && request.url.includes('/auth/checkToken')) {
        console.log(`Rodando checkToken`);
        result = await authDB.checkToken(token);
    
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
