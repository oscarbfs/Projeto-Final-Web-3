let classes = [];

function createClass(response, requestBody) {
    const newClass = JSON.parse(requestBody);
    classes.push(newClass);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newClass));
}

function getClasses(response, queryParams) {
    if (queryParams.id) {
      const classId = queryParams.id;
      const foundClass = classes.find(c => c.id === classId);
  
      if (foundClass) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(foundClass));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Turma não encontrada' }));
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(classes));
    }
}

function updateClass(response, requestBody) {
    const updatedClass = JSON.parse(requestBody);
    const classId = updatedClass.id;
    const index = classes.findIndex(c => c.id === classId);
  
    if (index !== -1) {
      classes[index] = { ...classes[index], ...updatedClass };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(classes[index]));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Turma não encontrada' }));
    }
}

function deleteClass(response, requestBody) {
    const params = JSON.parse(requestBody);
  
    if (params.id) {
      const classId = params.id;
      const index = classes.findIndex(c => c.id === classId);
  
      if (index !== -1) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Turma deletada' }));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Turma não encontrada' }));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Parâmetro de ID ausente ou inválido no corpo da solicitação' }));
    }
}
  
  function control(request, response, requestBody, pathname, queryParams) {
    if (request.method === 'POST') {
      createClass(response, requestBody);
      console.log(`Rodando createClass`);
    
    } else if (request.method === 'GET') {
      getClasses(response, queryParams);
      console.log(`Rodando getClasses`);
    
    } else if (request.method === 'PUT') {
      updateClass(response, requestBody);
      console.log(`Rodando updateClass`);
    
    } else if (request.method === 'DELETE') {
      deleteClass(response, requestBody);
      console.log(`Rodando deleteClass`);
    
    }
  }

module.exports = {
    createClass,
    getClasses,
    updateClass,
    deleteClass,
    control,
  };