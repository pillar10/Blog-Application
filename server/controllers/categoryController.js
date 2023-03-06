const db = require('../db');

exports.getAllCategory = (req, res, next) => {
    console.log("category");
    res.status(200).json({
        status: 'success'
    });
};

exports.createCategory = async (req, res, next) => {
    const client = await db.connect();
    if(true) {
        const newcategory = await client.query(`INSERT INTO "Category" ()`)
    }
    else {
        res.send("cannot access");
    }
};

exports.createTopCategory = async (req, res, next) => {
    const client = await db.connect();
    if(true) {
        try {
            // console.log(req.user);
            const newTopCategory = await client.query(`INSERT INTO "TopCategory" ("categoryName", "initializedBy", "dateCreated") VALUES (${req.body.categoryName}, ${req.user}), ${Date.now()}`)
            console.log(newTopCategory);
            res.status(201).json({
                status: 'success',
                data: newTopCategory.rows,
            });
        } catch (err) {
            res.status(400).json({
                status:'error',
                message: err
            });
        }
    }
    else {
        res.send("cannot access");
    }
};

exports.createTopCategory = async (req, res, next) => {
    const client = await db.connect();
    const created =new Date();
    try {
        const newCategory = await client.query(`insert into "TopCategory" ("categoryName", "initializedBy","dateCreated") values($1,$2,$3) RETURNING *`, [req.body.categoryName,req.user.userName, created]);
        res.status(201).json({
            status: 'success',
            data: newCategory
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
    res.status(201).json({
        status: 'success'
    });
};

exports.getCategory = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateCategory = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteCategory = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};