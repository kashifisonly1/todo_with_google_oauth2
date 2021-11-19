const express = require('express');
const {GetTodoList, AddTodoItem, UpdateTodoItem, DeleteTodoItem} = require('../services/TodoServices');
const {VerifyUserToken} = require('../services/UserServices');
const router = express.Router();

router.get('/api/todo', (req, res)=>{
    GetTodoList(req, res);
});

router.post('/api/todo', (req, res)=>{
    AddTodoItem(req, res);
});

router.put('/api/todo/:id', (req, res)=>{
    UpdateTodoItem(req, res);
});

router.delete('/api/todo/:id', (req, res)=>{
    DeleteTodoItem(req, res);
});

router.get('/api/user/verify', (req, res)=>{
    VerifyUserToken(req, res);
});

module.exports = router;