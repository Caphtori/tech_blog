const userCheck = (req, res, next)=>{
    if(req.params.username === req.session.username){
        res.redirect('/me');
    } else{
        next();
    };
};

module.exports = userCheck;