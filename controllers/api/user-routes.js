const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const { findOne } = require('../../models/Post');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try{
    const userData = await User.findAll({
      include: [Post, Comment]
    });
    res.status(200).json(userData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(()=>{
      req.session.id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:username', async (req, res) => {
  try {
    const userData = await User.findOne({where:{username: req.params.username}});
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     console.log(req.body)
//     const userData = await findOne({
//       where: {
//         email: req.body.email
//       }
//     });
//     // if (!userData){
//     //   userData = await findOne({
//     //     where: {
//     //       username: req.body.identifier
//     //     }
//     //   });
//     // };
//     if (!userData){
//       res.status(400).json({ message: 'Incorrect username or email.' });
//       return;
//     };

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword){
//       res.status(400).json({ message: 'Incorrect password.' });
//       return;
//     };

//     req.session.save(()=>{
//       req.session.id = userData.id;
//       req.session.username = userData.username;
//       req.logged_in = true;

//       res.json({ user: userData, message: 'Welcome back!' })
//     })

//   } catch (err) {
//     res.status(400).json(err);
//   };
// });

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        // username: req.body.username,
        username: req.body.username
      },
    });

    if (!user) {
      res.status(400).json({ message: 'bubba' });
      return;
    }

    // const validPassword = user.checkPassword(req.body.password);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!validPassword) {
      res.status(400).json({ message: `Incorrect Password` });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      res.json({ user, message: 'Welcome back' });
    });
  } catch (err) {
    res.status(400).json({ message: `${req.body.password}` });
  };
});


router.post('/logout', async (req, res) => {
  if (req.session.logged_in){
    req.session.destroy(()=>{
      res.status(204).end();
      // res.status(204).redirect('../');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;