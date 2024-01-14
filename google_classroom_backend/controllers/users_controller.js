const userDB = require('../databases/local_databases/user_database');

function createUser(response, requestBody) {
    const newUser = JSON.parse(requestBody);

    const result = userDB.createUser(newUser);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function getUser(response, queryParams) {
    const result = userDB.getUser(queryParams.id);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function searchUsers(response, queryParams) {
    const result = userDB.searchUsers(queryParams.name, queryParams.email);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
  }
  
  function updateUser(response, requestBody) {
    const updatedUser = JSON.parse(requestBody);
    
    const result = userDB.updateUser(updatedUser);
    
    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function deleteUser(response, requestBody) {
    const deletedUser = JSON.parse(requestBody);

    const result = userDB.deleteUser(deletedUser);

    response.writeHead(result.status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result.responseData));
}

function control(request, response, requestBody, queryParams) {
    if (request.method === 'POST' && request.url.includes('/users/createUser')) {
        console.log(`Rodando createUser`);
        createUser(response, requestBody);
    } else if (request.method === 'GET' && request.url.includes('/users/getUser')) {
        console.log(`Rodando getUser`);
        getUser(response, queryParams);
    } else if (request.method === 'GET' && request.url.includes('/users/searchUsers')) {
        console.log(`Rodando searchUsers`);
        searchUsers(response, queryParams);
    } else if (request.method === 'PUT' && request.url.includes('/users/updateUser')) {
        console.log(`Rodando updateUser`);
        updateUser(response, requestBody);
    } else if (request.method === 'DELETE' && request.url.includes('/users/deleteUser')) {
        console.log(`Rodando deleteUser`);
        deleteUser(response, requestBody);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not Found' }));
    }
}

module.exports = {
    control,
};
