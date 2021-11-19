const {VerifyUser} = require('../controller/UserActions');

exports.VerifyUserToken = (req, res) => {
    if(!req.headers.authorization)
        return res.status(403).json({error:"You are not authorized"});
    VerifyUser(req.headers.authorization)
    .then(data=>{
        if(!data)
            return res.status(403).json({error:"You are not authorized"});
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        return res.status(200).json({error:"Something went wrong"});
    });
};
