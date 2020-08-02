var express = require('express');
const redis = require('redis');
const redisClient = redis.createClient();
var User = require('../models').User;
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next)=>{
  try{
    const users = await User.findAll();
    res.render('sequelize',{users});
  }catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/mypage', async(req, res, next) => {
  try{
    res.render('mypage');
  }catch (e){
    console.error(e);
    next(e);
  }
})

module.exports = router;
