const authDB = require('../databases/local_databases/auth_database');

const userDB = require('../databases/local_databases/user_database');

function login(response, requestBody) {
    const credentials = JSON.parse(requestBody);
    
    const isValid = userDB.verifyCredentials(credentials.email, credentials.password);
    credentials.isValid = isValid;

    const result = authDB.login(credentials);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function logout(response, requestBody) {
    const credentialToken = JSON.parse(requestBody);

    const result = authDB.logout(credentialToken);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function checkToken(response, requestBody) {
    const credentialToken = JSON.parse(requestBody);

    const result = authDB.checkToken(credentialToken);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function control(request, response, requestBody) {
    if (request.method === 'POST' && request.url.includes('/auth/login')) {
        console.log(`Rodando login`);
        login(response, requestBody);
    } else if (request.method === 'DELETE' && request.url.includes('/auth/logout')) {
        console.log(`Rodando logout`);
        logout(response, requestBody);
    } else if (request.method === 'GET' && request.url.includes('/auth/checkToken')) {
        console.log(`Rodando checkToken`);
        checkToken(response, requestBody);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not Found' }));
    }
}

module.exports = {
    control,
};
