const http = require('http')
const { listado } = require('./consultas')

http.createServer(async (req, res) =>{

    if(req.url.startsWith('/bootcamps') && req.method == 'GET'){
        res.setHeader('content-type','application/json')
        const resultado = await listado()
        res.end(JSON.stringify(resultado.rows))
    }

}).listen(3000, () => console.log("Ejecutando http://localhost:3000"))