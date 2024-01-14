let activities = [];

function createActivity(response, requestBody) {
    const newActivity = JSON.parse(requestBody);
    activities.push(newActivity);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newActivity));
}

function getActivityes(response, queryParams) {
    if (queryParams.id) {
      const activityId = queryParams.id;
      const foundActivity = activities.find(c => c.id === activityId);
  
      if (foundActivity) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(foundActivity));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Atividade não encontrada' }));
      }
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(activities));
    }
}

function updateActivity(response, requestBody) {
    const updatedActivity = JSON.parse(requestBody);
    const activityId = updatedActivity.id;
    const index = activities.findIndex(c => c.id === activityId);
  
    if (index !== -1) {
      activities[index] = { ...activities[index], ...updatedActivity };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(activities[index]));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Atividade não encontrada' }));
    }
}

function deleteActivity(response, requestBody) {
    const params = JSON.parse(requestBody);
  
    if (params.id) {
      const activityId = params.id;
      const index = activities.findIndex(c => c.id === activityId);
  
      if (index !== -1) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Atividade deletada' }));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Atividade não encontrada' }));
      }
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Parâmetro de ID ausente ou inválido no corpo da solicitação' }));
    }
}
  
  function control(request, response, requestBody, queryParams) {
    if (request.method === 'POST') {
      createActivity(response, requestBody);
      console.log(`Rodando createActivity`);
    
    } else if (request.method === 'GET') {
      getActivityes(response, queryParams);
      console.log(`Rodando getActivityes`);
    
    } else if (request.method === 'PUT') {
      updateActivity(response, requestBody);
      console.log(`Rodando updateActivity`);
    
    } else if (request.method === 'DELETE') {
      deleteActivity(response, requestBody);
      console.log(`Rodando deleteActivity`);
    
    }
  }

module.exports = {
    createActivity,
    getActivityes,
    updateActivity,
    deleteActivity,
    control,
  };