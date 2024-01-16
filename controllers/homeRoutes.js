const router = require('express').Router();
const authenticate = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res)=>{
    try{
        const postData = await Post.findAll({
            // include: [
            //     {
            //         model: User,
            //         // attributes: ['username']
            //     }
            // ]
            include: [User, Comment]
        });
        // postData = postData.sort((a,b)=>a.date_created-b.date_created).reverse();
        // postData.forEach((post)=>{
        //     post.comments = post.comments.sort((a,b)=>a.date_created-b.date_created)
        // })
        const posts = postData.map((post)=>post.get({ plain: true }));

        res.render('homepage', {
            posts,
            username: req.session.username,
            logged_in: req.session.logged_in
        })
    } catch (err){
        res.status(500).json(err);
    };
    
});

router.get('/login', (req, res)=>{
    if(req.session.logged_in){
        res.redirect('/');
        return;
    };

    res.render('login');
});

router.get('/signup', (req, res)=>{
    if(req.session.logged_in){
        res.redirect('/');
        return;
    };

    res.render('signup');
});

module.exports = router;