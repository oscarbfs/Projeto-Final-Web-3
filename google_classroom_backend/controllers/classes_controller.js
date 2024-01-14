const classDB = require('../databases/local_databases/class_database');
const authDB = require('../databases/local_databases/auth_database');

function createClass(response, requestBody) {
    const classData = JSON.parse(requestBody);
    const userEmail = authDB.getEmailByToken(classData.token);
    classData.creator = userEmail;

    const result = classDB.createClass(classData);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function getClass(response, queryParams) {
    const result = classDB.getClass(queryParams.id);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function searchClasses(response, queryParams) {
    const result = classDB.searchClasses(queryParams.name, queryParams.discipline);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function getUserClasses(response, requestBody) {
    const userData = JSON.parse(requestBody);
    const userEmail = authDB.getEmailByToken(userData.token);
    userData.email = userEmail;

    const result = classDB.getUserClasses(userData);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function updateClass(response, requestBody) {
    const classData = JSON.parse(requestBody);
    const tokenIsValid = authDB.checkToken(classData.token);
    classData.tokenIsValid = tokenIsValid;

    const result = classDB.updateClass(classData);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function deleteClass(response, requestBody) {
    const classData = JSON.parse(requestBody);
    const tokenIsValid = authDB.checkToken(classData.token);
    classData.tokenIsValid = tokenIsValid;

    const result = classDB.deleteClass(classData);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function joinClass(response, requestBody) {
    const joinData = JSON.parse(requestBody);
    joinData.member  = authDB.getEmailByToken(joinData.token);

    const result = classDB.joinClass(joinData);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function control(request, response, requestBody, queryParams) {
    if (request.method === 'GET' && request.url.includes('/classes/searchClasses')) {
        console.log(`Rodando searchClasses`);
        searchClasses(response, queryParams);
    } else if (request.method === 'GET' && request.url.includes('/classes/getClass')) {
        console.log(`Rodando getClass`);
        getClass(response, queryParams);
    } else if (request.method === 'GET' && request.url.includes('/classes/getUserClasses')) {
        console.log(`Rodando getUserClasses`);
        getUserClasses(response, requestBody);
    } else if (request.method === 'POST' && request.url.includes('/classes/createClass')) {
        console.log(`Rodando createClass`);
        createClass(response, requestBody);
    } else if (request.method === 'POST' && request.url.includes('/classes/joinClass')) {
        console.log(`Rodando joinClass`);
        joinClass(response, requestBody);
    } else if (request.method === 'PUT' && request.url.includes('/classes/updateClass')) {
        console.log(`Rodando updateClass`);
        updateClass(response, requestBody);
    } else if (request.method === 'DELETE' && request.url.includes('/classes/deleteClass')) {
        console.log(`Rodando deleteClass`);
        deleteClass(response, requestBody);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not Found' }));
    }
}

module.exports = {
    control,
};
