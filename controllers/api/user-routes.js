const router = require('express').Router();
const { User } = require('../../models');
const { findOne } = require('../../models/Post');

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

router.post('/login', async (req, res) => {
  try {
    const userData = await findOne({
      where: {
        email: req.body.email
      }
    });
    if (!userData){
      userData = await findOne({
        where: {
          username: req.body.username
        }
      });
    };
    if (!userData){
      res.status(400).json({ message: 'Incorrect username or email.' });
      return;
    };

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword){
      res.status(400).json({ message: 'Incorrect password.' });
      return;
    };

    req.session.save(()=>{
      req.session.id = userData.id;
      req.session.username = userData.username;
      req.logged_in = true;

      res.json({ user: userData, message: 'Welcome back!' })
    })

  } catch (err) {
    res.status(400).json(err);
  };
});

router.post('/logout', async (req, res) => {
  if (req.session.logged_in){
    req.session.destroy(()=>{
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;