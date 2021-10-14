const http = require('http')
const fs = require('fs')
const url = require('url')
const { listado, insertar, eliminar, mostrar, editar } = require('./consultas')

http.createServer(async(req, res) => {

    if (req.url == '/' && req.method == 'GET') {
        res.setHeader('content-type', 'text/html')
        res.end(fs.readFileSync('./public/index.html', 'utf8'))
    }

    if (req.url == '/script' && req.method == 'GET') {
        res.setHeader('content-type', 'text/javascript')
        res.end(fs.readFileSync('./public/js/script.js', 'utf8'))
    }

    // Insertar registros
    if (req.url == '/bootcamps' && req.method == 'POST') {
        let body = ''
        req.on("data", (datos) => {
            body += datos
        })

        req.on("end", async() => {
            const formulario = Object.values(JSON.parse(body))
            const resultado = await insertar(formulario)
            res.end(JSON.stringify(resultado))
        })
    }

    // Editar
    if (req.url == '/bootcamps' && req.method == 'PUT') {
        let body = ''
        req.on("data", (datos) => {
            body += datos
        })

        req.on("end", async() => {
            const formulario = Object.values(JSON.parse(body))
            const resultado = await editar(formulario)
            res.end(JSON.stringify(resultado))
        })
    }

    // Eliminar
    if (req.url.startsWith('/bootcamps') && req.method == 'DELETE') {
        const { id } = url.parse(req.url, true).query
        const resultado = await eliminar(id)
        res.end(JSON.stringify(resultado))
    }

    // Mostrar listado
    if (req.url.startsWith('/bootcamps') && req.method == 'GET') {
        res.setHeader('content-type', 'application/json')
        const resultado = await listado()
        res.end(JSON.stringify(resultado.rows))
    }

    // Editar Sleccionado
    if (req.url.startsWith('/editar') && req.method == 'GET') {
        const { id } = url.parse(req.url, true).query
        res.setHeader('content-type', 'application/json')
        const resultado = await mostrar(id)
        res.end(JSON.stringify(resultado.rows))
    }



}).listen(3000, () => console.log("Ejecutando http://localhost:3000"))