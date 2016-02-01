module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render('index', { title: 'Sistem Penjualan' });
    });

    app.get('/user/:id?', require('../controllers/UserController').UserList);
    app.post('/user', require('../controllers/UserController').UserSave);
    app.delete('/user/:id', require('../controllers/UserController').UserDestroy);

    app.get('/typeitems/:id?', require('../controllers/TypeController').TypeList);
    app.post('/typeitems', require('../controllers/TypeController').TypeSave);
    app.delete('/typeitems/:id', require('../controllers/TypeController').TypeDestroy);

    app.get('/items/:id?', require('../controllers/ItemController').ItemList);
    app.post('/items', require('../controllers/ItemController').ItemSave);
    app.delete('/items/:id', require('../controllers/ItemController').ItemDestroy);
};
