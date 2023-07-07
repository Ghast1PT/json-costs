const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // Adiciona suporte para parsear o corpo da solicitação

// Custom middleware para permitir solicitações PATCH
server.use((req, res, next) => {
  if (req.method === 'PATCH') {
    req.method = 'PUT'; // Altera o método PATCH para PUT
  }
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
