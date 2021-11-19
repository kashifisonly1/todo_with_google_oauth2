const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        required:true
    }
});

const TodoDoc = mongoose.model('todo_doc', schema);

module.exports = TodoDoc;  