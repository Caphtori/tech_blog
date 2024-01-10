const router = require('express').Router();
const { Post } = require('../../models');
const authorization = require('../../utils/auth');

router.post('/', authorization, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/edit/:id', authorization, async (req, res)=>{
  try{
    const postData = Post.update(req.body, {
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

router.delete('/delete/:id', authorization, async (req, res)=>{
  try{
    const postData = Post.destroy({
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