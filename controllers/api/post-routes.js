const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authorization = require('../../utils/auth');

router.get('/', async (req, res) => {
  try{
    const postData = await Post.findAll({
      include: [User, Comment]
    });
    res.status(200).json(postData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', authorization, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      user_name: req.session.username
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  };
});

// router.put('/:id', async (req, res)=>{
//   try{
//     const [postData] = Post.update(req.body, {
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!postData){
//       res.status(404).json({ message: "Post not found." });
//       return
//     }
//   } catch(err){
//     res.status(400).json(err);
//   };
// });

router.put('/:id', authorization, async (req, res) => {
  try {
    const [postData] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', authorization, async (req, res)=>{
  try{
    const [postData] = Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!postData){
      res.status(404).json({ message: "Post not found." });
      return
    }
  } catch(err){
    res.status(400).json(err);
  };
});

module.exports = router;