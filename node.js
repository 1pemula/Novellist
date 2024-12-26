const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./novels.db');

app.get('/novels', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const offset = (page - 1) * perPage;

    db.all(`SELECT * FROM novels LIMIT ? OFFSET ?`, [perPage, offset], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(rows.length / perPage)
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});