let warnings = [];

function createWarning(response, requestBody) {
    const newWarning = JSON.parse(requestBody);
    warnings.push(newWarning);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newWarning));
}

function getWarninges(response, queryParams) {
    if (queryParams.id) {
      const warningId = queryParams.id;
      const foundWarning = warnings.find(c => c.id === warningId);
  
      if (foundWarning) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(foundWarning));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Aviso não encontrado' }));
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(warnings));
    }
}

function updateWarning(response, requestBody) {
    const updatedWarning = JSON.parse(requestBody);
    const warningId = updatedWarning.id;
    const index = warnings.findIndex(c => c.id === warningId);
  
    if (index !== -1) {
      warnings[index] = { ...warnings[index], ...updatedWarning };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(warnings[index]));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Aviso não encontrado' }));
    }
}

function deleteWarning(response, requestBody) {
    const params = JSON.parse(requestBody);
  
    if (params.id) {
      const warningId = params.id;
      const index = warnings.findIndex(c => c.id === warningId);
  
      if (index !== -1) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Aviso deletada' }));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Aviso não encontrado' }));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Parâmetro de ID ausente ou inválido no corpo da solicitação' }));
    }
}
  
  function control(request, response, requestBody, queryParams) {
    if (request.method === 'POST') {
      createWarning(response, requestBody);
      console.log(`Rodando createWarning`);
    
    } else if (request.method === 'GET') {
      getWarninges(response, queryParams);
      console.log(`Rodando getWarninges`);
    
    } else if (request.method === 'PUT') {
      updateWarning(response, requestBody);
      console.log(`Rodando updateWarning`);
    
    } else if (request.method === 'DELETE') {
      deleteWarning(response, requestBody);
      console.log(`Rodando deleteWarning`);
    
    }
  }

module.exports = {
    createWarning,
    getWarninges,
    updateWarning,
    deleteWarning,
    control,
  };