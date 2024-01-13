const http = require('http');
const url = require('url');
const classController = require('./controllers/classes_controller');
const activityController = require('./controllers/activities_controller');
const userController = require('./controllers/users_controller');
const warningController = require('./controllers/warnings_controller');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;
  
    let requestBody = '';
  
    request.on('data', (chunk) => {
      requestBody += chunk.toString();
    });
  
    request.on('end', () => {
        if (pathname.includes('/classes')) {
            classController.control(request, response, requestBody, pathname, parsedUrl.query);
        
        } else if (pathname.includes('/activities')) {
            activityController.control(request, response, requestBody, pathname, parsedUrl.query);
      
        } else if (pathname.includes('/users')) {
            userController.control(request, response, requestBody, pathname, parsedUrl.query);
      
        } else if (pathname.includes('/warnings')) {
            warningController.control(request, response, requestBody, pathname, parsedUrl.query);
      
        } else if (pathname === '/') {
            response.writeHead(200);
            response.end('Bem-vindo ao backend do Projeto Final WEB 3 de Oscar Borges, aplicação de referência é Google Classroom' );
        
        } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Not Found' }));
        }
    });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
