"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
/*
* POST /add
* body
* {
*   username: ... *
*   name: ...
* }
* axios.post('http://localhost:3000/add', { name: 'John', username: 'John2000' })
* */
app.post('/add', (req, res) => {
    try {
        //Проверка на пустоту
        if (!req.body.username || req.body.username.trim().length === 0) {
            return res.status(400).json({ message: 'Username is null' });
        }
        const data = JSON.parse(fs_1.default.readFileSync('users.json').toString());
        //Проверка на существование
        for (let one of data.users) {
            if (one.username === req.body.username) {
                return res.status(200).json({ message: 'Username exists' });
            }
        }
        //Добавление пользователя
        data.users.push({
            id: ++data.lastId,
            username: req.body.username,
            name: req.body.name
        });
        fs_1.default.writeFileSync('users.json', JSON.stringify(data));
        res.status(200).send();
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
    }
});
/*
* GET /getUser
*
* axios.get('http://localhost:3000/getUser/1')
* */
app.get('/getUser/:user_id', (req, res) => {
    try {
        //Проверка на пустоту
        if (!req.params.user_id) {
            return res.status(400).json({ message: 'Id is null' });
        }
        const data = JSON.parse(fs_1.default.readFileSync('users.json').toString());
        //Проверка на существование
        for (let one of data.users) {
            if (one.id === parseFloat(req.params.user_id)) {
                return res.status(200).json(one);
            }
        }
        res.status(400).json({ message: 'Id not exist' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
    }
});
/*
* DELETE /deleteUser
*
* axios.delete('http://localhost:3000/deleteUser/2')
* */
app.delete('/deleteUser/:user_id', (req, res) => {
    try {
        //Проверка на пустоту
        if (!req.params.user_id) {
            return res.status(400).json({ message: 'Id is null' });
        }
        const data = JSON.parse(fs_1.default.readFileSync('users.json').toString());
        //Проверка на существование
        for (let one of data.users) {
            if (one.id === parseFloat(req.params.user_id)) {
                data.users.splice(data.users.indexOf(one), 1);
                fs_1.default.writeFileSync('users.json', JSON.stringify(data));
                return res.status(200).send();
            }
        }
        res.status(400).json({ message: 'Id not exist' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
    }
});
/*
* PUT /getById
* body
* {
*   user_id: ... *
*   username: ...
*   name: ...
* }
* axios.put('http://localhost:3000/updateUser', { user_id: 2, name: 'Alex' })
* */
app.put('/updateUser', (req, res) => {
    try {
        //Проверка на пустоту
        if (!req.body.user_id) {
            return res.status(400).json({ message: 'Id is empty' });
        }
        if (!req.body.username && !req.body.name) {
            return res.status(400).json({ message: 'Fields are empty' });
        }
        const data = JSON.parse(fs_1.default.readFileSync('users.json').toString());
        for (let one of data.users) {
            if (one.id === req.body.user_id) {
                req.body.username ? one.username = req.body.username : null;
                req.body.name ? one.name = req.body.name : null;
                fs_1.default.writeFileSync('users.json', JSON.stringify(data));
                return res.status(200).send('Success');
            }
        }
        res.status(400).json({ message: 'Id not exist' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
    }
});
/*
* GET /allUsers
*
* axios.get('http://localhost:3000/allUsers')
* */
app.get('/allUsers', (req, res) => {
    try {
        const data = JSON.parse(fs_1.default.readFileSync('users.json').toString());
        res.status(200).json(data.users);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
