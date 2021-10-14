const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'Link64cl',
    database: 'pgnode1',
    host: 'localhost',
    port: 5432
})

// Insertamos los datos en la base de datos
let insertar = async(datos) => {
    const consultaJson = {
        text: `
            INSERT INTO bootcamps (nombre, duracion, turno)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        values: datos
    }

    try {
        const resultado = await pool.query(consultaJson)
        return resultado
    } catch (err) {
        return err
    }
}

let editar = async(datos) => {
    let consultaJson = {
        text: `
            UPDATE bootcamps SET nombre = $2, duracion = $3, turno = $4
            WHERE id = $1
            RETURNING *
        `,
        values: datos
    }

    try {
        const resultado = await pool.query(consultaJson)
        return resultado
    } catch (err) {
        console.log(err)
        return err
    }
}

let eliminar = async(id) => {
    let consultaJson = {
        text: `DELETE FROM bootcamps WHERE id = $1`,
        values: [id]
    }

    try {
        const resultado = await pool.query(consultaJson)
        return resultado
    } catch (err) {
        return err
    }
}

let mostrar = async(id) => {
    let consultaJson = {
        text: `SELECT * FROM bootcamps WHERE id = $1`,
        values: [id]
    }
    try {
        let resultado = await pool.query(consultaJson)
        return resultado
    } catch (error) {
        console.log(error)
        return error
    }
}

let listado = async() => {
    try {
        let resultado = await pool.query("SELECT * FROM bootcamps")
        return resultado
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { listado, insertar, eliminar, mostrar, editar }