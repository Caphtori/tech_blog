const router = require('express').Router();
const { Post, User, Comment } = require('../models');

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

module.exports = router;