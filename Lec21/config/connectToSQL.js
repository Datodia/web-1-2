
const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
}).promise()

const getAllProducts = async () =>{
    const [result] = await pool.query('SELECT * FROM products')
    return result
}

const getProductById = async (id) => {
    const [result] = await pool.query(`
        SELECT * FROM products
        WHERE id = ?
    `, [id])

    return result[0]
}

const createProduct = async (name, price, available) => {
    const [result] = await pool.query(`
        INSERT INTO products (name, price, available)
        VALUES (?, ?, ?)
    `, [name, price, available])

    const insertedData = await getProductById(result.insertId)

    return insertedData
}

module.exports = {getAllProducts, getProductById, createProduct}
