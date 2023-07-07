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

// Middleware personalizado para tratamento de erros
server.use((err, req, res, next) => {
  // Verifica se o erro é uma instância de SyntaxError (erro de análise JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Erro na solicitação' });
  } else {
    // Outros erros não tratados
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
