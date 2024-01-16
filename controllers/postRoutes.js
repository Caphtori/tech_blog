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
        const currentUser = (postData.user_id===req.session.user_id);
        console.log(currentUser)
        const post = postData.get({ plain: true });
        res.render('post-page', {
            ...post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            currentUser
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
        body: '',
        user_id: req.session.user_id,
        logged_in: req.session.logged_in,
        new: true
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
            res.redirect('../../');
        };
        
        if (postData.user_id!=req.session.user_id){
            res.redirect('../../');
            // console.log(`Post Author: ${postData.user_id}`)
            // console.log(`Session: ${req.session.user_id}`)
        }
        const post = postData.get({ plain: true });
        
        
        res.render('post-write', {
            ...post,
            logged_in: req.session.logged_in,
            new: false
            // currentUser: req.session.user.id
        });
    } catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;