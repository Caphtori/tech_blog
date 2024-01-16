const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const authenticate = require('../utils/auth.js');

router.get('/:id', async (req, res)=>{
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [{ model: User }]
                }
            ]
        });
        if (!postData){
            res.redirect('../');
        };
        const post = postData.get({ plain: true });
        res.render('post-page', {
            ...post,
            logged_in: req.session.logged_in,
            // currentUser: req.session.user.id
        });
    } catch(err){
        res.status(500).json(err);
    }
    
});

// router.get('/new', authenticate, (req, res)=>{
//     // try{
//     //     console.log('bub')
//     //     res.render('post-write', {
//     //         title: '',
//     //         body: '',
//     //         logged_in: req.session.logged_in,
//     //         // currentUser: req.session.user.id
//     //     });
//     // } catch(err){
//     //     res.status(500).json(err);
//     // }
//     res.render('post-write', {
//         title: '',
//         body: '',
//         logged_in: req.session.logged_in,
//         // currentUser: req.session.user.id
//     });
    
// });
router.get('/', authenticate, (req, res)=>{
    res.render('post-write',{
        title: '',
        body: ''
    })
})

router.get('/:id/edit', authenticate, async (req, res)=>{
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [{ model: User }]
                }
            ]
        });
        if (!postData){
            res.redirect('../');
        };
        const post = postData.get({ plain: true });
        res.render('post-write', {
            ...post,
            logged_in: req.session.logged_in,
            // currentUser: req.session.user.id
        });
    } catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;