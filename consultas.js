const {
    Pool
} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123123123',
    server: "localhost",
    port: 5432,
})

const agregar = async (datos) => {
    pool.connect(async (e, cliente, release) => {
        const consulta = {
            text: `INSERT INTO bootcamps(nombre, duracion, turno)
        VALUES($1, $2, $3) RETURNING *`,
            values: datos
        }

        try {
            const resultado = await cliente.query(consulta)
            return resultado
        } catch (error) {
            console.log(error)
        }
        release()
    })
}


const obtener = () => {
    return new Promise((res, req) => { 
        pool.connect(async (e, cliente, release) => {
        const resultado = await cliente.query("SELECT * FROM bootcamps")
        release()
        res(resultado);
       
    })})
   
    

}

const editar = (datos) => {
    pool.connect(async (e, cliente, release) => {

        const consulta = {
            text: `UPDATE bootcamps SET nombre = $1,  duracion = $2, turno = $3 WHERE id=$4 RETURNING *;`,
            values: Object.values(datos)
        }
        try {
            const resultado = await cliente.query(consulta)
            console.log("registro Actualizado")
            return resultado
        } catch (error) {
            console.log(error)
        }
        release()

    })
}

const borrar = async (id) => {
    pool.connect(async (e, cliente, release) => {
        let consulta = {
            text: `DELETE FROM bootcamps WHERE id = $1 RETURNING *`,
            values: [id]
        }
        try {
            const resultado = await cliente.query(consulta)
            return resultado
        } catch (error) {
            console.log(error)
        }
        release()

    })

}
module.exports = {
    agregar,
    obtener,
    editar,
    borrar
}