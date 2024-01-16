const router = require('express').Router();
const authenticate = require('../utils/auth.js');
const userCheck = require('../utils/userCheck.js');
const { Post, User, Comment } = require('../models');

// router.get('/me', authenticate, async (req, res)=>{
//     try{
//         const userData = await User.findByPk({
//             where: {
//                 id: req.session.id
//             },
//             attributes: {
//                 exclude: ['password']
//             },
//             include: [{ model: Post }, { model: Comment }]
//         });
//         const user = userData.get({ plain: true });

//         res.render('dashboard', {
//             ...user,
//             logged_in: true
//         });

//     } catch(err){
//         res.status(500).json(err);
//     };
// });

// router.get('/:username', userCheck, async (req, res)=>{
router.get('/:username', async (req, res)=>{
    try{
        const userData = await User.findOne({
            where: {
                username: req.params.username
            },
            attributes: {
                exclude: ['email', 'password']
            },
            include: [{ model: Post }, { model: Comment }]
        });
        if (!userData){
            res.redirect('../');
        };
        const currentUser = (req.params.username===req.session.username);
        console.log(currentUser)
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            currentUser,
            logged_in: req.session.logged_in,
        });
    }catch(err){
        res.status(500).json(err);
    };
});

module.exports = router;