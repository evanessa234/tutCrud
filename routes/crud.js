const express = require('express');
const router = express.Router();

const db = require('../dbConnection')

router.post('/add', async(req, res, next) => {
    const body = req.body;
    console.log(body);
    try{
        const conn = await db();
        await conn.query('START TRANSACTION');
        const result = await conn.query(`insert into student(lastName, firstName, gender, number) values(?,?,?,?)`,
            [
                body.ln,
                body.fn,
                body.gen,
                body.num,
            ],
        );
        await conn.query('COMMIT');
        res.type('json');
        res.status(200).json({
            success: 1,
            data: result
        });  
    }catch (err){
        res.status(500).json({
            success: 0,
            error: err,
            message: "Database connection error"
        });
    } finally{
        await conn.release();
        await conn.destroy();
    } 
});

router.get('/hi/:fn', async(req, res, next) => {
    // const body = req.body;
    // console.log(body);
    const fn = req.params.fn;
    console.log(fn);
    try{
        const conn = await db();
        await conn.query('START TRANSACTION');
        const result = await conn.query(`select * from student where firstName = ?`,[fn]);
        await conn.query('COMMIT');
        res.type('json');
        res.status(200).json({
            success: 1,
            data: result
        });  
    }catch (err){
        res.status(500).json({
            success: 0,
            error: err,
            message: "Database connection error"
        });
    } finally{
        await conn.release();
        await conn.destroy();
    } 
});

router.put('/update/:fn', async(req, res) => {
    const body =req.body;
    const fname = req.params.fn
    try {
        const conn = await db();
        await conn.query('START TRANSACTION');
        const result = await conn.query(`update \`student\` set \`lastName\`=?, \`firstName\`=?, \`gender\`=?, \`number\`=? where \`firstName\`=?`,
            [
                body.ln,
                body.fn,
                body.gen,
                body.num,
                fname
            ],
        );
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
});

router.delete('/delete/:fname', async(req, res) => {   
    const {fname} =req.params;
    try {
        const conn = await db();
        await conn.query('START TRANSACTION');
        const result = await conn.query(`delete from student where firstName = ?`,
            [fname]
        );
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

)
module.exports = router;