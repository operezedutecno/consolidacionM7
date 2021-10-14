const http = require('http')
const fs = require('fs')
const url = require('url')

const { agregar,
    obtener,
    editar,
    borrar } = require('./consultas')

http.createServer(async (req, res) =>{
    if (req.url == "/") {
        const html = fs.readFileSync('./public/index.html', 'utf-8')
        res.setHeader('content-type', 'text/html')
        res.end(html)
    }

    if (req.url.startsWith("/turno") && req.method == "POST") {
        let body = ""
        req.on("data", (datos) => {
            body += datos
        })
        req.on("end", async () => {
            // console.log(JSON.parse(body))
            await agregar(Object.values(JSON.parse(body)))
            res.end()
        })
    }
    if (req.url.startsWith("/turno") && req.method == 'GET') {
        const turno = await obtener()
        res.setHeader('content-type', 'application/json')
        // console.log(turno.rows)
        res.end(JSON.stringify(turno.rows))
       
    }

    if (req.url.startsWith("/turno") && req.method == 'PUT') {
        let body = ""
        req.on("data", (datos) => {
            body += datos
        })
        req.on("end",async () => {
            const datosEditar = Object.values(JSON.parse(body))
            console.log(datosEditar)
            const respuesta = await editar(datosEditar)
            res.end(JSON.stringify(respuesta))
        })
    }
    if (req.url.startsWith("/turno") && req.method == 'DELETE') {
        const id = url.parse(req.url, true).query.id
        await borrar(id)
        console.log(id)
        res.end()
    }


}).listen(3000, () => console.log("Ejecutando http://localhost:3000"))