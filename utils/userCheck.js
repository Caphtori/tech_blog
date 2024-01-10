const userCheck = (req, res, next)=>{
    if(req.params.username === req.session.user.username){
        res.redirect('/me');
    } else{
        next();
    };
};

module.exports = userCheck;