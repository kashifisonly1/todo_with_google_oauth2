const TodoDoc = require('../model/todo');

exports.TodoList = async(email) => {
    let data = await TodoDoc.find({email:email});
    return data;
}
exports.AddTodo = async (title, description, email, date) => {
    let todo = new TodoDoc({
        title:title,
        description:description,
        email:email,
        date:date
    });
    let output = await todo.save(todo);
    return output;
}

exports.UpdateTodo = async (ID, title, description, email, date) => {
    let item = await TodoDoc.findById(ID);
    if(!item)
        return {error:"404 - todo item not found", status:404};
    if(item.email!==email)
        return {error:"403 - you are not authorized to update todo item", status:403};
    const data = {title:title, email:email, description:description, date:date};
    let todo = await TodoDoc.findByIdAndUpdate(ID, data);
    return todo;
}

exports.DeleteTodo = async (ID, email) => {
    let data = await TodoDoc.findById(ID);
    if(!data)
        return {error:"404 - todo item not found", status:404};
    if(data.email===email)
        return await TodoDoc.findByIdAndDelete(ID);
    return {error:"403 - you are not authorized to delete todo item", status:403};
}