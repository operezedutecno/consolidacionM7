const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'pgnode',
    host: 'localhost',
    port: 5432
})

let listado = async() => {
    try {
        let resultado = await pool.query("SELECT * FROM bootcamps")
        return resultado    
    } catch (error) {
        console.log(error.code)
        return error
    }
}

module.exports = { listado }

