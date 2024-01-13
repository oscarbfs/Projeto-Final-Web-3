let users = [];

function createUser(response, requestBody) {
    const newUser = JSON.parse(requestBody);
    users.push(newUser);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newUser));
}

function getUsers(response, queryParams) {
    if (queryParams.id) {
      const classId = queryParams.id;
      const foundUser = users.find(c => c.id === classId);
  
      if (foundUser) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(foundUser));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Usuário não encontrado' }));
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(users));
    }
}

function updateUser(response, requestBody) {
    const updatedUser = JSON.parse(requestBody);
    const classId = updatedUser.id;
    const index = users.findIndex(c => c.id === classId);
  
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(users[index]));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Usuário não encontrado' }));
    }
}

function deleteUser(response, requestBody) {
    const params = JSON.parse(requestBody);
  
    if (params.id) {
      const classId = params.id;
      const index = users.findIndex(c => c.id === classId);
  
      if (index !== -1) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Usuário deletada' }));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Usuário não encontrado' }));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Parâmetro de ID ausente ou inválido no corpo da solicitação' }));
    }
}
  
  function control(request, response, requestBody, pathname, queryParams) {
    if (request.method === 'POST') {
      createUser(response, requestBody);
      console.log(`Rodando createUser`);
    
    } else if (request.method === 'GET') {
      getUsers(response, queryParams);
      console.log(`Rodando getUsers`);
    
    } else if (request.method === 'PUT') {
      updateUser(response, requestBody);
      console.log(`Rodando updateUser`);
    
    } else if (request.method === 'DELETE') {
      deleteUser(response, requestBody);
      console.log(`Rodando deleteUser`);
    
    }
  }

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    control,
  };