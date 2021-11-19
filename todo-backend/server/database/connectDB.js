const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true
        });
    }
    catch(err){
        console.log(err);
        process.exit(-1);
    }
};

module.exports = connectDB;