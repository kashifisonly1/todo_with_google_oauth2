const {TodoList, AddTodo, UpdateTodo, DeleteTodo} = require('../controller/TodoActions');
const {VerifyUser} = require('../controller/UserActions');

exports.GetTodoList = (req, res) => {
    if(!req.headers.authorization)
        return res.status(403).json({error:"You are not authorized"});
    VerifyUser(req.headers.authorization)
    .then(data=>{
        if(!data)
            return {error:"You are not authorized", status:403};
        return TodoList(data.email);
    })
    .then(data=>{
        if(data.error)
            return res.status(data.status||500).json({error:data.error});
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        return res.status(200).json({error:"Something went wrong"});
    });
};

exports.AddTodoItem = (req, res) => {
    if(!req.headers.authorization)
        return res.status(403).json({error:"You are not authorized"});
    VerifyUser(req.headers.authorization)
    .then(data=>{
        if(!data)
            return {error:"You are not authorized", status:403};
        const {title, description} = req.body;
        return AddTodo(title, description, data.email, new Date());
    })
    .then(data=>{
        if(data.error)
            return res.status(data.status||500).json({error:data.error});
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        return res.status(200).json({error:"Something went wrong"});
    });
};

exports.UpdateTodoItem = (req, res) => {
    if(!req.headers.authorization)
        return res.status(403).json({error:"You are not authorized"});
    VerifyUser(req.headers.authorization)
    .then(data=>{
        if(!data)
            return {error:"You are not authorized", status:403};
        const {title, description} = req.body;
        return UpdateTodo(req.params.id, title, description, data.email, new Date());
    })
    .then(data=>{
        if(data.error)
            return res.status(data.status||500).json({error:data.error});
        data.title = req.body.title;
        data.description = req.body.description;
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        return res.status(200).json({error:"Something went wrong"});
    });
}

exports.DeleteTodoItem = (req, res) => {
    if(!req.headers.authorization)
        return res.status(403).json({error:"You are not authorized"});
    VerifyUser(req.headers.authorization)
    .then(data=>{
        if(!data)
            return {error:"You are not authorized", status:403};
        return DeleteTodo(req.params.id, data.email);
    })
    .then(data=>{
        if(data.error)
            return res.status(data.status||500).json({error:data.error});
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        return res.status(200).json({error:"Something went wrong"});
    });
}
