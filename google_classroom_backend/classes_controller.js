let classes = [
    {
        "id": "1",
        "name": "Turma 1",
    }
];

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
        response.end(JSON.stringify({ error: 'Class not found' }));
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
      response.end(JSON.stringify({ error: 'Class not found' }));
    }
}

function deleteClass(response, requestBody) {
    const params = JSON.parse(requestBody);
  
    if (params.id) {
      const classId = params.id;
      const index = classes.findIndex(c => c.id === classId);
  
      if (index !== -1) {
        const deletedClass = classes.splice(index, 1);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(deletedClass[0]));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Class not found' }));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Missing or invalid ID parameter in the request body' }));
    }
}
  
  function control(request, response, requestBody, pathname, queryParams) {
    console.log(pathname);
    if (request.method === 'POST') {
      createClass(response, requestBody);
      console.log(`Ta rolando um createClass`);
    
    } else if (request.method === 'GET') {
      getClasses(response, queryParams);
      console.log(`Ta rolando um getClasses`);
    
    } else if (request.method === 'PUT') {
      updateClass(response, requestBody);
      console.log(`Ta rolando um updateClass`);
    
    } else if (request.method === 'DELETE') {
      deleteClass(response, requestBody);
      console.log(`Ta rolando um deleteClass`);
    
    }
  }

module.exports = {
    createClass,
    getClasses,
    updateClass,
    deleteClass,
    control,
  };