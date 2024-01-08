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
                    model: Comment
                }
            ]
        });
        const post = postData.get({ plain: true });
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;