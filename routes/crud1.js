// const express = require('express');
// const router = express.Router();
// const db = require('../dbConnection');
// const { connect } = require('./crud');



// module.exports = {
//     getData : async(req, res) => {

//     }
// }

async(req, res) => {
    const body =req.body;
    try {
        const conn = await db();
        await conn.query('START TRANSACTION');
        const result = await conn.query(``);
        await conn.query('COMMIT'); // this step is only when we make any changes in database
        res.type('json');
        res.status(200).json({
            success: 1,
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            error: err,
            message: "Database connection error"

        });
    } finally{
        await conn.release();
        await conn.destroy();
    }
}

